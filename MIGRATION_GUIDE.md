# Migration Guide: Frontend/Backend Unification

## Overview

This project has been unified from two separate applications (frontend/ and backend/) into a single Next.js application. This guide explains the changes and how to migrate your development workflow.

## What Changed?

### Before (Separate Applications)
```
KimArtificialDreadlocks/
├── frontend/              # Next.js app on port 3000
│   └── src/...
├── backend/               # Payload CMS on port 3001
│   └── src/...
```

**Development workflow:**
```bash
# Terminal 1
cd backend && npm run dev    # Port 3001

# Terminal 2
cd frontend && npm run dev   # Port 3000
```

### After (Unified Application)
```
KimArtificialDreadlocks/
├── src/                   # All source code
│   ├── app/              # Customer routes + Payload admin
│   ├── collections/      # Payload collections
│   ├── components/       # React components
│   ├── lib/             # Shared utilities
│   └── ...
```

**Development workflow:**
```bash
# Single terminal
npm run dev               # Port 3000
```

## Key Benefits

1. **Simplified Development**: One dev server instead of two
2. **Single Deployment**: Build and deploy as one application
3. **Unified Configuration**: One package.json, one config file
4. **No CORS Issues**: Everything on the same origin
5. **Easier Maintenance**: All code in one place

## Migration Steps

### 1. Update Your Local Repository

```bash
# Pull the latest changes
git pull origin main

# Clean up old node_modules if they exist
rm -rf frontend/node_modules backend/node_modules

# Install dependencies at root level
npm install
```

### 2. Update Environment Variables

**Old setup** (Two .env files):
- `frontend/.env.local`
- `backend/.env`

**New setup** (One .env file):
- `.env` in the root directory

Copy your environment variables to the root `.env` file:

```bash
# Copy from .env.example
cp .env.example .env

# Then add your actual values
```

**Required variables:**
```env
# Database (REQUIRED)
DATABASE_URI=postgresql://...

# Payload CMS (REQUIRED)
PAYLOAD_SECRET=your-secret

# Optional
RESEND_API_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

### 3. Update Your Development Workflow

**Old workflow:**
```bash
# Start backend
cd backend && npm run dev

# Start frontend (in another terminal)
cd frontend && npm run dev
```

**New workflow:**
```bash
# Start unified app
npm run dev
```

**Access points:**
- Customer website: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`
- API: `http://localhost:3000/api`

### 4. Update API Endpoints (If You Have Custom Code)

If you have custom code that calls API endpoints, update the URLs:

**Before:**
```typescript
// Old: Separate backend URL
const response = await fetch('http://localhost:3001/api/...');
```

**After:**
```typescript
// New: Same origin
const response = await fetch('/api/...');
```

### 5. Update Deployment Configuration

If you're deploying to a hosting platform (Vercel, Netlify, etc.):

**Before:**
- Two separate deployments
- Frontend deployment with backend API URL

**After:**
- Single deployment
- No need for separate API URL configuration

## File Path Changes

All file paths have been updated in the codebase. Here's the mapping:

| Old Path | New Path |
|----------|----------|
| `frontend/src/app/*` | `src/app/*` |
| `frontend/src/components/*` | `src/components/*` |
| `frontend/src/lib/*` | `src/lib/*` |
| `backend/src/collections/*` | `src/collections/*` |
| `backend/src/hooks/*` | `src/hooks/*` |
| `backend/src/lib/email.ts` | `src/lib/email.ts` |
| `backend/src/lib/whatsapp.ts` | `src/lib/whatsapp.ts` |
| `backend/src/payload.config.ts` | `src/payload.config.ts` |

## Troubleshooting

### Issue: "Cannot find module '@/...'"

**Solution:** Make sure you're running commands from the root directory, not from frontend/ or backend/.

### Issue: Database connection errors

**Solution:** Ensure your `.env` file is in the root directory with the correct `DATABASE_URI`.

### Issue: Admin panel not loading

**Solution:** 
1. Clear your browser cache
2. Ensure you're accessing `/admin` (not a separate port)
3. Check that `PAYLOAD_SECRET` is set in `.env`

### Issue: Build errors

**Solution:**
```bash
# Clean build artifacts
rm -rf .next node_modules

# Reinstall dependencies
npm install

# Try building again
npm run build
```

## Questions?

If you encounter any issues during migration:
1. Check the [README.md](./README.md) for updated setup instructions
2. Review [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for technical details
3. Check that your `.env` file has all required variables

## Old Directories

The `frontend/` and `backend/` directories are no longer used and can be safely ignored. They are excluded from git via `.gitignore`. You can optionally delete them locally:

```bash
# Optional: Remove old directories
rm -rf frontend backend
```

**Note:** Don't commit this removal to git as other developers might still need them during their migration.
