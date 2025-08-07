"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Gambar-gambar event dengan keterangan
  const heroEvents = [
    {
      image: "/images/corporate-events.JPG",
      title: "Corporate Events",
      description: "Meeting, conference & seminar",
    },
    {
      image: "/images/entertainment.JPG",
      title: "Entertainment",
      description: "Concert, festival & live shows",
    },
    {
      image: "/images/exhibitions.JPG",
      title: "Exhibitions",
      description: "Trade shows, expos & fairs",
    },
    {
      image: "/images/gathering.JPG",
      title: "Gathering",
      description: "Family & community gatherings",
    },
    {
      image: "/images/event-equipment.JPG",
      title: "Event Equipment & Manpower",
    },
  ];

  // Auto-rotate background images
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroEvents.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovering, heroEvents.length]);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mt-11">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-unbounded text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900"
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
              <span className="relative inline-flex items-center gap-2">
                Bersama
                <Image
                  src="/images/assets/logo/Logo FWB PNG Transparan.png"
                  alt="FWB Plus Logo"
                  width={120}
                  height={40}
                  className="inline-block ml-3 w-16 h-auto md:w-20 lg:w-24 xl:w-28 object-contain"
                  priority
                />
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
                      repeatType: "reverse",
                    },
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
              className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0"
            >
              Kami hadir untuk membantu merancang dan mengeksekusi berbagai
              jenis event dengan{" "}
              <span className="text-xl md:text-2xl font-semibold text-[#1a7be6]">
                Integritas
              </span>
              ,{" "}
              <span className="text-xl md:text-2xl font-semibold text-[#1a7be6]">
                Kreativitas
              </span>
              , dan{" "}
              <span className="text-xl md:text-2xl font-semibold text-[#1a7be6]">
                Komitmen Profesional
              </span>{" "}
              demi hasil yang memberi manfaat nyata bagi semua pihak.
            </motion.p>

            {/* CTA buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <Link href="https://wa.me/6281944074542">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#1a7be6] text-white font-medium text-lg shadow-lg shadow-blue-200 group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span>Hubungi Kami</span>
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
            </motion.div>
          </motion.div>

          {/* Right Content - Event Image Carousel with rounded borders */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] max-w-[450px] mx-auto">
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
                      className={`absolute inset-0 ${
                        index === currentImage ? "z-20" : "z-10"
                      }`}
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
                        x:
                          index === currentImage
                            ? 0
                            : index === (currentImage + 1) % heroEvents.length
                            ? 40
                            : -40,
                        zIndex: index === currentImage ? 20 : 10,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 1 }}
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

                          {/* Progressive blur overlay - Advanced technique */}
                          <div className="absolute left-0 bottom-0 right-0 w-full h-1/2 pointer-events-none">
                            {/* Multiple blur layers with precise masking */}
                            <div
                              className="absolute top-0 left-0 bottom-0 right-0"
                              style={{
                                backdropFilter: "blur(8px)",
                                mask: "linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%)",
                                WebkitMask:
                                  "linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%)",
                              }}
                            ></div>
                            <div
                              className="absolute top-0 left-0 bottom-0 right-0 z-10"
                              style={{
                                backdropFilter: "blur(16px)",
                                mask: "linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)",
                                WebkitMask:
                                  "linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)",
                              }}
                            ></div>
                            {/* Gradient overlay for darkening */}
                            <div
                              className="absolute top-0 left-0 right-0 bottom-0"
                              style={{
                                background:
                                  "linear-gradient(transparent, rgba(0, 0, 0, 0.6))",
                              }}
                            ></div>
                          </div>

                          {/* Event info */}
                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: index === currentImage ? 1 : 0,
                                y: index === currentImage ? 0 : 20,
                              }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <h3 className="font-unbounded text-2xl font-bold mb-2">
                                {event.title}
                              </h3>
                              <p className="text-white/80">
                                {event.description}
                              </p>
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
                        opacity: idx === currentImage ? 1 : 0.5,
                      }}
                      className={`block w-3 h-3 rounded-full ${
                        idx === currentImage ? "bg-[#1a7be6]" : "bg-gray-300"
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
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="hidden md:block absolute -bottom-8 -left-8 w-24 h-24 rounded-xl border-4 border-blue-200/50 z-0 rotate-12"
              animate={{
                y: [0, 15, 0],
                rotate: [12, 20, 12],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
