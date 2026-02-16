"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

const categories = ["All", "Hair", "Nails", "Other"] as const;

type Category = (typeof categories)[number];

interface ServiceFilterProps {
  className?: string;
}

export default function ServiceFilter({ className }: ServiceFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = (searchParams.get("category") as Category) || "All";
  const currentSearch = searchParams.get("q") || "";

  // Update URL with new params
  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value !== "All") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.push(newUrl, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Handle category change
  const handleCategoryChange = (category: Category) => {
    updateParams("category", category);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams("q", e.target.value);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
        <input
          type="text"
          placeholder="Search services..."
          value={currentSearch}
          onChange={handleSearchChange}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-pink-light/50 bg-white focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all shadow-soft"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={cn(
              "px-6 py-2 rounded-full font-medium transition-all",
              currentCategory === category
                ? "gradient-pink text-white"
                : "bg-cream text-charcoal hover:bg-pink-light/30 hover:text-pink shadow-soft"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
