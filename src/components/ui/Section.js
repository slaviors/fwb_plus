'use client';
import { motion } from 'framer-motion';

export default function Section({ 
  children, 
  title, 
  subtitle = '', 
  accent = 'primary', 
  bgColor = 'white',
  pattern = false 
}) {
  const accentColors = {
    primary: 'bg-[#1a7be6] from-[#1a7be6] to-[#1a7be6]',
    secondary: 'bg-[#f35e0e] from-[#f35e0e] to-[#f35e0e]',
    accent: 'bg-[#ce1010] from-[#ce1010] to-[#ce1010]',
    gradient: 'bg-gradient-to-r from-[#ce1010] via-[#f35e0e] to-[#1a7be6]'
  };

  const bgColors = {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
    primary: 'bg-[#1a7be6]/5',
  };

  return (
    <section className={`py-16 md:py-24 relative ${bgColors[bgColor]}`}>
      {/* Pattern background - optional */}
      {pattern && (
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-10 md:grid-cols-20 h-full">
              {Array.from({ length: 200 }).map((_, i) => (
                <div key={i} className="border border-gray-900"></div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(title || subtitle) && (
          <div className="mb-12 md:mb-16 text-center">
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-4 relative inline-block"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {title}
                </h2>
                <div className={`h-1 mt-2 ${accentColors[accent]}`}></div>
              </motion.div>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
}