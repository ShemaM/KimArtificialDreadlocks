"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsAppWidget() {
  return (
    <a
      href="https://wa.me/254716867526"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Tooltip */}
      <span className="absolute right-16 bg-charcoal text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat on WhatsApp
      </span>
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
    </a>
  );
}
