"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ContactLocation() {
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState({
    name: "",
    eventType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const eventTypes = [
    "Corporate Event",
    "Wedding",
    "Birthday Party",
    "Conference",
    "Product Launch",
    "Other",
  ];

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Telepon",
      value: "081944074542",
      description: "Hubungi kami untuk konsultasi gratis",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      value: "fwbplus.eo@gmail.com",
      description: "Email kami untuk inquiry detail",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Alamat",
      value:
        "Jl. Sidorejo No.5, Rejodadi, Nggobayan, Ngestiharjo, Kec. Kasihan, Bantul, D.I Yogyakarta 55182",
      description: "Kunjungi kantor kami untuk konsultasi langsung",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Jam Operasional",
      value: "Senin - Jumat: 08:00 - 17:00",
      description: "Sabtu & Minggu: Tutup (kecuali ada janji)",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Nomor WhatsApp dari data kontak yang sudah ada (hilangkan spasi)
    const whatsappNumber = "6281944074542".replace(/\s+/g, "");

    // Format pesan untuk WhatsApp
    const message =
      `Halo FWB Plus,\n\n` +
      `Nama: ${formData.name}\n` +
      `Jenis Event: ${formData.eventType || "Belum ditentukan"}\n\n` +
      `Pesan:\n${formData.message}\n\n` +
      `Terima kasih.`;

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp API URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Simulasi loading sebentar sebelum membuka WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, "_blank");

      // Reset form setelah berhasil
      setFormData({
        name: "",
        eventType: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50"
    >
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Blue Orb */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30 bg-[#1a7be6]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Large Orange Orb */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-25 bg-[#f35e0e]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Medium Blue Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 bg-blue-500"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="hidden lg:block absolute top-20 right-20 w-16 h-16 border-2 border-[#1a7be6]/30 rounded-2xl backdrop-blur-sm bg-blue-100/20 shadow-lg"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden md:block absolute bottom-32 right-32 w-12 h-12 rounded-full border-2 border-[#f35e0e]/40 backdrop-blur-sm bg-orange-100/30 shadow-lg"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="hidden xl:block absolute top-40 left-20 w-8 h-8 bg-[#1a7be6]/20 rounded-lg backdrop-blur-sm shadow-lg"
        />

        {/* Decorative SVG Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 left-32 opacity-20 hidden lg:block"
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="text-[#1a7be6]"
          >
            <path
              d="M50 10L60 40L90 40L68 58L78 88L50 70L22 88L32 58L10 40L40 40Z"
              fill="currentColor"
              opacity="0.6"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-40 right-40 opacity-15 hidden md:block"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="text-[#f35e0e]"
          >
            <polygon
              points="40,10 60,30 60,50 40,70 20,50 20,30"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              cx="40"
              cy="40"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="40" cy="40" r="10" fill="currentColor" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Enhanced Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(26,123,230,0.6) 1px, transparent 1px), radial-gradient(circle, rgba(243,94,14,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px, 40px 40px",
            backgroundPosition: "0 0, 30px 30px",
          }}
        />

        {/* Animated Lines */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10"
        >
          <svg width="128" height="128" viewBox="0 0 128 128">
            <path
              d="M64 16 L112 64 L64 112 L16 64 Z"
              fill="none"
              stroke="#1a7be6"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center py-3 px-6 text-sm font-semibold backdrop-blur-md bg-[#1a7be6]/20 border border-white/50 text-gray-800 rounded-full shadow-lg">
              <motion.svg
                className="w-5 h-5 mr-3 text-[#1a7be6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </motion.svg>
              Hubungi Kami
            </span>
          </motion.div>

          <motion.h2
            className="font-unbounded text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-[#1a7be6]">Kontak & Lokasi</span>
            <br />
            <motion.div
              className="inline-block relative"
              animate={{
                filter: [
                  "drop-shadow(0 0 10px rgba(243,94,14,0.4))",
                  "drop-shadow(0 0 20px rgba(243,94,14,0.6))",
                  "drop-shadow(0 0 15px rgba(243,94,14,0.5))",
                  "drop-shadow(0 0 10px rgba(243,94,14,0.4))",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <Image
                src="/images/assets/logo/Logo FWB PNG Transparan.png"
                alt="FWB Plus Logo"
                width={200}
                height={80}
                className="w-auto h-8 ml-2 md:h-16 md:ml-0 lg:h-20 mt-2"
                priority
              />
            </motion.div>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Siap mewujudkan event impian Anda? Hubungi kami sekarang untuk
            konsultasi dan dapatkan penawaran terbaik!
          </motion.p>
        </motion.div>

        {/* Advanced Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative">
            {/* Background Container */}
            <div className="relative flex backdrop-blur-2xl bg-white/20 border border-white/30 rounded-3xl p-1.5 shadow-2xl">
              {/* Animated Background Orbs */}
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 bg-[#1a7be6]/10 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-12 h-12 bg-[#f35e0e]/10 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Sliding Background Indicator */}
              <motion.div
                className="absolute inset-1.5 bg-gradient-to-r from-[#1a7be6]/90 via-[#1a7be6]/95 to-[#1a7be6] rounded-2xl shadow-xl"
                animate={{
                  x: activeTab === "contact" ? 0 : "100%",
                  width: activeTab === "contact" ? "48%" : "49%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />

              {/* Tab Buttons */}
              {[
                {
                  id: "contact",
                  label: "Kontak Form",
                  icon: "📝",
                  fullLabel: "Formulir Kontak",
                  description: "Hubungi kami langsung",
                },
                {
                  id: "location",
                  label: "Lokasi Kami",
                  icon: "📍",
                  fullLabel: "Lokasi & Peta",
                  description: "Temukan kantor kami",
                },
              ].map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-500 z-10 min-w-0 flex-1 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  whileHover={{
                    scale: 1.02,
                    y: -1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {/* Button Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow:
                        activeTab === tab.id
                          ? "0 0 20px rgba(26, 123, 230, 0.3)"
                          : "0 0 0px rgba(26, 123, 230, 0)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon with Advanced Animation */}
                  <motion.div
                    className="flex-shrink-0 relative"
                    animate={
                      activeTab === tab.id
                        ? {
                            scale: 1.2,
                            rotate: 10,
                          }
                        : {
                            scale: 1,
                            rotate: 0,
                          }
                    }
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.span
                      className="text-xl md:text-2xl filter drop-shadow-sm inline-block"
                      animate={
                        activeTab === tab.id
                          ? {
                              y: [0, -3, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {tab.icon}
                    </motion.span>

                    {/* Floating particles for active tab */}
                    {activeTab === tab.id && (
                      <>
                        <motion.div
                          className="absolute -top-2 -right-2 w-2 h-2 bg-white/60 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0,
                          }}
                        />
                        <motion.div
                          className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-white/40 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                          }}
                        />
                      </>
                    )}
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex flex-col items-start min-w-0">
                    <motion.span
                      className="text-sm md:text-base font-bold tracking-wide truncate"
                      animate={{
                        color: activeTab === tab.id ? "#ffffff" : "#374151",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {tab.label}
                    </motion.span>

                    {/* Animated description - only visible on larger screens */}
                    <motion.span
                      className="text-xs font-medium opacity-80 hidden md:block truncate"
                      animate={{
                        opacity: activeTab === tab.id ? 1 : 0.6,
                        y: activeTab === tab.id ? 0 : 2,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {tab.description}
                    </motion.span>
                  </div>

                  {/* Active Tab Indicator */}
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/60 rounded-full"
                    animate={{
                      opacity: activeTab === tab.id ? 1 : 0,
                      scale: activeTab === tab.id ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileTap={{
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              className="absolute -top-4 left-1/4 w-3 h-3 bg-[#1a7be6]/30 rounded-full blur-sm"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 right-1/4 w-2 h-2 bg-[#f35e0e]/40 rounded-full blur-sm"
              animate={{
                y: [0, 10, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 md:gap-12"
            >
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <motion.div
                  className="relative backdrop-blur-xl bg-white/40 border border-white/50 rounded-3xl p-8 md:p-10 shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Inner Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 rounded-3xl"></div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#1a7be6] rounded-full opacity-60 blur-sm"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#f35e0e] rounded-full opacity-40 blur-sm"></div>

                  <div className="relative z-10">
                    <motion.h3
                      className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <span className="text-[#1a7be6] font-unbounded">
                        Hubungi Kami
                      </span>
                    </motion.h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:ring-2 focus:ring-[#1a7be6] focus:border-transparent transition-all duration-300 backdrop-blur-sm bg-white/60 shadow-lg hover:shadow-xl"
                          placeholder="Masukkan nama lengkap"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Jenis Event
                        </label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:ring-2 focus:ring-[#1a7be6] focus:border-transparent transition-all duration-300 backdrop-blur-sm bg-white/60 shadow-lg hover:shadow-xl"
                        >
                          <option value="">Pilih jenis event</option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Pesan / Deskripsi Event
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:ring-2 focus:ring-[#1a7be6] focus:border-transparent transition-all duration-300 backdrop-blur-sm bg-white/60 shadow-lg hover:shadow-xl resize-none"
                          placeholder="Ceritakan detail event yang Anda inginkan..."
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 px-8 bg-[#f35e0e] hover:bg-[#e04a00] text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/30"
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-3">
                            <motion.svg
                              className="w-6 h-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </motion.svg>
                            <span className="text-lg">Mempersiapkan...</span>
                          </div>
                        ) : (
                          <span className="flex items-center justify-center gap-3">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            </svg>
                            <span className="text-lg">Kirim via WhatsApp</span>
                          </span>
                        )}
                      </motion.button>

                      {/* Success Message jika diperlukan */}
                    </form>
                  </div>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="order-1 lg:order-2">
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Decorative Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#1a7be6]/60 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#f35e0e]/40 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>

                      <div className="relative z-10 flex items-start gap-6">
                        <motion.div
                          className="flex-shrink-0 w-16 h-16 bg-[#1a7be6] text-white rounded-2xl flex items-center justify-center shadow-xl"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {info.icon}
                        </motion.div>
                        <div className="flex-1">
                          <motion.h4
                            className="font-bold text-xl text-gray-900 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                          >
                            {info.title}
                          </motion.h4>
                          <motion.p
                            className="text-lg font-semibold mb-2 text-[#f35e0e]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            {info.value}
                          </motion.p>
                          <motion.p
                            className="text-gray-700 text-sm leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                          >
                            {info.description}
                          </motion.p>
                        </div>
                      </div>

                      {/* Animated Border */}
                      <motion.div className="absolute inset-0 rounded-3xl border-2 border-[#1a7be6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "location" && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-8 md:gap-12"
            >
              {/* Map */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <motion.div
                  className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#1a7be6] rounded-full opacity-60 blur-sm"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#f35e0e] rounded-full opacity-40 blur-sm"></div>

                  <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                    {/* Enhanced Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 z-10"></div>

                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3994.065939912892!2d110.33350809999999!3d-7.8014688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57004cdf7643%3A0x508e2431933f9dd4!2sFWB%20PLUS%20ORGANIZER!5e1!3m2!1sid!2sid!4v1751902089114!5m2!1sid!2sid"
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        filter: "grayscale(10%) contrast(1.1) saturate(1.2)",
                        borderRadius: "24px",
                      }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-3xl"
                    />

                    {/* Enhanced Custom Pin */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="relative"
                        >
                          {/* Pin Shadow */}
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black/20 rounded-full blur-sm"></div>

                          {/* Main Pin */}
                          <div className="w-12 h-12 bg-[#1a7be6] rounded-full shadow-2xl flex items-center justify-center border-4 border-white/80 backdrop-blur-sm">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                            </svg>
                          </div>

                          {/* Pulsing Ring */}
                          <motion.div
                            animate={{
                              scale: [1, 2, 1],
                              opacity: [0.8, 0, 0.8],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 w-12 h-12 border-2 border-[#1a7be6] rounded-full"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Location Info */}
              <div className="order-1 lg:order-2">
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-8 shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#1a7be6]/60 rounded-full opacity-60"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#f35e0e]/40 rounded-full opacity-40"></div>

                    <motion.h3
                      className="text-2xl font-bold mb-6 text-[#1a7be6]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Kantor Pusat
                    </motion.h3>

                    <div className="space-y-6">
                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-[#1a7be6] text-white rounded-xl flex items-center justify-center mt-1">
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            Office Jogja:
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Jl. Sidorejo No.5, Rejodadi, Nggobayan, Ngestiharjo,
                            Kec. Kasihan, Bantul, <br /> D.I Yogyakarta 55182
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-[#1a7be6] text-white rounded-xl flex items-center justify-center mt-1">
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            Office Semarang:
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Jl. Sinar Waluyo Raya No.523, Kedungmandu, Kec.
                            Tembalang, Kota Semarang, 50273
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-[#f35e0e] text-white rounded-xl flex items-center justify-center">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            Jam Buka:
                          </p>
                          <p className="text-gray-700">
                            Senin - Jumat: 08:00 - 17:00
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <motion.button
                    className="w-full py-5 px-8 bg-[#1a7be6] hover:bg-[#1357a6] text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm border border-white/30"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      window.open(
                        "https://maps.app.goo.gl/S7h6ybaWcDzQB4U98",
                        "_blank"
                      )
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <motion.svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </motion.svg>
                      <span className="text-lg">Buka di Google Maps</span>
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
