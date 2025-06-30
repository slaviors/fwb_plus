import Hero from "@/components/Hero";
import EventComponent from "@/components/EventComponent";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import TestimonialSlider from "@/components/TestimonialSlider";
import ClientsSlider from "@/components/ClientsSlider";
import GalleryPreview from "@/components/GalleryPreview";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Services from "@/components/Service";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />

      {/* Services Section */}
      <Services />

      {/* Event Section */}
      <EventComponent />

      <Footer />
    </main>
  );
}
