import React, { useState } from "react";
import OpenAI from "openai";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, 
  });

  // Handle sending the message to OpenAI API
  const sendMessage = async () => {
    if (!input.trim()) return; 

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Update the state with user message

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use a known working model
        messages: [...messages, userMessage], // Include the previous messages for context
      });

      const botMessage = {
        role: "assistant",
        content: completion.choices[0].message.content,
      };

      // Update the state with the bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        botMessage,
      ]);

      setInput(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error:", error);
      // Handle the error gracefully by providing feedback to the user
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chatbot</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {/* Display messages */}
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.content}
          </p>
        ))}
      </div>
      <div>
        {/* Input field for the user to type a message */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state on change
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
