"use server";

import { Resend } from "resend";
import twilio from "twilio";
import { format } from "date-fns";
import type { BookingFormData } from "@/types";

// Types
interface BookingResult {
  success: boolean;
  message: string;
  bookingId?: string;
}

interface NotificationResult {
  emailSent: boolean;
  whatsappAdminSent: boolean;
  whatsappCustomerSent: boolean;
}

// Initialize clients - only create if API keys are available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

// Constants
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "shemamanase992@gmail.com";
const ADMIN_WHATSAPP = "whatsapp:+254716867526";
const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886";

/**
 * Format booking date as "Day of the week, Day, Month, Year"
 * Example: "Thursday, 19 February 2026"
 */
function formatBookingDate(date: string): string {
  return format(new Date(date), "EEEE, d MMMM yyyy");
}

/**
 * Format phone number for WhatsApp
 */
function formatWhatsAppNumber(phone: string): string {
  let cleanNumber = phone.replace(/^whatsapp:/, "").trim();
  cleanNumber = cleanNumber.replace(/[\s\-()]/g, "");

  if (!cleanNumber.startsWith("+")) {
    if (cleanNumber.startsWith("0")) {
      cleanNumber = "+254" + cleanNumber.substring(1);
    } else if (cleanNumber.startsWith("254")) {
      cleanNumber = "+" + cleanNumber;
    } else {
      cleanNumber = "+" + cleanNumber;
    }
  }

  return `whatsapp:${cleanNumber}`;
}

// Sample services data (in production, fetch from backend API)
const services = [
  { id: "1", title: "Artificial Dreadlocks" },
  { id: "2", title: "Box Braids" },
  { id: "3", title: "Cornrows & Patterns" },
  { id: "4", title: "Twists & Locs" },
  { id: "5", title: "Nail Art & Extensions" },
  { id: "6", title: "Pedicure Services" },
  { id: "7", title: "Hair Treatments" },
  { id: "8", title: "Wig Services" },
];

/**
 * Send email notification to admin
 */
async function sendAdminEmail(
  data: BookingFormData,
  serviceName: string,
  formattedDate: string
): Promise<boolean> {
  if (!resend) {
    console.warn("Email notification skipped - RESEND_API_KEY not set");
    return false;
  }
  try {
    await resend.emails.send({
      from: "Kim's Spa <noreply@kimsspa.com>",
      to: ADMIN_EMAIL,
      subject: `🎉 New Booking Request from ${data.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFF8F0; padding: 20px;">
          <h1 style="color: #FF69B4;">Kim's Dreadlocks & Nails Spa</h1>
          <div style="background: white; border-radius: 16px; padding: 24px;">
            <h2 style="color: #2D3436;">New Booking Request</h2>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Failed to send admin email:", error);
    return false;
  }
}

/**
 * Send WhatsApp notification to admin
 */
async function sendAdminWhatsApp(
  data: BookingFormData,
  serviceName: string,
  formattedDate: string
): Promise<boolean> {
  if (!twilioClient) {
    console.warn("WhatsApp admin notification skipped - Twilio credentials not set");
    return false;
  }
  try {
    await twilioClient.messages.create({
      body: `🎉 *New Booking Request*\n\n👤 Customer: ${data.customerName}\n💇 Service: ${serviceName}\n📅 Date: ${formattedDate}\n📱 Phone: ${data.phone}`,
      from: TWILIO_WHATSAPP_NUMBER,
      to: ADMIN_WHATSAPP,
    });
    return true;
  } catch (error) {
    console.error("Failed to send admin WhatsApp:", error);
    return false;
  }
}

/**
 * Send WhatsApp confirmation to customer
 * 
 * IMPORTANT: For Twilio Sandbox, customers must first send "join <sandbox-code>"
 * to the Twilio WhatsApp number before they can receive messages.
 */
async function sendCustomerWhatsApp(
  data: BookingFormData,
  serviceName: string,
  formattedDate: string
): Promise<boolean> {
  if (!twilioClient) {
    console.warn("WhatsApp customer notification skipped - Twilio credentials not set");
    return false;
  }
  try {
    const customerNumber = formatWhatsAppNumber(data.phone);
    await twilioClient.messages.create({
      body: `✨ *Booking Confirmation*\n\nHi ${data.customerName}! Thank you for booking with Kim's Spa!\n\n📋 *Details:*\n💇 Service: ${serviceName}\n📅 Date: ${formattedDate}\n\nWe'll contact you shortly to confirm.\n📍 Kitengela Town\n📞 +254 716 867 526`,
      from: TWILIO_WHATSAPP_NUMBER,
      to: customerNumber,
    });
    return true;
  } catch (error) {
    console.error("Failed to send customer WhatsApp:", error);
    return false;
  }
}

/**
 * Main Server Action: Create a booking and send notifications
 */
export async function createBooking(
  formData: BookingFormData
): Promise<BookingResult> {
  try {
    // Validate required fields
    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.serviceId ||
      !formData.bookingDate
    ) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // Get service name
    const service = services.find((s) => s.id === formData.serviceId);
    const serviceName = service?.title || "Unknown Service";
    const formattedDate = formatBookingDate(formData.bookingDate);

    // Generate a simple booking ID (in production, this would come from the database)
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Send all notifications asynchronously
    const notifications: NotificationResult = {
      emailSent: false,
      whatsappAdminSent: false,
      whatsappCustomerSent: false,
    };

    // Run notifications in parallel
    const [emailResult, whatsappAdminResult, whatsappCustomerResult] =
      await Promise.all([
        sendAdminEmail(formData, serviceName, formattedDate),
        sendAdminWhatsApp(formData, serviceName, formattedDate),
        sendCustomerWhatsApp(formData, serviceName, formattedDate),
      ]);

    notifications.emailSent = emailResult;
    notifications.whatsappAdminSent = whatsappAdminResult;
    notifications.whatsappCustomerSent = whatsappCustomerResult;

    console.log("Booking created:", {
      bookingId,
      customerName: formData.customerName,
      service: serviceName,
      date: formattedDate,
      notifications,
    });

    return {
      success: true,
      message: "Booking submitted successfully! We will contact you shortly to confirm your appointment.",
      bookingId,
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      message: "An error occurred while processing your booking. Please try again or contact us directly.",
    };
  }
}
