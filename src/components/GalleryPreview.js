'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Section from './ui/Section';

export default function GalleryPreview() {
  // Sampel gallery images - ganti dengan gambar event FWB+ yang sebenarnya
  const galleryImages = [
    { id: 1, src: "/images/gallery/event1.png", alt: "Corporate Meeting", category: "Corporate" },
    { id: 2, src: "/images/gallery/event2.png", alt: "Wedding Party", category: "Wedding" },
    { id: 3, src: "/images/gallery/event3.png", alt: "Product Launch", category: "Corporate" },
    { id: 4, src: "/images/gallery/event4.png", alt: "Family Gathering", category: "Gathering" },
    { id: 5, src: "/images/gallery/event5.png", alt: "Annual Conference", category: "Corporate" },
    { id: 6, src: "/images/gallery/event6.png", alt: "Birthday Party", category: "Celebration" },
  ];

  return (
    <Section
      title="Portfolio Kami"
      subtitle="Dokumentasi dari berbagai event yang telah kami tangani"
      bgColor="primary"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-lg shadow-md aspect-square"
          >
            <div className="absolute inset-0">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                sizes="(max-width: 768px) 50vw, 33vw" 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-white font-semibold">{image.alt}</span>
              <span className="text-white/70 text-sm">{image.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Link 
          href="/gallery" 
          className="inline-flex items-center text-white font-medium hover:text-white/80 transition-colors"
        >
          Lihat Semua Portfolio
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}