"use client";

import Hero from "@/components/Hero";
// import EventComponent from "@/components/EventComponent";
// import TestimonialSlider from "@/components/TestimonialSlider";
import ClientsSlider from "@/components/ClientsSlider";
import GalleryPreview from "@/components/GalleryPreview";
import ContactLocation from "@/components/ContactLocation";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Services from "@/components/Service";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <About />
      {/* <ClientsSlider /> */}
      <Services />
      {/* <EventComponent /> */}
      {/* <GalleryPreview /> */}
      {/* <TestimonialSlider /> */}
      <ContactLocation />
      <Footer />
    </main>
  );
}