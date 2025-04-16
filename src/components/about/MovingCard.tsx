"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { motion } from "framer-motion";

// Array of all backedby images
const backedByImages = [
  "/backedby/basic.png",
  "/backedby/ISB.png",
  "/backedby/jhansiSmart.jpg",
  "/backedby/MeitYStartup.jpg",
  "/backedby/msme.jpg",
  "/backedby/octane.jpg",
  "/backedby/pwstartup.jpg",
  "/backedby/risejhansi.jpg",
  "/backedby/startInUp.jpg",
  "/backedby/startupIndia.jpg",
  "/backedby/stpi.jpg",
  "/backedby/wadhwani.jpg"
];

export default function MovingCards({Headline}: { Headline: string }) {
    return (
        <div className="py-12 px-4">
            <div className="relative mb-8 text-center">
                <motion.h1 
                    className="text-3xl font-bold text-primary inline-block relative"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {Headline}
                    <motion.span 
                        className="absolute -bottom-2 left-0 w-full h-[3px] bg-primary/40 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.h1>
            </div>
            
            <InfiniteMovingCards 
                images={backedByImages} 
                pauseOnHover={true} 
                speed="slow" 
                direction="right"
                className="py-4"
                imageClassName="object-contain p-2 mix-blend-multiply"
                cardClassName="bg-white flex items-center justify-center border border-gray-100 h-[120px]"
                imageSize="medium"
            />
        </div>
    );
}