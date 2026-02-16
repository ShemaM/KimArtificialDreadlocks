import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BarbershopBanner from "@/components/sections/BarbershopBanner";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BarbershopBanner />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
