import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRive } from "@rive-app/react-canvas"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import Sidebar from "./components/sidebar"
import ChatBot from "./components/chatbot"
import ThemeToggle from "./components/theme"

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [theme, setTheme] = useState("dark")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const appRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(".app-container", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }).from(".floating-element", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "back.out(1.7)",
    })

    ScrollTrigger.create({
      trigger: ".app-container",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.to(".parallax-bg", {
          y: self.progress * 100,
          ease: "none",
        })
      },
    })
  }, [])

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  return (
    <div
      ref={appRef}
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
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="parallax-bg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "120%",
          backgroundImage: `url(${theme === "dark" ? "/dark-bg.jpg" : "/light-bg.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
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
          zIndex: 0,
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

