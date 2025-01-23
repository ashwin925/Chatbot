import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRive } from "@rive-app/react-canvas"
import { gsap } from 'gsap';  // Correct GSAP import
import Lenis from "@studio-freight/lenis"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import Sidebar from "./components/sidebar"
import ChatBot from "./components/chatbot"
import ThemeToggle from "./components/theme"

const App = () => {
  const [theme, setTheme] = useState("dark")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  useEffect(() => {
    // Use GSAP animation to fade in the app container
    gsap.to(".app-container", {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    })
  }, [])  // This effect runs once when the component mounts

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  return (
    <div
      className={`app-container ${theme}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Roboto", sans-serif',
        transition: "background-color 0.3s ease",
        backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1a1a1a",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: theme === "dark" ? "#000000" : "#ffffff",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: theme === "dark" ? "#ffffff" : "#000000",
            },
            links: {
              color: theme === "dark" ? "#ffffff" : "#000000",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Sidebar theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <ChatBot theme={theme} setIsSidebarOpen={setIsSidebarOpen} />
    </div>
  )
}

export default App
