import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import WorkSection from '../components/WorkSection';
import ShootingServices from '../components/ShootingServices';
import ImageGallery from '../components/ImageGallery';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ParticleBackground from '../components/ParticleBackground';

export default function Home() {
  return (
    <>
      {/* Light Particled Live Ambient Background */}
      <ParticleBackground />

      {/* Sticky Top Navigation */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero Section with Interactive 3D Bulb & Profile Portrait */}
        <Hero />

        {/* Credibility & Experience Statistics */}
        <Stats />

        {/* Video Portfolio Showcase */}
        <WorkSection />

        {/* Open For Video Shooting Packages & Production Gear */}
        <ShootingServices />

        {/* Core Post-Production Services Offered */}
        <Services />

        {/* Restaurant & Commercial Branding Gallery */}
        <ImageGallery />

        {/* About the Editor */}
        <About />

        {/* Client Testimonials & Social Proof (Placed at the end before Contact) */}
        <Testimonials />

        {/* Direct Contact & Social Connections */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom-Right WhatsApp Action Button */}
      <WhatsAppButton />
    </>
  );
}
