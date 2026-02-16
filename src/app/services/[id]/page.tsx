import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Scissors, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import CTASection from "@/components/sections/CTASection";
import { formatPrice } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
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
    isAvailable: true,
    subServices: [
      { name: "Lace Front Installation", price: 2500 },
      { name: "Closure Installation", price: 2000 },
      { name: "Wig Customization", price: 3000 },
      { name: "Wig Styling", price: 1500 },
      { name: "Wig Removal & Wash", price: 1000 },
    ],
  },
];

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found | Kim's Dreadlocks & Nails Spa",
    };
  }

  return {
    title: `${service.title} | Kim's Dreadlocks & Nails Spa`,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service || !service.isAvailable) {
    notFound();
  }

  const Icon = service.icon as LucideIcon;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-charcoal-light hover:text-pink transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              <span className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-charcoal flex items-center gap-2">
                <Icon className="w-4 h-4 text-pink" />
                {service.category}
              </span>
            </div>

            {/* Content */}
            <div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-charcoal-light mb-6">
                {service.description}
              </p>
              <div className="mb-8">
                <span className="text-sm text-charcoal-light">Starting from</span>
                <p className="font-playfair text-3xl font-bold text-pink">
                  {formatPrice(service.basePrice)}
                </p>
              </div>
              <Link href="/booking">
                <Button size="lg" className="gap-2">
                  Book This Service
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {service.subServices && service.subServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
                Available Options & Pricing
              </h2>
              <Card variant="elevated" padding="lg">
                <ul className="divide-y divide-gray-100">
                  {service.subServices.map((sub, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                    >
                      <span className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-pink flex-shrink-0" />
                        <span className="text-charcoal">{sub.name}</span>
                      </span>
                      <span className="font-semibold text-pink text-lg">
                        {formatPrice(sub.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
