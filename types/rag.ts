export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ChatResponse {
  reply: string
  sources: string[]
}

export interface IngestResult {
  success: boolean
  files_processed: number
  chunks_inserted: number
  errors: string[]
  duration_ms: number
}

export interface RagDocument {
  id: string
  content: string
  title: string
  source: string
  metadata: Record<string, unknown>
  similarity: number
}

export interface IngestionLog {
  id: string
  started_at: string
  completed_at: string | null
  files_processed: number
  chunks_inserted: number
  errors: unknown[]
  status: "running" | "completed" | "failed"
}
