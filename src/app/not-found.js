'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-6 lg:pt-20 relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-[15%] left-[8%] w-4 h-4 bg-blue-400/20 rounded-full"
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-[25%] right-[12%] w-3 h-3 bg-orange-400/30 rounded-full"
        animate={{ 
          y: [0, 30, 0],
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
      <motion.div 
        className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-blue-500/40 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }}
      />

      <div className="text-center max-w-2xl mx-auto">
        {/* Enhanced illustration - Lost Event Search */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <motion.div 
            className="relative w-64 h-48 mx-auto"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Search magnifying glass */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Main magnifying glass */}
              <motion.div 
                className="relative"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Glass circle */}
                <div className="w-32 h-32 border-4 border-gray-400 rounded-full bg-gradient-to-br from-blue-50 to-transparent relative overflow-hidden">
                  {/* Reflection effect */}
                  <motion.div 
                    className="absolute top-2 left-2 w-8 h-8 bg-white/40 rounded-full blur-sm"
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Empty content inside glass - representing "not found" */}
                  <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-gray-400 text-3xl font-bold"
                    >
                      ?
                    </motion.div>
                  </div>
                </div>
                
                {/* Magnifying glass handle */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-12 h-3 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full transform rotate-45 origin-left"
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
              
              {/* Floating search elements around the glass */}
              <motion.div
                className="absolute -top-8 -left-8 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shadow-md"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute -top-4 -right-12 w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shadow-md"
                animate={{
                  y: [0, 18, 0],
                  rotate: [0, -20, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-10 w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-md"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 25, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
              >
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
              
              {/* Search dots/particles */}
              <motion.div
                className="absolute top-4 right-8 w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-8 right-4 w-1.5 h-1.5 bg-orange-400 rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.8, 0.5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }}
              />
              <motion.div
                className="absolute top-12 left-6 w-1 h-1 bg-purple-400 rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 2, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pencarian Tidak Ditemukan
          </h2>
          <div className="space-y-2 text-gray-600">
            <p className="text-lg">
              Maaf, halaman yang Anda cari seperti acara yang sudah berakhir
            </p>
            <p className="text-base">
              Mungkin URL salah atau konten telah dipindahkan ke tempat lain
            </p>
          </div>
        </motion.div>

        {/* Enhanced action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <motion.svg 
                className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </motion.svg>
              Kembali ke Beranda
            </motion.button>
          </Link>

          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-3.5 bg-white text-blue-600 font-medium rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
            >
              <motion.svg 
                className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </motion.svg>
              Cari Layanan Lain
            </motion.button>
          </Link>
        </motion.div>

        {/* Enhanced quick navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-10"
        >
          <p className="text-sm text-gray-500 mb-4">Atau kunjungi halaman populer:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { 
                name: 'Tentang Kami', 
                href: '/about', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                name: 'Portfolio', 
                href: '/portfolio', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              { 
                name: 'Kontak', 
                href: '/contact', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              { 
                name: 'Gallery', 
                href: '/gallery', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                )
              }
            ].map((link, index) => (
              <Link key={link.name} href={link.href}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                  className="group p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-center justify-center mb-2 text-gray-600 group-hover:text-blue-600 transition-colors">
                    {link.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                    {link.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Enhanced auto redirect timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="inline-flex items-center px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 mr-3"
          >
            <svg className="w-full h-full text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <span className="text-sm text-gray-700">
            Otomatis kembali dalam <motion.span 
              key={countdown}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-bold text-blue-600 mx-1"
            >
              {countdown}
            </motion.span> detik
          </span>
        </motion.div>
      </div>
    </div>
  );
}