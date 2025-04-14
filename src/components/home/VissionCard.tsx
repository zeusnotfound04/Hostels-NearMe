/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// Import SVG border images directly from the Vission-Mission folder
import CenterBorder from '../../../public/vectors/Vission-Mission/CenterBorder.svg';
import LeftBorder from '../../../public/vectors/Vission-Mission/LeftBorder.svg';
import LeftBottom from '../../../public/vectors/Vission-Mission/LeftBottom.svg';
import LeftTop from '../../../public/vectors/Vission-Mission/LeftTop.svg';
import RightBorder from '../../../public/vectors/Vission-Mission/RightBorder.svg';
import RightBottom from '../../../public/vectors/Vission-Mission/RightBottom.svg';
// Note: RightTop is a PNG file
import RightTopPNG from '../../../public/vectors/Vission-Mission/RightTop.png';

// Import Jagged border SVGs for compatibility
import ArrowLB from '../../../public/vectors/Vission-Mission/LeftBorder.svg';
import ArrowRB from '../../../public/vectors/Vission-Mission/RightBorder.svg';

// Define interface for component props
interface DecorativeBorderProps {
  animate?: boolean;
}

interface SideBorderProps extends DecorativeBorderProps {
  isRight?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const DecorativeBorder: React.FC<DecorativeBorderProps> = ({ animate = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const borderVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-full h-24 md:h-48 relative flex justify-center items-center"
      ref={ref}
      variants={animate ? borderVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate && inView ? "visible" : undefined}
    >
      <div className="w-full md:w-full h-full relative">
        <Image 
          src={CenterBorder}
          alt="Decorative border"
          fill
          style={{ objectFit: 'contain' }}
          className="invert-[20%] sepia-[30%] saturate-[2000%] hue-rotate-[320deg]" 
        />
      </div>
    </motion.div>
  );
};

const SideBorder: React.FC<SideBorderProps> = ({ animate = false, isRight = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const borderVariants: Variants = {
    hidden: { opacity: 0, x: isRight ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="absolute top-4 bottom-4 w-6 md:w-16"
      style={{ [isRight ? 'right' : 'left']: 0 }}
      ref={ref}
      variants={animate ? borderVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate && inView ? "visible" : undefined}
    >
      <div className="h-full w-full relative">
        <Image
          src={isRight ? RightBorder : LeftBorder}
          alt={isRight ? "Right decorative border" : "Left decorative border"}
          fill
          style={{ objectFit: 'fill' }}
          className="opacity-100" 
        />
      </div>
    </motion.div>
  );
};

const JaggedBorder: React.FC<SideBorderProps> = ({ animate = false, isRight = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const jaggedVariants: Variants = {
    hidden: {
      opacity: 0,
      x: isRight ? 20 : -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };
  
  // Choose between ArrowLB and ArrowRB based on isRight
  const arrowSvg = isRight ? ArrowRB : ArrowLB;

  return (
    <motion.div
      className="absolute top-0 bottom-0 w-12 md:w-24"
      style={{ [isRight ? 'right' : 'left']: 0 }}
      ref={ref}
      variants={animate ? jaggedVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate && inView ? "visible" : undefined}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="h-full w-full relative"
        animate={inView && animate ? {
          scale: [1, 1.05, 1],
          x: [0, 3, 0],
          transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop" 
          }
        } : undefined}
      >
        <Image
          src={arrowSvg}
          alt={isRight ? "Right jagged border" : "Left jagged border"}
          fill
          style={{ objectFit: 'fill' }}
          className="opacity-100"
        />
      </motion.div>
    </motion.div>
  );
};

const WavyDivider: React.FC<DecorativeBorderProps> = ({ animate = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.2,
          delay: i * 0.4,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.3,
          delay: i * 0.4
        }
      }
    })
  };

  return (
    <div className="my-4 md:my-8" ref={ref}>
      <svg viewBox="0 0 100 20" className="w-full">
        <motion.path
          d="M0,10 Q25,0 50,10 T100,10"
          fill="none"
          stroke="#8B1A1A"
          strokeWidth="2"
          strokeLinecap="round"
          custom={0}
          variants={animate && inView ? pathVariants : undefined}
          initial={animate ? "hidden" : undefined}
          animate={animate && inView ? "visible" : undefined}
        />
        <motion.path
          d="M0,15 Q25,5 50,15 T100,15"
          fill="none"
          stroke="#8B1A1A"
          strokeWidth="2"
          strokeLinecap="round"
          custom={1}
          variants={animate && inView ? pathVariants : undefined}
          initial={animate ? "hidden" : undefined}
          animate={animate && inView ? "visible" : undefined}
        />
      </svg>
    </div>
  );
};

