import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scissors, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";

// Sample services data - will be replaced with data from Payload CMS
const featuredServices = [
  {
    id: "1",
    title: "Artificial Dreadlocks",
    description:
      "Beautiful, long-lasting artificial dreadlocks crafted with premium synthetic or human hair extensions.",
    basePrice: 5000,
    image: "/images/services/dreadlocks.jpg",
    category: "Hair",
    icon: Scissors,
  },
  {
    id: "2",
    title: "Box Braids",
    description:
      "Classic protective box braids in various sizes, from micro to jumbo, with styling options.",
    basePrice: 3500,
    image: "/images/services/braids.jpg",
    category: "Hair",
    icon: Scissors,
  },
  {
    id: "3",
    title: "Nail Art & Extensions",
    description:
      "Express your style with stunning nail art designs, gel polish, and acrylic extensions.",
    basePrice: 2000,
    image: "/images/services/nails.jpg",
    category: "Nails",
    icon: Palette,
  },
  {
    id: "4",
    title: "Spa Treatments",
    description:
      "Relax and rejuvenate with our premium spa services including facials and hair treatments.",
    basePrice: 3000,
    image: "/images/services/spa.jpg",
    category: "Other",
    icon: Sparkles,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
            Our Services
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Expert Beauty Services
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto">
            From stunning dreadlocks to gorgeous nails, we offer a complete
            range of beauty services tailored to make you look and feel your
            best.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <Card
              key={service.id}
              variant="elevated"
              padding="none"
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <service.icon className="w-5 h-5 text-pink" />
                </div>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-charcoal">
                  {service.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2 group-hover:text-pink transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-charcoal-light mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-pink text-lg">
                    From {formatPrice(service.basePrice)}
                  </span>
                  <Link href={`/services/${service.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1 p-0">
                      View
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg" className="gap-2">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
