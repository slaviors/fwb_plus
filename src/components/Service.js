"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("corporate");

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
  const services = [
    {
      id: "corporate",
      title: "Corporate Events",
      shortDesc: "Solusi acara perusahaan yang profesional",
      icon: "briefcase",
      image: "/images/services/corporate-event.png",
      description:
        "FWB Plus siap membantu Anda menyelenggarakan berbagai acara perusahaan dengan pelayanan menyeluruh dan profesional. Kami menangani dari konsep hingga eksekusi, agar setiap momen berjalan lancar dan memberi kesan positif bagi perusahaan Anda.",
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
      id: "wedding",
      title: "Wedding & Engagement",
      shortDesc: "Wujudkan momen spesial yang tak terlupakan",
      icon: "heart",
      image: "/images/services/wedding-event.png",
      description:
        "Percayakan hari bahagia Anda kepada tim kami yang berpengalaman dalam mengatur pernikahan dengan konsep yang unik dan penuh makna. Mulai dari dekorasi, catering, hingga dokumentasi, semua kami siapkan dengan detail dan penuh cinta.",
      features: [
        "Indoor & Outdoor Wedding",
        "Traditional & Modern Ceremony",
        "Engagement Event",
        "Decoration & Entertainment",
        "Pre-Wedding & Documentation",
      ],
      color: "#f35e0e",
    },
    {
      id: "gathering",
      title: "Gathering & Celebration",
      shortDesc: "Rayakan kebersamaan dalam momen yang berkesan",
      icon: "party",
      image: "/images/services/gathering-event.png",
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
      image: "/images/services/concert-event.png",
      description:
        "FWB Plus berpengalaman dalam penyelenggaraan konser dan hiburan skala kecil hingga besar, baik indoor maupun outdoor. Kami siap menangani produksi panggung, manajemen artis, hingga sistem ticketing.",
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
      image: "/images/services/exhibition-event.png",
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
      image: "/images/services/event-support.png",
      description:
        "FWB Plus menyediakan berbagai kebutuhan teknis seperti penyewaan peralatan event dan penyediaan tenaga profesional. Mulai dari alat panggung, lighting, sound system, hingga kru lapangan dan usher.",
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
      `}</style>

      <section
        id="services"
        ref={sectionRef}
        className="relative min-h-screen py-12 md:py-24 bg-gradient-to-b from-orange-50/40 via-white to-orange-50/20 overflow-hidden"
      >
        {/* Enhanced decorative elements with orange theme */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-100/50 to-orange-200/30 rounded-full blur-3xl"></div>
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
              <span className="text-[#1a7be6]">Untuk Kebutuhan Anda</span>
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              custom={2}
              className="max-w-3xl mx-auto"
            >
              <p className="font-inter text-lg md:text-xl text-gray-600 leading-relaxed">
                FWB Plus menyediakan layanan{" "}
                <span className="font-semibold text-gray-700">
                  event organizer & exhibition{" "}
                </span>
                yang lengkap dan fleksibel mulai dari{" "}
                <span className="font-semibold text-[#1a7be6]">
                  corporate gathering
                </span>
                ,<span className="font-semibold text-[#1a7be6]"> pameran</span>,
                <span className="font-semibold text-[#1a7be6]"> konser</span>,
                hingga
                <span className="font-semibold text-[#1a7be6]">
                  {" "}
                  jasa sewa alat & tenaga kerja event
                </span>
                . Kami berkomitmen menghadirkan solusi acara yang inovatif,
                efisien, dan menguntungkan semua pihak.
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Service Navigation - Mobile First Design */}
          <motion.div
            className="mb-8 md:mb-16 relative z-20"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Mobile Navigation - Compact Card-Style */}
            <div className="md:hidden px-1">
              <div className="relative overflow-hidden rounded-3xl p-1 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg">
                <div className="grid grid-cols-2 gap-1.5 p-2">
                  {services.map((service, index) => (
                    <motion.button
                      key={service.id}
                      onClick={() => setActiveTab(service.id)}
                      variants={scaleIn}
                      custom={index + 3}
                      whileTap={{ scale: 0.95 }}
                      className={`relative group transition-all duration-300 ${
                        activeTab === service.id ? "scale-[1.02]" : ""
                      }`}
                    >
                      {/* Mobile tab container */}
                      <div
                        className={`relative flex flex-col items-center p-3 sm:p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                          activeTab === service.id
                            ? "bg-white/95 border-white/70 shadow-lg scale-105"
                            : "bg-white/60 border-white/30 hover:bg-white/80"
                        }`}
                      >
                        {/* Active indicator glow */}
                        {activeTab === service.id && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl opacity-15"
                            style={{ backgroundColor: service.color }}
                            layoutId="activeMobileGlow"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.4,
                            }}
                          />
                        )}

                        {/* Icon container with enhanced styling */}
                        <motion.div
                          className={`relative mb-2 p-2.5 rounded-xl transition-all duration-300 ${
                            activeTab === service.id
                              ? "shadow-md scale-110"
                              : "group-hover:scale-105"
                          }`}
                          style={{
                            backgroundColor:
                              activeTab === service.id
                                ? `${service.color}20`
                                : `${service.color}10`,
                            borderWidth: "1px",
                            borderColor:
                              activeTab === service.id
                                ? `${service.color}40`
                                : "transparent",
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {/* Icon glow effect for active state */}
                          {activeTab === service.id && (
                            <div
                              className="absolute inset-0 rounded-xl blur-md opacity-40"
                              style={{ backgroundColor: service.color }}
                            />
                          )}

                          <span
                            className="relative z-10"
                            style={{ color: service.color }}
                          >
                            {renderServiceIcon(
                              service.icon,
                              service.color,
                              "1.5rem"
                            )}
                          </span>
                        </motion.div>

                        {/* Service title - compact */}
                        <div className="text-center relative z-10">
                          <h4
                            className={`font-unbounded font-bold text-xs sm:text-sm leading-tight transition-colors duration-300 ${
                              activeTab === service.id
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {service.id === "corporate"
                              ? "Corporate"
                              : service.id === "wedding"
                              ? "Wedding"
                              : service.id === "gathering"
                              ? "Gathering"
                              : "Concert"}
                          </h4>
                          <p
                            className={`font-inter text-xs mt-1 line-clamp-2 transition-colors duration-300 ${
                              activeTab === service.id
                                ? "text-gray-600"
                                : "text-gray-500"
                            }`}
                          >
                            {service.id === "corporate"
                              ? "Business Events"
                              : service.id === "wedding"
                              ? "Dream Wedding"
                              : service.id === "gathering"
                              ? "Celebrations"
                              : "Entertainment"}
                          </p>
                        </div>

                        {/* Active indicator dots */}
                        {activeTab === service.id && <></>}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Service Cards - Mini Overview with Glassmorphism - Desktop Only */}
          <motion.div
            className="hidden md:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 md:mb-20 relative z-20"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                variants={scaleIn}
                custom={i + 6}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeTab === service.id ? "scale-105" : ""
                }`}
                onClick={() => setActiveTab(service.id)}
              >
                {/* Glassmorphism card container */}
                <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/30 via-white/20 to-transparent backdrop-blur-xl border border-white/40 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  {/* Dynamic color background for active state */}
                  {activeTab === service.id && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}30, transparent)`,
                      }}
                      layoutId="activeServiceCard"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {/* Inner glassmorphism layer */}
                  <div className="relative rounded-[22px] bg-white/60 backdrop-blur-md border border-white/70 p-6 overflow-hidden">
                    {/* Floating decorative elements */}
                    <motion.div
                      className="absolute -top-3 -right-3 w-12 h-12 rounded-full blur-lg opacity-50"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 8 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-2 -left-2 w-8 h-8 rounded-lg rotate-45 blur-md opacity-40"
                      style={{
                        background: `linear-gradient(45deg, ${service.color}30, transparent)`,
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [45, 90, 45],
                      }}
                      transition={{
                        duration: 6 + i * 0.5,
                        repeat: Infinity,
                      }}
                    />

                    {/* Enhanced icon container */}
                    <div className="relative mb-4">
                      <motion.div
                        className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl backdrop-blur-sm border transition-all duration-300"
                        style={{
                          backgroundColor: `${service.color}15`,
                          borderColor: `${service.color}30`,
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {/* Icon glow effect */}
                        <div
                          className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                          style={{ backgroundColor: service.color }}
                        />
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
                      </motion.div>
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-unbounded text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-800 transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="font-inter text-gray-600 mb-4 text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                        {service.shortDesc}
                      </p>

                      {/* Enhanced CTA with micro-interaction */}
                      <motion.button
                        className="font-inter text-sm md:text-base font-semibold group/btn flex items-center transition-all duration-200"
                        style={{ color: service.color }}
                        whileHover={{ x: 3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab(service.id);
                        }}
                      >
                        Selengkapnya
                        <motion.span
                          className="ml-2 transition-transform group-hover/btn:translate-x-1"
                          whileHover={{ scale: 1.2 }}
                        >
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </motion.span>
                      </motion.button>
                    </div>

                    {/* Corner accent decorations */}
                    <div
                      className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 rounded-tl-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ borderColor: service.color }}
                    />
                    <div
                      className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 rounded-br-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ borderColor: service.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Service Detail Panels - Mobile Optimized */}
          <div className="mb-8 md:mb-20 relative z-20 px-1 sm:px-0">
            <AnimatePresence mode="wait">
              {services.map(
                (service) =>
                  service.id === activeTab && (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center"
                    >
                      {/* Mobile Compact Service Card */}
                      <div className="lg:hidden relative order-1">
                        <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-xl">
                          <div className="relative rounded-[22px] bg-white/80 backdrop-blur-md border border-white/90 overflow-hidden">
                            {/* Mobile Service Header - Compact */}
                            <div className="relative p-4 border-b border-gray-100/50">
                              <div className="flex items-center">
                                <motion.div
                                  className="relative p-3 rounded-2xl mr-3 flex-shrink-0"
                                  style={{
                                    backgroundColor: `${service.color}15`,
                                    borderWidth: "1px",
                                    borderColor: `${service.color}30`,
                                  }}
                                  whileHover={{ scale: 1.05, rotate: 5 }}
                                >
                                  <div
                                    className="absolute inset-0 rounded-2xl blur-lg opacity-30"
                                    style={{ backgroundColor: service.color }}
                                  />
                                  <span
                                    className="relative z-10"
                                    style={{ color: service.color }}
                                  >
                                    {renderServiceIcon(
                                      service.icon,
                                      service.color,
                                      "1.5rem"
                                    )}
                                  </span>
                                </motion.div>

                                <div className="flex-1 min-w-0">
                                  <h3
                                    className="font-unbounded text-xl font-bold leading-tight"
                                    style={{ color: service.color }}
                                  >
                                    {service.title}
                                  </h3>
                                  <p className="font-inter text-sm text-gray-600 mt-1 line-clamp-2">
                                    {service.shortDesc}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Mobile Service Image - Compact */}
                            <div className="relative h-40 overflow-hidden">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes="(max-width: 768px) 100vw"
                                className="object-cover"
                              />
                              {/* Advanced progressive blur overlay */}
                              <div className="absolute left-0 bottom-0 right-0 w-full h-3/4 pointer-events-none">
                                <div
                                  className="absolute top-0 left-0 bottom-0 right-0"
                                  style={{
                                    backdropFilter: "blur(2px)",
                                    mask: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 80%)",
                                    WebkitMask:
                                      "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 80%)",
                                  }}
                                />
                                <div
                                  className="absolute top-0 left-0 right-0 bottom-0"
                                  style={{
                                    background: `linear-gradient(transparent 30%, ${service.color}15 70%, ${service.color}40)`,
                                  }}
                                />
                              </div>

                              {/* Service badge overlay */}
                              <div className="absolute bottom-3 left-3 right-3 z-10">
                                <span
                                  className="inline-block py-1.5 px-3 text-xs bg-white/95 font-inter font-semibold rounded-full backdrop-blur-sm shadow-md"
                                  style={{ color: service.color }}
                                >
                                  FWB Plus {service.title}
                                </span>
                              </div>
                            </div>

                            {/* Mobile Content - Ultra Compact */}
                            <div className="p-4 space-y-4">
                              {/* Compact description */}
                              <p className="font-inter text-gray-700 text-sm leading-relaxed line-clamp-3">
                                {service.description}
                              </p>

                              {/* Mobile features - Horizontal pill tags */}
                              <div>
                                <h4 className="font-unbounded text-sm font-bold text-gray-900 mb-3 flex items-center">
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
                                  Layanan Utama
                                </h4>

                                {/* Features as pills with 2 rows */}
                                <div className="flex flex-wrap gap-2">
                                  {service.features
                                    .slice(0, 4)
                                    .map((feature, i) => (
                                      <motion.div
                                        key={feature}
                                        className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                          delay: i * 0.1,
                                          duration: 0.3,
                                        }}
                                      >
                                        <div
                                          className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                                          style={{
                                            backgroundColor: service.color,
                                          }}
                                        />
                                        <span className="font-inter text-xs text-gray-700 font-medium">
                                          {feature}
                                        </span>
                                      </motion.div>
                                    ))}
                                  {service.features.length > 4 && (
                                    <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                                      <span className="font-inter text-xs text-gray-500 font-medium">
                                        +{service.features.length - 4} lainnya
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Mobile CTA - Enhanced */}
                              <Link href={`/services/${service.id}`}>
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="relative flex items-center justify-center px-6 py-3.5 rounded-2xl font-inter font-semibold text-white text-sm shadow-lg w-full group overflow-hidden"
                                  style={{ backgroundColor: service.color }}
                                >
                                  {/* Button glow effect */}
                                  <div
                                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                                    style={{ backgroundColor: service.color }}
                                  />

                                  <span className="relative z-10 mr-2">
                                    Pelajari Lebih Lanjut
                                  </span>
                                  <svg
                                    className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                  </svg>
                                </motion.div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
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
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Progressive blur overlay - Advanced technique */}
                            <div className="absolute left-0 bottom-0 right-0 w-full h-1/2 pointer-events-none">
                              {/* Multiple blur layers with precise masking */}
                              <div
                                className="absolute top-0 left-0 bottom-0 right-0"
                                style={{
                                  backdropFilter: "blur(4px)",
                                  mask: "linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%)",
                                  WebkitMask:
                                    "linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%)",
                                }}
                              />
                              <div
                                className="absolute top-0 left-0 bottom-0 right-0 z-10"
                                style={{
                                  backdropFilter: "blur(8px)",
                                  mask: "linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)",
                                  WebkitMask:
                                    "linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)",
                                }}
                              />
                              {/* Gradient overlay with service color */}
                              <div
                                className="absolute top-0 left-0 right-0 bottom-0"
                                style={{
                                  background: `linear-gradient(transparent 40%, ${service.color}20 70%, ${service.color}60)`,
                                }}
                              />
                            </div>

                            {/* Service info overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-50">
                              <motion.span
                                className="inline-block py-2 px-4 mb-3 text-xs md:text-sm bg-white/95 font-inter font-semibold rounded-full backdrop-blur-sm shadow-lg"
                                style={{ color: service.color }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                              >
                                FWB Plus Services
                              </motion.span>
                              <motion.h3
                                className="font-unbounded text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                              >
                                {service.title}
                              </motion.h3>
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
                          <Link href={`/services/${service.id}`}>
                            <motion.div
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
                                Pelajari Lebih Lanjut
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
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </motion.svg>
                            </motion.div>
                          </Link>
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
                  <Link href="wa.me/6281944074542">
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
