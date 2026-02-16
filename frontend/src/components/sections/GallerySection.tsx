import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Sample gallery data - will be replaced with data from Payload CMS
const galleryImages = [
  {
    id: "1",
    image: "/images/gallery/dreadlocks-1.jpg",
    category: "Dreadlocks",
    alt: "Beautiful artificial dreadlocks styling",
  },
  {
    id: "2",
    image: "/images/gallery/braids-1.jpg",
    category: "Braids",
    alt: "Elegant box braids design",
  },
  {
    id: "3",
    image: "/images/gallery/nails-1.jpg",
    category: "Nails",
    alt: "Stunning nail art design",
  },
  {
    id: "4",
    image: "/images/gallery/dreadlocks-2.jpg",
    category: "Dreadlocks",
    alt: "Long dreadlocks with styling",
  },
  {
    id: "5",
    image: "/images/gallery/braids-2.jpg",
    category: "Braids",
    alt: "Protective knotless braids",
  },
  {
    id: "6",
    image: "/images/gallery/nails-2.jpg",
    category: "Nails",
    alt: "French tip nail design",
  },
];

const categories = ["Dreadlocks", "Styling", "Nails"];

export default function GallerySection() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
            Our Gallery
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Our Beautiful Work
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto">
            Browse through our portfolio of stunning transformations and find
            inspiration for your next look.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-6 py-2 rounded-full gradient-pink text-white font-medium transition-all">
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full bg-white text-charcoal font-medium hover:bg-pink-light/30 hover:text-pink transition-all shadow-soft"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className={`relative group rounded-2xl overflow-hidden shadow-soft ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div
                className={`relative ${
                  index === 0 ? "h-[400px] sm:h-[500px]" : "h-64"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-charcoal">
                  {item.category}
                </span>

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <p className="font-playfair text-lg font-semibold">
                      {item.category}
                    </p>
                    <p className="text-sm text-white/80">{item.alt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/gallery">
            <Button variant="outline" size="lg" className="gap-2">
              View Full Gallery
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
