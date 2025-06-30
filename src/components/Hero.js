'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  
  // Gambar-gambar event dengan keterangan
  const heroEvents = [
    {
      image: '/images/event-collage-1.png',
      title: 'Corporate Events',
      description: 'Meeting, conference & seminar'
    },
    {
      image: '/images/event-collage-3.png',
      title: 'Wedding Ceremonies',
      description: 'Indoor & outdoor settings'
    },
    {
      image: '/images/event-collage-2.png',
      title: 'Celebrations',
      description: 'Birthday, anniversary & special moments'
    },
  ];

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Auto-rotate background images
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroEvents.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovering, heroEvents.length]);

  // Event stat items dengan animasi
  const statItems = [
    { number: "100+", label: "Events", delay: 0.3, color: "#1a7be6" },
    { number: "50+", label: "Locations", delay: 0.5, color: "#f35e0e" },
    { number: "98%", label: "Client Satisfaction", delay: 0.7, color: "#ce1010" }
  ];

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50"
      style={{ opacity, scale, y }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circles */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-orange-100/30 blur-3xl"></div>
        
        {/* Floating shapes */}
        <motion.div 
          className="absolute top-[20%] left-[10%] w-8 h-8 rounded-md bg-[#1a7be6]/20"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-[#f35e0e]/20"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[25%] right-[20%] w-12 h-12 rounded-md rotate-45 bg-[#ce1010]/10"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 15, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-2 px-5 rounded-full inline-flex items-center text-sm font-medium shadow-lg shadow-blue-200"
              >
                <motion.span 
                  animate={{ 
                    rotate: [0, 360],
                  }} 
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="mr-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path fill="white" d="M15.707 10.707a1 1 0 00-1.414-1.414L12 11.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3z"/>
                  </svg>
                </motion.span>
                Event Organizer Terpercaya
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
            >
              Wujudkan Event 
              <span className="relative">
                <span className="relative z-10 text-[#1a7be6]"> Impian </span>
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100 rounded-full -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
              <br />
              <span className="relative inline-block">
                Bersama <span className="text-[#f35e0e]">FWB+</span>
                <motion.svg
                  className="absolute -right-14 -top-2 w-12 h-12 text-[#f35e0e]/80"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: [0, 15, 0] }}
                  transition={{ 
                    delay: 1.2, 
                    duration: 0.8,
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3l1.74 5.39h5.64l-4.56 3.32 1.74 5.38L12 13.77l-4.56 3.32 1.74-5.38-4.56-3.32h5.64z"></path>
                </motion.svg>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-xl text-gray-600 max-w-lg mx-auto lg:mx-0"
            >
              Kami membantu Anda merancang dan mengelola berbagai acara spesial dengan 
              kreativitas, profesionalitas, dan hasil memuaskan.
            </motion.p>
            
            {/* Stats with animation */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {statItems.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  whileHover={{ y: -5 }}
                  className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.number}
                  </h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            {/* CTA buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden px-8 py-4 rounded-full bg-[#1a7be6] text-white font-medium text-lg shadow-lg shadow-blue-200 group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span>Konsultasi Gratis</span>
                    <motion.svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-blue-600 z-0"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.div>
              </Link>

              <Link href="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-white text-[#1a7be6] font-medium text-lg shadow-lg border border-blue-200 flex items-center justify-center group hover:bg-blue-50 transition-colors"
                >
                  <span>Portfolio Kami</span>
                  <motion.svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Event Image Carousel with rounded borders */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative h-[500px] md:h-[600px] max-w-[500px] mx-auto">
              {/* 3D stacked images with hover interaction */}
              <div 
                className="relative h-full w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <AnimatePresence>
                  {heroEvents.map((event, index) => (
                    <motion.div
                      key={event.image}
                      className={`absolute inset-0 ${index === currentImage ? 'z-20' : 'z-10'}`}
                      initial={{ 
                        opacity: 0,
                        rotateY: -20,
                        scale: 0.9,
                        x: 40,
                      }}
                      animate={{ 
                        opacity: index === currentImage ? 1 : 0.7,
                        rotateY: index === currentImage ? 0 : 10,
                        scale: index === currentImage ? 1 : 0.85,
                        x: index === currentImage ? 0 : (index === ((currentImage + 1) % heroEvents.length) ? 40 : -40),
                        zIndex: index === currentImage ? 20 : 10
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.7 }}
                    >
                      <div className="h-full w-full overflow-hidden rounded-3xl shadow-2xl shadow-blue-200/50 hover:shadow-blue-300/70 transition-shadow group">
                        <div className="relative h-full w-full overflow-hidden">
                          <Image 
                            src={event.image} 
                            alt={event.title} 
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            priority={index === 0}
                          />
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          
                          {/* Event info */}
                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ 
                                opacity: index === currentImage ? 1 : 0,
                                y: index === currentImage ? 0 : 20
                              }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                              <p className="text-white/80">{event.description}</p>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Navigation dots */}
              <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-3 mt-6">
                {heroEvents.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className="relative p-1 focus:outline-none"
                  >
                    <motion.span
                      animate={{ 
                        scale: idx === currentImage ? 1 : 0.7,
                        opacity: idx === currentImage ? 1 : 0.5
                      }}
                      className={`block w-3 h-3 rounded-full ${
                        idx === currentImage ? 'bg-[#1a7be6]' : 'bg-gray-300'
                      }`}
                    />
                    {idx === currentImage && (
                      <motion.span
                        layoutId="dotIndicator"
                        className="absolute inset-0 rounded-full border-2 border-[#1a7be6]"
                        transition={{ duration: 0.5, type: "spring" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div 
              className="hidden md:block absolute -top-6 -right-12 w-20 h-20 rounded-full border-4 border-orange-200/50 z-0"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="hidden md:block absolute -bottom-8 -left-8 w-24 h-24 rounded-xl border-4 border-blue-200/50 z-0 rotate-12"
              animate={{ 
                y: [0, 15, 0],
                rotate: [12, 20, 12]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-24" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-white"
          />
        </svg>
      </div>
    </motion.section>
  );
}