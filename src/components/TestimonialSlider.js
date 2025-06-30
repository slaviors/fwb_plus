'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  
  const testimonials = [
    {
      name: "Budi Santoso",
      company: "PT. Tech Indonesia",
      image: "/images/testimonials/client1.jpg",
      quote: "FWB+ telah membantu kami menyelenggarakan company gathering yang luar biasa. Tim mereka sangat profesional dan detail-oriented. Semua berjalan sesuai rencana dan bahkan lebih baik dari yang kami harapkan!"
    },
    {
      name: "Sinta Dewi",
      company: "Hotel Grand Luxury",
      image: "/images/testimonials/client2.jpg",
      quote: "Kami sangat puas dengan layanan FWB+ dalam menangani conference tahunan kami. Mereka benar-benar memahami kebutuhan kami dan memberikan solusi yang tepat, bahkan dengan deadline yang ketat."
    },
    {
      name: "Ahmad Fauzi",
      company: "Startup Innovate",
      image: "/images/testimonials/client3.jpg",
      quote: "Launch event produk baru kami berjalan sukses berkat bantuan FWB+. Kreativitas dan eksekusi yang sempurna! Pasti akan bekerja sama lagi untuk event kami berikutnya."
    },
  ];
  
  // Auto scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [current, testimonials.length]);
  
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute top-0 left-0 -mt-8 -ml-4">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-gray-300">
          <path d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z" 
            fill="currentColor"/>
        </svg>
      </div>
      
      <div className="relative overflow-hidden h-[300px] md:h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 bg-white rounded-xl shadow-md"
          >
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#1a7be6]/20">
                <div className="relative w-full h-full">
                  <Image
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    fill
                    sizes="(max-width: 768px) 96px, 112px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <svg className="w-8 h-8 text-[#f35e0e]/30 mb-2 mx-auto md:ml-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <p className="italic text-gray-600 mb-4">{testimonials[current].quote}</p>
              
              <div>
                <h4 className="font-semibold text-[#1a7be6]">{testimonials[current].name}</h4>
                <p className="text-sm text-gray-500">{testimonials[current].company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-8 flex justify-center space-x-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-[#1a7be6]" : "bg-gray-300"
            } transition-colors duration-300`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}