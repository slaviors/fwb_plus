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
    <section id="clients">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full overflow-hidden py-8"
      >
      <div className="flex animate-marquee">
        {[...clients, ...clients].map((client, index) => (
          <div 
            key={`${client.name}-${index}`} 
            className="flex-shrink-0 w-[180px] mx-6 transition-all duration-300"
          >
            <div className={`flex items-center justify-center h-20 rounded-md shadow-sm p-3 ${
              client.darkBg ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className="relative w-full h-full">
                <Image 
                  src={client.logo} 
                  alt={client.name} 
                  fill 
                  sizes="180px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      </motion.div>
    </section>
  );
}