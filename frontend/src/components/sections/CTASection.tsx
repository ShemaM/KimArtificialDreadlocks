import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-pink" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready for Your Transformation?
          </h2>

          {/* Description */}
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your appointment today and let our expert stylists create the
            perfect look for you. Whether it&apos;s stunning dreadlocks, elegant
            braids, or beautiful nails - we&apos;ve got you covered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking">
              <Button
                variant="secondary"
                size="lg"
                className="gap-2 bg-white text-pink hover:bg-cream"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>
            <a href="tel:+254716867526">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white text-white hover:bg-white hover:text-pink"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>+254 716 867 526</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Open Mon-Sat: 8AM - 7PM</span>
            </div>
          </div>

          {/* Rasta Stripe Decoration */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-16 h-1 rounded-full bg-rasta-red" />
            <div className="w-16 h-1 rounded-full bg-rasta-yellow" />
            <div className="w-16 h-1 rounded-full bg-rasta-green" />
          </div>
        </div>
      </div>
    </section>
  );
}
