import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

/**
 * Combines clsx and tailwind-merge for conditional class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date as "Day of the week, Day, Month, Year"
 * Example: "Thursday, 19 February 2026"
 */
export function formatBookingDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "EEEE, d MMMM yyyy");
}

/**
 * Formats a phone number for WhatsApp API
 * Ensures it starts with 'whatsapp:' prefix
 */
export function formatWhatsAppNumber(phone: string): string {
  // Remove any existing 'whatsapp:' prefix
  const cleanNumber = phone.replace(/^whatsapp:/, "");
  // Ensure the number starts with +
  const formattedNumber = cleanNumber.startsWith("+")
    ? cleanNumber
    : `+${cleanNumber}`;
  return `whatsapp:${formattedNumber}`;
}

/**
 * Formats currency in Kenyan Shillings
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
