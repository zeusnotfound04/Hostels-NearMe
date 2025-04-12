/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ParticleProps {
  top: string;
  left: string;
  yMovement: number;
  xMovement: number;
  duration: number;
}

export const Particles = ({ count = 10 }: { count?: number }) => {
  const [particles, setParticles] = useState<ParticleProps[]>([])

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
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{
            top: particle.top,
            left: particle.left
          }}
          animate={{
            y: [0, particle.yMovement, 0],
            x: [0, particle.xMovement, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  )
}