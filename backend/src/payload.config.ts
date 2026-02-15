import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';
import { Services } from './collections/Services';
import { Gallery } from './collections/Gallery';
import { Bookings } from './collections/Bookings';
import { Media } from './collections/Media';
import { Reviews } from './collections/Reviews';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " - Kim's Spa Admin",
      icons: [{ url: '/favicon.ico' }],
      openGraph: {
        images: [{ url: '/og-image.png' }],
      },
    },
  },
  collections: [
    Users,
    Services,
    Gallery,
    Bookings,
    Media,
    Reviews,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'super-secret-payload-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://localhost:5432/kims_spa',
    },
  }),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'http://localhost:3001',
  ],
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'http://localhost:3001',
  ],
});
