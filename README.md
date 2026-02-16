# Kim's Artificial Dreadlocks & Nails Spa

A unified full-stack, production-ready web application and management platform for Kim's Artificial Dreadlocks & Nails Spa, a premier beauty salon located in Kitengela, Kenya. This project features a customer-facing website with a dynamic service catalog, a categorized photo gallery, and an interactive booking engine, alongside a powerful administrative dashboard for managing appointments and content.

**Author:** Shema

## 🚀 Tech Stack

### Frontend & Backend (Unified)
- **Framework:** Next.js 15.4.11 (App Router)
- **CMS:** Payload CMS v3.0+ (integrated within Next.js)
- **Database:** Supabase (PostgreSQL) via `@payloadcms/db-postgres`
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript (Strict mode)
- **Rich Text:** Lexical Editor
- **Fonts:** Playfair Display (headings), Poppins (body)
- **Icons:** Lucide React
- **Notifications:** Sonner (Toast notifications)

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
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (payload)/         # Payload CMS Admin Routes (isolated)
│   │   │   ├── admin/         # Admin panel at /admin
│   │   │   └── api/           # Payload API routes
│   │   ├── api/               # Custom API routes
│   │   │   ├── reviews/       # Reviews API
│   │   │   ├── testimonials/  # Testimonials API
│   │   │   └── health/        # Health check
│   │   ├── page.tsx           # Homepage
│   │   ├── services/          # Services pages
│   │   ├── gallery/           # Gallery page
│   │   ├── booking/           # Booking form page
│   │   ├── contact/           # Contact page
│   │   ├── tracker/           # Booking tracker
│   │   ├── layout.tsx         # Root layout with Navbar/Footer
│   │   └── globals.css        # Global styles
│   ├── collections/           # Payload CMS Collections
│   │   ├── Services.ts
│   │   ├── Gallery.ts
│   │   ├── Bookings.ts
│   │   ├── Media.ts
│   │   ├── Reviews.ts
│   │   └── Users.ts
│   ├── components/            # React components
│   │   ├── layout/            # Navbar, Footer
│   │   ├── sections/          # Page sections
│   │   └── ui/                # Reusable UI components
│   ├── actions/               # Server Actions
│   ├── hooks/                 # Payload hooks
│   ├── lib/                   # Utility functions
│   │   ├── email.ts           # Email service
│   │   ├── whatsapp.ts        # WhatsApp service
│   │   ├── supabase.ts        # Supabase client
│   │   └── constants.ts       # Business constants
│   ├── types/                 # TypeScript interfaces
│   ├── payload.config.ts      # Payload configuration
│   └── payload-types.ts       # Auto-generated Payload types
├── public/                    # Static assets
├── .env.example               # Environment template
├── next.config.ts             # Next.js + Payload config
├── package.json               # Unified dependencies
├── tsconfig.json              # TypeScript config
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

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Database (REQUIRED)
DATABASE_URI=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Payload CMS (REQUIRED)
PAYLOAD_SECRET=your-super-secret-payload-string-change-in-production

# Supabase Client (Optional - for frontend features)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server Configuration
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=development

# Email Provider (Optional - Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=shemamanase992@gmail.com

# Twilio WhatsApp (Optional)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ShemaM/KimArtificialDreadlocks.git
cd KimArtificialDreadlocks
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will be available at:
- **Customer Website:** `http://localhost:3000`
- **Admin Panel:** `http://localhost:3000/admin`
- **API:** `http://localhost:3000/api`

### 5. Create Admin User
1. Navigate to `http://localhost:3000/admin`
2. Create your first admin user
3. Start adding services and gallery images

### 6. Build for Production
```bash
npm run build
npm start
```

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
