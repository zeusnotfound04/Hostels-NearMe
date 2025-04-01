"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export const Particles = ({ count = 10 }: { count?: number }) => {
  const [particles, setParticles] = useState<any>([])

  useEffect(() => {

    const newParticles = Array.from({ length: count }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      yMovement: Math.random() * 30 - 15,
      xMovement: Math.random() * 30 - 15,
      duration: Math.random() * 5 + 5
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle : any, i : any) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#902920] opacity-20"
          style={{
            top: particle.top,
            left: particle.left,
          }}
          animate={{
            y: [0, particle.yMovement],
            x: [0, particle.xMovement],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}