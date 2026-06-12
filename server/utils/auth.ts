import type { H3Event } from "h3"
import { serverSupabaseUser } from "#supabase/server"

export async function requireAuth(event: H3Event) {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: "Non autenticato" })
  }
  return user
}

export async function requireAdmin(event: H3Event) {
  const user = await requireAuth(event)
  const config = useRuntimeConfig(event)
  if (user.email !== (config.adminEmail as string)) {
    throw createError({ statusCode: 403, message: "Accesso non autorizzato" })
  }
  return user
}
