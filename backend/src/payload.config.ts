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

// Validate required environment variables
if (!process.env.DATABASE_URI) {
  console.error(`
╔════════════════════════════════════════════════════════════════════════════════════════╗
║  ERROR: DATABASE_URI environment variable is not set!                                  ║
╠════════════════════════════════════════════════════════════════════════════════════════╣
║  To fix this:                                                                          ║
║  1. Copy .env.example to .env:  cp .env.example .env                                   ║
║  2. Edit .env and set your Supabase PostgreSQL connection string:                      ║
║     DATABASE_URI=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres   ║
║                                                                                        ║
║  See README.md for complete setup instructions.                                        ║
╚════════════════════════════════════════════════════════════════════════════════════════╝
`);
  throw new Error('DATABASE_URI environment variable is required. Please configure your .env file.');
}

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
      connectionString: process.env.DATABASE_URI,
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
