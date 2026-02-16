import type { CollectionConfig } from 'payload';
import { sendBookingNotifications } from '../hooks/bookingNotifications';
import { validateBookingConflict } from '../hooks/bookingValidation';

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'service', 'bookingDate', 'status', 'createdAt'],
    group: 'Operations',
  },
  access: {
    // Only authenticated admin users can view bookings
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Anyone can create a booking (from frontend)
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Customer Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'WhatsApp Number',
      admin: {
        description: 'Include country code (e.g., +254716867526)',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      label: 'Service',
    },
    {
      name: 'bookingDate',
      type: 'date',
      required: true,
      label: 'Booking Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'EEEE, d MMMM yyyy',
        },
      },
    },
    {
      name: 'bookingTime',
      type: 'text',
      required: true,
      label: 'Booking Time',
      admin: {
        description: 'Time of booking (e.g., "2:00 PM")',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Accepted', value: 'Accepted' },
        { label: 'Held', value: 'Held' },
        { label: 'Declined', value: 'Declined' },
      ],
      defaultValue: 'Pending',
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
    },
  ],
  hooks: {
    beforeChange: [validateBookingConflict],
    afterChange: [sendBookingNotifications],
  },
};

export default Bookings;
