import { OpenAIApi } from "openai"

const openai = new OpenAIApi({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})

export const generateResponse = async (prompt) => {
  try {
    const completion = await openai.completions.create({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 150,
    })
    return completion.choices[0].text.trim()
  } catch (error) {
    console.error("Error calling OpenAI API:", error)
    return "I'm sorry, I couldn't process your request at the moment."
  }
}

