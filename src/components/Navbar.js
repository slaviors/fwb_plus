'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Logo from './ui/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const navLinks = [
    { name: 'Home', href: '#hero', icon: 'home' },
    { name: 'About', href: '#about', icon: 'about' },
    { name: 'Services', href: '#services', icon: 'services' },
    { name: 'Events', href: '#events', icon: 'events' },
    { name: 'Gallery', href: '#gallery', icon: 'gallery' },
    { name: 'Testimonials', href: '#testimonials', icon: 'testimonials' },
    { name: 'Contact', href: '#contact', icon: 'contact' },
  ];

  // Handle scroll effects and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Change navbar appearance on scroll down
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section based on page.js order
      const sections = ['hero', 'about', 'clients', 'services', 'events', 'gallery', 'testimonials', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
      
      let currentSection = 'hero';
      for (const element of sectionElements) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = element.id;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for thinner fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/98 backdrop-blur-xl shadow-2xl border-b border-gray-100/50 py-1 xl:py-2' 
            : 'bg-white/90 backdrop-blur-sm py-2 xl:py-4'
        }`}
      >
        {/* Advanced gradient progress bar */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a7be6] to-blue-500 origin-left z-50 shadow-lg" 
          style={{ scaleX }}
        />

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-4 -right-8 w-32 h-32 bg-blue-100/30 rounded-full blur-xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-8 w-24 h-24 bg-orange-100/30 rounded-full blur-xl"
            animate={{
              x: [0, -15, 0],
              y: [0, 15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-14 xl:h-16">
            {/* Enhanced Logo with glow effect */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a7be6]/20 to-[#f35e0e]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Logo />
            </motion.div>

            {/* Desktop Navigation - Advanced glass morphism design */}
            <nav className="hidden xl:flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-white/60 backdrop-blur-lg rounded-full px-3 py-2 shadow-lg border border-white/20">
                {navLinks.map((link, index) => (
                  <NavLink 
                    key={link.name} 
                    href={link.href} 
                    title={link.name} 
                    isActive={activeSection === link.href.substring(1)}
                    icon={link.icon}
                    onClick={() => scrollToSection(link.href.substring(1))}
                    index={index}
                  />
                ))}
              </div>
              
              {/* Advanced CTA button with morphing effects */}
              <motion.div
                className="ml-4"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="relative px-6 py-3 rounded-full bg-gradient-to-r from-[#1a7be6] to-blue-600 text-white font-semibold text-sm shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  {/* Animated background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f35e0e] to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Hubungi Kami</span>
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                        />
                      </svg>
                    </motion.div>
                  </span>
                  
                  {/* Pulsing glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#1a7be6]/50 to-blue-600/50 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </button>
              </motion.div>
            </nav>

            {/* Advanced Mobile menu button with compact design */}
            <div className="xl:hidden flex items-center">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-lg shadow-lg border border-white/30 hover:from-white/90 hover:to-white/80 focus:outline-none transition-all duration-300"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05, y: -1 }}
                aria-label="Menu"
              >
                {/* Animated hamburger with centered positioning */}
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div className="relative w-4 h-4">
                    <motion.span
                      className="absolute h-0.5 rounded-full transform origin-center shadow-sm"
                      style={{ 
                        width: '100%', 
                        top: '15%',
                        left: '0',
                        background: isOpen ? 'linear-gradient(45deg, #1a7be6, #f35e0e)' : '#374151'
                      }}
                      animate={isOpen 
                        ? { rotate: 45, y: 4, scaleX: 1.1 } 
                        : { rotate: 0, y: 0, scaleX: 1 }
                      }
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute h-0.5 rounded-full transform origin-center shadow-sm"
                      style={{ 
                        width: '100%', 
                        top: '50%', 
                        left: '0',
                        transform: 'translateY(-50%)',
                        background: isOpen ? 'linear-gradient(45deg, #1a7be6, #f35e0e)' : '#374151'
                      }}
                      animate={isOpen 
                        ? { opacity: 0, scaleX: 0.8 } 
                        : { opacity: 1, scaleX: 1 }
                      }
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute h-0.5 rounded-full transform origin-center shadow-sm"
                      style={{ 
                        width: '100%', 
                        bottom: '15%',
                        left: '0',
                        background: isOpen ? 'linear-gradient(45deg, #1a7be6, #f35e0e)' : '#374151'
                      }}
                      animate={isOpen 
                        ? { rotate: -45, y: -4, scaleX: 1.1 } 
                        : { rotate: 0, y: 0, scaleX: 1 }
                      }
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Subtle pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-transparent"
                  animate={isOpen ? {
                    borderColor: ['rgba(26,123,230,0)', 'rgba(26,123,230,0.4)', 'rgba(243,94,14,0.4)', 'rgba(26,123,230,0)'],
                    scale: [1, 1.15, 1.3, 1]
                  } : {}}
                  transition={{ duration: 1, repeat: isOpen ? Infinity : 0 }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Advanced Mobile Navigation - Compact & Comfortable */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="xl:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-2xl"
            >
              {/* Subtle animated background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-100/20 to-transparent rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <div className="px-4 py-2 relative z-10">
                {/* Navigation items with improved spacing and proportions */}
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        delay: index * 0.04, 
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="relative"
                    >
                      <button
                        onClick={() => {
                          scrollToSection(link.href.substring(1));
                          setIsOpen(false);
                        }}
                        className={`group relative w-full flex items-center py-2.5 px-4 rounded-lg transition-all duration-300 ${
                          activeSection === link.href.substring(1)
                            ? 'bg-gradient-to-r from-[#1a7be6]/8 to-blue-50/60 text-[#1a7be6] shadow-sm border border-[#1a7be6]/20'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-orange-50/30 hover:text-[#1a7be6] hover:shadow-sm'
                        }`}
                      >
                        {/* Compact icon container */}
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                            activeSection === link.href.substring(1) 
                              ? 'bg-gradient-to-r from-[#1a7be6] to-blue-600 shadow-md' 
                              : 'bg-gradient-to-r from-gray-100 to-gray-50 group-hover:from-[#1a7be6]/15 group-hover:to-blue-100/30'
                          }`}
                        >
                          {renderIcon(link.icon, activeSection === link.href.substring(1))}
                        </motion.div>
                        
                        {/* Clean text layout */}
                        <div className="flex-1">
                          <span className={`font-semibold text-sm transition-all duration-300 ${
                            activeSection === link.href.substring(1)
                              ? 'bg-gradient-to-r from-[#1a7be6] to-blue-600 bg-clip-text text-transparent'
                              : 'text-gray-700 group-hover:text-[#1a7be6]'
                          }`}>
                            {link.name}
                          </span>
                        </div>
                        
                        {/* Clean active indicator */}
                        {activeSection === link.href.substring(1) && (
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#1a7be6] to-blue-600 shadow-sm"
                          />
                        )}
                        
                        {/* Subtle hover indicator */}
                        {activeSection !== link.href.substring(1) && (
                          <motion.div
                            initial={{ opacity: 0, x: -5 }}
                            whileHover={{ opacity: 0.6, x: 0 }}
                            className="w-1 h-1 rounded-full bg-gray-400"
                          />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
                
                {/* Compact CTA button */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.1, duration: 0.4 }}
                  className="mt-3 mb-2"
                >
                  <button
                    onClick={() => {
                      scrollToSection('contact');
                      setIsOpen(false);
                    }}
                    className="relative w-full flex items-center justify-center py-3 px-5 rounded-lg bg-gradient-to-r from-[#1a7be6] to-blue-600 text-white font-semibold text-sm shadow-lg overflow-hidden group"
                  >
                    {/* Animated background layers */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f35e0e] to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute inset-0 bg-white/15 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                    
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                        />
                      </svg>
                      <span>Hubungi Kami</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </motion.div>

                {/* Compact Social icons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.04 + 0.15, duration: 0.4 }}
                  className="flex justify-center space-x-3 py-3 border-t border-gray-200/40"
                >
                  {[
                    { name: 'facebook', color: 'from-blue-600 to-blue-700' },
                    { name: 'instagram', color: 'from-pink-500 to-purple-600' },
                    { name: 'whatsapp', color: 'from-green-500 to-green-600' }
                  ].map((social, idx) => (
                    <motion.a
                      key={social.name}
                      href={`#${social.name}`}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-9 h-9 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center text-white shadow-md overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-white/15 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-400" />
                      <div className="relative z-10">
                        {renderSocialIcon(social.name)}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

// Ultra-Advanced NavLink component with 3D effects and morphing
function NavLink({ href, title, isActive, icon, onClick, index }) {
  return (
    <motion.button 
      onClick={onClick} 
      className="relative px-4 py-3 rounded-full group"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Animated background with glassmorphism */}
      <motion.div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-[#1a7be6] to-blue-600 shadow-lg' 
            : 'bg-white/40 group-hover:bg-white/60 group-hover:shadow-md'
        }`}
        layoutId={isActive ? "activeNavBg" : undefined}
      />
      
      {/* Pulsing glow effect for active state */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a7be6]/40 to-blue-600/40 blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Content */}
      <div className={`relative z-10 flex items-center space-x-2 transition-all duration-300 ${
        isActive ? 'text-white' : 'text-gray-700 group-hover:text-[#1a7be6]'
      }`}>
        {/* Animated icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
        >
          {renderIcon(icon, isActive)}
        </motion.div>
        
        {/* Text with gradient effect */}
        <span className={`font-semibold text-sm transition-all duration-300 ${
          isActive 
            ? 'text-white' 
            : 'text-gray-700 group-hover:bg-gradient-to-r group-hover:from-[#1a7be6] group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent'
        }`}>
          {title}
        </span>
      </div>
      
      {/* Hover ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a7be6]/20 to-blue-600/20 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-[#f35e0e] to-orange-500 rounded-full shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

// Enhanced function to render icons with dynamic colors
function renderIcon(iconName, isActive) {
  const iconClass = `w-5 h-5 transition-all duration-300 ${
    isActive 
      ? "text-white drop-shadow-sm" 
      : "text-gray-600 group-hover:text-[#1a7be6]"
  }`;
  
  switch(iconName) {
    case 'home':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'services':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'clients':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'gallery':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'testimonials':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      );
    case 'portfolio':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'events':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'about':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'contact':
      return (
        <svg className={iconClass} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return null;
  }
}

// Function to render social media icons
function renderSocialIcon(platform) {
  switch(platform) {
    case 'facebook':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.481-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.796.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 01-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      );
    default:
      return null;
  }
}