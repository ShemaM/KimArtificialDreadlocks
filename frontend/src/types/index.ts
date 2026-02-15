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
  category: "Hair" | "Nails" | "Other";
  createdAt?: string;
  updatedAt?: string;
}

// Gallery Types
export interface GalleryImage {
  id: string;
  image: string;
  category: "Dreadlocks" | "Braids" | "Nails" | "Other Styles";
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
  status: BookingStatus;
  notes?: string;
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
