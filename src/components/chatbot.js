import React, { useState } from "react";
import OpenAI from "openai";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const openai = new OpenAI({
    apiKey: "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",
  });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [...messages, userMessage],
      });

      const botMessage = {
        role: "assistant",
        content: completion.choices[0].message.content,
      };

      setMessages([...messages, userMessage, botMessage]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chatbot</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.content}
          </p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
