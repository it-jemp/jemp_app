export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  return {
    model: config.openrouterEmbeddingModel
  }
})
