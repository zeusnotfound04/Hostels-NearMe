"use client";
import PromiseHand from "../../../public/icons/handPromise.png";
import RightSticks from "../../../public/icons/right dande.png";
import LeftSticks from "../../../public/icons/left dande.png";
import IconsBG from "../../../public/icons/IconsBG.png";
import BestPrice from "../../../public/vectors/bestPriceGuarantee.png";
import HostelCertification from "../../../public/vectors/hostelCertification.png";
import QualityAssurance from "../../../public/vectors/qualityAssuaranceCheck.png";
import TransparentHostel from "../../../public/vectors/transparentHostelRannking.png";
import DownStick from "../../../public/icons/promiseStick.png";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export function PromiseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    
    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="promise-section" 
      className="max-w-7xl mx-auto px-4 py-16 sm:py-12 overflow-hidden"
    >
      {/* Header */}
      <div className={`text-center mb-12 sm:mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col items-center mb-6 sm:mb-4">
          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-2">
            <Image 
              src={PromiseHand} 
              alt="Handshake" 
              width={80} 
              height={50} 
              className={`w-16 h-10 sm:w-12 sm:h-8 transition-transform duration-700 ease-out ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-12'}`} 
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Image 
              src={LeftSticks} 
              alt="Left Icon" 
              width={40} 
              height={40} 
              className={`w-8 h-8 sm:w-6 sm:h-6 transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} 
            />
            <h2 className={`text-4xl font-bold sm:text-3xl xs:text-2xl transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>Our Promise</h2>
            <Image 
              src={RightSticks} 
              alt="Right Icon" 
              width={40} 
              height={40} 
              className={`w-8 h-8 sm:w-6 sm:h-6 transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} 
            />
          </div>
          <Image 
            src={DownStick} 
            alt="Down Stick" 
            width={120} 
            height={20} 
            className={`w-24 sm:w-16 mt-2 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
          />
        </div>

        <div className="text-3xl md:text-4xl font-bold mb-2 sm:text-2xl xs:text-xl">
          What you <span className="text-[#8B1D1D] relative inline-block overflow-hidden">
            See
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#8B1D1D] transform transition-transform duration-700 ease-in-out delay-300 origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
          </span> is what you <span className="text-[#8B1D1D] relative inline-block overflow-hidden">
            Get
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#8B1D1D] transform transition-transform duration-700 ease-in-out delay-500 origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></span>
          </span>
        </div>
        <p className={`text-xl text-gray-700 sm:text-lg xs:text-base transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          is our basic ethos ..
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto sm:grid-cols-1 sm:gap-6">
        {[ 
          { src: BestPrice, label: "BEST PRICE GUARANTEE" },
          { src: QualityAssurance, label: "QUALITY ASSURANCE CHECK" },
          { src: TransparentHostel, label: "TRANSPARENT HOSTELS RANKING" },
          { src: HostelCertification, label: "HOSTEL CERTIFICATION PROGRAM" },
        ].map(({ src, label }, index) => (
          <div
            key={index}
            className={`relative rounded-2xl overflow-hidden bg-[#8B1D1D] hover:shadow-lg transition-all duration-500 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              hover:scale-[1.02] hover:-translate-y-1`}
            style={{
              backgroundImage: `url(${IconsBG.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              transitionDelay: isVisible ? `${400 + index * 150}ms` : '0ms',
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="flex flex-row items-center sm:flex-row xs:flex-col xs:text-center p-2 group relative">
              <div className="p-4 bg-white rounded-xl m-4 flex-shrink-0 sm:m-3 transform transition-all duration-500 ease-out 
                group-hover:scale-110 group-hover:-rotate-6 hover:shadow-md relative z-10">
                <Image 
                  src={src} 
                  alt={label} 
                  width={100} 
                  height={100} 
                  className={`w-20 h-20 sm:w-18 sm:h-18 xs:w-16 xs:h-16 transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-0'}`}
                  style={{ transitionDelay: isVisible ? `${600 + index * 150}ms` : '0ms' }} 
                />
              </div>
              <div className="p-4 flex-grow text-white text-xl font-bold sm:text-lg xs:text-base relative">
                <span className="inline-block transition-all duration-500 ease-out group-hover:translate-y-[-2px]">{label}</span>
                <div className="h-1 w-0 bg-white mt-2 transition-all duration-500 ease-in-out group-hover:w-full origin-left"></div>
              </div>
              <div className="absolute inset-0 bg-[#701717] opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}