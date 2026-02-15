# Kim's Artificial Dreadlocks & Nails Spa

A full-stack, production-ready web application and management platform for Kim's Artificial Dreadlocks & Nails Spa, a premier beauty salon located in Kitengela, Kenya. This project features a customer-facing website with a dynamic service catalog, a categorized photo gallery, and an interactive booking engine, alongside a powerful administrative dashboard for managing appointments and content.

**Author:** Shema

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript (Strict mode)
- **Fonts:** Playfair Display (headings), Poppins (body)
- **Icons:** Lucide React
- **Notifications:** Sonner (Toast notifications)

### Backend / CMS
- **CMS:** Payload CMS v3.0+
- **Database:** Supabase (PostgreSQL) via `@payloadcms/db-postgres`
- **Rich Text:** Lexical Editor

### Integrations
- **Email:** Resend
- **WhatsApp:** Twilio (Sandbox)
- **Date Formatting:** date-fns

## ✨ Core Features

### Customer-Facing Website
- **Dynamic Gallery:** A highly visual, filterable photo gallery (Dreadlocks, Braids, Nails, Other Styles) with lightbox modal
- **Service Catalog:** 14+ detailed services with images, descriptions, and pricing tiers
- **Interactive Booking Engine:** A seamless appointment scheduling system with form validation
- **Responsive Design:** Mobile-first, responsive design with hamburger menu navigation
- **Theme:** Elegant pink gradients with Rasta color accents (Red/Yellow/Green)

### Admin Dashboard (Payload CMS)
- **Booking Management:** View, accept, hold, or decline customer appointments
- **Content Management:** Full CRUD operations for services and gallery images
- **Media Management:** Image uploads with automatic resizing

### Multi-Channel Notifications
When a booking is submitted:
1. **Email to Admin:** Booking summary sent to admin
2. **Email to Customer:** Confirmation email with booking details
3. **WhatsApp to Admin:** Instant notification via Twilio
4. **WhatsApp to Customer:** Booking confirmation message

## 📁 Project Structure

```
KimArtificialDreadlocks/
├── frontend/                  # Next.js Frontend Application
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── services/     # Services page
│   │   │   ├── gallery/      # Gallery page
│   │   │   ├── booking/      # Booking form page
│   │   │   └── contact/      # Contact page
│   │   ├── components/       # React components
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   ├── sections/     # Page sections
│   │   │   └── ui/           # Reusable UI components
│   │   ├── actions/          # Server Actions
│   │   ├── lib/              # Utility functions
│   │   └── types/            # TypeScript interfaces
│   └── public/               # Static assets
│
├── backend/                   # Payload CMS Backend
│   ├── src/
│   │   ├── collections/      # Database collections
│   │   │   ├── Services.ts
│   │   │   ├── Gallery.ts
│   │   │   ├── Bookings.ts
│   │   │   ├── Media.ts
│   │   │   └── Users.ts
│   │   ├── hooks/            # Payload hooks
│   │   ├── lib/              # Email & WhatsApp services
│   │   ├── payload.config.ts # Payload configuration
│   │   └── server.ts         # Express server
│   └── .env.example          # Environment template
│
└── README.md
```

## 🛠️ Prerequisites

Before you begin, ensure you have:
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- npm, yarn, or pnpm
- A [Supabase](https://supabase.com/) account and project
- A [Resend](https://resend.com/) account for email
- A [Twilio](https://twilio.com/) account for WhatsApp

## ⚙️ Environment Variables

### Frontend (.env.local)
```env
# API Configuration
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Email Provider (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Admin Email
ADMIN_EMAIL=shemamanase992@gmail.com
```

### Backend (.env)
```env
# Payload CMS
PAYLOAD_SECRET=your-super-secret-payload-string

# Supabase PostgreSQL
DATABASE_URI=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres

# Email Provider (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=shemamanase992@gmail.com

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Server
PORT=3001
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ShemaM/KimArtificialDreadlocks.git
cd KimArtificialDreadlocks
```

### 2. Set Up the Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

The Payload admin panel will be available at `http://localhost:3001/admin`

### 3. Set Up the Frontend
```bash
cd frontend
npm install
# Create .env.local with required variables
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 4. Create Admin User
1. Navigate to `http://localhost:3001/admin`
2. Create your first admin user
3. Start adding services and gallery images

## 📱 Twilio WhatsApp Sandbox Setup

For the WhatsApp notifications to work during development:

1. Go to [Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn)
2. Follow the sandbox setup instructions
3. Send the join code to the Twilio WhatsApp number
4. Customers must also join the sandbox to receive confirmations

## 📦 Database Schema

### Services Collection
- `title` - Service name
- `description` - Service description
- `basePrice` - Starting price (KES)
- `image` - Main image
- `additionalImages` - Gallery images
- `subServices` - Array of options with prices
- `category` - Hair | Nails | Other

### Gallery Collection
- `image` - Gallery image
- `category` - Dreadlocks | Braids | Nails | Other Styles
- `alt` - Alt text for accessibility

### Bookings Collection
- `customerName` - Customer's full name
- `email` - Email address
- `phone` - WhatsApp number (with country code)
- `service` - Relationship to Services
- `bookingDate` - Appointment date
- `status` - Pending | Accepted | Held | Declined
- `notes` - Additional notes

## 🎨 Design System

### Colors
- **Primary Pink:** #FF69B4
- **Pink Light:** #FFB6C1
- **Pink Dark:** #DB2777
- **Cream:** #FFF8F0
- **Charcoal:** #2D3436
- **Rasta Red:** #E31C3D
- **Rasta Yellow:** #FFD700
- **Rasta Green:** #00A550

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Poppins (sans-serif)

## 📄 License

MIT License

## 👤 Contact

- **Email:** shemamanase992@gmail.com
- **Phone:** +254 716 867 526
- **Location:** Kitengela Town, Kajiado County, Kenya
