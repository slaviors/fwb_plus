'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo() {
  // Path logo utama - sama untuk desktop dan mobile
  const logoPath = "/images/assets/logo/logo-FWB-shadow-PNG-Transparan.png";
  
  return (
    <Link href="/">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center"
      >
        {/* Logo desktop - Full logo */}
        <div className="relative hidden md:block">
          <div className="relative h-8 w-[180px]">
            <Image
              src={logoPath}
              alt="FWB Plus Logo"
              fill
              style={{ 
                objectFit: 'contain',
                maxWidth: "100%"
              }}
              priority
            />
          </div>
        </div>
        
        {/* Logo mobile - Same logo, smaller size */}
        <div className="relative block md:hidden">
          <div className="relative h-8 w-[140px]">
            <Image
              src={logoPath}
              alt="FWB Plus Logo"
              fill
              style={{ 
                objectFit: 'contain',
                maxWidth: "100%"
              }}
              priority
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}