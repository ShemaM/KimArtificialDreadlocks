import type { CollectionBeforeChangeHook } from 'payload';

/**
 * Validate booking before creation to check for conflicts
 * This hook checks if the requested time slot is already taken
 */
export const validateBookingConflict: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  // Only validate for new bookings
  if (operation !== 'create') {
    return data;
  }

  if (!data.bookingDate || !data.bookingTime) {
    return data;
  }

  try {
    // Query for existing bookings on the same date and time
    const conflictingBookings = await req.payload.find({
      collection: 'bookings',
      where: {
        and: [
          {
            bookingDate: {
              equals: data.bookingDate,
            },
          },
          {
            bookingTime: {
              equals: data.bookingTime,
            },
          },
          {
            status: {
              not_equals: 'Declined',
            },
          },
        ],
      },
    });

    if (conflictingBookings.docs.length > 0) {
      throw new Error(
        'This time slot is currently booked. Please select an alternative time, or call us directly to squeeze you in.'
      );
    }

    return data;
  } catch (error) {
    // If it's our custom error, rethrow it
    if (error instanceof Error && error.message.includes('time slot')) {
      throw error;
    }
    // Log other errors but don't block the booking
    console.error('Error checking booking conflicts:', error);
    return data;
  }
};

export default validateBookingConflict;
