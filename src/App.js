// import React, { useState } from "react"
// import { motion } from "framer-motion"
// import Sidebar from "./components/Sidebar"
// import ChatArea from "./components/ChatArea"
// import MessageInput from "./components/MessageInput"
// import Suggestions from "./components/Suggestions"
// import BackgroundAnimation from "./components/BackgroundAnimation"
// import "./App.css"

// const App = () => {
//   const [messages, setMessages] = useState([])

//   const handleNewMessage = (message, isUser) => {
//     const newMessage = {
//       id: Date.now(),
//       text: message,
//       isUser: isUser,
//       timestamp: new Date().toLocaleTimeString(),
//     }
//     setMessages((prevMessages) => [...prevMessages, newMessage])
//   }

//   const handleSuggestionClick = (suggestion) => {
//     handleNewMessage(suggestion, true)
//   }

//   return (
//     <div className="app-container">
//       <BackgroundAnimation />
//       <Sidebar messages={messages} />
//       <main className="main-content">
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="main-heading"
//         >
//           Know more..... and more
//         </motion.h1>
//         <ChatArea messages={messages} />
//         <MessageInput onNewMessage={handleNewMessage} />
//         <Suggestions onSuggestionClick={handleSuggestionClick} />
//       </main>
//     </div>
//   )
// }

// export default App

import MessageInput from "../components/message-input"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/50 to-background">
      <MessageInput />
    </div>
  )
}

