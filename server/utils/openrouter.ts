import OpenAI from "openai"
import type { ChatMessage } from "@/types/rag"

function getClient() {
  const config = useRuntimeConfig()
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: config.openrouterApiKey as string,
    defaultHeaders: {
      "HTTP-Referer": "https://jemp.it",
      "X-Title": "JEMP Assistant",
    },
  })
}

export async function embedText(text: string): Promise<number[]> {
  const config = useRuntimeConfig()
  const client = getClient()
  const response = await client.embeddings.create({
    model: config.openrouterEmbeddingModel as string,
    input: text,
  })
  return response.data[0].embedding
}

export async function generateResponse(
  systemPrompt: string,
  history: ChatMessage[],
  userMessage: string,
): Promise<string> {
  const config = useRuntimeConfig()
  const client = getClient()
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: userMessage },
  ]
  const response = await client.chat.completions.create({
    model: config.openrouterChatModel as string,
    messages,
  })
  return response.choices[0].message.content ?? ""
}
