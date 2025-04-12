import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StepperProps {
  children: React.ReactNode;
  className?: string;
  onComplete?: () => void;
}

interface StepProps {
  children: React.ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="w-full">{children}</div>;
}

export function Stepper({ children, className = "", onComplete }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const stepsArray = React.Children.toArray(children);
  const totalSteps = stepsArray.length;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className={`w-full ${className}`}>
    
      <div className="flex justify-between items-center mb-8 px-4">
        {stepsArray.map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isComplete = stepNum < currentStep;
          
          return (
            <React.Fragment key={stepNum}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
                    ${isActive ? 'bg-[#7C2121] border-2 border-white' : 
                      isComplete ? 'bg-[#7C2121]' : 'bg-white border-2 border-[#7C2121]'}`}
                >
                  {isComplete ? (
                    <CheckIcon className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-[#7C2121]'}`}>
                      {stepNum}
                    </span>
                  )}
                </div>
              </div>
              {index < totalSteps - 1 && (
                <div className="flex-1 h-0.5 mx-2 relative">
                  <div className="absolute inset-0 bg-white/30" />
                  <motion.div
                    className="absolute inset-0 font-bold bg-white"
                    initial={false}
                    animate={{
                      width: isComplete ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="relative overflow-hidden ">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? '100%' : '-100%',
                opacity: 0
              }),
              center: {
                x: 0,
                opacity: 1
              },
              exit: (direction) => ({
                x: direction > 0 ? '-100%' : '100%',
                opacity: 0
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {stepsArray[currentStep - 1]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className={`mt-8 flex ${currentStep === 1 ? 'justify-end' : 'justify-between'}`}>
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 text-white font-bold hover:text-white/80 transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-white text-[#7C2121] rounded-full font-bold hover:bg-white/90 transition-colors"
        >
          {currentStep === totalSteps ? 'Complete' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}