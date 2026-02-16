import twilio from 'twilio';

// Initialize Twilio client lazily to avoid build-time errors
let twilioClient: twilio.Twilio | null = null;

function getTwilioClient(): twilio.Twilio {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    if (!accountSid || !authToken) {
      throw new Error('TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables must be set');
    }
    twilioClient = twilio(accountSid, authToken);
  }
  return twilioClient;
}

// Twilio Sandbox WhatsApp number
const TWILIO_WHATSAPP_NUMBER = 'whatsapp:+14155238886';

// Admin WhatsApp number
const ADMIN_WHATSAPP_NUMBER = 'whatsapp:+254716867526';

export interface WhatsAppMessageData {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  bookingDate: string;
}

/**
 * Format phone number for WhatsApp
 * Ensures the number starts with 'whatsapp:+' prefix
 */
export function formatWhatsAppNumber(phone: string): string {
  // Remove any existing 'whatsapp:' prefix
  let cleanNumber = phone.replace(/^whatsapp:/, '').trim();
  
  // Remove spaces, dashes, and parentheses
  cleanNumber = cleanNumber.replace(/[\s\-()]/g, '');
  
  // Ensure the number starts with +
  if (!cleanNumber.startsWith('+')) {
    // Assume Kenyan number if no country code
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '+254' + cleanNumber.substring(1);
    } else if (cleanNumber.startsWith('254')) {
      cleanNumber = '+' + cleanNumber;
    } else {
      cleanNumber = '+' + cleanNumber;
    }
  }
  
  return `whatsapp:${cleanNumber}`;
}

/**
 * Send WhatsApp notification to admin about new booking
 */
export async function sendAdminWhatsAppAlert(data: WhatsAppMessageData): Promise<boolean> {
  try {
    const message = `🎉 *New Booking Request*\n\n` +
      `👤 *Customer:* ${data.customerName}\n` +
      `💇 *Service:* ${data.serviceName}\n` +
      `📅 *Date:* ${data.bookingDate}\n` +
      `📱 *Phone:* ${data.customerPhone}\n\n` +
      `Please check the admin panel to accept or decline this booking.`;

    await getTwilioClient().messages.create({
      body: message,
      from: TWILIO_WHATSAPP_NUMBER,
      to: ADMIN_WHATSAPP_NUMBER,
    });

    console.log('Admin WhatsApp alert sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send admin WhatsApp alert:', error);
    return false;
  }
}

/**
 * Send WhatsApp confirmation to customer
 * 
 * IMPORTANT: For Twilio Sandbox, customers must first send "join <sandbox-code>" 
 * to the Twilio WhatsApp number before they can receive messages.
 * 
 * Production Note: In production with Twilio WhatsApp Business API,
 * this sandbox join requirement is not needed.
 */
export async function sendCustomerWhatsAppConfirmation(data: WhatsAppMessageData): Promise<boolean> {
  try {
    const customerNumber = formatWhatsAppNumber(data.customerPhone);
    
    const message = `✨ *Booking Confirmation*\n\n` +
      `Hi ${data.customerName}! 👋\n\n` +
      `Thank you for booking with *Kim's Dreadlocks & Nails Spa*!\n\n` +
      `📋 *Your Booking Details:*\n` +
      `💇 Service: ${data.serviceName}\n` +
      `📅 Date: ${data.bookingDate}\n\n` +
      `We will contact you shortly to confirm your appointment.\n\n` +
      `📍 Location: Kitengela Town, Kajiado County\n` +
      `📞 Contact: +254 716 867 526\n\n` +
      `See you soon! 💖`;

    await getTwilioClient().messages.create({
      body: message,
      from: TWILIO_WHATSAPP_NUMBER,
      to: customerNumber,
    });

    console.log('Customer WhatsApp confirmation sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send customer WhatsApp confirmation:', error);
    // Don't fail the booking if WhatsApp fails (customer may not have joined sandbox)
    return false;
  }
}

/**
 * Send WhatsApp status change notification to customer
 */
export async function sendStatusChangeWhatsApp(
  customerPhone: string,
  customerName: string,
  serviceName: string,
  bookingDate: string,
  status: string
): Promise<boolean> {
  try {
    const customerNumber = formatWhatsAppNumber(customerPhone);
    let statusEmoji = '⏳';
    let statusMessage = '';

    if (status === 'Accepted') {
      statusEmoji = '✅';
      statusMessage = `Great news! Your booking has been *confirmed*. We look forward to seeing you!`;
    } else if (status === 'Held') {
      statusEmoji = '⏸️';
      statusMessage = `Your booking is currently on *hold*. We will contact you soon with more details.`;
    } else if (status === 'Declined') {
      statusEmoji = '❌';
      statusMessage = `Unfortunately, we cannot accommodate your booking at this time. Please contact us to reschedule.`;
    }

    const message = `${statusEmoji} *Booking Status Update*\n\n` +
      `Hi ${customerName}!\n\n` +
      `${statusMessage}\n\n` +
      `📋 *Booking Details:*\n` +
      `💇 Service: ${serviceName}\n` +
      `📅 Date: ${bookingDate}\n` +
      `📊 Status: *${status}*\n\n` +
      `For any questions, please contact us:\n` +
      `📞 +254 716 867 526\n` +
      `📍 Rontech Apartments, Deliverance Road, Kitengela`;

    await getTwilioClient().messages.create({
      body: message,
      from: TWILIO_WHATSAPP_NUMBER,
      to: customerNumber,
    });

    console.log(`Status change WhatsApp sent to ${customerNumber} - Status: ${status}`);
    return true;
  } catch (error) {
    console.error('Failed to send status change WhatsApp:', error);
    return false;
  }
}

/**
 * Send all WhatsApp notifications for a new booking
 */
export async function sendBookingWhatsAppNotifications(data: WhatsAppMessageData): Promise<{
  adminSent: boolean;
  customerSent: boolean;
}> {
  const [adminSent, customerSent] = await Promise.all([
    sendAdminWhatsAppAlert(data),
    sendCustomerWhatsAppConfirmation(data),
  ]);

  return { adminSent, customerSent };
}
