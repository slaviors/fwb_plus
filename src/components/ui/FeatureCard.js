'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FeatureCard({ title, description, icon, color = "#1a7be6", index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div 
          className="w-16 h-16 rounded-lg mb-5 flex items-center justify-center" 
          style={{ backgroundColor: `${color}10` }}
        >
          <div className="relative w-8 h-8">
            <Image
              src={icon}
              alt={title}
              fill
              sizes="32px"
            />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ color }}>
          {title}
        </h3>
        
        <p className="text-gray-600">
          {description}
        </p>
      </div>
      
      <div className="h-1" style={{ backgroundColor: color }}></div>
    </motion.div>
  );
}