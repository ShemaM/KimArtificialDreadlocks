import { Metadata } from "next";
import { Suspense } from "react";
import CTASection from "@/components/sections/CTASection";
import ServicesList from "@/components/sections/ServicesList";
import GlobalLoader from "@/components/ui/GlobalLoader";

export const metadata: Metadata = {
  title: "Professional Beauty Services in Kitengela | Kim's Dreadlocks & Nails Spa",
  description:
    "Expert beauty services in Kitengela: Congolese Artificial Dreadlocks, Knotless Braids, Professional Nails, Hair Styling. Located at Rontech Apartments, Deliverance Road, Kitengela. Book today!",
  keywords: [
    "artificial dreadlocks Kitengela",
    "Congolese dreadlocks Kitengela",
    "knotless braids Kitengela",
    "nail salon Kitengela",
    "beauty salon Kitengela",
    "hair styling Kitengela",
    "Rontech Apartments salon",
    "Deliverance Road beauty",
  ],
  openGraph: {
    title: "Professional Beauty Services in Kitengela | Kim's Dreadlocks & Nails Spa",
    description:
      "Expert Congolese Artificial Dreadlocks, Braids & Nails in Kitengela. Located at Rontech Apartments, Deliverance Road.",
    type: "website",
    locale: "en_KE",
    siteName: "Kim's Dreadlocks & Nails Spa",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
              Our Services
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              Expert Beauty Services
            </h1>
            <p className="text-lg text-charcoal-light">
              From stunning dreadlocks to gorgeous nails, we offer a complete
              range of beauty services tailored to make you look and feel your
              best. All services are performed by skilled professionals using
              premium products.
            </p>
          </div>
        </div>
      </section>

      {/* Services Listing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Suspense fallback={<GlobalLoader />}>
            <ServicesList />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
