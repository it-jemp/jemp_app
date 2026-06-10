import { google } from "googleapis"
import type { drive_v3 } from "googleapis"

interface DriveFile {
  id: string
  name: string
  mimeType: string
}

export function getDriveClient() {
  const config = useRuntimeConfig()
  const auth = new google.auth.JWT({
    email: config.googleServiceAccountEmail as string,
    key: (config.googleServiceAccountPrivateKey as string).replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  })
  return google.drive({ version: "v3", auth })
}

async function listFilesRecursive(drive: drive_v3.Drive, folderId: string): Promise<DriveFile[]> {
  const files: DriveFile[] = []
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType)",
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    corpora: "allDrives",
  })

  for (const file of response.data.files ?? []) {
    if (file.mimeType === "application/vnd.google-apps.folder") {
      const subFiles = await listFilesRecursive(drive, file.id!)
      files.push(...subFiles)
    } else {
      files.push({ id: file.id!, name: file.name!, mimeType: file.mimeType! })
    }
  }

  return files
}

export async function listFilesInFolder(folderId: string): Promise<DriveFile[]> {
  const drive = getDriveClient()
  return listFilesRecursive(drive, folderId)
}

export async function fetchFileText(fileId: string, mimeType: string): Promise<string | null> {
  const drive = getDriveClient()

  if (mimeType === "application/vnd.google-apps.document") {
    const response = await drive.files.export({ fileId, mimeType: "text/plain", supportsAllDrives: true }, { responseType: "text" })
    return response.data as string
  }

  if (mimeType === "application/vnd.google-apps.spreadsheet") {
    const response = await drive.files.export({ fileId, mimeType: "text/csv", supportsAllDrives: true }, { responseType: "text" })
    return response.data as string
  }

  if (mimeType === "text/plain") {
    const response = await drive.files.get({ fileId, alt: "media", supportsAllDrives: true }, { responseType: "text" })
    return response.data as string
  }

  console.warn(`fetchFileText: mimeType non supportato: ${mimeType} per file ${fileId}`)
  return null
}
