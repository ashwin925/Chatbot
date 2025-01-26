import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const runtime = "nodejs"

export async function POST(req) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system: "You are a helpful and friendly AI assistant. Provide engaging and informative responses.",
  })

  return result.toDataStreamResponse()
}

