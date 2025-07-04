'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials = [
    {
      name: "Budi Santoso",
      company: "PT. Tech Indonesia",
      image: "/images/testimonials/client1.png",
      quote: "FWB Plus telah membantu kami menyelenggarakan company gathering yang luar biasa. Tim mereka sangat profesional dan detail-oriented. Semua berjalan sesuai rencana dan bahkan lebih baik dari yang kami harapkan!",
      rating: 5,
      role: "CEO"
    },
    {
      name: "Sinta Dewi",
      company: "Hotel Grand Luxury",
      image: "/images/testimonials/client2.png",
      quote: "Kami sangat puas dengan layanan FWB Plus dalam menangani conference tahunan kami. Mereka benar-benar memahami kebutuhan kami dan memberikan solusi yang tepat, bahkan dengan deadline yang ketat.",
      rating: 5,
      role: "Event Manager"
    },
    {
      name: "Ahmad Fauzi",
      company: "Startup Innovate",
      image: "/images/testimonials/client3.png",
      quote: "Launch event produk baru kami berjalan sukses berkat bantuan FWB Plus. Kreativitas dan eksekusi yang sempurna! Pasti akan bekerja sama lagi untuk event kami berikutnya.",
      rating: 5,
      role: "Founder"
    },
  ];
  
  // Auto scroll
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [current, testimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">


        {/* Background Elements */}
        <div className="absolute top-0 left-0 -mt-8 -ml-4 opacity-20 hidden md:block">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-[#f35e0e]">
            <path d="M15 5C10 5 5 10 5 15v30c0 5 5 10 10 10h30c5 0 10-5 10-10V15c0-5-5-10-10-10H15zM25 15c2.5 0 5 2.5 5 5s-2.5 5-5 5-5-2.5-5-5 2.5-5 5-5zm10 0c2.5 0 5 2.5 5 5s-2.5 5-5 5-5-2.5-5-5 2.5-5 5-5zm-10 20c-2.5 0-5-2.5-5-5s2.5-5 5-5 5 2.5 5 5-2.5 5-5 5zm10 0c-2.5 0-5-2.5-5-5s2.5-5 5-5 5 2.5 5 5-2.5 5-5 5z" fill="currentColor" />
          </svg>
        </div>

        {/* Main Content */}
        <div 
          className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white via-gray-50 to-white border border-gray-100"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Testimonial Cards */}
          <div className="relative min-h-[500px] sm:min-h-[450px] md:min-h-[400px] lg:min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -15 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 p-4 sm:p-6 md:p-8 lg:p-12"
            >
              {/* Client Image Section */}
              <div className="flex-shrink-0 relative">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-gradient-to-r from-[#1a7be6] to-[#f35e0e] shadow-xl mx-auto">
                    <div className="relative w-full h-full">
                      <Image
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        fill
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Floating Quote Icon */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#f35e0e] to-[#ff6b35] rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 text-center lg:text-left max-w-2xl">
                {/* Star Rating */}
                <div className="flex justify-center lg:justify-start mb-4 space-x-1">
                  {renderStars(testimonials[current].rating)}
                </div>
                
                {/* Quote */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 italic font-medium px-2 sm:px-0"
                >
                  &ldquo;{testimonials[current].quote}&rdquo;
                </motion.p>
                
                {/* Client Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-1"
                >
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#1a7be6] to-[#f35e0e] bg-clip-text text-transparent">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 font-medium">
                    {testimonials[current].role}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {testimonials[current].company}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
          aria-label="Previous testimonial"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#1a7be6] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
          aria-label="Next testimonial"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#1a7be6] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Dots Navigation */}
      <div className="mt-8 flex justify-center items-center space-x-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative transition-all duration-300 ${
              i === current 
                ? "w-8 sm:w-12 h-3 sm:h-4 bg-gradient-to-r from-[#1a7be6] to-[#f35e0e] rounded-full" 
                : "w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded-full hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
        
        {/* Progress Bar */}
        <div className="ml-4 w-12 sm:w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1a7be6] to-[#f35e0e] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: isAutoPlaying ? "100%" : "0%" }}
            transition={{ duration: 6, ease: "linear" }}
            key={current}
          />
        </div>
      </div>
      
      {/* Counter */}
      <div className="mt-4 text-center">
        <span className="text-xs sm:text-sm text-gray-500">
          {current + 1} of {testimonials.length}
        </span>
      </div>
    </div>
  </section>
  );
}