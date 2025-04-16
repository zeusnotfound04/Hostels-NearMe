/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const 
InfiniteMovingCards = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  imageClassName,
  cardClassName,
  imageSize = "medium",
}: {
  images: string[]; // Array of image URLs
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  imageClassName?: string;
  cardClassName?: string;
  imageSize?: "small" | "medium" | "large";
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);
  const [start, setStart] = useState(false);
  
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s"); 
      }
    }
  };

  // Get card width based on image size
  const getCardWidth = () => {
    switch (imageSize) {
      case "small": return "w-[180px]";
      case "large": return "w-[320px]";
      case "medium":
      default: return "w-[250px]";
    }
  };

  // Get aspect ratio based on image size
  const getAspectRatio = () => {
    switch (imageSize) {
      case "small": return "aspect-square";
      case "large": return "aspect-[16/10]";
      case "medium":
      default: return "aspect-[4/3]";
    }
  };
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {images.map((imageUrl, index) => (
          <li
            className={cn(
              "relative shrink-0 overflow-hidden rounded-xl shadow-md",
              getCardWidth(),
              cardClassName
            )}
            key={`image-${index}`}
          >
            <div className={cn("relative w-full overflow-hidden", getAspectRatio())}>
              <Image 
                src={imageUrl} 
                alt={`Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 180px, (max-width: 1200px) 250px, 320px"
                className={cn(
                  "object-contain",
                  imageClassName
                )}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
