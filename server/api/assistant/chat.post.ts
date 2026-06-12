import type { ChatMessage, ChatResponse, RagDocument } from "@/types/rag"

const SYSTEM_PROMPT = `Sei l'assistente interno dell'associazione JEMP. Rispondi SOLO usando le
informazioni nei documenti di contesto forniti. Se l'informazione richiesta
non è presente nei documenti, dillo esplicitamente senza inventare.
Rispondi sempre in italiano, in modo conciso e diretto.
Quando citi informazioni, indica tra parentesi il titolo del documento.`

export default defineEventHandler(async (event): Promise<ChatResponse> => {
  await requireAuth(event)

  const body = await readBody<{ message: string; history: ChatMessage[] }>(event)

  if (!body.message?.trim()) {
    throw createError({ statusCode: 400, message: "Il messaggio non può essere vuoto" })
  }

  const history = (body.history ?? []).slice(-10)
  const message = body.message.trim()

  const queryVector = await embedText(message)

  const supabase = useSupabaseAdmin()
  const { data: docs, error } = await supabase.rpc("match_rag_documents", {
    query_embedding: queryVector,
    match_threshold: 0.4,
    match_count: 6,
  })

  if (error) {
    console.error("chat: errore match_rag_documents", error)
    throw createError({ statusCode: 500, message: "Errore nella ricerca dei documenti: " + error.message })
  }

  const documents = (docs as RagDocument[]) ?? []

  if (documents.length === 0) {
    return {
      reply: "Non ho trovato documenti rilevanti per rispondere a questa domanda.",
      sources: [],
    }
  }

  const context = documents.map((d) => `[${d.title}]\n${d.content}`).join("\n\n")
  const messageWithContext = `Documenti di contesto:\n${context}\n\nDomanda: ${message}`

  const reply = await generateResponse(SYSTEM_PROMPT, history, messageWithContext)

  const sources = [...new Set(documents.map((d) => d.title))]

  return { reply, sources }
})
