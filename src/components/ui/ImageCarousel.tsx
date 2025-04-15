/* eslint-disable  @typescript-eslint/no-unused-vars */

import Image from 'next/image';
import React from 'react'
import { useState } from 'react'

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragStart, setDragStart] = useState<number>(0);
  
    const slideVariants = {
      enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1
      },
      exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      })
    };
  
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number): number => {
      return Math.abs(offset) * velocity;
    };
  
    const paginate = (newDirection: number): void => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + newDirection;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        return newIndex;
      });
    };
    
    return (
      <div className="relative overflow-hidden">
        <div className="flex">
          {images.length > 0 ? (
            <Image 
              src={images[currentIndex]} 
              alt={`Slide ${currentIndex}`}
              className="w-full h-auto"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              No images available
            </div>
          )}
        </div>
        {images.length > 1 && (
          <>
            <button 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
              onClick={() => paginate(-1)}
              aria-label="Previous image"
            >
              &lt;
            </button>
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
              onClick={() => paginate(1)}
              aria-label="Next image"
            >
              &gt;
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
}

export default ImageCarousel