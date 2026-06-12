import { embedText } from "../../utils/openrouter"
import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  try {
    const queryVector = await embedText("chi è il presidente di jemp?")
    
    // We cannot easily use useSupabaseAdmin() inside a simple test endpoint if we don't have the cookies/auth
    // Let's just return the vector length first, then we'll see if the user can hit the real endpoint
    return { vectorLength: queryVector.length }
  } catch (e: any) {
    return { error: e.message }
  }
})
