/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ArrowL1 from "../../../public/icons/ArrowL1.svg" 
import BigArrow from "../../../public/icons/BigArrow.svg"
import ArrowL2 from "../../../public/icons/ArrowL2.svg"
import ArrowR1 from "../../../public/icons/ArrowLB.svg"
import ArrowR2 from "../../../public/icons/ArrowRB.svg"

export function Testimonials() {
  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  return (
    <motion.div 
      className="container mx-auto px-4 py-16 relative"
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={containerInView ? "visible" : "hidden"}
    >
      {/* Left side arrows with floating animation */}
      <motion.div
        variants={arrowVariants}
        animate={containerInView ? 
          { x: [0, -10, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }} : 
          {}
        }
      >
        <Image src={ArrowL1} alt="Arrow 1" width={150} height={150} className="absolute -left-[10rem] top-[5rem] hidden md:block" />
      </motion.div>
      
      <motion.div
        variants={arrowVariants}
        animate={containerInView ? 
          { x: [0, 10, 0], transition: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }} : 
          {}
        }
      >
        <Image src={ArrowL2} alt="Arrow 2" width={150} height={150} className="absolute rotate-180 -left-[10rem] top-[35rem] hidden md:block" />
      </motion.div>
      
      {/* Center big arrow with bounce effect */}
      <motion.div
        variants={arrowVariants}
        animate={containerInView ? 
          { y: [0, -20, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }} : 
          {}
        }
      >
        <Image src={BigArrow} alt="Big Arrow" width={90} height={90} className="absolute left-[12rem] -translate-x-1/2 top-[5rem] hidden md:block" />
      </motion.div>
      
      {/* Right side arrows with floating animation */}
      <motion.div
        variants={arrowVariants}
        animate={containerInView ? 
          { x: [0, 10, 0], transition: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }} : 
          {}
        }
      >
        <Image src={ArrowR1} alt="Arrow 3" width={150} height={150} className="absolute rotate-180 -right-[10rem] top-[1rem] hidden md:block" />
      </motion.div>
      
      <motion.div
        variants={arrowVariants}
        animate={containerInView ? 
          { x: [0, -10, 0], transition: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.7 }} : 
          {}
        }
      >
        <Image src={ArrowR2} alt="Arrow 4" width={150} height={150} className="absolute -right-[10rem] top-[35rem] hidden md:block" />
      </motion.div>

      {/* Heading section with fade in and slide up animation */}
      <motion.div 
        className="text-center mb-12"
        ref={titleRef}
        variants={titleVariants}
        initial="hidden"
        animate={titleInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-2"
          variants={titleVariants}
        >
          Don't Just Take Our Word for It
        </motion.h2>
        <motion.p 
          className="text-3xl md:text-4xl"
          variants={titleVariants}
          transition={{ delay: 0.2 }}
        >
          Hear It From Our Students
        </motion.p>
      </motion.div>

      {/* Testimonial cards with staggered animation */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            custom={index}
            whileHover={{ 
              y: -10, 
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <Card className="bg-gray-100 h-full">
              <CardContent className="p-6">
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={containerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <motion.div 
                    className="relative w-[60px] h-[60px] rounded-full overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src="/placeholder.svg"
                      alt={testimonial.name} 
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.location}</p>
                  </div>
                </motion.div>
                <motion.p 
                  className="text-gray-700 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={containerInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.7 }}
                >
                  {testimonial.text}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const testimonials = [
  {
    name: "Shewta Kumar",
    location: "📍 Lucknow, U.P",
    text: "As a student new to Lucknow, I was overwhelmed by the thought of finding a place to stay. But Hostels Near Me made the process so much easier. The website is super intuitive, with detailed hostel listings and honest reviews from other students. I was able to compare prices, see real photos of the rooms, and pick a place that suited my budget and needs. Booking was quick, and there were no hidden fees or complicated procedures. If you're looking for a hassle-free way to find a hostel, this is it! I can't imagine using any other service for my future stays."
  },
  {
    name: "Gaurav Kapoor",
    location: "📍 Jhansi, U.P",
    text: "Hostels Near Me really exceeded my expectations. As someone who dislikes complicated processes, I was relieved to find a platform that offers clear and simple hostel options. The entire booking process was straightforward, and the website gave me all the information I needed—prices, amenities, and even feedback from other students. I secured a comfortable and affordable place within minutes. It's truly a game-changer for anyone looking to find a hostel without the usual hassles. If you're new to Lucknow, I'd recommend this service without hesitation!"
  },
  {
    name: "Anubhav Singh",
    location: "📍 Kota, Rajasthan",
    text: "As a first-time visitor to Lucknow for my coaching, I was dreading the long search for a hostel. Hostels Near Me made the entire process so smooth and easy. The website is user-friendly and provides all the necessary details, including real photos and honest reviews from other students, which made choosing the right place a breeze. I was able to compare various hostels based on my budget and preferred amenities. What really stood out was how quick and transparent the booking process was—no hidden charges, no brokers, just clear, upfront information."
  }
];