import { createClient } from "@supabase/supabase-js"

export function useSupabaseAdmin() {
  const config = useRuntimeConfig()
  const supabaseUrl = (config.public as { supabase?: { url?: string } }).supabase?.url ?? ""
  return createClient(supabaseUrl, config.supabaseServiceRoleKey as string)
}
