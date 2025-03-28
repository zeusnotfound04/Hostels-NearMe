"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { Building2, MapPin, Star } from "lucide-react"
import { useMobile } from "@/hooks/useMobile"
import { cn } from "@/utils/utils"

const hostelData = [
  {
    id: 1,
    name: "Mountain View Hostel",
    location: "Alpine Heights",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Urban Oasis Hostel",
    location: "Downtown District",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Seaside Retreat",
    location: "Coastal Bay",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HostelAnimation() {
  const isMobile = useMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const buildingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate map pins
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current.querySelectorAll(".map-pin"),
          {
            y: -20,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            delay: 0.5,
          },
        )
      }

      // Animate hostel cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".hostel-card")

        // Initial setup
        gsap.set(cards, {
          opacity: 0,
          y: 50,
          rotationY: -15,
        })

        // Animation
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          delay: 1,
        })

        // Create carousel effect
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1,
        })

        cards.forEach((card, index) => {
          const nextIndex = (index + 1) % cards.length

          tl.to(card, {
            opacity: 0,
            y: -30,
            scale: 0.9,
            duration: 0.5,
            delay: 2,
          }).to(
            cards[nextIndex],
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
            },
            "<0.25",
          )
        })
      }

      // Animate 3D buildings
      if (buildingsRef.current) {
        const buildings = buildingsRef.current.querySelectorAll(".building")

        gsap.set(buildings, {
          y: 100,
          opacity: 0,
          rotationY: 45,
        })

        gsap.to(buildings, {
          y: 0,
          opacity: 1,
          rotationY: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        })

        // Floating animation
        buildings.forEach((building) => {
          gsap.to(building, {
            y: "-=10",
            rotationY: "+=5",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {/* 3D Buildings */}
      <div
        ref={buildingsRef}
        className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-md perspective-1000",
        )}
      >
        <div className="building absolute left-[10%] top-[20%] transform-style-3d">
          <div className="w-16 h-24 bg-primary/80 rounded-md shadow-lg transform rotate-y-15 rotate-x-5">
            <div className="absolute inset-1 grid grid-cols-3 grid-rows-4 gap-1">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-sm"></div>
                ))}
            </div>
          </div>
        </div>
        <div className="building absolute right-[15%] top-[30%] transform-style-3d">
          <div className="w-20 h-32 bg-primary/70 rounded-md shadow-lg transform rotate-y-15 rotate-x-5">
            <div className="absolute inset-1 grid grid-cols-4 grid-rows-5 gap-1">
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-sm"></div>
                ))}
            </div>
          </div>
        </div>
        <div className="building absolute left-[30%] bottom-[20%] transform-style-3d">
          <div className="w-24 h-20 bg-primary/60 rounded-md shadow-lg transform rotate-y-15 rotate-x-5">
            <div className="absolute inset-1 grid grid-cols-4 grid-rows-3 gap-1">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-sm"></div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map with Pins */}
      <div
        ref={mapRef}
        className={cn(
          "absolute top-0 left-0 w-full h-full opacity-20",
          "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]",
          "from-transparent via-primary/5 to-transparent",
        )}
      >
        <div className="map-pin absolute left-[20%] top-[30%]">
          <div className="relative">
            <MapPin className="h-6 w-6 text-primary drop-shadow-md" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="map-pin absolute right-[30%] top-[20%]">
          <div className="relative">
            <MapPin className="h-6 w-6 text-primary drop-shadow-md" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="map-pin absolute left-[40%] bottom-[25%]">
          <div className="relative">
            <MapPin className="h-6 w-6 text-primary drop-shadow-md" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Hostel Cards Carousel */}
      <div
        ref={cardsRef}
        className={cn("absolute bottom-8 left-1/2 transform -translate-x-1/2", "w-full max-w-xs perspective-1000")}
      >
        {hostelData.map((hostel, index) => (
          <div
            key={hostel.id}
            className={cn(
              "hostel-card absolute left-0 right-0 mx-auto",
              "bg-card border rounded-lg shadow-lg overflow-hidden",
              "transform-style-3d backface-hidden",
              index === 0 ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="relative h-32">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img src={hostel.image || "/placeholder.svg"} alt={hostel.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-3 z-20 text-white">
                <h3 className="font-medium">{hostel.name}</h3>
                <div className="flex items-center text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{hostel.location}</span>
                </div>
              </div>
            </div>
            <div className="p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 text-primary mr-1" />
                <span className="text-sm font-medium">Available Now</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                <span className="text-sm">{hostel.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

