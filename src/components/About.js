'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const achievements = [
    { number: "500+", label: "Events Sukses", color: "#1a7be6" },
    { number: "300+", label: "Klien Puas", color: "#f35e0e" },
    { number: "10+", label: "Tahun Pengalaman", color: "#ce1010" },
    { number: "50+", label: "Mitra Terpercaya", color: "#059669" }
  ];

  return (
    <section 
      className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden" 
      ref={sectionRef}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-100/40 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-50/60 to-orange-50/60 rounded-full blur-2xl"></div>
        
        {/* Floating animated shapes */}
        <motion.div
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="hidden lg:block absolute top-20 right-20 w-16 h-16 border-2 border-blue-200/60 rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, 25, 0], 
            x: [0, -20, 0],
            rotate: [0, -15, 0] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="hidden lg:block absolute bottom-32 left-16 w-20 h-20 border-2 border-orange-200/60 rounded-xl rotate-12"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0], 
            x: [0, 15, 0],
            rotate: [0, 20, 0] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="hidden md:block absolute top-1/3 left-10 w-12 h-12 bg-blue-100/40 rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0], 
            x: [0, -10, 0],
            rotate: [0, -25, 0] 
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="hidden md:block absolute bottom-1/4 right-16 w-14 h-14 bg-orange-100/40 rounded-lg rotate-45"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Enhanced section header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            custom={0}
            className="inline-block"
          >
            <span className="inline-flex items-center py-2 px-4 mb-6 text-sm font-inter font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-[#1a7be6] rounded-full border border-blue-200/50 shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tentang Kami
            </span>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            custom={1}
            className="font-unbounded text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight"
          >
            Event Organizer{' '}
            <span className="relative">
              <span className="text-[#1a7be6]">Terpercaya</span>
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100 rounded-full -z-10"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </span>
            <br className="hidden sm:block" />
            <span className="text-[#f35e0e]">Mewujudkan Event Impian</span>
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            custom={2}
            className="max-w-3xl mx-auto"
          >
            <p className="font-inter text-lg md:text-xl text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-700">FWB+</span> merupakan event organizer profesional yang berpengalaman dalam mengelola berbagai jenis acara,
              mulai dari corporate event, wedding, celebration, gathering, hingga product launching.
            </p>
          </motion.div>
        </motion.div>

        {/* Company Story Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 md:mb-20 relative z-20">
          <motion.div 
            className="relative order-2 lg:order-1 z-30"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[350px] md:h-[400px] lg:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-200/40 group z-40">
              <Image
                src="/images/about/company-story.png"
                alt="FWB+ Company Story"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Progressive blur overlay - keeping it lower for image clarity */}
              <div className="absolute left-0 bottom-0 right-0 w-full h-2/5 pointer-events-none">
                {/* Multiple blur layers with precise masking */}
                <div 
                  className="absolute top-0 left-0 bottom-0 right-0" 
                  style={{
                    backdropFilter: 'blur(1px)',
                    mask: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 0) 45%)',
                    WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 0) 45%)'
                  }}
                ></div>
                <div 
                  className="absolute top-0 left-0 bottom-0 right-0" 
                  style={{
                    backdropFilter: 'blur(2px)',
                    mask: 'linear-gradient(rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 55%)',
                    WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 55%)'
                  }}
                ></div>
                <div 
                  className="absolute top-0 left-0 bottom-0 right-0" 
                  style={{
                    backdropFilter: 'blur(4px)',
                    mask: 'linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 1) 55%, rgba(0, 0, 0, 0) 65%)',
                    WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 1) 55%, rgba(0, 0, 0, 0) 65%)'
                  }}
                ></div>
                <div 
                  className="absolute top-0 left-0 bottom-0 right-0" 
                  style={{
                    backdropFilter: 'blur(8px)',
                    mask: 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 1) 65%, rgba(0, 0, 0, 0) 75%)',
                    WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 1) 65%, rgba(0, 0, 0, 0) 75%)'
                  }}
                ></div>
                <div 
                  className="absolute top-0 left-0 bottom-0 right-0" 
                  style={{
                    backdropFilter: 'blur(16px)',
                    mask: 'linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 65%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 95%)',
                    WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 65%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 95%)'
                  }}
                ></div>
                <div 
                  className="absolute top-0 left-0 bottom-0 right-0" 
                  style={{
                    backdropFilter: 'blur(32px)',
                    mask: 'linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 85%)',
                    WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 85%)'
                  }}
                ></div>
                
                {/* Gradient overlay for darkening the text area */}
                <div 
                  className="absolute top-0 left-0 right-0 bottom-0"
                  style={{
                    background: 'linear-gradient(transparent 30%, rgba(30, 58, 138, 0.2) 60%, rgba(30, 58, 138, 0.6))'
                  }}
                ></div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-50">
                <motion.span 
                  className="inline-block py-2 px-4 mb-4 text-sm bg-white/95 text-[#1a7be6] font-inter font-semibold rounded-full backdrop-blur-sm shadow-lg z-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  Sejak 2015
                </motion.span>
                <motion.h3 
                  className="font-unbounded text-2xl lg:text-3xl font-bold text-white leading-tight z-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  Memulai Perjalanan<br />
                  <span>Yang Menginspirasi</span>
                </motion.h3>
              </div>
              
              {/* Enhanced floating badge */}
              <motion.div
                className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl py-3 px-5 shadow-xl flex items-center border border-white/20 z-50"
                animate={{ 
                  y: [0, -12, 0], 
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <span className="text-[#f35e0e] font-unbounded font-bold text-lg mr-2">10+</span>
                <span className="text-gray-700 font-inter text-sm font-medium">Tahun<br />Pengalaman</span>
              </motion.div>
            </div>
            
            {/* Enhanced decorative elements */}
            <motion.div 
              className="absolute -bottom-12 -left-12 h-24 w-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl z-10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="absolute -top-12 -right-12 h-32 w-32 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-2xl rotate-12 blur-xl z-10"
              animate={{ rotate: [12, 25, 12], scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-6 order-1 lg:order-2 relative z-30"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <motion.h3 
                className="font-unbounded text-2xl lg:text-3xl font-bold text-[#1a7be6] mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Kisah Perjalanan Kami
              </motion.h3>
              
              <motion.div 
                className="space-y-4 font-inter text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <p>
                  Berawal dari tim kecil yang memiliki <span className="font-semibold text-[#1a7be6]">passion di bidang event organizer</span>, kami terus berkomitmen untuk memberikan 
                  layanan terbaik dan pengalaman yang tak terlupakan bagi setiap klien. Dengan semangat kreativitas dan profesionalitas, <span className="font-semibold text-[#f35e0e]">FWB+</span> kini 
                  telah menjelma menjadi salah satu event organizer terpercaya dengan ratusan event sukses yang telah diselenggarakan.
                </p>
                
                <p>
                  Kami berupaya untuk selalu menghadirkan <span className="font-semibold text-[#1a7be6]">inovasi dan ide-ide segar</span> dalam setiap proyek, mengutamakan kepuasan klien, 
                  dan memastikan setiap detail acara terkelola dengan sempurna.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              className="pt-4 flex flex-wrap gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              {[
                { icon: "M5 13l4 4L19 7", label: "Profesional", color: "blue" },
                { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", label: "Kreatif", color: "orange" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Terpercaya", color: "red" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center group cursor-pointer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`mr-3 p-2 bg-${item.color === 'blue' ? 'blue' : item.color === 'orange' ? 'orange' : 'red'}-50 rounded-xl group-hover:bg-${item.color === 'blue' ? 'blue' : item.color === 'orange' ? 'orange' : 'red'}-100 transition-colors duration-300`}>
                    <svg className={`w-5 h-5 text-${item.color === 'blue' ? '[#1a7be6]' : item.color === 'orange' ? '[#f35e0e]' : '[#ce1010]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <span className="font-inter font-semibold text-gray-800">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link 
                  href="/about" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white font-inter font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 group bg-size-200 bg-pos-0 hover:bg-pos-100"
                >
                  Pelajari Lebih Lanjut
                  <svg 
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16 md:mb-20 relative z-20">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100/50 group relative z-30"
            initial={scaleIn.hidden} 
            animate={isInView ? scaleIn.visible(3) : scaleIn.hidden}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 inline-block rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-unbounded text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">Visi Kami</h3>
            <p className="font-inter text-gray-600 leading-relaxed">
              Menjadi event organizer terdepan yang dikenal akan kreativitas, inovasi, dan layanan profesional, mewujudkan 
              event-event yang berkesan dan memberikan pengalaman terbaik bagi setiap klien kami.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100/50 group relative z-30"
            initial={scaleIn.hidden} 
            animate={isInView ? scaleIn.visible(4) : scaleIn.hidden}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 inline-block rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-unbounded text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">Misi Kami</h3>
            <ul className="font-inter text-gray-600 space-y-3 leading-relaxed">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#f35e0e] mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Memberikan pelayanan event organizer profesional dan berkualitas</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#f35e0e] mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mengutamakan kepuasan dan kenyamanan klien dalam setiap event</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#f35e0e] mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Terus berinovasi dalam menciptakan konsep event yang kreatif dan unik</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#f35e0e] mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Membangun hubungan jangka panjang dengan klien dan mitra kerja</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div 
          className="mb-12 md:mb-16 relative z-20"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            variants={fadeInUp}
            custom={5}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-flex items-center py-2 px-4 mb-4 text-sm font-inter font-medium bg-gradient-to-r from-orange-50 to-orange-100 text-[#f35e0e] rounded-full border border-orange-200/50 shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pencapaian Kami
            </span>
            <h3 className="font-unbounded text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Dipercaya oleh{' '}
              <span className="text-[#f35e0e]">Ratusan Klien</span>
            </h3>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Dengan pengalaman lebih dari 10 tahun, kami bangga telah menjadi bagian dari momen-momen berharga klien kami
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={scaleIn}
                custom={6 + index}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 lg:p-6 shadow-xl border border-gray-100/50 group-hover:shadow-2xl transition-all duration-300 relative z-30">
                  <motion.div
                    className="text-3xl lg:text-4xl xl:text-5xl font-unbounded font-bold mb-3"
                    style={{ color: achievement.color }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      delay: 0.5 + index * 0.1, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 150
                    }}
                  >
                    {achievement.number}
                  </motion.div>
                  <motion.p
                    className="font-inter text-gray-700 font-medium text-sm lg:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  >
                    {achievement.label}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}