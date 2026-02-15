import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'basePrice', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'basePrice',
      type: 'number',
      required: true,
      label: 'Base Price (KES)',
      min: 0,
      admin: {
        description: 'Starting price for this service in Kenyan Shillings',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Image',
    },
    {
      name: 'additionalImages',
      type: 'array',
      label: 'Additional Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'subServices',
      type: 'array',
      label: 'Sub-Services / Options',
      admin: {
        description: 'Different options or variations of this service',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Option Name',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Price (KES)',
          min: 0,
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Hair', value: 'Hair' },
        { label: 'Nails', value: 'Nails' },
        { label: 'Other', value: 'Other' },
      ],
      defaultValue: 'Hair',
      label: 'Category',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Service',
      defaultValue: false,
      admin: {
        description: 'Show this service on the homepage',
      },
    },
  ],
};

export default Services;