// Use a proper class for particles
class ParticleClass implements Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `rgba(139, 26, 26, ${Math.random() * 0.3})`;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvasWidth || this.x < 0) {
      this.speedX = -this.speedX;
    }

    if (this.y > this.canvasHeight || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const MissionVisionCards: React.FC = () => {
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [whoWeAreRef, whoWeAreInView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants: Variants = {
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

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.2
      }
    }
  };

  // Background particle effect
  useEffect(() => {
    if (!containerInView) return;

    const canvas = document.getElementById('particlesCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) return;
    const ctx = maybeCtx; // Now ctx is guaranteed to be non-null

    const particles: Particle[] = [];

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function init(): void {
      for (let i = 0; i < 50; i++) {
        particles.push(new ParticleClass(canvas.width, canvas.height));
      }
    }

    function animate(): void {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw(ctx);
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerInView]);

  return (
    <motion.div
      className="relative flex flex-col md:flex-row w-full max-w-7xl gap-8 md:gap-16 p-4 md:p-12 bg-transparent from-gray-50 to-gray-100 rounded-2xl  my-12"
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={containerInView ? "visible" : "hidden"}
    >
      {/* Background canvas for particle effect */}
      <canvas id="particlesCanvas" className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />

      {/* Left Jagged Border */}
      <div className="absolute -left-6 md:-left-12 top-0 bottom-0">
        <JaggedBorder animate={containerInView} />
      </div>

      {/* Right Jagged Border */}
      <div className="absolute -right-6 md:-right-12 top-0 bottom-0">
        <JaggedBorder animate={containerInView} isRight={true} />
      </div>

      {/* Who We Are Section */}
      <motion.div
        className="relative flex-1 p-6 md:p-12 bg-white bg-opacity-90 rounded-lg shadow-md z-10"
        variants={cardVariants}
        ref={whoWeAreRef}
      >
        {/* Top Left Corner - Only for Who We Are section */}
        <div
          className="absolute -top-12  -right-[12rem] -translate-x-full w-24 h-24 md:w-[18rem] md:[18rem]"
        >
          <Image 
            src={LeftTop} 
            alt="Top left corner decoration" 
            fill 
            style={{ objectFit: 'contain' }}
          />
        </div>
        
        {/* Bottom Left Corner - Only for Who We Are section */}
        <div
          className="absolute bottom-0 -right-[12rem] -translate-x-full w-24 h-24 md:w-[18rem] md:[18rem]"
        >
          <Image 
            src={LeftBottom} 
            alt="Bottom left corner decoration" 
            fill 
            style={{ objectFit: 'contain' }}
          />
        </div>

        <motion.h2
          className="mb-3 md:mb-6 text-2xl md:text-4xl font-black text-gray-900 relative"
          variants={titleVariants}
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={whoWeAreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Who
          </motion.span>{' '}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={whoWeAreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            We
          </motion.span>{' '}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={whoWeAreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Are
          </motion.span>
          <motion.span
            className="inline-block text-5xl text-red-800"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={whoWeAreInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            ?
          </motion.span>
          <motion.div
            className="absolute -bottom-2 left-0 h-1 bg-red-800 rounded-full"
            initial={{ width: 0 }}
            animate={whoWeAreInView ? { width: '50%' } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.h2>

        <motion.p
          className="text-sm md:text-base leading-relaxed text-gray-700"
          variants={textVariants}
        >
          When we thought of getting in this sector, we asked ourselves, who exactly is it we are going
          to help or solve problems for as we will be connecting 2 parties together. we knew that we
          will be helping the students by saving their time and their resources and so on but, when
          we glanced into this unorganized Sector more thoroughly we realized we will be helping the
          Students but with that we won't be leaving the Hostel Owners. That moment we decided to
          find a broader approach to get the Hostel Owners more benefit if they are bringing their
          business online. We read our numbers again (with more focus at both the parties this time)
          and we realized the Strength and Potential of Hostel Owners and then we started seeing both
          the parties as Two sides of a same coin and decided to be more than just and fair with them.
        </motion.p>
      </motion.div>

      {/* Vertical Separator - Show as horizontal on mobile */}
      <motion.div
        className="relative w-full h-10 md:w-10 md:h-auto my-8 md:my-0 z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={containerInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="md:hidden">
          <DecorativeBorder animate={containerInView} />
        </div>
        <div className="hidden md:block h-full">
          <SideBorder animate={containerInView} />
        </div>
      </motion.div>

      {/* Mission & Vision Section */}
      <motion.div
        className="relative flex-1 p-6 md:p-12 bg-white bg-opacity-90 rounded-lg shadow-md z-10"
        variants={cardVariants}
      >
        {/* Top Right Corner - Only for Our Mission section */}
        <div
          className="absolute -top-8 -left-40 translate-x-full w-24 h-24 md:w-[15rem] md:[15rem]"
        >
          <Image 
            src={RightTopPNG} 
            alt="Top right corner decoration" 
            fill 
            style={{ objectFit: 'contain' }}
          />
        </div>
        
        {/* Bottom Right Corner - Only for Our Vision section */}
        <div
          className="absolute -bottom-8 -left-40 translate-x-full w-24 h-24 md:w-[15rem] md:[15rem]"
        >
          <Image 
            src={RightBottom} 
            alt="Bottom right corner decoration" 
            fill 
            style={{ objectFit: 'contain' }}
          />
        </div>

        <motion.div
          className="mb-6 md:mb-12"
          ref={missionRef}
        >
          <motion.h2
            className="mb-3 md:mb-6 text-2xl md:text-4xl font-black text-gray-900 relative"
            variants={titleVariants}
          >
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={missionInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Our Mission
            </motion.div>
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-red-800 rounded-full"
              initial={{ width: 0 }}
              animate={missionInView ? { width: '70%' } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.h2>
          <motion.p
            className="text-sm md:text-base leading-relaxed text-gray-700"
            variants={textVariants}
          >
            Only by moving past those primitive hindrances can we move forward towards a Digital World,
            a Digital Era where we won't roam around the cities to find a good Hostel or pay high fees
            to the brokers just to show us around the same Hostels available online.
          </motion.p>
        </motion.div>

        {/* Animated wavy divider */}
        <WavyDivider animate={missionInView} />

        <motion.div
          ref={visionRef}
        >
          <motion.h2
            className="mb-3 md:mb-6 text-2xl md:text-4xl font-black text-gray-900 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={visionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={visionInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Our Vision
            </motion.div>
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-red-800 rounded-full"
              initial={{ width: 0 }}
              animate={visionInView ? { width: '60%' } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.h2>
          <motion.p
            className="text-sm md:text-base leading-relaxed text-gray-700"
            initial={{ opacity: 0 }}
            animate={visionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Bringing Hostels online may also boost up the sector as the people then setting up their
            Hostels will also get online Hostel selling opportunities making the task more easier for
            them. Not only will more Hostels help the students but the rookie owners can earn a good.
          </motion.p>
        </motion.div>

        {/* Decorative corner elements that appear on hover */}
        <motion.div
          className="absolute top-2 left-2 w-10 h-10 border-t-4 border-l-4 border-red-800"
          initial={{ scale: 0, opacity: 0 }}
          animate={missionInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        <motion.div
          className="absolute top-2 right-2 w-10 h-10 border-t-4 border-r-4 border-red-800"
          initial={{ scale: 0, opacity: 0 }}
          animate={missionInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-10 h-10 border-b-4 border-l-4 border-red-800"
          initial={{ scale: 0, opacity: 0 }}
          animate={missionInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.4 }}
        />
        <motion.div
          className="absolute bottom-2 right-2 w-10 h-10 border-b-4 border-r-4 border-red-800"
          initial={{ scale: 0, opacity: 0 }}
          animate={missionInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute bottom-6 left-1/4 w-12 h-12 rounded-full bg-red-800 opacity-30 hidden md:block"
        initial={{ y: 0 }}
        animate={containerInView ? {
          y: [-10, 10, -10],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        } : {}}
      />
      <motion.div
        className="absolute top-8 right-1/3 w-10 h-10 rounded-full bg-red-800 opacity-30 hidden md:block"
        initial={{ y: 0 }}
        animate={containerInView ? {
          y: [-15, 5, -15],
          transition: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }
        } : {}}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-14 h-14 rounded-full bg-red-800 opacity-20 hidden md:block"
        initial={{ y: 0 }}
        animate={containerInView ? {
          y: [5, -15, 5],
          transition: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }
        } : {}}
      />
    </motion.div>
  );
};

export default MissionVisionCards;