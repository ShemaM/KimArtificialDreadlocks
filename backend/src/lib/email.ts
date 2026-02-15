import { Resend } from 'resend';

// Initialize Resend client lazily to avoid build-time errors
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export interface BookingEmailData {
  customerName: string;
  email: string;
  phone: string;
  serviceName: string;
  bookingDate: string;
  notes?: string;
}

/**
 * Send booking notification email to admin
 */
export async function sendAdminNotificationEmail(data: BookingEmailData): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'shemamanase992@gmail.com';

  try {
    await getResendClient().emails.send({
      from: 'Kim\'s Spa <noreply@kimsspa.com>',
      to: adminEmail,
      subject: `🎉 New Booking Request from ${data.customerName}`,
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFF8F0; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #FF69B4; margin: 0;">
              Kim's Dreadlocks & Nails Spa
            </h1>
            <div style="height: 4px; background: linear-gradient(90deg, #E31C3D 33%, #FFD700 33%, #FFD700 66%, #00A550 66%); margin-top: 10px;"></div>
          </div>
          
          <div style="background: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <h2 style="color: #2D3436; margin-top: 0;">New Booking Request</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #636E72; width: 140px;">Customer Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #2D3436; font-weight: 600;">${data.customerName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #636E72;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #2D3436;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #636E72;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #2D3436;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #636E72;">Service:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #FF69B4; font-weight: 600;">${data.serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #636E72;">Booking Date:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #FFF0E5; color: #2D3436; font-weight: 600;">${data.bookingDate}</td>
              </tr>
              ${data.notes ? `
              <tr>
                <td style="padding: 10px 0; color: #636E72; vertical-align: top;">Notes:</td>
                <td style="padding: 10px 0; color: #2D3436;">${data.notes}</td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 24px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/bookings" 
                 style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #FFB6C1 0%, #FF69B4 50%, #DB2777 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: 600;">
                View in Admin Panel
              </a>
            </div>
          </div>
          
          <p style="text-align: center; color: #B2BEC3; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} Kim's Dreadlocks & Nails Spa. Kitengela, Kenya.
          </p>
        </div>
      `,
    });

    console.log('Admin notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return false;
  }
}

/**
 * Send booking confirmation email to customer
 */
export async function sendCustomerConfirmationEmail(data: BookingEmailData): Promise<boolean> {
  try {
    await getResendClient().emails.send({
      from: 'Kim\'s Spa <noreply@kimsspa.com>',
      to: data.email,
      subject: `✨ Booking Confirmed - Kim's Dreadlocks & Nails Spa`,
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFF8F0; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #FF69B4; margin: 0;">
              Kim's Dreadlocks & Nails Spa
            </h1>
            <div style="height: 4px; background: linear-gradient(90deg, #E31C3D 33%, #FFD700 33%, #FFD700 66%, #00A550 66%); margin-top: 10px;"></div>
          </div>
          
          <div style="background: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <h2 style="color: #2D3436; margin-top: 0;">Thank You, ${data.customerName}! 💖</h2>
            <p style="color: #636E72;">Your booking request has been received. We'll contact you shortly to confirm your appointment.</p>
            
            <div style="background: #FFF8F0; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #FF69B4; margin-top: 0; font-size: 16px;">Booking Details</h3>
              <p style="margin: 8px 0; color: #2D3436;"><strong>Service:</strong> ${data.serviceName}</p>
              <p style="margin: 8px 0; color: #2D3436;"><strong>Date:</strong> ${data.bookingDate}</p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(255, 105, 180, 0.2) 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #2D3436; margin-top: 0; font-size: 16px;">📍 Find Us</h3>
              <p style="margin: 8px 0; color: #636E72;">Kitengela Town, Kajiado County, Kenya</p>
              <p style="margin: 8px 0; color: #636E72;">📞 +254 716 867 526</p>
            </div>
            
            <p style="color: #636E72; font-size: 14px;">
              If you need to reschedule or have any questions, please contact us via WhatsApp or call.
            </p>
          </div>
          
          <p style="text-align: center; color: #B2BEC3; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} Kim's Dreadlocks & Nails Spa. All rights reserved.
          </p>
        </div>
      `,
    });

    console.log('Customer confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send customer confirmation email:', error);
    return false;
  }
}
