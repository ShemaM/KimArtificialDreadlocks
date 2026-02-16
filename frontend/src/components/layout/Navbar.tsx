"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Book Now", href: "/booking" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft">
      {/* Rasta Accent Stripe */}
      <div className="h-1 rasta-stripe" />

      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <div className="w-12 h-12 rounded-full gradient-pink flex items-center justify-center">
              <span className="font-playfair text-white text-xl font-bold">
                K
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-playfair text-lg font-semibold text-charcoal leading-tight">
                Kim&apos;s Dreadlocks
              </h1>
              <p className="text-xs text-charcoal-light">& Nails Spa</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-charcoal font-medium hover:text-pink transition-colors duration-200",
                  link.label === "Book Now" &&
                    "px-6 py-2 rounded-full gradient-pink text-white hover:opacity-90 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/254716867526"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-green-50 transition-colors"
              aria-label="WhatsApp"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
            </a>
            <div className="flex items-center gap-2 text-charcoal">
              <Phone className="w-4 h-4 text-pink" />
              <a
                href="tel:+254716867526"
                className="text-sm font-medium hover:text-pink transition-colors"
              >
                +254 716 867 526
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-cream transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-charcoal" />
            ) : (
              <Menu className="w-6 h-6 text-charcoal" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-cream-dark">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "text-charcoal font-medium py-2 px-4 rounded-lg hover:bg-cream transition-colors",
                  link.label === "Book Now" &&
                    "gradient-pink text-white text-center hover:opacity-90"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+254716867526"
              className="flex items-center gap-2 text-charcoal py-2 px-4"
            >
              <Phone className="w-4 h-4 text-pink" />
              <span className="font-medium">+254 716 867 526</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
