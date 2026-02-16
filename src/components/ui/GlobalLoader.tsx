"use client";

import { useEffect, useState } from "react";

const loadingMessages = [
  "Fetching your style...",
  "Preparing the salon...",
  "Getting things ready...",
  "Almost there...",
  "Loading beauty...",
];

export default function GlobalLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-cream/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      {/* Animated Beauty Icon */}
      <div className="relative mb-8">
        {/* Glowing ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-light via-pink to-pink-dark blur-xl opacity-50 animate-pulse" />
        
        {/* Spinner */}
        <div className="relative w-20 h-20 rounded-full gradient-pink flex items-center justify-center animate-spin-slow">
          {/* Inner static content */}
          <div className="absolute inset-1 rounded-full bg-cream flex items-center justify-center">
            {/* Scissors/Comb Icon */}
            <svg
              className="w-8 h-8 text-pink"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              {/* Scissors icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25l-.75-.75m0 0l-3-3m3 3l-3 3m3-3l.75.75M7.5 15.75l-.75.75m0 0l-3 3m3-3l-3-3m3 3l.75-.75m8.25-11.25l-.75.75m0 0l-3 3m3-3l3 3m-3-3l.75.75m0 6.75l-.75-.75m0 0l-3-3m3 3l3-3m-3 3l.75-.75"
              />
            </svg>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-pink-light animate-bounce" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-pink animate-bounce delay-100" />
        <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-pink-dark animate-bounce delay-200" />
      </div>

      {/* Dynamic Loading Text */}
      <div className="text-center">
        <p className="text-lg font-medium text-charcoal animate-fade-in-out">
          {loadingMessages[messageIndex]}
        </p>
        
        {/* Progress dots */}
        <div className="flex gap-1 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-pink animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
