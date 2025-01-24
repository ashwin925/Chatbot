import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { useSpring, animated } from '@react-spring/web';
import { gsap } from "gsap"
import Lottie from "lottie-react"
import { Parallax } from "react-parallax"
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
    // Initialize GSAP animations
    gsap.from(".app-container", { opacity: 0, duration: 1, ease: "power2.inOut" })
  }, [])

  const handleNewMessage = async (message) => {
    // TODO: Implement OpenAI API call here
    const response = "This is a placeholder response from the chatbot."
    setCurrentChat([...currentChat, { role: "user", content: message }, { role: "assistant", content: response }])
  }

  return (
    <Parallax strength={500}>
      <BackgroundImage />
      <div className="app-container">
        <Canvas>
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
            <Suggestions />
          </main>
        </div>
      </div>
    </Parallax>
  )
}

export default App

