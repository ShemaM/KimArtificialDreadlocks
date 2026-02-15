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

// Check if we're in a build or compilation phase (Next.js sets different phases)
// phase-production-build: Production build
// phase-development-build: Development build
// Also check if running through CLI build command
const isBuildPhase = process.env.NEXT_PHASE?.includes('build') || 
                     process.argv.includes('build') ||
                     process.env.BUILDING === 'true';

// Placeholder URI used only during build/compilation phase - never used for actual database connections
const BUILD_PLACEHOLDER_URI = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';

// Get the database URI - use placeholder if not provided
const databaseUri = process.env.DATABASE_URI || BUILD_PLACEHOLDER_URI;

// Check if using placeholder (no real database configured)
const isUsingPlaceholder = databaseUri === BUILD_PLACEHOLDER_URI;

// Log warning if using placeholder
if (isUsingPlaceholder && !isBuildPhase) {
  console.warn(`
╔════════════════════════════════════════════════════════════════════════════════════════╗
║  ⚠️  WARNING: DATABASE_URI environment variable is not set!                             ║
╠════════════════════════════════════════════════════════════════════════════════════════╣
║  The application will fail to connect to the database.                                 ║
║                                                                                        ║
║  To fix this:                                                                          ║
║  1. Copy .env.example to .env:  cp .env.example .env                                   ║
║  2. Edit .env and set your Supabase PostgreSQL connection string:                      ║
║     DATABASE_URI=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres   ║
║                                                                                        ║
║  See README.md for complete setup instructions.                                        ║
╚════════════════════════════════════════════════════════════════════════════════════════╝
`);
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
      connectionString: databaseUri,
      // When using placeholder, don't immediately fail on connection
      // This allows the build to succeed and shows proper error at runtime
      ...(isUsingPlaceholder && { max: 0 }),
    },
  }),
  // Initialize hook to check database connection
  onInit: async (payload) => {
    if (isUsingPlaceholder) {
      payload.logger.error(`
╔════════════════════════════════════════════════════════════════════════════════════════╗
║  ❌ DATABASE_URI environment variable is not configured!                                ║
╠════════════════════════════════════════════════════════════════════════════════════════╣
║  Please set up your .env file with your database connection string.                    ║
║  See README.md for complete setup instructions.                                        ║
╚════════════════════════════════════════════════════════════════════════════════════════╝
`);
    } else {
      payload.logger.info('Payload CMS initialized successfully with database connection.');
    }
  },
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
