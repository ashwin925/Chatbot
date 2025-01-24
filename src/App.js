import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { gsap } from "gsap"
import Lottie from "lottie-react"
import Sidebar from "./components/Sidebar"
import ChatArea from "./components/ChatArea"
import Suggestions from "./components/Suggestions"
import BackgroundScene from "./components/BackgroundScene"
import BackgroundImage from "./components/BackgroundImage"
import animationData from "./assets/cool-logo.json"
import "./App.css"

const App = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState([])

  useEffect(() => {
    gsap.from(".app-container", { opacity: 0, duration: 1, ease: "power2.inOut" })
  }, [])

  const handleNewMessage = async (message) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [...currentChat, { role: "user", content: message }],
        }),
      })

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      setCurrentChat((prevChat) => [
        ...prevChat,
        { role: "user", content: message },
        { role: "assistant", content: aiResponse },
      ])
    } catch (error) {
      console.error("Error:", error)
      setCurrentChat((prevChat) => [
        ...prevChat,
        { role: "user", content: message },
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." },
      ])
    }
  }

  return (
    <div className="app-container">
      <BackgroundImage />
      <Canvas className="background-canvas">
        <BackgroundScene />
      </Canvas>
      <div className="content-wrapper">
        <Sidebar conversations={conversations} logo={<Lottie animationData={animationData} />} />
        <main className="main-content">
          <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Know more..... and more
          </motion.h1>
          <ChatArea
            currentChat={currentChat}
            onSendMessage={handleNewMessage}
            logo={<Lottie animationData={animationData} />}
          />
          <Suggestions onSuggestionClick={handleNewMessage} />
        </main>
      </div>
    </div>
  )
}

export default App

