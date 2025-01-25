import axios from "axios"

const API_KEY = process.env.REACT_APP_WIT_AI_API_KEY

export const generateResponse = async (prompt) => {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt is required.")
    }

    const url = `https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    // Extract the most relevant information from Wit.ai response
    const intent = response.data.intents?.[0]?.name
    const confidence = response.data.intents?.[0]?.confidence
    const entities = response.data.entities

    // Construct a meaningful response based on the intent and entities
    let responseText = ""

    if (intent && confidence > 0.7) {
      responseText = `I understand you want to ${intent.replace("_", " ")}. `

      // Add entity information if available
      if (Object.keys(entities).length > 0) {
        Object.entries(entities).forEach(([key, value]) => {
          if (value?.[0]?.value) {
            responseText += `${key}: ${value[0].value}. `
          }
        })
      }
    } else {
      responseText = response.data.text || "I'm still learning to understand that. Could you rephrase?"
    }

    return responseText
  } catch (error) {
    console.error("Error calling Wit.ai API:", error)
    return "I'm sorry, I couldn't process your request at the moment. Please try again later."
  }
}

