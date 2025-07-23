"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
// import EventComponent from "@/components/EventComponent";
import TestimonialSlider from "@/components/TestimonialSlider";
import ClientsSlider from "@/components/ClientsSlider";
import GalleryPreview from "@/components/GalleryPreview";
import ContactLocation from "@/components/ContactLocation";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Services from "@/components/Service";
import ReviewModal from "@/components/ReviewModal";

export default function Home() {
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <main className="min-h-screen relative">
      <button
        onClick={() => setReviewOpen(true)}
        className="fixed right-6 bottom-24 z-50 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center space-x-2"
        style={{ transition: "all 0.2s" }}
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V7a4 4 0 118 0v4m-4 4v4m0 0H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4z" />
        </svg>
        <span>Tulis Review</span>
      </button>
      <ReviewModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />
      <Hero />
      <About />
      <ClientsSlider />
      <Services />
      {/* <EventComponent /> */}
      <GalleryPreview />
      <TestimonialSlider />
      <ContactLocation />
      <Footer />
    </main>
  );
}