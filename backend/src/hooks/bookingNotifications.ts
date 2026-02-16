import type { CollectionAfterChangeHook } from 'payload';
import { format } from 'date-fns';
import { sendAdminNotificationEmail, sendCustomerConfirmationEmail, sendStatusChangeEmail } from '../lib/email';
import { sendBookingWhatsAppNotifications, sendStatusChangeWhatsApp } from '../lib/whatsapp';

/**
 * Format booking date as "Day of the week, Day, Month, Year"
 * Example: "Thursday, 19 February 2026"
 */
function formatBookingDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'EEEE, d MMMM yyyy');
}

/**
 * After a booking is created or updated, send notifications to admin and customer
 * This hook sends:
 * 1. For new bookings (operation === 'create'):
 *    - Email notification to admin
 *    - Email confirmation to customer
 *    - WhatsApp notification to admin
 *    - WhatsApp confirmation to customer
 * 2. For status changes (operation === 'update'):
 *    - Email notification to customer about status change
 *    - WhatsApp notification to customer about status change
 */
export const sendBookingNotifications: CollectionAfterChangeHook = async ({
  doc,
  operation,
  previousDoc,
  req,
}) => {
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

  // Handle new bookings
  if (operation === 'create') {
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
  }

  // Handle status changes
  if (operation === 'update' && previousDoc && previousDoc.status !== doc.status) {
    console.log(`Booking status changed from ${previousDoc.status} to ${doc.status}`);
    
    // Send status change notifications
    Promise.all([
      sendStatusChangeEmail(
        doc.email,
        doc.customerName,
        serviceName,
        formattedDate,
        doc.status
      ).catch(err => console.error('Status change email failed:', err)),
      sendStatusChangeWhatsApp(
        doc.phone,
        doc.customerName,
        serviceName,
        formattedDate,
        doc.status
      ).catch(err => console.error('Status change WhatsApp failed:', err)),
    ]).then(() => {
      console.log(`Status change notifications sent for booking ${doc.id}`);
    });
  }

  return doc;
};

export default sendBookingNotifications;
