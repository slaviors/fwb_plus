'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ClientsSlider() {
  // Sampel clients - ganti dengan klien FWB Plus yang sebenarnya
  const clients = [
    { name: "Bank BRI", logo: "/images/clients/Bank_BRI.png" },
    { name: "BNPB", logo: "/images/clients/BNPB.png" },
    { name: "CTP", logo: "/images/clients/CreativeTechnicalProduction.png" },
    { name: "Foye", logo: "/images/clients/foye.png", darkBg: true },
    { name: "Injourney", logo: "/images/clients/injourney.png" },
    { name: "Jotun", logo: "/images/clients/jotun.png" },
    { name: "MAJU.ID", logo: "/images/clients/MAJU.png" },
    { name: "Mari Positive", logo: "/images/clients/Mari_Positive.png" },
    { name: "Mutiara Kosmetik", logo: "/images/clients/mutiara.jpg" }
  ];

  return (
    <section id="clients" className="py-8 overflow-hidden">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee-content {
          animation: marquee 20s linear infinite;
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="flex w-full overflow-hidden">
          <div className="marquee-content flex">
            {/* Duplikasi clients untuk seamless loop */}
            {[...clients, ...clients].map((client, index) => (
              <div 
                key={`${client.name}-${index}`} 
                className="flex-shrink-0 w-52 mx-2 p-2 inline-flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <div className={`flex items-center justify-center h-20 w-full rounded-md shadow-sm p-3 ${
                  client.darkBg ? 'bg-gray-900' : 'bg-white'
                }`}>
                  <div className="relative w-full h-full">
                    <Image 
                      src={client.logo} 
                      alt={client.name} 
                      fill 
                      sizes="208px"
                      style={{ objectFit: "contain" }}
                      className="transition-opacity duration-300 hover:opacity-80"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional gradient overlays for fade effect */}
        <div className="hidden md:block absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="hidden md:block absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </motion.div>
    </section>
  );
}