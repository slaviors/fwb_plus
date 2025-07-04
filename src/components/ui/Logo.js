'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo() {
  // Path logo utama
  const logoPath = "/images/assets/logo/logo-FWB-shadow-PNG-Transparan.png";
  
  // Logo mark (logo icon only) untuk mobile
  const logoMarkPath = "/images/assets/logo/Logo FWB Shadow PNG.png";
  
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
            
            {/* Logo mobile - Logo mark only */}
        <div className="relative block md:hidden">
          <div className="relative h-10 w-10">
            <Image
              src={logoMarkPath}
              alt="FWB Plus Logo"
              width={40}
              height={40}
              style={{ 
                objectFit: 'contain',
                maxWidth: "100%",
                height: "auto"
              }}
              priority
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}