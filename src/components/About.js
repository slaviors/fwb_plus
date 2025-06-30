'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden py-20 md:py-32" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-blue-50 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-50 rounded-full opacity-60 blur-3xl"></div>
        <motion.div
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, 5, 0] 
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="hidden lg:block absolute top-20 right-20 w-16 h-16 border-2 border-blue-200 rounded-full opacity-50"
        ></motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0], 
            x: [0, -15, 0],
            rotate: [0, -10, 0] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="hidden lg:block absolute bottom-40 left-20 w-20 h-20 border-2 border-orange-200 rounded-xl opacity-50 rotate-12"
        ></motion.div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={fadeIn.hidden} 
            animate={isInView ? fadeIn.visible(0) : fadeIn.hidden}
          >
            <span className="inline-block py-1 px-3 mb-4 text-sm bg-blue-50 text-[#1a7be6] font-medium rounded-full">
              Tentang Kami
            </span>
          </motion.div>
          
          <motion.h2 
            initial={fadeInUp.hidden} 
            animate={isInView ? fadeInUp.visible(1) : fadeInUp.hidden}
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
          >
            Event Organizer Terpercaya <br/>
            <span className="text-[#1a7be6]">Mewujudkan Event Impian Anda</span>
          </motion.h2>
          
          <motion.div 
            initial={fadeInUp.hidden} 
            animate={isInView ? fadeInUp.visible(2) : fadeInUp.hidden}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-600">
              FWB+ merupakan event organizer profesional yang berpengalaman dalam mengelola berbagai jenis acara,
              mulai dari corporate event, wedding, celebration, gathering, hingga product launching.
            </p>
          </motion.div>
        </div>

        {/* Company Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 md:mb-32">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-200/30">
              <Image
                src="/images/about/company-story.png"
                alt="FWB+ Company Story"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6">
                <span className="inline-block py-1 px-3 mb-3 text-xs bg-white/90 text-[#1a7be6] font-medium rounded-full">
                  Sejak 2015
                </span>
                <h3 className="text-2xl font-semibold text-white">Memulai Perjalanan</h3>
              </div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute top-6 right-6 bg-white rounded-full py-2 px-4 shadow-lg flex items-center"
                animate={{ 
                  y: [0, -8, 0], 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <span className="text-[#f35e0e] font-bold text-sm mr-1">10+</span>
                <span className="text-gray-700 text-xs">Tahun Pengalaman</span>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 h-16 w-16 bg-blue-500/10 rounded-full"></div>
            <div className="absolute -top-8 -right-8 h-20 w-20 bg-orange-500/10 rounded-xl rotate-12"></div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-[#1a7be6]">Kisah Perjalanan Kami</h3>
            <p className="text-gray-700">
              Berawal dari tim kecil yang memiliki passion di bidang event organizer, kami terus berkomitmen untuk memberikan 
              layanan terbaik dan pengalaman yang tak terlupakan bagi setiap klien. Dengan semangat kreativitas dan profesionalitas, FWB+ kini 
              telah menjelma menjadi salah satu event organizer terpercaya dengan ratusan event sukses yang telah diselenggarakan.
            </p>
            
            <p className="text-gray-700">
              Kami berupaya untuk selalu menghadirkan inovasi dan ide-ide segar dalam setiap proyek, mengutamakan kepuasan klien, 
              dan memastikan setiap detail acara terkelola dengan sempurna.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">Profesional</span>
              </div>
              
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">Kreatif</span>
              </div>
              
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">Terpercaya</span>
              </div>
            </div>
            
            <motion.div 
              className="pt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/about" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg transition-shadow group"
              >
                Pelajari Lebih Lanjut
                <svg 
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            initial={scaleIn.hidden} 
            animate={isInView ? scaleIn.visible(3) : scaleIn.hidden}
            whileHover={{ y: -5 }}
          >
            <div className="p-4 bg-blue-50 inline-block rounded-xl mb-6">
              <svg className="w-8 h-8 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visi Kami</h3>
            <p className="text-gray-600">
              Menjadi event organizer terdepan yang dikenal akan kreativitas, inovasi, dan layanan profesional, mewujudkan 
              event-event yang berkesan dan memberikan pengalaman terbaik bagi setiap klien kami.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            initial={scaleIn.hidden} 
            animate={isInView ? scaleIn.visible(4) : scaleIn.hidden}
            whileHover={{ y: -5 }}
          >
            <div className="p-4 bg-blue-50 inline-block rounded-xl mb-6">
              <svg className="w-8 h-8 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Misi Kami</h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#1a7be6] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Memberikan pelayanan event organizer profesional dan berkualitas</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#1a7be6] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mengutamakan kepuasan dan kenyamanan klien dalam setiap event</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#1a7be6] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Terus berinovasi dalam menciptakan konsep event yang kreatif dan unik</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#1a7be6] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Membangun hubungan jangka panjang dengan klien dan mitra kerja</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}