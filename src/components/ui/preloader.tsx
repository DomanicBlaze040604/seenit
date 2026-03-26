"use client"
import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"

const words = ["See It.", "Trust It.", "100% Honest.", "SARS™ Verified.", "India's First.", "SeenIt."]

const opacity: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.8, delay: 0.1 } },
}

const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
  },
}

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => onComplete?.(), 1200)
      }, 2000)
      return
    }
    setTimeout(() => setIndex(index + 1), index === 0 ? 1200 : 250)
  }, [index, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath  = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve: Variants = {
    initial: { d: initialPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const } },
    exit:    { d: targetPath,  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 } },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[9999]"
      style={{ backgroundColor: "#040C1A" }}
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            key={index}
            className="absolute z-10 text-white text-4xl md:text-6xl font-black tracking-tight flex items-center gap-3"
            style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
          >
            {/* Dot pulses gold on last word */}
            <span
              className="block w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: index === words.length - 1 ? "#FFD700" : "#1648CC" }}
            />
            <span style={{ color: index === words.length - 1 ? "#FFD700" : "#fff" }}>
              {words[index]}
            </span>
          </motion.p>

          <svg className="absolute top-0 w-full" style={{ height: "calc(100% + 300px)" }}>
            <motion.path
              variants={curve}
              initial="initial"
              animate={isExiting ? "exit" : "initial"}
              fill="#040C1A"
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}
