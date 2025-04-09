"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}: StackProps) {
  // Default cards if none provided
  const defaultCards = [
    { id: 1, img: "https://content.jdmagicbox.com/comp/ghaziabad/w4/011pxx11.xx11.191217190807.e5w4/catalogue/rpn-boy-s-hostel-dasna-ghaziabad-hostels-adyayiouqi.jpg" },
    { id: 2, img: "https://bgiedu.in/wp-content/uploads/2024/07/hostl-min-scaled.jpg" },
    { id: 3, img: "https://grdedu.in/wp-content/gallery/grd-imt-hostel/Hostel-1-2-e1629272260929.jpg" },
    { id: 4, img: "https://snit.edu.in/wp-content/uploads/2022/12/IMG_9036-1024x646.jpg" }
  ];
  
  const [cards, setCards] = useState(
    cardsData.length ? cardsData : defaultCards
  );

  // Client-side only detection
  const [isClient, setIsClient] = useState(false);
  
  // Fixed (non-random) rotation values to avoid hydration mismatch
  const fixedRotations = [1, -2, 3, -1];
  
  // Initialize on client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        // Use fixed rotation value to ensure consistency between server and client
        const rotateValue = isClient && randomRotation ? fixedRotations[index % fixedRotations.length] : 0;
        
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              initial={false}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + rotateValue,
                scale: 1 + index * 0.06 - cards.length * 0.06,
              }}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                transformOrigin: "90% 90%"
              }}
            >
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}