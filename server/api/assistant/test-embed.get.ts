import { embedText } from "../../utils/openrouter"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const vector = await embedText("test")
    return {
      modelInConfig: config.openrouterEmbeddingModel,
      vectorLength: vector.length
    }
  } catch (e: any) {
    return { error: e.message }
  }
})
