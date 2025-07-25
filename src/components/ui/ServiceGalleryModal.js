"use client";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";

export default function ServiceGalleryModal({ isOpen, onClose, service }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous
  const constraintsRef = useRef(null);

  // Reset image index when modal opens or service changes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, service?.id]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen || !service?.images) return;
      
      if (event.key === "ArrowLeft") {
        goToPreviousImage();
      } else if (event.key === "ArrowRight") {
        goToNextImage();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, service?.images, onClose, currentImageIndex]);

  // Handle touch/swipe navigation
  const handleDragEnd = (event, info) => {
    if (!service?.images || service.images.length <= 1) return;
    
    const threshold = 50;
    
    if (info.offset.x > threshold) {
      // Swipe right - go to previous image
      goToPreviousImage();
    } else if (info.offset.x < -threshold) {
      // Swipe left - go to next image
      goToNextImage();
    }
    
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  // Generate image titles based on service type and index
  const getImageTitle = (service, index) => {
    const baseTitles = {
      corporate: [
        "Corporate Event Setup",
        "Team Building Activity", 
        "Professional Meeting",
        "Company Gathering",
        "Awards Ceremony",
        "Business Conference"
      ],
      gathering: [
        "Community Gathering",
        "Celebration Event",
        "Family Reunion", 
        "Birthday Party",
        "Anniversary Event",
        "Social Gathering"
      ],
      concert: [
        "Concert Stage",
        "Live Performance",
        "Music Festival",
        "Artist Show",
        "Entertainment Event",
        "Stage Production"
      ],
      exhibition: [
        "Exhibition Booth",
        "Trade Show",
        "Product Display",
        "Brand Showcase",
        "Expo Setup",
        "Commercial Display"
      ],
      support: [
        "Equipment Setup",
        "Technical Support",
        "Sound System",
        "Lighting Installation",
        "Stage Rigging",
        "Event Infrastructure"
      ]
    };

    const titles = baseTitles[service.id] || baseTitles.corporate;
    return titles[index] || `${service.title} ${index + 1}`;
  };

  // Navigation functions with direction tracking
  const goToNextImage = () => {
    setDirection(1);
    setCurrentImageIndex(prev => (prev + 1) % service.images.length);
  };

  const goToPreviousImage = () => {
    setDirection(-1);
    setCurrentImageIndex(prev => 
      prev === 0 ? service.images.length - 1 : prev - 1
    );
  };

  const goToSpecificImage = (index) => {
    if (index > currentImageIndex) {
      setDirection(1);
    } else if (index < currentImageIndex) {
      setDirection(-1);
    }
    setCurrentImageIndex(index);
  };

  if (!service) return null;

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalContentVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100
    }),
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction) => ({ 
      opacity: 0, 
      x: direction > 0 ? -100 : 100,
      transition: {
        duration: 0.3
      }
    })
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="outline-none"
      overlayClassName="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[9999]"
      ariaHideApp={false}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full sm:h-auto sm:max-w-6xl sm:max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden relative"
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full h-full"
            >
              {/* Header */}
              <div className="relative px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div 
                      className="p-1.5 sm:p-2 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: service.color }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 
                        className="font-unbounded text-sm sm:text-lg md:text-xl font-bold truncate"
                        style={{ color: service.color }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-inter truncate">
                        Galeri Dokumentasi
                      </p>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Main Gallery Content */}
              <div className="relative h-[50vh] sm:h-[60vh] bg-gray-50">
                {/* Main Image Display */}
                <div className="relative h-full w-full overflow-hidden" ref={constraintsRef}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`main-${currentImageIndex}`}
                      custom={direction}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute inset-0"
                      drag="x"
                      dragConstraints={constraintsRef}
                      dragElastic={0.1}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      style={{ 
                        cursor: isDragging ? 'grabbing' : 'grab'
                      }}
                    >
                      <div className="relative h-full w-full pointer-events-none">
                        <Image
                          src={service.images[currentImageIndex]}
                          alt={`${service.title} - Image ${currentImageIndex + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 80vw"
                          className="object-contain"
                          priority
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows - Hidden on small screens */}
                  {service.images.length > 1 && (
                    <>
                      <motion.button
                        onClick={goToPreviousImage}
                        whileHover={{ scale: 1.1, x: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all z-10 items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </motion.button>

                      <motion.button
                        onClick={goToNextImage}
                        whileHover={{ scale: 1.1, x: 2 }}
                        whileTap={{ scale: 0.9 }}
                        className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all z-10 items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
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
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/50 text-white text-xs sm:text-sm rounded-full backdrop-blur-sm">
                    {currentImageIndex + 1} / {service.images.length}
                  </div>

                  {/* Image Title */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 px-3 py-2 bg-black/60 text-white text-xs sm:text-sm rounded-lg backdrop-blur-sm max-w-[200px] sm:max-w-[300px]">
                    <div className="font-semibold truncate">
                      {getImageTitle(service, currentImageIndex)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Grid - Hidden on mobile, shown on tablet and above */}
              <div className="hidden sm:block px-3 sm:px-6 py-3 sm:py-4 bg-white">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide" style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitScrollbar: { display: 'none' }
                }}>
                  {service.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSpecificImage(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={getImageTitle(service, index)}
                      className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-current shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{
                        borderColor: index === currentImageIndex ? service.color : undefined
                      }}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      {index === currentImageIndex && (
                        <motion.div
                          layoutId="activeThumb"
                          className="absolute inset-0 rounded-xl"
                          style={{ 
                            backgroundColor: `${service.color}20`,
                            border: `2px solid ${service.color}`
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation Indicators */}
              <div className="block sm:hidden px-3 pb-4 bg-white">
                <div className="flex justify-center gap-2 mb-3">
                  {service.images.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSpecificImage(index)}
                      whileTap={{ scale: 0.8 }}
                      className={`transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'w-6 h-2 rounded-full scale-125 opacity-100'
                          : 'w-2 h-2 rounded-full scale-75 opacity-50'
                      }`}
                      style={{
                        backgroundColor: index === currentImageIndex ? service.color : '#d1d5db'
                      }}
                    />
                  ))}
                </div>
                
                {/* Mobile Thumbnail Strip */}
                <div className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide pb-1" style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitScrollbar: { display: 'none' }
                }}>
                  {service.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSpecificImage(index)}
                      whileTap={{ scale: 0.95 }}
                      title={getImageTitle(service, index)}
                      className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-current shadow-md scale-110'
                          : 'border-gray-200 scale-100'
                      }`}
                      style={{
                        borderColor: index === currentImageIndex ? service.color : undefined
                      }}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                      {index === currentImageIndex && (
                        <motion.div
                          layoutId="activeMobileThumb"
                          className="absolute inset-0 rounded-lg"
                          style={{ 
                            backgroundColor: `${service.color}20`,
                            border: `2px solid ${service.color}`
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
