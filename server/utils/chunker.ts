export function chunkText(text: string, chunkSize = 500, overlap = 50): string[] {
  const words = text.split(/\s+/)
  const chunks: string[] = []
  const step = chunkSize - overlap

  for (let i = 0; i < words.length; i += step) {
    const chunk = words.slice(i, i + chunkSize).join(" ")
    if (chunk.split(/\s+/).length >= 10) {
      chunks.push(chunk)
    }
  }

  return chunks
}
