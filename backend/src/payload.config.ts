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

// Check if we're in a build phase (Next.js sets this during build)
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || 
                     process.argv.includes('build');

// Placeholder URI used only during build phase - never used for actual database connections
const BUILD_PLACEHOLDER_URI = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';

// Validate DATABASE_URI at runtime (not during build)
if (!process.env.DATABASE_URI && !isBuildPhase) {
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

// Use placeholder during build phase to allow Next.js compilation, actual URI at runtime
const databaseUri = process.env.DATABASE_URI || BUILD_PLACEHOLDER_URI;

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
      connectionString: databaseUri,
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
