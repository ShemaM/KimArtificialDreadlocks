import Link from "next/link";
import { Scissors, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function BarbershopBanner() {
  return (
    <section className="py-8 bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal">
      <div className="container mx-auto px-4">
        <Card 
          variant="elevated" 
          padding="lg" 
          className="bg-gradient-to-r from-charcoal to-charcoal-light border-2 border-rasta-yellow text-white max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-rasta-yellow flex items-center justify-center">
                <Scissors className="w-8 h-8 text-charcoal" />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-2 text-white">
                Looking for a Fresh Fade?
              </h3>
              <p className="text-cream text-lg">
                Visit <span className="font-semibold text-rasta-yellow">Kim&apos;s Barbershop</span>, 
                conveniently located right next door!
              </p>
            </div>
            
            {/* CTA */}
            <div className="flex-shrink-0">
              <a
                href="tel:+254716867526"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rasta-yellow text-charcoal font-semibold rounded-full hover:bg-rasta-yellow/90 transition-all hover:gap-3"
              >
                Call to Book
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
