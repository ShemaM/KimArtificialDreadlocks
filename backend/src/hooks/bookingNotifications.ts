import type { CollectionAfterChangeHook } from 'payload';
import { format } from 'date-fns';
import { sendAdminNotificationEmail, sendCustomerConfirmationEmail } from '../lib/email';
import { sendBookingWhatsAppNotifications } from '../lib/whatsapp';

/**
 * Format booking date as "Day of the week, Day, Month, Year"
 * Example: "Thursday, 19 February 2026"
 */
function formatBookingDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'EEEE, d MMMM yyyy');
}

/**
 * After a booking is created, send notifications to admin and customer
 * This hook sends:
 * 1. Email notification to admin
 * 2. Email confirmation to customer
 * 3. WhatsApp notification to admin
 * 4. WhatsApp confirmation to customer (if they've joined the Twilio sandbox)
 */
export const sendBookingNotifications: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Only send notifications for new bookings
  if (operation !== 'create') {
    return doc;
  }

  // Get the service details
  let serviceName = 'Unknown Service';
  
  if (doc.service) {
    if (typeof doc.service === 'object' && doc.service.title) {
      serviceName = doc.service.title;
    } else if (typeof doc.service === 'string') {
      // Fetch the service if we only have the ID
      try {
        const service = await req.payload.findByID({
          collection: 'services',
          id: doc.service,
        });
        serviceName = service.title;
      } catch {
        console.error('Failed to fetch service details');
      }
    }
  }

  const formattedDate = formatBookingDate(doc.bookingDate);

  const emailData = {
    customerName: doc.customerName,
    email: doc.email,
    phone: doc.phone,
    serviceName,
    bookingDate: formattedDate,
    notes: doc.notes,
  };

  const whatsappData = {
    customerName: doc.customerName,
    customerPhone: doc.phone,
    serviceName,
    bookingDate: formattedDate,
  };

  // Send all notifications asynchronously
  // We don't await these to not block the response
  Promise.all([
    sendAdminNotificationEmail(emailData).catch(err => 
      console.error('Admin email failed:', err)
    ),
    sendCustomerConfirmationEmail(emailData).catch(err => 
      console.error('Customer email failed:', err)
    ),
    sendBookingWhatsAppNotifications(whatsappData).catch(err => 
      console.error('WhatsApp notifications failed:', err)
    ),
  ]).then(results => {
    console.log('Booking notifications sent:', {
      bookingId: doc.id,
      customerName: doc.customerName,
      results,
    });
  });

  return doc;
};

export default sendBookingNotifications;
