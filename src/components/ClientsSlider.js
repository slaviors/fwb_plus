'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ClientsSlider() {
  // Sampel clients - ganti dengan klien FWB Plus yang sebenarnya
  const clients = [
    { name: "Company A", logo: "/images/clients/client1.png" },
    { name: "Company B", logo: "/images/clients/client2.png" },
    { name: "Company C", logo: "/images/clients/client3.png" },
    { name: "Company D", logo: "/images/clients/client4.png" },
    { name: "Company E", logo: "/images/clients/client5.png" },
    { name: "Company F", logo: "/images/clients/client6.png" },
    { name: "Company G", logo: "/images/clients/client7.png" },
    { name: "Company H", logo: "/images/clients/client8.png" },
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
            className="flex-shrink-0 w-[180px] mx-6 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <div className="flex items-center justify-center h-20 bg-white rounded-md shadow-sm p-3">
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