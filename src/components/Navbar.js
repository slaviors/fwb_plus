'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Logo from './ui/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const navLinks = [
    { name: 'Home', href: '#hero', icon: 'home' },
    { name: 'Services', href: '#services', icon: 'services' },
    { name: 'Portfolio', href: '#gallery', icon: 'portfolio' },
    { name: 'Events', href: '#events', icon: 'events' },
    { name: 'About', href: '#about', icon: 'about' },
    { name: 'Contact', href: '#contact', icon: 'contact' },
  ];

  // Handle scroll effects and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Change navbar appearance on scroll down
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      // Determine active section
      const sections = ['hero', 'about', 'clients', 'services', 'events', 'gallery', 'testimonials', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
      
      let currentSection = 'hero';
      for (const element of sectionElements) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = element.id;
          break;
        }
      }
      setActiveSection(currentSection);
      
      lastScrollY.current = currentScrollY;
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
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        {/* Progress bar at top of navbar */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-[#1a7be6] origin-left z-50" 
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Navigation - Updated breakpoint from lg to xl */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  href={link.href} 
                  title={link.name} 
                  isActive={activeSection === link.href.substring(1)}
                  icon={link.icon}
                  onClick={() => scrollToSection(link.href.substring(1))}
                />
              ))}
              
              {/* Contact button with gradient and animation */}
              <motion.div
                className="ml-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-5 py-2.5 rounded-full bg-[#1a7be6] text-white font-medium text-sm shadow-md flex items-center space-x-2 overflow-hidden relative group"
                >
                  <span className="z-10 relative">Hubungi Kami</span>
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5
                    }}
                  >
                    <svg className="w-5 h-5 z-10 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                      />
                    </svg>
                  </motion.span>
                  
                  {/* Animated background effect */}
                  <motion.div 
                    className="absolute inset-0 bg-[#1a7be6] z-0"
                    initial={{ x: "100%", opacity: 0.3 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </button>
              </motion.div>
            </nav>

            {/* Mobile menu button - Updated breakpoint from lg to xl */}
            <div className="xl:hidden flex items-center">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 focus:outline-none transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label="Menu"
              >
                <div className="relative w-6 h-5">
                  <motion.span
                    className="absolute h-0.5 rounded-full bg-gray-800 transform origin-center"
                    style={{ width: '100%', top: '0%' }}
                    animate={isOpen 
                      ? { rotate: 45, y: 10, backgroundColor: "#1a7be6" } 
                      : { rotate: 0, y: 0, backgroundColor: "#1f2937" }
                    }
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <motion.span
                    className="absolute h-0.5 rounded-full bg-gray-800 transform origin-center"
                    style={{ width: '100%', top: '50%', transform: 'translateY(-50%)' }}
                    animate={isOpen 
                      ? { opacity: 0, backgroundColor: "#1a7be6" } 
                      : { opacity: 1, backgroundColor: "#1f2937" }
                    }
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <motion.span
                    className="absolute h-0.5 rounded-full bg-gray-800 transform origin-center"
                    style={{ width: '100%', bottom: '0%' }}
                    animate={isOpen 
                      ? { rotate: -45, y: -10, backgroundColor: "#1a7be6" } 
                      : { rotate: 0, y: 0, backgroundColor: "#1f2937" }
                    }
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation - Updated breakpoint from lg to xl */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="xl:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-gray-100"
            >
              <div className="px-4 py-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="my-1.5"
                  >
                    <button
                      onClick={() => {
                        scrollToSection(link.href.substring(1));
                        setIsOpen(false);
                      }}
                      className={`flex items-center py-3 px-4 rounded-xl transition-all duration-300 w-full text-left ${
                        activeSection === link.href.substring(1)
                          ? 'bg-[#1a7be6]/10 text-[#1a7be6]'
                          : 'text-gray-800 hover:bg-[#1a7be6]/5 hover:text-[#1a7be6]'
                      }`}
                    >
                      <motion.div 
                        whileHover={{ rotate: activeSection === link.href.substring(1) ? 0 : 10 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          activeSection === link.href.substring(1) ? 'bg-[#1a7be6]/20' : 'bg-gray-100'
                        }`}
                      >
                        {renderIcon(link.icon, activeSection === link.href.substring(1))}
                      </motion.div>
                      <span className="font-medium">{link.name}</span>
                      {activeSection === link.href.substring(1) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <svg className="w-5 h-5 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
                  className="mt-6 mb-4"
                >
                  <button
                    onClick={() => {
                      scrollToSection('contact');
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center w-full py-3.5 px-4 rounded-xl bg-[#1a7be6] text-white font-medium"
                  >
                    <span className="relative flex items-center">
                      <span className="relative z-10 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                          />
                        </svg>
                        Hubungi Kami
                      </span>
                      
                      {/* Animated arrow on hover */}
                      <motion.span
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 5, opacity: 1 }}
                        transition={{ 
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: 1
                        }}
                        className="ml-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.span>
                    </span>
                  </button>
                </motion.div>

                {/* Social icons at bottom of mobile menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1, duration: 0.4 }}
                  className="flex justify-center space-x-6 py-4 border-t border-gray-100"
                >
                  {['facebook', 'instagram', 'whatsapp'].map((social, idx) => (
                    <motion.a
                      key={social}
                      href={`#${social}`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1a7be6]/10 hover:text-[#1a7be6] transition-colors"
                    >
                      {renderSocialIcon(social)}
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

// Enhanced NavLink component with icons and effects
function NavLink({ href, title, isActive, icon, onClick }) {
  return (
    <button onClick={onClick} className="px-3 py-2 relative group">
      <div className={`flex items-center space-x-1 relative z-10 ${
        isActive ? 'text-[#1a7be6]' : 'text-gray-800 group-hover:text-[#1a7be6]'
      } transition-colors duration-300`}>
        <motion.span 
          initial={false}
          animate={isActive ? { rotate: 0, scale: 1.1 } : { rotate: 0, scale: 1 }}
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="text-sm"
        >
          {renderIcon(icon, isActive)}
        </motion.span>
        <span className="font-medium">{title}</span>
      </div>
      
      {/* Sliding underline indicator */}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a7be6] rounded-full"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      
      {/* Hover indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: isActive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a7be6]/30 rounded-full origin-left"
      />
    </button>
  );
}

// Function to render icons for nav items
function renderIcon(iconName, isActive) {
  const activeClass = isActive ? "text-[#1a7be6]" : "text-gray-600 group-hover:text-[#1a7be6]";
  
  switch(iconName) {
    case 'home':
      return (
        <svg className={`w-5 h-5 ${activeClass}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'services':
      return (
        <svg className={`w-5 h-5 ${activeClass}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'portfolio':
      return (
        <svg className={`w-5 h-5 ${activeClass}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'events':
      return (
        <svg className={`w-5 h-5 ${activeClass}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'about':
      return (
        <svg className={`w-5 h-5 ${activeClass}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'contact':
      return (
        <svg className={`w-5 h-5 ${activeClass}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.481-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.796.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 01-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      );
    default:
      return null;
  }
}