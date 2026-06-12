import type { IngestionLog } from "@/types/rag"

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const supabase = useSupabaseAdmin()

  const [{ count, error: countError }, { data: lastLog, error: logError }] = await Promise.all([
    supabase.from("rag_documents").select("*", { count: "exact", head: true }),
    supabase.from("rag_ingestion_logs").select("*").order("started_at", { ascending: false }).limit(1).maybeSingle(),
  ])

  if (countError) {
    console.error("stats: errore conteggio rag_documents", countError)
    throw createError({ statusCode: 500, message: "Errore nel recupero delle statistiche" })
  }

  if (logError) {
    console.error("stats: errore lettura rag_ingestion_logs", logError)
    throw createError({ statusCode: 500, message: "Errore nel recupero dei log" })
  }

  return {
    total_chunks: count ?? 0,
    last_sync: lastLog as IngestionLog | null,
  }
})
