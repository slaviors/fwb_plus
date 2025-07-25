"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ServiceGalleryModal from "./ui/ServiceGalleryModal";

export default function Services() {
  const sectionRef = useRef(null);
  const detailsRef = useRef(null); // Add ref for details section
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("corporate");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselHovering, setIsCarouselHovering] = useState(false);

  // Mobile swipe states
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Gallery modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Services data array
  const services = [
    {
      id: "corporate",
      title: "Corporate Events",
      shortDesc: "Solusi acara perusahaan yang profesional",
      icon: "briefcase",
      images: [
        "/images/services/corporate-event.png",
        "/images/gallery/event1.png",
        "/images/gallery/event4.png",
        "/images/gallery/event2.png",
        "/images/gallery/event5.png",
        "/images/gallery/event6.png",
      ],
      description: (
        <>
          <Image
            src="/images/assets/logo/fwb-text.svg"
            alt="FWB Plus"
            width={40}
            height={12}
            className="inline-block mx-1 align-middle brightness-0 saturate-100"
            style={{
              filter:
                "invert(19%) sepia(10%) saturate(1029%) hue-rotate(184deg) brightness(97%) contrast(88%)",
            }}
          />{" "}
          siap membantu Anda menyelenggarakan berbagai acara perusahaan dengan
          pelayanan menyeluruh dan profesional. Kami menangani dari konsep
          hingga eksekusi, agar setiap momen berjalan lancar dan memberi kesan
          positif bagi perusahaan Anda.
        </>
      ),
      features: [
        "Corporate Gathering",
        "Meeting & Seminar",
        "Product Launching",
        "Team Building",
        "Awarding Night",
      ],
      color: "#1a7be6",
    },
    {
      id: "gathering",
      title: "Gathering & Celebration",
      shortDesc: "Rayakan kebersamaan dalam momen yang berkesan",
      icon: "party",
      images: [
        "/images/services/gathering-event.png",
        "/images/gallery/event3.png",
        "/images/gallery/event6.png",
        "/images/gallery/event1.png",
        "/images/gallery/event4.png",
        "/images/gallery/event5.png",
      ],
      description:
        "Kami melayani berbagai jenis acara informal maupun komunitas dengan pendekatan kreatif dan menyenangkan. Cocok untuk acara internal perusahaan, keluarga, hingga komunitas dengan tema yang disesuaikan.",
      features: [
        "Family & Community Gathering",
        "Birthday Celebration",
        "Reunion & Anniversary",
        "Themed Parties",
        "Casual Outdoor Events",
      ],
      color: "#ce1010",
    },
    {
      id: "concert",
      title: "Concert & Entertainment",
      shortDesc: "Kelola hiburan berskala besar dengan tepat",
      icon: "music",
      images: [
        "/images/services/concert-event.png",
        "/images/gallery/event1.png",
        "/images/gallery/event3.png",
        "/images/gallery/event2.png",
        "/images/gallery/event5.png",
        "/images/gallery/event4.png",
      ],
      description: (
        <>
          <Image
            src="/images/assets/logo/fwb-text.svg"
            alt="FWB Plus"
            width={40}
            height={12}
            className="inline-block mx-1 align-middle brightness-0 saturate-100"
            style={{
              filter:
                "invert(19%) sepia(10%) saturate(1029%) hue-rotate(184deg) brightness(97%) contrast(88%)",
            }}
          />{" "}
          berpengalaman dalam penyelenggaraan konser dan hiburan skala kecil
          hingga besar, baik indoor maupun outdoor. Kami siap menangani produksi
          panggung, manajemen artis, hingga sistem ticketing.
        </>
      ),
      features: [
        "Konser Musik Indoor & Outdoor",
        "Festival & Stage Management",
        "Talent & Artist Handling",
        "Booth Production",
        "Ticketing & Crowd Flow",
      ],
      color: "#8e44ad",
    },
    {
      id: "exhibition",
      title: "Exhibition & Booth Production",
      shortDesc: "Pameran dan produksi booth profesional",
      icon: "layout", // kamu bisa pakai ikon layout/display
      images: [
        "/images/services/exhibition-event.png",
        "/images/gallery/event2.png",
        "/images/gallery/event4.png",
        "/images/gallery/event1.png",
        "/images/gallery/event6.png",
        "/images/gallery/event3.png",
      ],
      description:
        "Kami menyediakan layanan pameran dan produksi booth yang menarik serta fungsional, baik untuk kebutuhan expo, brand activation, maupun pameran dagang. Semua dikerjakan oleh tim profesional dan kreatif.",
      features: [
        "Custom Booth Design",
        "Brand Activation",
        "Trade Expo",
        "Mini Showcase",
        "Logistik & Instalasi",
      ],
      color: "#2c3e50",
    },
    {
      id: "support",
      title: "Event Equipment & Manpower",
      shortDesc: "Sewa alat event & tenaga kerja profesional",
      icon: "settings", // atau "users" / "tools"
      images: [
        "/images/services/event-support.png",
        "/images/gallery/event5.png",
        "/images/gallery/event6.png",
        "/images/gallery/event2.png",
        "/images/gallery/event3.png",
        "/images/gallery/event1.png",
      ],
      description: (
        <>
          <Image
            src="/images/assets/logo/fwb-text.svg"
            alt="FWB Plus"
            width={40}
            height={12}
            className="inline-block mx-1 align-middle brightness-0 saturate-100"
            style={{
              filter:
                "invert(19%) sepia(10%) saturate(1029%) hue-rotate(184deg) brightness(97%) contrast(88%)",
            }}
          />{" "}
          menyediakan berbagai kebutuhan teknis seperti penyewaan peralatan
          event dan penyediaan tenaga profesional. Mulai dari alat panggung,
          lighting, sound system, hingga kru lapangan dan usher.
        </>
      ),
      features: [
        "Sewa Sound System & Lighting",
        "Stage & Rigging",
        "Operator & Crew Lapangan",
        "Usher & Talent Support",
        "Logistik & Maintenance",
      ],
      color: "#27ae60",
    },
  ];

  // Auto-rotate carousel images - only for active service card on mobile
  useEffect(() => {
    // Only auto-rotate for active card and when not hovering
    if (isCarouselHovering || !services.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 5000); // Increased to 5 seconds for better UX

    return () => clearInterval(interval);
  }, [isCarouselHovering, services.length]);

  // Reset carousel when changing tabs or mobile service
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeTab, currentServiceIndex]);

  // Update activeTab when currentServiceIndex changes
  useEffect(() => {
    const serviceIds = [
      "corporate",
      "gathering",
      "concert",
      "exhibition",
      "support",
    ];
    if (serviceIds[currentServiceIndex]) {
      setActiveTab(serviceIds[currentServiceIndex]);
    }
  }, [currentServiceIndex]);

  // Mobile swipe handlers
  const handleSwipe = (info) => {
    const threshold = 50;
    // Use dynamic services length
    const totalServices = services.length;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // Swipe right - previous service
        setCurrentServiceIndex((prev) =>
          prev === 0 ? totalServices - 1 : prev - 1
        );
      } else {
        // Swipe left - next service
        setCurrentServiceIndex((prev) => (prev + 1) % totalServices);
      }
    }
  };

  // Enhanced function to set active tab and scroll
  const handleServiceSelect = (serviceId) => {
    setActiveTab(serviceId);
  };

  // Add visual feedback for mobile navigation
  const handleMobileServiceSelect = (serviceId) => {
    setActiveTab(serviceId);
  };

  // Handle gallery modal
  const openGalleryModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeGalleryModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      {/* Custom styles for mobile optimization */}
      <style jsx>{`
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Mobile performance optimization */
        .mobile-card {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        .mobile-card * {
          transform: translateZ(0);
        }
      `}</style>

      <section
        id="services"
        ref={sectionRef}
        className="relative min-h-screen py-12 md:py-24 bg-gradient-to-b from-orange-50/40 via-white to-orange-50/20 overflow-hidden"
      >
        {/* Enhanced decorative elements with orange theme */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large background shapes */}
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/40 to-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-50/60 to-blue-50/40 rounded-full blur-2xl"></div>

          {/* Floating animated shapes */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden lg:block absolute top-20 right-20 w-16 h-16 border-2 border-orange-200/60 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              x: [0, -20, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden lg:block absolute bottom-32 left-16 w-20 h-20 border-2 border-blue-200/60 rounded-xl rotate-12"
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 15, 0],
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden md:block absolute top-1/3 left-10 w-12 h-12 bg-orange-100/40 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
              rotate: [0, -25, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden md:block absolute bottom-1/4 right-16 w-14 h-14 bg-blue-100/40 rounded-lg rotate-45"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced section header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-8 md:mb-16"
          >
            <motion.div variants={fadeInUp} custom={0} className="inline-block">
              <span className="inline-flex items-center py-2 px-4 mb-6 text-sm font-inter font-medium bg-gradient-to-r from-orange-50 to-orange-100 text-[#f35e0e] rounded-full border border-orange-200/50 shadow-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Layanan Kami
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="font-unbounded text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight"
            >
              Solusi Event{" "}
              <span className="relative">
                <span className="text-[#f35e0e]">Profesional</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-[#f35e0e] rounded-full -z-10"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                />
              </span>
              <br className="hidden sm:block" />
              <span className="text-[#1a7be6]">&#160;Untuk Kebutuhan Anda</span>
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              custom={2}
              className="max-w-3xl mx-auto"
            >
              <p className="font-inter text-lg md:text-xl text-gray-600 leading-relaxed">
                <Image
                  src="/images/assets/logo/fwb-text.svg"
                  alt="FWB Plus"
                  width={40}
                  height={12}
                  className="inline-block mx-1 align-middle brightness-0 saturate-100"
                  style={{
                    filter:
                      "invert(19%) sepia(10%) saturate(1029%) hue-rotate(184deg) brightness(97%) contrast(88%)",
                  }}
                />{" "}
                menyediakan layanan{" "}
                <span className="text-xl md:text-2xl font-semibold text-gray-800">
                  Event Organizer & Exhibition{" "}
                </span>
                yang lengkap dan fleksibel mulai dari{" "}
                <span className="text-xl md:text-2xl font-semibold text-[#1a7be6]">
                  Corporate Gathering
                </span>
                ,{" "}
                <span className="text-xl md:text-2xl font-semibold text-[#1a7be6]">
                  Pameran
                </span>
                ,{" "}
                <span className="text-xl md:text-2xl font-semibold text-[#1a7be6]">
                  Konser
                </span>
                , hingga{" "}
                <span className="text-xl md:text-2xl font-semibold text-[#1a7be6]">
                  Rental Equipment & Tenaga Kerja Event
                </span>
                . Kami berkomitmen menghadirkan solusi acara yang inovatif,
                efisien, dan menguntungkan semua pihak.
              </p>
            </motion.div>
          </motion.div>

          {/* Mobile Swipeable Service Cards */}
          <motion.div
            className="mb-8 md:mb-16 relative z-20"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Mobile Stacked Cards */}
            <div className="md:hidden px-4 relative h-[625px]">
              <div className="relative w-full h-full">
                {services.map((service, index) => {
                  const isActive = index === currentServiceIndex;
                  const isPrev =
                    index ===
                    (currentServiceIndex - 1 + services.length) %
                      services.length;
                  const isNext =
                    index === (currentServiceIndex + 1) % services.length;
                  const isVisible = isActive || isPrev || isNext;

                  if (!isVisible) return null;

                  // Simplified positioning with better performance
                  let zIndex = 10;
                  let scale = 0.9;
                  let opacity = 0.6;
                  let translateX = 0;
                  let translateY = 15;

                  if (isActive) {
                    zIndex = 30;
                    scale = 1;
                    opacity = 1;
                    translateX = 0;
                    translateY = 0;
                  } else if (isPrev) {
                    zIndex = 20;
                    scale = 0.95;
                    opacity = 0.7;
                    translateX = -30;
                    translateY = 8;
                  } else if (isNext) {
                    zIndex = 20;
                    scale = 0.95;
                    opacity = 0.7;
                    translateX = 30;
                    translateY = 8;
                  }

                  return (
                    <motion.div
                      key={service.id}
                      className="absolute inset-0 mobile-card"
                      style={{ zIndex }}
                      animate={{
                        scale,
                        opacity,
                        x: translateX,
                        y: translateY,
                      }}
                      transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.3,
                      }}
                      drag={isActive ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.1}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={(_, info) => {
                        setIsDragging(false);
                        if (isActive) {
                          handleSwipe(info);
                        }
                      }}
                      whileDrag={{ scale: isActive ? 1.02 : scale }}
                    >
                      <div
                        className="relative w-full h-full overflow-hidden rounded-3xl border shadow-lg"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${service.color}15, ${service.color}08, transparent)`
                            : "rgba(255, 255, 255, 0.9)",
                          borderColor: `${service.color}40`,
                        }}
                      >
                        <div className="relative rounded-3xl bg-white border border-white/70 h-full overflow-hidden flex flex-col">
                          {/* Service Header */}
                          <div className="relative p-4 border-b border-gray-100/50">
                            <div className="flex items-center mb-3">
                              <div
                                className="relative p-3 rounded-2xl mr-4 flex-shrink-0"
                                style={{
                                  backgroundColor: `${service.color}15`,
                                  borderWidth: "1px",
                                  borderColor: `${service.color}30`,
                                }}
                              >
                                <span
                                  className="relative z-10"
                                  style={{ color: service.color }}
                                >
                                  {renderServiceIcon(
                                    service.icon,
                                    service.color,
                                    "1.75rem"
                                  )}
                                </span>
                              </div>

                              <div className="flex-1 min-w-0">
                                <h3
                                  className="font-unbounded text-xl font-bold leading-tight mb-1"
                                  style={{ color: service.color }}
                                >
                                  {service.title}
                                </h3>
                                <p className="font-inter text-sm text-gray-600 line-clamp-2">
                                  {service.shortDesc}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Service Static Image */}
                          <div className="relative h-36 overflow-hidden flex-shrink-0">
                            <div className="relative h-full w-full">
                              <Image
                                src={service.images[0]}
                                alt={`${service.title} - Service Image`}
                                fill
                                sizes="(max-width: 768px) 100vw"
                                className="object-cover"
                                priority={index === 0}
                              />
                            </div>

                            {/* Service badge */}
                            <div className="absolute bottom-3 left-3 right-3 z-10 hidden md:block">
                              <span
                                className="inline-block py-1.5 px-3 text-xs bg-white/90 font-inter font-semibold rounded-full backdrop-blur-sm shadow-md"
                                style={{ color: service.color }}
                              >
                                <Image
                                  src="/images/assets/logo/fwb-text.svg"
                                  alt="FWB Plus"
                                  width={40}
                                  height={12}
                                  className="inline-block mx-1 align-middle brightness-0 saturate-100"
                                  style={{
                                    filter: `invert(${
                                      service.color === "#1a7be6"
                                        ? "23"
                                        : service.color === "#f35e0e"
                                        ? "48"
                                        : "19"
                                    }%) sepia(${
                                      service.color === "#1a7be6"
                                        ? "100"
                                        : service.color === "#f35e0e"
                                        ? "100"
                                        : "10"
                                    }%) saturate(${
                                      service.color === "#1a7be6"
                                        ? "2500"
                                        : service.color === "#f35e0e"
                                        ? "1500"
                                        : "1029"
                                    }%) hue-rotate(${
                                      service.color === "#1a7be6"
                                        ? "200deg"
                                        : service.color === "#f35e0e"
                                        ? "14deg"
                                        : "184deg"
                                    }) brightness(${
                                      service.color === "#1a7be6"
                                        ? "100"
                                        : service.color === "#f35e0e"
                                        ? "100"
                                        : "97"
                                    }%) contrast(${
                                      service.color === "#1a7be6"
                                        ? "90"
                                        : service.color === "#f35e0e"
                                        ? "90"
                                        : "88"
                                    }%)`,
                                  }}
                                />
                                {service.title}
                              </span>
                            </div>
                          </div>

                          {/* Service Content */}
                          <div className="p-4 space-y-3 flex-1 flex flex-col">
                            {/* Description */}
                            <p className="font-inter text-gray-700 text-sm leading-relaxed line-clamp-2">
                              {service.description}
                            </p>

                            {/* Features Section */}
                            <div className="flex-1">
                              <h4 className="font-unbounded text-sm font-bold text-gray-900 mb-2 flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2"
                                  style={{ color: service.color }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Layanan Tersedia
                              </h4>

                              {/* Features grid */}
                              <div className="grid grid-cols-2 gap-1">
                                {service.features
                                  .slice(0, 4)
                                  .map((feature, i) => (
                                    <div
                                      key={feature}
                                      className="flex items-center p-1.5 rounded-lg"
                                    >
                                      <div
                                        className="p-1 mr-2 rounded-lg flex-shrink-0"
                                        style={{
                                          backgroundColor: `${service.color}15`,
                                        }}
                                      >
                                        <svg
                                          className="w-2.5 h-2.5"
                                          style={{ color: service.color }}
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                      <span className="font-inter text-xs text-gray-700">
                                        {feature}
                                      </span>
                                    </div>
                                  ))}
                              </div>

                              {service.features.length > 4 && (
                                <div className="mt-2 text-center">
                                  <span className="font-inter text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    +{service.features.length - 4} layanan
                                    lainnya
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Action Button */}
                            <div className="pt-2 mt-auto">
                              <button
                                onClick={() => openGalleryModal(service)}
                                className="relative flex items-center justify-center px-4 py-2.5 rounded-2xl font-inter font-semibold text-white text-sm shadow-lg w-full transition-all hover:shadow-xl"
                                style={{ backgroundColor: service.color }}
                              >
                                <span className="mr-2">
                                  Lihat Lebih Lanjut
                                </span>
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Swipe Navigation Indicators */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center items-center gap-4">
                {/* Dots indicator */}
                <div className="flex gap-2">
                  {services.map((service, idx) => (
                    <button
                      key={service.id}
                      onClick={() => setCurrentServiceIndex(idx)}
                      className="relative p-1 focus:outline-none"
                    >
                      <span
                        className={`block w-3 h-3 rounded-full transition-all duration-200 ${
                          idx === currentServiceIndex
                            ? "scale-110 opacity-100"
                            : "scale-75 opacity-50"
                        }`}
                        style={{
                          backgroundColor:
                            idx === currentServiceIndex
                              ? service.color
                              : "#d1d5db",
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Simplified swipe hint */}
                <div className="flex items-center text-gray-500 text-xs font-inter">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <span>Geser</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:flex flex-wrap justify-center gap-3 lg:gap-4 mb-16 md:mb-20 relative z-20"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                variants={scaleIn}
                custom={i + 6}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeTab === service.id ? "scale-105" : ""
                }`}
                onClick={() => handleServiceSelect(service.id)}
              >
                {/* Button-style card container */}
                <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-br from-white/30 via-white/20 to-transparent backdrop-blur-xl border border-white/40 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  {/* Dynamic color background for active state */}
                  {activeTab === service.id && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-30"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
                      }}
                      layoutId="activeServiceCard"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {/* Inner button layer */}
                  <div className="relative rounded-xl bg-white/70 backdrop-blur-md border border-white/80 px-4 py-3 overflow-hidden flex items-center gap-3 min-w-[200px]">
                    {/* Compact icon container */}
                    <motion.div
                      className="relative flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-sm border transition-all duration-300 flex-shrink-0"
                      style={{
                        backgroundColor: `${service.color}20`,
                        borderColor: `${service.color}40`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {/* Icon glow effect */}
                      <div
                        className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                        style={{ backgroundColor: service.color }}
                      />
                      <span
                        className="relative z-10"
                        style={{ color: service.color }}
                      >
                        {renderServiceIcon(
                          service.icon,
                          service.color,
                          "1.25rem"
                        )}
                      </span>
                    </motion.div>

                    {/* Service title only */}
                    <div className="relative z-10 flex-1">
                      <h3
                        className="font-unbounded text-sm lg:text-base font-bold leading-tight transition-colors duration-200"
                        style={{
                          color:
                            activeTab === service.id
                              ? service.color
                              : "#374151",
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Active indicator */}
                    {activeTab === service.id && (
                      <motion.div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: service.color }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Service Detail Panels - Mobile Optimized */}
          <div
            ref={detailsRef}
            className="mb-8 md:mb-20 relative z-20 px-1 sm:px-0"
          >
            <AnimatePresence mode="wait">
              {services &&
                services.map(
                  (service) =>
                    service &&
                    service.id === activeTab && (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center"
                      >
                        {/* Desktop Service Image - Hidden on Mobile */}
                        <div className="hidden lg:block relative order-2 lg:order-1">
                          <div className="relative h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-3xl overflow-hidden group">
                            {/* Glassmorphism image container */}
                            <div
                              className="relative h-full w-full overflow-hidden rounded-3xl border border-white/30 shadow-2xl backdrop-blur-sm"
                              style={{
                                boxShadow: `0 25px 50px -12px ${service.color}20`,
                              }}
                            >
                              {/* 3D Stacked Image Carousel - Hero Style */}
                              <div
                                className="relative h-full w-full"
                                onMouseEnter={() => setIsCarouselHovering(true)}
                                onMouseLeave={() =>
                                  setIsCarouselHovering(false)
                                }
                              >
                                <AnimatePresence>
                                  {service.images.map((image, imgIndex) => (
                                    <motion.div
                                      key={`${service.id}-${imgIndex}`}
                                      className={`absolute inset-0 ${
                                        imgIndex === currentImageIndex
                                          ? "z-20"
                                          : "z-10"
                                      }`}
                                      initial={{
                                        opacity: 0,
                                        rotateY: -20,
                                        scale: 0.9,
                                        x: 40,
                                      }}
                                      animate={{
                                        opacity:
                                          imgIndex === currentImageIndex
                                            ? 1
                                            : 0.7,
                                        rotateY:
                                          imgIndex === currentImageIndex
                                            ? 0
                                            : 10,
                                        scale:
                                          imgIndex === currentImageIndex
                                            ? 1
                                            : 0.85,
                                        x:
                                          imgIndex === currentImageIndex
                                            ? 0
                                            : imgIndex ===
                                              (currentImageIndex + 1) %
                                                service.images.length
                                            ? 40
                                            : -40,
                                        zIndex:
                                          imgIndex === currentImageIndex
                                            ? 20
                                            : 10,
                                      }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      transition={{ duration: 1 }}
                                    >
                                      <div
                                        className="h-full w-full overflow-hidden rounded-3xl shadow-2xl transition-shadow group"
                                        style={{
                                          boxShadow: `0 25px 50px -12px ${service.color}30, 0 10px 15px -3px ${service.color}20`,
                                        }}
                                      >
                                        <div className="relative h-full w-full overflow-hidden">
                                          <Image
                                            src={image}
                                            alt={`${service.title} - Image ${
                                              imgIndex + 1
                                            }`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                            priority={imgIndex === 0}
                                          />

                                          {/* Progressive blur overlay - Advanced technique like Hero */}
                                          <div className="absolute left-0 bottom-0 right-0 w-full h-1/2 pointer-events-none">
                                            <div
                                              className="absolute top-0 left-0 bottom-0 right-0 z-10"
                                              style={{
                                                backdropFilter: "blur(4px)",
                                                mask: "linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)",
                                                WebkitMask:
                                                  "linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)",
                                              }}
                                            />
                                            {/* Gradient overlay for darkening */}
                                            <div
                                              className="absolute top-0 left-0 right-0 bottom-0"
                                              style={{
                                                background: `linear-gradient(transparent, ${service.color}60)`,
                                              }}
                                            />
                                          </div>

                                          {/* Service info overlay - Hero style */}
                                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                                            <motion.div
                                              initial={{ opacity: 0, y: 20 }}
                                              animate={{
                                                opacity:
                                                  imgIndex === currentImageIndex
                                                    ? 1
                                                    : 0,
                                                y:
                                                  imgIndex === currentImageIndex
                                                    ? 0
                                                    : 20,
                                              }}
                                              transition={{
                                                duration: 0.5,
                                                delay: 0.2,
                                              }}
                                            >
                                              <motion.span
                                                className="hidden md:inline-block py-1.5 px-3 mb-2 text-xs bg-white/95 font-inter font-semibold rounded-full backdrop-blur-sm shadow-lg"
                                                style={{ color: service.color }}
                                              >
                                                <Image
                                                  src="/images/assets/logo/fwb-text.svg"
                                                  alt="FWB Plus"
                                                  width={32}
                                                  height={10}
                                                  className="inline-block mx-1 align-middle brightness-0 saturate-100"
                                                  style={{
                                                    filter: `invert(${
                                                      service.color ===
                                                      "#1a7be6"
                                                        ? "23"
                                                        : service.color ===
                                                          "#f35e0e"
                                                        ? "48"
                                                        : "19"
                                                    }%) sepia(${
                                                      service.color ===
                                                      "#1a7be6"
                                                        ? "100"
                                                        : service.color ===
                                                          "#f35e0e"
                                                        ? "100"
                                                        : "10"
                                                    }%) saturate(${
                                                      service.color ===
                                                      "#1a7be6"
                                                        ? "2500"
                                                        : service.color ===
                                                          "#f35e0e"
                                                        ? "1500"
                                                        : "1029"
                                                    }%) hue-rotate(${
                                                      service.color ===
                                                      "#1a7be6"
                                                        ? "200deg"
                                                        : service.color ===
                                                          "#f35e0e"
                                                        ? "14deg"
                                                        : "184deg"
                                                    }) brightness(${
                                                      service.color ===
                                                      "#1a7be6"
                                                        ? "100"
                                                        : service.color ===
                                                          "#f35e0e"
                                                        ? "100"
                                                        : "97"
                                                    }%) contrast(${
                                                      service.color ===
                                                      "#1a7be6"
                                                        ? "90"
                                                        : service.color ===
                                                          "#f35e0e"
                                                        ? "90"
                                                        : "88"
                                                    }%)`,
                                                  }}
                                                />{" "}
                                                Services
                                              </motion.span>
                                              <h3 className="font-unbounded text-xl md:text-2xl font-bold mb-2">
                                                {service.title}
                                              </h3>
                                              <p className="text-white/80 font-inter text-sm">
                                                {service.shortDesc}
                                              </p>
                                            </motion.div>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </AnimatePresence>

                                {/* Navigation dots - Hero style */}
                                <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-3 mt-6">
                                  {service &&
                                    service.images &&
                                    Array.isArray(service.images) &&
                                    service.images.map((_, idx) => (
                                      <button
                                        key={`nav-dot-${idx}`}
                                        onClick={() =>
                                          setCurrentImageIndex(idx)
                                        }
                                        className="relative p-1 focus:outline-none"
                                      >
                                        <motion.span
                                          animate={{
                                            scale:
                                              idx === currentImageIndex
                                                ? 1
                                                : 0.7,
                                            opacity:
                                              idx === currentImageIndex
                                                ? 1
                                                : 0.5,
                                          }}
                                          className={`block w-3 h-3 rounded-full transition-colors duration-300`}
                                          style={{
                                            backgroundColor:
                                              idx === currentImageIndex
                                                ? service.color || "#1a7be6"
                                                : "#d1d5db",
                                          }}
                                        />
                                        {idx === currentImageIndex &&
                                          service.id && (
                                            <motion.span
                                              layoutId={`dotIndicator-${service.id}-${idx}`}
                                              className="absolute inset-0 rounded-full border-2"
                                              style={{
                                                borderColor:
                                                  service.color || "#1a7be6",
                                              }}
                                              transition={{
                                                duration: 0.5,
                                                type: "spring",
                                              }}
                                            />
                                          )}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Desktop Service Information - Hidden on Mobile */}
                        <motion.div
                          className="hidden lg:block space-y-6 order-1 lg:order-2"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          <div>
                            <motion.h3
                              className="font-unbounded text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight"
                              style={{ color: service.color }}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.6 }}
                            >
                              {service.title}
                            </motion.h3>

                            <motion.p
                              className="font-inter text-gray-700 text-lg md:text-xl leading-relaxed mb-6"
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5, duration: 0.6 }}
                            >
                              {service.description}
                            </motion.p>
                          </div>

                          {/* Enhanced Features Section */}
                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                          >
                            <h4 className="font-unbounded text-lg md:text-xl font-bold text-gray-900 flex items-center">
                              <svg
                                className="w-5 h-5 mr-3"
                                style={{ color: service.color }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Layanan Tersedia
                            </h4>

                            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                              {service.features.map((feature, i) => (
                                <motion.div
                                  key={feature}
                                  className="flex items-center group cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: 0.8 + i * 0.1,
                                    duration: 0.5,
                                  }}
                                  whileHover={{ x: 5, scale: 1.02 }}
                                >
                                  <motion.div
                                    className="p-1.5 mr-3 rounded-xl flex-shrink-0"
                                    style={{
                                      backgroundColor: `${service.color}15`,
                                    }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      style={{ color: service.color }}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </motion.div>
                                  <span className="font-inter text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                    {feature}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Enhanced CTA Button */}
                          <motion.div
                            className="pt-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                          >
                            <motion.button
                              onClick={() => openGalleryModal(service)}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-2xl font-inter font-semibold text-white group overflow-hidden shadow-lg"
                              style={{ backgroundColor: service.color }}
                            >
                              {/* Button glow effect */}
                              <motion.div
                                className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                                style={{ backgroundColor: service.color }}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.3 }}
                              />

                              <span className="relative z-10 mr-2">
                                Lihat Lebih Lanjut
                              </span>
                              <motion.svg
                                className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </motion.svg>
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )
                )}
            </AnimatePresence>
          </div>

          {/* Enhanced CTA Box with Glassmorphism - Blue Theme */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-r from-[#1a7be6]/90 via-[#1e40af]/90 to-[#1a7be6]/90 backdrop-blur-xl border border-white/20 shadow-2xl"
          >
            {/* Inner glassmorphism layer */}
            <div className="relative rounded-[22px] bg-gradient-to-r from-[#1a7be6] to-[#1e40af] p-6 sm:p-12 overflow-hidden">
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:max-w-xl text-center lg:text-left">
                  <motion.h3
                    className="font-unbounded text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    Siap Wujudkan Event{" "}
                    <span className="relative">
                      <span className="text-blue-200">Impian</span>
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-200/50 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                      />
                    </span>{" "}
                    Anda?
                  </motion.h3>
                  <motion.p
                    className="font-inter text-white/90 text-lg md:text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    Konsultasikan kebutuhan acara Anda secara{" "}
                    <span className="font-semibold text-blue-200">gratis</span>{" "}
                    dengan tim profesional kami dan dapatkan penawaran terbaik.
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                  }
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <Link href="https://wa.me/6281944074542">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-6 md:px-8 py-3 md:py-4 bg-white/95 backdrop-blur-sm text-[#1e40af] font-inter font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center group overflow-hidden border border-white/50"
                    >
                      {/* Button glow effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <svg
                        className="relative z-10 w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="relative z-10">Konsultasi Gratis</span>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Gallery Modal */}
      <ServiceGalleryModal
        isOpen={isModalOpen}
        onClose={closeGalleryModal}
        service={selectedService}
      />
    </>
  );
}

// Function to render service icons
function renderServiceIcon(icon, color, size = "1.25rem") {
  const iconStyle = { color, width: size, height: size };

  switch (icon) {
    case "briefcase":
      return (
        <svg
          style={iconStyle}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    case "heart":
      return (
        <svg
          style={iconStyle}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      );
    case "party":
      return (
        <svg
          style={iconStyle}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
          />
        </svg>
      );
    case "music":
      return (
        <svg
          style={iconStyle}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      );
    default:
      return (
        <svg
          style={iconStyle}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      );
  }
}
