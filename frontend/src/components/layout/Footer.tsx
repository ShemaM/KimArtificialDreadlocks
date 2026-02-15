import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Book Appointment", href: "/booking" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  "Artificial Dreadlocks",
  "Braids & Twists",
  "Nail Art & Extensions",
  "Hair Styling",
  "Spa Treatments",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      {/* Rasta Accent Stripe */}
      <div className="h-2 rasta-stripe" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full gradient-pink flex items-center justify-center">
                <span className="font-playfair text-white text-xl font-bold">
                  K
                </span>
              </div>
              <div>
                <h3 className="font-playfair text-lg font-semibold leading-tight">
                  Kim&apos;s Dreadlocks
                </h3>
                <p className="text-xs text-text-muted">& Nails Spa</p>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Your premier destination for beautiful artificial dreadlocks,
              stunning braids, and professional nail services in Kitengela.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/254716867526"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-text-muted">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-muted">
                  Kitengela Town, Kajiado County, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-pink flex-shrink-0" />
                <a
                  href="tel:+254716867526"
                  className="text-sm text-text-muted hover:text-pink transition-colors"
                >
                  +254 716 867 526
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-pink flex-shrink-0" />
                <a
                  href="mailto:shemamanase992@gmail.com"
                  className="text-sm text-text-muted hover:text-pink transition-colors"
                >
                  shemamanase992@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-pink flex-shrink-0 mt-0.5" />
                <div className="text-sm text-text-muted">
                  <p>Mon - Sat: 8:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              © {currentYear} Kim&apos;s Artificial Dreadlocks & Nails Spa. All
              rights reserved.
            </p>
            <p className="text-sm text-text-muted">
              Developed by{" "}
              <span className="text-pink font-medium">Shema</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
