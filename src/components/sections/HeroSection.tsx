import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-pink-soft" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-pink-light/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-pink/10 blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft">
              <Sparkles className="w-4 h-4 text-pink" />
              <span className="text-sm font-medium text-charcoal">
                Premier Beauty Salon in Kitengela
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
              Transform Your Look with{" "}
              <span className="text-pink">Beautiful Dreadlocks</span> & Stunning{" "}
              <span className="text-pink">Nails</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-charcoal-light max-w-lg leading-relaxed">
              The Premier Destination for Congolese Artificial Dreadlocks in Kitengela & Environs.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <p className="font-playfair text-3xl font-bold text-pink">
                  500+
                </p>
                <p className="text-sm text-charcoal-light">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="font-playfair text-3xl font-bold text-pink">
                  14+
                </p>
                <p className="text-sm text-charcoal-light">Services</p>
              </div>
              <div className="text-center">
                <p className="font-playfair text-3xl font-bold text-pink">5+</p>
                <p className="text-sm text-charcoal-light">Years Experience</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/booking">
                <Button size="lg" className="gap-2">
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="col-span-2 relative h-72 rounded-2xl overflow-hidden shadow-soft-lg">
                <Image
                  src="/images/hero-main.jpg"
                  alt="Beautiful dreadlocks styling at Kim's Spa"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-pink-light border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-charcoal">
                    500+ Happy Clients
                  </span>
                </div>
              </div>

              {/* Secondary Images */}
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-soft">
                <Image
                  src="/images/hero-nails.jpg"
                  alt="Professional nail art services"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                  <Heart className="w-4 h-4 text-pink fill-pink" />
                </div>
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden shadow-soft">
                <Image
                  src="/images/hero-braids.jpg"
                  alt="Expert braiding services"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 flex items-center gap-1">
                  <Star className="w-4 h-4 text-rasta-yellow fill-rasta-yellow" />
                  <span className="text-xs font-medium">4.9</span>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-soft-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-pink flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Expert Stylists</p>
                  <p className="text-sm text-charcoal-light">
                    Professional care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-pink flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-pink" />
        </div>
      </div>
    </section>
  );
}
