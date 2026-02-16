"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsAppWidget() {
  return (
    <a
      href="https://wa.me/254716867526"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 hover:scale-110 group touch-manipulation"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      
      {/* Tooltip - hidden on mobile, shown on desktop */}
      <span className="absolute right-16 bg-charcoal text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
        Chat on WhatsApp
      </span>
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
    </a>
  );
}
