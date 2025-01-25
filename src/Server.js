const express = require('express');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5000;  // You can use any available port

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API route to generate OpenAI response
app.post('/generate-response', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or a newer model if available
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });
    res.json({ response: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).send('Error generating response');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
