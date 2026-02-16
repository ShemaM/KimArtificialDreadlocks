// Service Types
export interface SubService {
  name: string;
  price: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  image: string;
  additionalImages?: string[];
  subServices?: SubService[];
  category: "dreadlocks" | "styling" | "nails";
  slug?: string;
  featured?: boolean;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Gallery Types
export interface GalleryImage {
  id: string;
  image: string;
  category: "Dreadlocks" | "Styling" | "Nails";
  caption?: string;
  alt?: string;
  createdAt?: string;
}

// Booking Types
export type BookingStatus = "Pending" | "Accepted" | "Held" | "Declined";

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  service?: Service;
  bookingDate: string;
  bookingTime: string;
  status: BookingStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Review Types
export interface Review {
  id: string;
  booking: string | Booking;
  customerName: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Form Types
export interface BookingFormData {
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
}

// Filter Types
export type GalleryCategory = "All" | GalleryImage["category"];
export type ServiceCategory = "All" | Service["category"];
