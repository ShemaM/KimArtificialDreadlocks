"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Review } from "@/types";

// Static fallback testimonials
const staticTestimonials = [
  {
    id: "1",
    customerName: "Sarah Wanjiku",
    role: "Regular Client",
    comment:
      "Kim's Spa has transformed my look completely! The dreadlocks they did for me are absolutely stunning and have lasted for months. The team is so professional and friendly.",
    rating: 5,
  },
  {
    id: "2",
    customerName: "Grace Otieno",
    role: "First-time Client",
    comment:
      "I was nervous about getting braids for the first time, but the stylists made me feel so comfortable. The result exceeded my expectations! Will definitely be coming back.",
    rating: 5,
  },
  {
    id: "3",
    customerName: "Mary Kimani",
    role: "Nail Art Enthusiast",
    comment:
      "The nail art at Kim's is unmatched! They listen to exactly what you want and create magic. My nails always get compliments wherever I go.",
    rating: 5,
  },
];

interface Testimonial {
  id: string;
  customerName: string;
  role?: string;
  comment: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();

        if (!data.fallbackToStatic && data.docs && data.docs.length > 0) {
          // Map API reviews to testimonial format
          const dynamicTestimonials: Testimonial[] = data.docs.map(
            (review: Review) => ({
              id: review.id,
              customerName: review.customerName,
              role: "Verified Client",
              comment: review.comment,
              rating: review.rating,
            })
          );
          setTestimonials(dynamicTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Keep static testimonials on error
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  // Show skeleton while loading
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
              Testimonials
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
              What Our Clients Say
            </h2>
            <p className="text-charcoal-light max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied
              clients about their experience at Kim&apos;s Spa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="elevated" padding="lg" className="animate-pulse">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 rounded bg-gray-200" />
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            What Our Clients Say
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied
            clients about their experience at Kim&apos;s Spa.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              variant="elevated"
              padding="lg"
              className="relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 w-10 h-10 rounded-full gradient-pink flex items-center justify-center">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-rasta-yellow fill-rasta-yellow"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-charcoal-light leading-relaxed mb-6">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center">
                  <span className="font-playfair text-pink font-bold text-lg">
                    {testimonial.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">
                    {testimonial.customerName}
                  </p>
                  <p className="text-sm text-charcoal-light">
                    {testimonial.role || "Verified Client"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
