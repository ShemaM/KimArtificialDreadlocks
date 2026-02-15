import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact Us | Kim's Dreadlocks & Nails Spa",
  description:
    "Get in touch with Kim's Dreadlocks & Nails Spa in Kitengela. Visit us, call, or send us a message. We're here to help with all your beauty needs.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Kitengela Town", "Kajiado County, Kenya"],
    action: {
      label: "Get Directions",
      href: "https://maps.google.com/?q=Kitengela+Kenya",
    },
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+254 716 867 526"],
    action: {
      label: "Call Now",
      href: "tel:+254716867526",
    },
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["shemamanase992@gmail.com"],
    action: {
      label: "Send Email",
      href: "mailto:shemamanase992@gmail.com",
    },
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 8:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
    action: null,
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/kimsdrealocks",
    color: "hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/kimsdreadlocks",
    color: "hover:bg-blue-600",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/254716867526",
    color: "hover:bg-green-500",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
              Contact Us
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-charcoal-light">
              Have questions about our services? Want to book an appointment?
              We&apos;re here to help! Reach out to us through any of the
              channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((item) => (
              <Card
                key={item.title}
                variant="elevated"
                padding="lg"
                className="text-center group hover:border-pink transition-colors"
              >
                <div className="w-14 h-14 rounded-full gradient-pink flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-3">
                  {item.title}
                </h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-charcoal-light text-sm">
                    {detail}
                  </p>
                ))}
                {item.action && (
                  <a
                    href={item.action.href}
                    target={item.action.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-pink font-medium text-sm mt-4 hover:gap-3 transition-all"
                  >
                    {item.action.label}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Social Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Map */}
            <Card variant="elevated" padding="none" className="overflow-hidden">
              <div className="h-[400px] bg-cream-dark flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-12 h-12 text-pink mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">
                    Find Us on the Map
                  </h3>
                  <p className="text-charcoal-light mb-4">
                    Kitengela Town, Kajiado County, Kenya
                  </p>
                  <a
                    href="https://maps.google.com/?q=Kitengela+Kenya"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      Open in Google Maps
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            {/* Social & Quick Contact */}
            <div className="space-y-6">
              {/* Social Links */}
              <Card variant="elevated" padding="lg">
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                  Follow Us
                </h3>
                <p className="text-charcoal-light mb-6">
                  Stay connected and see our latest work on social media. Follow
                  us for inspiration, tips, and exclusive offers!
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-charcoal hover:text-white hover:bg-pink transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </Card>

              {/* Quick Contact */}
              <Card variant="elevated" padding="lg" className="gradient-pink-soft">
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                  Quick Contact
                </h3>
                <p className="text-charcoal-light mb-6">
                  Ready to book your appointment? Chat with us directly on
                  WhatsApp for instant responses!
                </p>
                <a
                  href="https://wa.me/254716867526?text=Hello! I'd like to book an appointment at Kim's Spa."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2 w-full bg-green-500 hover:bg-green-600">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </Card>

              {/* Book CTA */}
              <Card variant="elevated" padding="lg">
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                  Ready for Your Transformation?
                </h3>
                <p className="text-charcoal-light mb-6">
                  Book your appointment online and let us create your perfect
                  look.
                </p>
                <Link href="/booking">
                  <Button className="gap-2 w-full">
                    Book Appointment
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Rasta Stripe Decoration */}
      <div className="h-2 rasta-stripe" />
    </>
  );
}
