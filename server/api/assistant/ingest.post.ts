import type { IngestResult } from "@/types/rag"

export default defineEventHandler(async (event): Promise<IngestResult> => {
  await requireAdmin(event)

  const startedAt = Date.now()
  const supabase = useSupabaseAdmin()
  const config = useRuntimeConfig(event)

  const { data: logData, error: logInsertError } = await supabase
    .from("rag_ingestion_logs")
    .insert({ status: "running", started_at: new Date().toISOString(), errors: [] })
    .select("id")
    .single()

  if (logInsertError || !logData) {
    console.error("ingest: errore creazione log", logInsertError)
    throw createError({ statusCode: 500, message: "Errore nella creazione del log di ingestion" })
  }

  const logId: string = logData.id
  let filesProcessed = 0
  let chunksInserted = 0
  const errors: string[] = []

  try {
    const files = await listFilesInFolder(config.googleDriveFolderId as string)

    for (const file of files) {
      try {
        const text = await fetchFileText(file.id, file.mimeType)
        if (text === null) {
          errors.push(`File non supportato: ${file.name} (${file.mimeType})`)
          continue
        }

        const chunks = chunkText(text)

        for (let i = 0; i < chunks.length; i++) {
          const embedding = await embedText(chunks[i])
          const { error: upsertError } = await supabase.from("rag_documents").upsert(
            {
              content: chunks[i],
              embedding,
              title: file.name,
              source: "google_drive",
              source_id: `${file.id}_chunk_${i}`,
              metadata: { file_id: file.id, mime_type: file.mimeType },
            },
            { onConflict: "source_id" },
          )

          if (upsertError) {
            console.error(`ingest: errore upsert chunk ${i} di ${file.name}`, upsertError)
            errors.push(`Errore chunk ${i} di ${file.name}: ${upsertError.message}`)
          } else {
            chunksInserted++
          }
        }

        filesProcessed++
      } catch (fileError) {
        const msg = fileError instanceof Error ? fileError.message : String(fileError)
        console.error(`ingest: errore file ${file.name}`, fileError)
        errors.push(`Errore file ${file.name}: ${msg}`)
      }
    }

    await supabase.from("rag_ingestion_logs").update({
      status: "completed",
      completed_at: new Date().toISOString(),
      files_processed: filesProcessed,
      chunks_inserted: chunksInserted,
      errors,
    }).eq("id", logId)

    return {
      success: true,
      files_processed: filesProcessed,
      chunks_inserted: chunksInserted,
      errors,
      duration_ms: Date.now() - startedAt,
    }
  } catch (fatalError) {
    const msg = fatalError instanceof Error ? fatalError.message : String(fatalError)
    console.error("ingest: errore fatale", fatalError)

    await supabase.from("rag_ingestion_logs").update({
      status: "failed",
      completed_at: new Date().toISOString(),
      files_processed: filesProcessed,
      chunks_inserted: chunksInserted,
      errors: [...errors, `Errore fatale: ${msg}`],
    }).eq("id", logId)

    throw createError({ statusCode: 500, message: `Errore durante l'ingestion: ${msg}` })
  }
})
