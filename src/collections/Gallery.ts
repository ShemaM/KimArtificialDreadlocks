import type { CollectionConfig } from 'payload';

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['image', 'category', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Gallery Image',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Dreadlocks', value: 'dreadlocks' },
        { label: 'Styling', value: 'styling' },
        { label: 'Nails', value: 'nails' },
      ],
      defaultValue: 'dreadlocks',
      label: 'Category',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Optional caption to display on the image',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        description: 'Show on homepage gallery',
      },
    },
  ],
};

export default Gallery;
