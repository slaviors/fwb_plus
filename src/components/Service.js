'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('corporate');

  // Services data
  const services = [
    {
      id: 'corporate',
      title: 'Corporate Events',
      shortDesc: 'Professional corporate event solutions',
      icon: 'briefcase',
      image: '/images/services/corporate-event.png',
      description: 'Layanan profesional untuk berbagai kebutuhan acara perusahaan. Dari konferensi skala besar hingga rapat direksi yang eksklusif, kami menangani semua detail untuk memastikan acara perusahaan Anda berjalan sukses.',
      features: [
        'Conference & Seminar',
        'Product Launching',
        'Annual Meeting',
        'Team Building',
        'Award Ceremony'
      ],
      color: '#1a7be6'
    },
    {
      id: 'wedding',
      title: 'Wedding',
      shortDesc: 'Create your dream wedding experience',
      icon: 'heart',
      image: '/images/services/wedding-event.png',
      description: 'Wujudkan pernikahan impian Anda dengan layanan wedding organizer kami yang komprehensif. Kami membantu merencanakan, mengorganisir, dan melaksanakan setiap detail penting di hari spesial Anda.',
      features: [
        'Indoor & Outdoor Wedding',
        'Traditional & Modern Ceremony',
        'Wedding Decoration',
        'Catering & Entertainment',
        'Pre-Wedding & Documentation'
      ],
      color: '#f35e0e'
    },
    {
      id: 'gathering',
      title: 'Gathering & Celebration',
      shortDesc: 'Memorable celebrations for every occasion',
      icon: 'party',
      image: '/images/services/gathering-event.png',
      description: 'Buat momen spesial Anda menjadi tak terlupakan dengan layanan event organizer kami untuk berbagai jenis perayaan dan gathering, baik untuk keluarga, teman, maupun komunitas.',
      features: [
        'Family Gathering',
        'Birthday Celebration',
        'Reunion & Anniversary',
        'Community Events',
        'Themed Parties'
      ],
      color: '#ce1010'
    },
    {
      id: 'concert',
      title: 'Concert & Entertainment',
      shortDesc: 'Full-scale entertainment event management',
      icon: 'music',
      image: '/images/services/concert-event.png',
      description: 'Layanan pengelolaan acara hiburan dan konser dengan sistem manajemen profesional. Kami menangani semua aspek dari perencanaan, produksi, hingga eksekusi acara hiburan Anda.',
      features: [
        'Music Concerts',
        'Festival Management',
        'Artist Management',
        'Stage Production',
        'Ticketing System'
      ],
      color: '#8e44ad'
    }
  ];

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

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-orange-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 border border-blue-200/50 rounded-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 mb-4 text-sm bg-blue-50 text-[#1a7be6] font-medium rounded-full"
          >
            Layanan Kami
          </motion.span>
          
          <motion.h2 
            initial={fadeInUp.hidden} 
            animate={isInView ? fadeInUp.visible(1) : fadeInUp.hidden}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Solusi Event Profesional <span className="text-[#1a7be6]">Untuk Kebutuhan Anda</span>
          </motion.h2>
          
          <motion.p
            initial={fadeInUp.hidden} 
            animate={isInView ? fadeInUp.visible(2) : fadeInUp.hidden}
            className="max-w-3xl mx-auto text-lg text-gray-600"
          >
            Kami menyediakan berbagai layanan event organizer yang dapat disesuaikan dengan kebutuhan dan anggaran Anda, didukung oleh tim profesional yang berpengalaman.
          </motion.p>
        </div>
        
        {/* Service Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-3 md:gap-5">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`flex items-center px-5 py-3 rounded-full transition-all duration-300 ${
                activeTab === service.id
                  ? 'bg-white shadow-lg text-gray-900 scale-105'
                  : 'bg-white/70 hover:bg-white hover:shadow text-gray-600'
              }`}
              style={{
                boxShadow: activeTab === service.id ? `0 4px 14px 0 ${service.color}20` : ''
              }}
            >
              <span className="mr-2">{renderServiceIcon(service.icon, activeTab === service.id ? service.color : '#64748b')}</span>
              <span className="font-medium">{service.title}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Service Detail Panels */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            {services.map((service) => (
              service.id === activeTab && (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-10 items-center"
                >
                  {/* Service Image */}
                  <div className="relative">
                    <div className="relative h-[350px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl" 
                      style={{ boxShadow: `0 20px 30px -10px ${service.color}20` }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full p-8">
                        <span
                          className="inline-block py-1 px-3 mb-3 text-xs bg-white/90 font-medium rounded-full"
                          style={{ color: service.color }}
                        >
                          FWB+ Services
                        </span>
                        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <motion.div 
                      className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full z-10"
                      style={{ backgroundColor: `${service.color}15` }}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 10, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                    <motion.div 
                      className="absolute -top-6 -left-6 w-24 h-24 rounded-full z-0 border-2 opacity-20"
                      style={{ borderColor: service.color }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                  </div>
                  
                  {/* Service Information */}
                  <div className="space-y-6">
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: service.color }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-700 text-lg">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <div className="mt-8 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Layanan Tersedia:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {service.features.map((feature, i) => (
                          <motion.div 
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="flex items-center"
                          >
                            <div 
                              className="p-1.5 mr-3 rounded-full"
                              style={{ backgroundColor: `${service.color}15` }}
                            >
                              <svg 
                                className="w-4 h-4" 
                                style={{ color: service.color }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="pt-6">
                      <Link href={`/services/${service.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-6 py-3 rounded-full shadow-md font-medium text-white group overflow-hidden relative"
                          style={{ backgroundColor: service.color }}
                        >
                          <span className="relative z-10">Pelajari Lebih Lanjut</span>
                          <motion.span
                            className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </motion.span>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* Service Cards - Mini Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={fadeInUp.hidden}
              animate={isInView ? fadeInUp.visible(i + 3) : fadeInUp.hidden}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 ${
                activeTab === service.id ? 'ring-2' : ''
              }`}
              style={{ 
                boxShadow: activeTab === service.id ? `0 4px 14px 0 ${service.color}30` : '',
                borderColor: activeTab === service.id ? service.color : 'rgba(229, 231, 235, 1)',
              }}
              onClick={() => setActiveTab(service.id)}
            >
              <div 
                className="p-4 rounded-xl inline-flex items-center justify-center mb-4"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <span style={{ color: service.color }}>
                  {renderServiceIcon(service.icon, service.color, '1.75rem')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.shortDesc}</p>
              <button 
                className="text-sm font-medium group flex items-center"
                style={{ color: service.color }}
                onClick={() => setActiveTab(service.id)}
              >
                Selengkapnya
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-[#1a7be6] to-[#134e92] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-sm"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 translate-y-1/2 blur-sm"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Siap Wujudkan Event Impian Anda?
              </h3>
              <p className="text-white/90 text-lg">
                Konsultasikan kebutuhan acara Anda secara gratis dengan tim profesional kami dan dapatkan penawaran terbaik.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3.5 bg-white text-[#1a7be6] font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Konsultasi Gratis
                </motion.div>
              </Link>
              <Link href="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3.5 bg-transparent text-white font-medium rounded-full border-2 border-white/30 hover:bg-white/10 transition-all flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Lihat Portfolio
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Function to render service icons
function renderServiceIcon(icon, color, size = '1.25rem') {
  const iconStyle = { color, width: size, height: size };
  
  switch(icon) {
    case 'briefcase':
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'heart':
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'party':
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      );
    case 'music':
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    default:
      return (
        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      );
  }
}