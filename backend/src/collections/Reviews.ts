import type { CollectionConfig } from 'payload';

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'rating', 'isApproved', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access for displaying approved reviews
    create: () => true, // Anyone can submit a review (after service)
  },
  fields: [
    {
      name: 'booking',
      type: 'relationship',
      relationTo: 'bookings',
      required: true,
      label: 'Related Booking',
      admin: {
        description: 'The booking this review is associated with',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Customer Name',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      label: 'Rating',
      min: 1,
      max: 5,
      admin: {
        description: 'Rating from 1 to 5 stars',
      },
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Review Comment',
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      label: 'Approved',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Only approved reviews will be displayed on the website',
      },
    },
  ],
};

export default Reviews;
