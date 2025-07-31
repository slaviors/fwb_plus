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
      value: "+62 819 4407 4542",
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
      title: "Office Jogja",
      value:
        "Jl. Sidorejo No.5, Rejodadi, Nggobayan, Ngestiharjo, Kec. Kasihan, Bantul, D.I Yogyakarta 55182",
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
      title: "Office Semarang",
      value:
        "Jl. Sinar Waluyo Raya No.523, Kedungmundu, Kec. Tembalang, Kota Semarang, 50273",
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
      className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50"
    >
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
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

      <div className="relative container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center py-2 px-4 text-sm font-semibold backdrop-blur-md bg-[#1a7be6]/20 border border-white/50 text-gray-800 rounded-full shadow-lg">
              <motion.svg
                className="w-4 h-4 mr-2 text-[#1a7be6]"
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
            className="font-unbounded text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-[#1a7be6]">Kontak & Lokasi</span>
            <br />
            <motion.div
              className="inline-block relative"
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <Image
                src="/images/assets/logo/Logo FWB PNG Transparan.png"
                alt="FWB Plus Logo"
                width={160}
                height={64}
                className="w-auto h-6 ml-2 md:h-12 md:ml-0 lg:h-16 mt-2"
                priority
              />
            </motion.div>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
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
          className="flex justify-center mb-8 md:mb-10"
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
                  className="relative backdrop-blur-xl bg-white/40 border border-white/50 rounded-3xl p-2 sm:p-4 shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Inner Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 rounded-3xl"></div>

                  <div className="relative z-10">
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
                      className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-2 sm:p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 group"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Decorative Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10 flex items-start gap-6">
                        <motion.div
                          className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-[#1a7be6] text-white rounded-2xl flex items-center justify-center shadow-xl"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {info.icon}
                        </motion.div>
                        <div className="flex-1">
                          <motion.h4
                            className="font-bold text-lg text-gray-900 mb-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                          >
                            {info.title}
                          </motion.h4>
                          <motion.p
                            className="text-md font-semibold mb-1 text-[#f35e0e]"
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
              {/* Maps Section with 2 locations */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <motion.div
                  className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-4xl p-2 sm:p-4 shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#1a7be6] rounded-full opacity-60 blur-sm"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#f35e0e] rounded-full opacity-40 blur-sm"></div>

                  {/* Maps Grid */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Map - FWB PLUS ORGANIZER */}
                    <div className="relative">
                      <div className="relative w-full h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12460.059186581333!2d110.33166898700638!3d-7.801696648007992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57004cdf7643%3A0x508e2431933f9dd4!2sFWB%20PLUS%20ORGANIZER!5e1!3m2!1sid!2sid!4v1753543587083!5m2!1sid!2sid"
                          width="100%"
                          height="100%"
                          style={{
                            border: 0,
                            filter:
                              "grayscale(10%) contrast(1.1) saturate(1.2)",
                            borderRadius: "24px",
                            pointerEvents: "auto",
                          }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-3xl"
                          title="FWB Plus Organizer Location"
                          tabIndex="0"
                        />

                        {/* Location Label */}
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                          Jogja
                        </div>

                        {/* Click hint overlay */}
                        <div className="absolute inset-0 bg-transparent pointer-events-none z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                            Klik dan geser untuk menjelajahi peta
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Second Map - Additional Location */}
                    <div className="relative">
                      <div className="relative w-full h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4001.106783839721!2d110.47259102078309!3d-7.025941820657127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDEnMzQuMCJTIDExMMKwMjgnMjEuOCJF!5e1!3m2!1sid!2sid!4v1753543519115!5m2!1sid!2sid"
                          width="100%"
                          height="100%"
                          style={{
                            border: 0,
                            filter:
                              "grayscale(10%) contrast(1.1) saturate(1.2)",
                            borderRadius: "24px",
                            pointerEvents: "auto",
                          }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-3xl"
                          title="Lokasi Kedua"
                          tabIndex="0"
                        />

                        {/* Location Label */}
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                          Semarang
                        </div>

                        {/* Click hint overlay */}
                        <div className="absolute inset-0 bg-transparent pointer-events-none z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                            Klik dan geser untuk menjelajahi peta
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </div>

              {/* Location Info */}
              <div className="order-1 lg:order-2">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-2 sm:p-4 shadow-2xl">
                    <motion.h3
                      className="text-2xl font-bold mb-6 text-[#1a7be6]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Kantor Pusat
                    </motion.h3>

                    <div className="space-y-6">
                      {/* Office Jogja */}
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-[#1a7be6] text-white rounded-xl flex items-center justify-center mt-1">
                            <svg
                              className="w-8 h-8"
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
                        </div>

                        {/* Button Google Maps Jogja */}
                        <motion.button
                          className="w-full py-3 px-4 bg-[#1a7be6] hover:bg-[#1357a6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/30"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            window.open(
                              "https://maps.app.goo.gl/S7h6ybaWcDzQB4U98",
                              "_blank"
                            )
                          }
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <motion.svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.3 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </motion.svg>
                            <span className="text-sm">Buka Di Google Maps</span>
                          </span>
                        </motion.button>
                      </motion.div>

                      {/* Divider */}
                      <div className="border-t border-white/30"></div>

                      {/* Office Semarang */}
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-[#f35e0e] text-white rounded-xl flex items-center justify-center mt-1">
                            <svg
                              className="w-8 h-8"
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
                              Jl. Sinar Waluyo Raya No.523, Kedungmundu, Kec.
                              Tembalang, Kota Semarang, 50273
                            </p>
                          </div>
                        </div>

                        {/* Button Google Maps Semarang */}
                        <motion.button
                          className="w-full py-3 px-4 bg-[#f35e0e] hover:bg-[#f35e0eb3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/30"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            window.open(
                              "https://maps.app.goo.gl/3bqrM7r3u7hx2WECA",
                              "_blank"
                            )
                          }
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <motion.svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.3 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </motion.svg>
                            <span className="text-sm">Buka Di Google Maps</span>
                          </span>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
