"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

// Gallery data - will be replaced with data from Payload CMS
const galleryImages = [
  {
    id: "1",
    image: "/images/gallery/dreadlocks-1.jpg",
    category: "Dreadlocks",
    alt: "Beautiful artificial dreadlocks - Style 1",
  },
  {
    id: "2",
    image: "/images/gallery/dreadlocks-2.jpg",
    category: "Dreadlocks",
    alt: "Long artificial dreadlocks styling",
  },
  {
    id: "3",
    image: "/images/gallery/braids-1.jpg",
    category: "Braids",
    alt: "Elegant box braids design",
  },
  {
    id: "4",
    image: "/images/gallery/braids-2.jpg",
    category: "Braids",
    alt: "Knotless braids styling",
  },
  {
    id: "5",
    image: "/images/gallery/nails-1.jpg",
    category: "Nails",
    alt: "Stunning nail art design - Pink theme",
  },
  {
    id: "6",
    image: "/images/gallery/nails-2.jpg",
    category: "Nails",
    alt: "French tip nail extensions",
  },
  {
    id: "7",
    image: "/images/gallery/dreadlocks-1.jpg",
    category: "Dreadlocks",
    alt: "Medium length dreadlocks",
  },
  {
    id: "8",
    image: "/images/gallery/braids-1.jpg",
    category: "Other Styles",
    alt: "Mixed style braids and twists",
  },
  {
    id: "9",
    image: "/images/gallery/nails-1.jpg",
    category: "Nails",
    alt: "Acrylic nail extensions with art",
  },
  {
    id: "10",
    image: "/images/gallery/braids-2.jpg",
    category: "Braids",
    alt: "Passion twists styling",
  },
  {
    id: "11",
    image: "/images/gallery/dreadlocks-2.jpg",
    category: "Other Styles",
    alt: "Loc styling and retwist",
  },
  {
    id: "12",
    image: "/images/gallery/nails-2.jpg",
    category: "Nails",
    alt: "Gel polish manicure",
  },
];

const categories = ["All", "Dreadlocks", "Braids", "Nails", "Other Styles"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
              Our Gallery
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              Our Beautiful Work
            </h1>
            <p className="text-lg text-charcoal-light">
              Browse through our portfolio of stunning transformations. Each
              image showcases our commitment to excellence and creativity in
              every style we create.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "gradient-pink text-white"
                    : "bg-cream text-charcoal hover:bg-pink-light/30 hover:text-pink shadow-soft"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((item, index) => (
              <div
                key={item.id}
                className={`relative group rounded-2xl overflow-hidden shadow-soft cursor-pointer ${
                  index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
                onClick={() => setSelectedImage(item)}
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

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-charcoal-light text-lg">
                No images found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <Image
              src={selectedImage.image}
              alt={selectedImage.alt}
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
            <p className="font-playfair text-xl font-semibold">
              {selectedImage.category}
            </p>
            <p className="text-white/80">{selectedImage.alt}</p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
