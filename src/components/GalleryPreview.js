'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GalleryPreview() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  
  // Mobile stack navigation state
  const [currentStackIndex, setCurrentStackIndex] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);

  const galleryImages = [
    { 
      id: 1, 
      src: "/images/event-collage-1.png", 
      alt: "Corporate Event Excellence", 
      category: "Corporate",
      description: "Professional corporate meetings and conferences with cutting-edge facilities",
      date: "2024",
      location: "Jakarta Convention Center",
      attendees: "500+ participants"
    },
    { 
      id: 2, 
      src: "/images/event-collage-2.png", 
      alt: "Wedding Dreams Come True", 
      category: "Wedding",
      description: "Magical wedding celebrations and ceremonies in beautiful venues",
      date: "2024",
      location: "Bali Resort",
      attendees: "200+ guests"
    },
    { 
      id: 3, 
      src: "/images/event-collage-3.png", 
      alt: "Product Launch Success", 
      category: "Corporate",
      description: "Dynamic product launches and brand events with innovative presentations",
      date: "2024",
      location: "Surabaya Expo",
      attendees: "300+ attendees"
    },
    { 
      id: 4, 
      src: "/images/event-collage-1.png", 
      alt: "Family Gathering Joy", 
      category: "Gathering",
      description: "Warm family reunions and celebrations filled with love and happiness",
      date: "2024",
      location: "Private Villa",
      attendees: "100+ family members"
    },
    { 
      id: 5, 
      src: "/images/event-collage-2.png", 
      alt: "Annual Conference", 
      category: "Corporate",
      description: "Large-scale conferences and seminars with industry leaders",
      date: "2024",
      location: "Bandung International Center",
      attendees: "800+ professionals"
    },
    { 
      id: 6, 
      src: "/images/event-collage-3.png", 
      alt: "Birthday Celebration", 
      category: "Celebration",
      description: "Memorable birthday parties and milestone celebrations with unique themes",
      date: "2024",
      location: "Premium Event Hall",
      attendees: "150+ guests"
    },
  ];

  const categories = ['All', 'Corporate', 'Wedding', 'Gathering', 'Celebration'];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Mobile swipe handlers
  const handleSwipeLeft = () => {
    if (currentStackIndex < filteredImages.length - 1) {
      setCurrentStackIndex(prev => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentStackIndex > 0) {
      setCurrentStackIndex(prev => prev - 1);
    }
  };

  // Reset stack index when category changes
  useEffect(() => {
    setCurrentStackIndex(0);
  }, [selectedCategory]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isImagePopupOpen) {
        if (e.key === 'Escape') {
          setIsImagePopupOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImagePopupOpen]);

  const getCategoryIcon = (category) => {
    const icons = {
      Corporate: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      Wedding: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      Gathering: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      Celebration: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    };
    return icons[category] || null;
  };

  return (
    <section id="gallery" className="relative py-26 md:py-24 overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a7be6] via-[#1a7be6] to-[#0f4a94]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-600/20 to-[#f35e0e]/30"></div>
      
      {/* Enhanced decorative elements - Orange themed for visibility */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Orange grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="orangeGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(243,94,14,0.4)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#orangeGrid)" />
        </svg>

        {/* Orange animated connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0,200 Q400,150 800,200 T1600,200"
            stroke="rgba(243,94,14,0.6)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="12,8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: 'drop-shadow(0 0 4px rgba(251,146,60,0.5))'
            }}
          />
          <motion.path
            d="M0,400 Q300,350 600,400 T1200,400"
            stroke="rgba(251,146,60,0.5)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8,15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
            style={{
              filter: 'drop-shadow(0 0 3px rgba(245,158,11,0.4))'
            }}
          />
        </svg>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center py-2 px-4 text-sm font-semibold bg-white/20 text-white rounded-full border border-white/30 backdrop-blur-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Portfolio Kami
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="font-unbounded text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Dokumentasi Event
            <span className="font-unbounded block text-[#ffb58e] mt-2">Terbaik Kami</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Kumpulan dokumentasi dari berbagai event yang telah berhasil kami tangani dengan sempurna
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm border ${
                selectedCategory === category
                  ? 'bg-[#f35e0e] text-white border-[#f35e0e] shadow-lg'
                  : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category !== 'All' && getCategoryIcon(category)}
              <span className="text-sm md:text-base">{category === 'All' ? 'Semua' : category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Desktop Gallery Grid */}
        <div className="hidden sm:block">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500"
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      fill 
                      sizes="(max-width: 1024px) 50vw, 33vw" 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Progressive Blur Effect - Only on hover */}
                    <div className="absolute left-0 bottom-0 right-0 w-full h-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div 
                        className="absolute top-0 left-0 bottom-0 right-0 z-10" 
                        style={{
                          backdropFilter: 'blur(4px)',
                          mask: 'linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)',
                          WebkitMask: 'linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)'
                        }}
                      ></div>
                    </div>

                    {/* Gradient Overlay - Enhanced for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Additional text readability overlay - Only appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    
                    {/* Category Badge */}
                    <motion.div 
                      className="absolute top-4 left-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-[#f35e0e]/90 text-white rounded-full backdrop-blur-sm shadow-lg">
                        {getCategoryIcon(image.category)}
                        {image.category}
                      </span>
                    </motion.div>

                    {/* Content Overlay */}
                    <motion.div 
                      className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 z-20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredImage === image.id ? 1 : 0,
                        y: hoveredImage === image.id ? 0 : 20 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white font-bold text-lg md:text-xl mb-2">{image.alt}</h3>
                      <p className="text-white/80 text-sm md:text-base mb-3 leading-relaxed">{image.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">{image.date}</span>
                        <motion.button
                          className="flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedImage(image);
                            setIsImagePopupOpen(true);
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Lihat
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Stack View */}
        <div className="sm:hidden mb-12">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              className="relative h-[70vh] max-h-[500px] mx-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stack Container */}
              <div className="relative w-full h-full perspective-1000">
                {filteredImages.map((image, index) => {
                  const isActive = index === currentStackIndex;
                  const isPrev = index < currentStackIndex;
                  const isNext = index > currentStackIndex;
                  const stackOffset = index - currentStackIndex;
                  
                  return (
                    <motion.div
                      key={image.id}
                      className="absolute inset-0 w-full h-full"
                      initial={{ 
                        scale: 0.9,
                        rotateY: -20,
                        x: 100,
                        opacity: 0
                      }}
                      animate={{
                        scale: isActive ? 1 : isPrev ? 0.95 : 0.9,
                        rotateY: isActive ? 0 : isPrev ? -15 : 15,
                        x: isActive ? 0 : isPrev ? -30 : 30,
                        y: isActive ? 0 : Math.abs(stackOffset) * 10,
                        opacity: isActive ? 1 : isPrev ? 0.7 : isNext ? 0.5 : 0,
                        zIndex: isActive ? 20 : isPrev ? 10 - Math.abs(stackOffset) : 10 - Math.abs(stackOffset),
                      }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        duration: 0.6
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragStart={() => setIsSwipeActive(true)}
                      onDragEnd={(event, info) => {
                        setIsSwipeActive(false);
                        const swipeThreshold = 50;
                        
                        if (info.offset.x > swipeThreshold) {
                          handleSwipeRight();
                        } else if (info.offset.x < -swipeThreshold) {
                          handleSwipeLeft();
                        }
                      }}
                      whileDrag={{ 
                        scale: 1.05,
                        rotateZ: info => info.offset.x / 10,
                        cursor: "grabbing"
                      }}
                      onTap={() => {
                        if (isActive && !isSwipeActive) {
                          setSelectedImage(image);
                          setIsImagePopupOpen(true);
                        } else if (!isActive) {
                          setCurrentStackIndex(index);
                        }
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        filter: isActive ? "none" : "brightness(0.8)",
                      }}
                    >
                      {/* Card Container */}
                      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
                        {/* Image */}
                        <div className="relative w-full h-full">
                          <Image 
                            src={image.src} 
                            alt={image.alt} 
                            fill 
                            sizes="100vw"
                            className="object-cover"
                            priority={isActive}
                          />
                          
                          {/* Dynamic Gradient Overlay */}
                          <div 
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                            style={{
                              opacity: isActive ? 1 : 0.7
                            }}
                          />
                          
                          {/* Active Card Content */}
                          {isActive && (
                            <motion.div 
                              className="absolute inset-0 flex flex-col justify-between p-6 text-white z-20"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              {/* Top Section - Category Badge */}
                              <div className="flex justify-between items-start">
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                  animate={{ opacity: 1, scale: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                  <span className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#f35e0e]/95 text-white rounded-full backdrop-blur-sm shadow-lg border border-orange-300/30">
                                    {getCategoryIcon(image.category)}
                                    {image.category}
                                  </span>
                                </motion.div>
                                
                                {/* Stack Indicator */}
                                <motion.div 
                                  className="flex items-center gap-1 px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                  <span className="text-white/80 text-xs font-medium">
                                    {currentStackIndex + 1}/{filteredImages.length}
                                  </span>
                                </motion.div>
                              </div>
                              
                              {/* Bottom Section - Content */}
                              <div className="space-y-4">
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                  <h3 className="text-2xl font-bold mb-2 leading-tight">{image.alt}</h3>
                                  <p className="text-white/90 text-base leading-relaxed mb-4">{image.description}</p>
                                </motion.div>
                                
                                {/* Info Cards */}
                                <motion.div 
                                  className="grid grid-cols-2 gap-3"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                  <div className="hidden sm:flex items-center gap-2 p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/20">
                                    <svg className="w-4 h-4 text-[#f35e0e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                      <p className="text-white/60 text-xs">Lokasi</p>
                                      <p className="text-white text-sm font-semibold">{image.location}</p>
                                    </div>
                                  </div>
                                  <div className="hidden sm:flex items-center gap-2 p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/20">
                                    <svg className="w-4 h-4 text-[#f35e0e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                    <div>
                                      <p className="text-white/60 text-xs">Peserta</p>
                                      <p className="text-white text-sm font-semibold">{image.attendees}</p>
                                    </div>
                                  </div>
                                </motion.div>
                                
                                {/* Action Button */}
                                <motion.button
                                  className="w-full py-3 px-6 bg-gradient-to-r from-[#f35e0e] to-[#ea580c] text-white font-bold rounded-xl shadow-lg border border-orange-400/30 flex items-center justify-center gap-2"
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  Tap untuk Detail
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Non-Active Card Minimal Content */}
                          {!isActive && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <h4 className="font-bold text-lg mb-1">{image.alt}</h4>
                              <p className="text-white/70 text-sm">{image.category}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Navigation Dots */}
              <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-2">
                {filteredImages.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStackIndex 
                        ? 'bg-[#f35e0e] w-6' 
                        : 'bg-white/40'
                    }`}
                    onClick={() => setCurrentStackIndex(index)}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>
              
              {/* Swipe Hint */}
              <motion.div 
                className="absolute -bottom-11 left-0 right-0 flex justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: filteredImages.length > 1 ? 1 : 0 }}
              >
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Swipe untuk navigasi</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {isImagePopupOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImagePopupOpen(false)}
            />
            
            {/* Modal Content - Improved Desktop Layout */}
            <motion.div
              className="relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl w-full max-h-[95vh] overflow-hidden mx-4"
              style={{
                maxWidth: 'min(95vw, 1400px)', // Responsive max width
                width: '100%'
              }}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition-colors border border-white/20"
                onClick={() => setIsImagePopupOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Desktop Layout: Side by Side */}
              <div className="hidden lg:flex h-full">
                {/* Left Side - Image */}
                <div className="flex-1 relative min-h-[70vh] max-h-[70vh]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes="(max-width: 1200px) 60vw, 50vw"
                    className="object-cover rounded-l-3xl"
                    priority
                  />
                  
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 rounded-l-3xl"></div>
                  
                  {/* Category badge on image */}
                  <motion.div 
                    className="absolute top-6 left-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#f35e0e]/95 text-white rounded-full backdrop-blur-sm shadow-lg border border-orange-300/30">
                      {getCategoryIcon(selectedImage.category)}
                      {selectedImage.category}
                    </span>
                  </motion.div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 flex flex-col justify-between p-8 max-w-lg">
                  {/* Header Section */}
                  <div>
                    <motion.h3 
                      className="text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {selectedImage.alt}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-white/80 text-lg xl:text-xl mb-8 leading-relaxed"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {selectedImage.description}
                    </motion.p>
                  </div>

                  {/* Details Cards */}
                  <motion.div 
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.div 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-[#f35e0e]/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Tahun Pelaksanaan</p>
                        <p className="text-white font-semibold text-lg">{selectedImage.date}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-[#f35e0e]/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Lokasi Event</p>
                        <p className="text-white font-semibold text-lg">{selectedImage.location}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-[#f35e0e]/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Jumlah Peserta</p>
                        <p className="text-white font-semibold text-lg">{selectedImage.attendees}</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Action Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                  </motion.div>
                </div>
              </div>

              {/* Mobile & Tablet Layout: Stacked */}
              <div className="lg:hidden">
                {/* Image */}
                <div className="relative aspect-[16/10] max-h-[50vh] md:max-h-[60vh]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover rounded-t-3xl"
                    priority
                  />
                  
                  {/* Mobile swipe indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 md:hidden">
                    <div className="w-12 h-1 bg-white/50 rounded-full"></div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 md:p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center gap-1 px-3 py-1 text-sm font-semibold bg-[#f35e0e]/90 text-white rounded-full">
                      {getCategoryIcon(selectedImage.category)}
                      {selectedImage.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">{selectedImage.alt}</h3>
                  <p className="text-white/80 text-base md:text-lg mb-4 leading-relaxed">{selectedImage.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <motion.div 
                      className="flex items-center gap-2 p-3 bg-white/5 rounded-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5 text-[#f35e0e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-white/70 text-sm md:text-base">Tahun: {selectedImage.date}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 p-3 bg-white/5 rounded-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5 text-[#f35e0e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-white/70 text-sm md:text-base">Lokasi: {selectedImage.location}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 p-3 bg-white/5 rounded-lg backdrop-blur-sm sm:col-span-2 lg:col-span-1"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5 text-[#f35e0e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      <span className="text-white/70 text-sm md:text-base">Peserta: {selectedImage.attendees}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* White Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg 
          className="w-full h-20 md:h-32 lg:h-40" 
          viewBox="0 0 1440 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Main wave */}
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="white"
          />
          
          {/* Secondary wave for depth */}
          <path
            d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,202.7C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="rgba(255,255,255,0.7)"
          />
          
          {/* Third wave for more depth */}
          <path
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="rgba(255,255,255,0.4)"
          />
        </svg>
      </div>
    </section>
  );
}