"use client";

import { cn } from "@/utils/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface RotatingTextProps {
  texts: string[];
  className?: string;
  animationClassName?: string;
  rotationInterval?: number;
  auto?: boolean;
  mainClassName?: string;
}

export function RotatingText({
  texts,
  className,
  animationClassName,
  rotationInterval = 2000,
  auto = true,
  mainClassName = "text-3xl font-bold text-center text-primary",
  ...rest
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hiddenTextRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef(null);
  const isInView = useInView(scrollTriggerRef, { once: true });

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
  }, [texts.length]);

  // Auto-rotate if in view
  useEffect(() => {
    if (!auto || !isInView) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto, isInView]);

  // Calculate height based on longest text
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  useEffect(() => {
    if (hiddenTextRef.current) {
      setContainerHeight(hiddenTextRef.current.clientHeight);
    }
  }, [texts]);

  const containerStyle = containerHeight ? { height: `${containerHeight}px` } : {};

  return (
    <div ref={scrollTriggerRef} className={cn("relative", className)}>
      {/* Hidden element to measure height */}
      <div
        ref={hiddenTextRef}
        className="absolute opacity-0 pointer-events-none -z-10 whitespace-nowrap"
      >
        <span className={mainClassName}>
          {texts.reduce((a, b) => (a.length > b.length ? a : b))}
        </span>
      </div>

      <motion.span
        ref={containerRef}
        style={containerStyle}
        className={cn("relative flex flex-col overflow-hidden", mainClassName)}
        {...rest}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[currentIndex]}
            className={cn("inline-block w-full text-center", animationClassName)}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {texts[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
}
