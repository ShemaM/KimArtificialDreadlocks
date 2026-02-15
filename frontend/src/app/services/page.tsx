import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scissors, Palette, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Services | Kim's Dreadlocks & Nails Spa",
  description:
    "Explore our comprehensive range of beauty services including artificial dreadlocks, braids, nail art, and spa treatments in Kitengela.",
};

// Service data - will be replaced with data from Payload CMS
const services = [
  {
    id: "1",
    title: "Artificial Dreadlocks",
    description:
      "Beautiful, long-lasting artificial dreadlocks crafted with premium synthetic or human hair extensions. Perfect for a natural, stylish look that lasts months.",
    basePrice: 5000,
    image: "/images/services/dreadlocks.jpg",
    category: "Hair",
    icon: Scissors,
    subServices: [
      { name: "Short Dreadlocks (up to 12 inches)", price: 5000 },
      { name: "Medium Dreadlocks (12-18 inches)", price: 7000 },
      { name: "Long Dreadlocks (18+ inches)", price: 9000 },
      { name: "Dreadlock Maintenance", price: 2000 },
      { name: "Dreadlock Styling", price: 1500 },
    ],
  },
  {
    id: "2",
    title: "Box Braids",
    description:
      "Classic protective box braids available in various sizes from micro to jumbo. Customized styling options for your perfect look.",
    basePrice: 3500,
    image: "/images/services/braids.jpg",
    category: "Hair",
    icon: Scissors,
    subServices: [
      { name: "Micro Braids", price: 5000 },
      { name: "Small Box Braids", price: 4000 },
      { name: "Medium Box Braids", price: 3500 },
      { name: "Jumbo Box Braids", price: 3000 },
      { name: "Knotless Braids", price: 4500 },
    ],
  },
  {
    id: "3",
    title: "Cornrows & Patterns",
    description:
      "Intricate cornrow designs from simple straight-backs to complex artistic patterns. Express your style with our expert cornrow styling.",
    basePrice: 1500,
    image: "/images/services/braids.jpg",
    category: "Hair",
    icon: Scissors,
    subServices: [
      { name: "Simple Straight-backs", price: 1500 },
      { name: "Feed-in Cornrows", price: 2500 },
      { name: "Stitch Cornrows", price: 3000 },
      { name: "Cornrow Designs", price: 3500 },
      { name: "Lemonade Braids", price: 4000 },
    ],
  },
  {
    id: "4",
    title: "Twists & Locs",
    description:
      "Beautiful twist styles including passion twists, Senegalese twists, and starter locs. Protective styling at its finest.",
    basePrice: 3000,
    image: "/images/services/dreadlocks.jpg",
    category: "Hair",
    icon: Scissors,
    subServices: [
      { name: "Two-Strand Twists", price: 3000 },
      { name: "Passion Twists", price: 4500 },
      { name: "Senegalese Twists", price: 4000 },
      { name: "Spring Twists", price: 4000 },
      { name: "Starter Locs", price: 3500 },
    ],
  },
  {
    id: "5",
    title: "Nail Art & Extensions",
    description:
      "Express your personality with stunning nail art designs, from simple elegance to intricate masterpieces. Gel polish and acrylic extensions available.",
    basePrice: 2000,
    image: "/images/services/nails.jpg",
    category: "Nails",
    icon: Palette,
    subServices: [
      { name: "Gel Polish Manicure", price: 1500 },
      { name: "Acrylic Extensions (Full Set)", price: 3000 },
      { name: "Gel Extensions", price: 3500 },
      { name: "Nail Art (per nail)", price: 100 },
      { name: "French Tips", price: 2000 },
      { name: "Nail Repair", price: 500 },
    ],
  },
  {
    id: "6",
    title: "Pedicure Services",
    description:
      "Pamper your feet with our professional pedicure services. Includes nail shaping, cuticle care, and your choice of polish.",
    basePrice: 1500,
    image: "/images/services/nails.jpg",
    category: "Nails",
    icon: Palette,
    subServices: [
      { name: "Classic Pedicure", price: 1500 },
      { name: "Spa Pedicure", price: 2500 },
      { name: "Gel Pedicure", price: 2000 },
      { name: "Pedicure with Nail Art", price: 2500 },
    ],
  },
  {
    id: "7",
    title: "Hair Treatments",
    description:
      "Nourishing treatments for healthy, beautiful hair. Deep conditioning, protein treatments, and scalp care for all hair types.",
    basePrice: 1000,
    image: "/images/services/spa.jpg",
    category: "Other",
    icon: Sparkles,
    subServices: [
      { name: "Deep Conditioning Treatment", price: 1000 },
      { name: "Protein Treatment", price: 1500 },
      { name: "Hot Oil Treatment", price: 1200 },
      { name: "Scalp Treatment", price: 1500 },
      { name: "Hair Steaming", price: 800 },
    ],
  },
  {
    id: "8",
    title: "Wig Services",
    description:
      "Professional wig installation, customization, and styling. Lace front application, wig making, and maintenance services.",
    basePrice: 2500,
    image: "/images/services/dreadlocks.jpg",
    category: "Hair",
    icon: Scissors,
    subServices: [
      { name: "Lace Front Installation", price: 2500 },
      { name: "Closure Installation", price: 2000 },
      { name: "Wig Customization", price: 3000 },
      { name: "Wig Styling", price: 1500 },
      { name: "Wig Removal & Wash", price: 1000 },
    ],
  },
];

const categories = ["All", "Hair", "Nails", "Other"];

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
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  index === 0
                    ? "gradient-pink text-white"
                    : "bg-cream text-charcoal hover:bg-pink-light/30 hover:text-pink shadow-soft"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid gap-8">
            {services.map((service, index) => (
              <Card
                key={service.id}
                variant="elevated"
                padding="none"
                className="overflow-hidden"
              >
                <div
                  className={`grid md:grid-cols-2 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-64 md:h-auto min-h-[300px] ${
                      index % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent md:hidden" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-charcoal flex items-center gap-2">
                      <service.icon className="w-4 h-4 text-pink" />
                      {service.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`p-8 flex flex-col justify-center ${
                      index % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <h2 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal mb-4">
                      {service.title}
                    </h2>
                    <p className="text-charcoal-light mb-6">
                      {service.description}
                    </p>

                    {/* Sub-services */}
                    {service.subServices && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-charcoal mb-3">
                          Available Options:
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {service.subServices.map((sub, i) => (
                            <li
                              key={i}
                              className="flex items-center justify-between text-sm bg-cream rounded-lg px-3 py-2"
                            >
                              <span className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-pink" />
                                {sub.name}
                              </span>
                              <span className="font-semibold text-pink">
                                {formatPrice(sub.price)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-charcoal-light">
                          Starting from
                        </span>
                        <p className="font-playfair text-2xl font-bold text-pink">
                          {formatPrice(service.basePrice)}
                        </p>
                      </div>
                      <Link href="/booking">
                        <Button className="gap-2">
                          Book Now
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
