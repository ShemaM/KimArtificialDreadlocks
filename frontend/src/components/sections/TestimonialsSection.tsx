import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    id: "1",
    name: "Sarah Wanjiku",
    role: "Regular Client",
    content:
      "Kim's Spa has transformed my look completely! The dreadlocks they did for me are absolutely stunning and have lasted for months. The team is so professional and friendly.",
    rating: 5,
    image: "/images/testimonials/client-1.jpg",
  },
  {
    id: "2",
    name: "Grace Otieno",
    role: "First-time Client",
    content:
      "I was nervous about getting braids for the first time, but the stylists made me feel so comfortable. The result exceeded my expectations! Will definitely be coming back.",
    rating: 5,
    image: "/images/testimonials/client-2.jpg",
  },
  {
    id: "3",
    name: "Mary Kimani",
    role: "Nail Art Enthusiast",
    content:
      "The nail art at Kim's is unmatched! They listen to exactly what you want and create magic. My nails always get compliments wherever I go.",
    rating: 5,
    image: "/images/testimonials/client-3.jpg",
  },
];

export default function TestimonialsSection() {
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
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center">
                  <span className="font-playfair text-pink font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-charcoal-light">
                    {testimonial.role}
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
