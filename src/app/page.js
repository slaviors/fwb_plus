import Hero from "@/components/Hero";
import EventComponent from "@/components/EventComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import ClientsSlider from "@/components/ClientsSlider";
import GalleryPreview from "@/components/GalleryPreview";
import ContactLocation from "@/components/ContactLocation";
import Image from "next/image";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Services from "@/components/Service";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <ClientsSlider />

      {/* Services Section */}
      <Services />

      {/* Event Section */}
      <EventComponent />

      <GalleryPreview />

      <TestimonialSlider />

      <ContactLocation />

      <Footer />
    </main>
  );
}
