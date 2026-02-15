# Kim's Artificial Dreadlocks & Nails Spa

A full-stack, dynamic web application and management platform for a premier beauty and hair salon. This project features a customer-facing website with a dynamic service catalog, a categorized photo gallery, and an interactive booking engine, alongside a powerful administrative dashboard for managing appointments and content.

## 🚀 Tech Stack

* **Frontend Framework:** Next.js (Pages Router)
* **Backend / CMS:** Payload CMS (Next.js integrated)
* **Database:** Supabase (PostgreSQL)
* **Styling:** Tailwind CSS
* **Language:** TypeScript
* **Email Service:** Resend / Nodemailer (via Next.js API Routes)

## ✨ Core Features

### Customer-Facing Website
* **Dynamic Gallery:** A highly visual, filterable photo gallery (Dreadlocks, Braids, Nails, Other Styles).
* **Service Catalog:** 14 detailed services with images and descriptions, fetched dynamically from the database.
* **Interactive Booking Engine:** A seamless appointment scheduling system with real-time slot validation to prevent double-booking.
* **Responsive Design:** A mobile-first, sleek, and highly styled UI featuring elegant pink gradients and rasta color accents.

### Admin Dashboard (Payload CMS)
* **Booking Management:** View, accept, hold, or decline customer appointments from a centralized queue.
* **Content Management:** Execute CRUD operations on the service catalog and gallery images without touching the codebase.
* **Automated Notifications:** Receive instant email alerts for new booking requests.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed and set up:
* [Node.js](https://nodejs.org/en/) (v18.0.0 or higher)
* npm, yarn, or pnpm
* A [Supabase](https://supabase.com/) account and project
* An email service provider API key (e.g., Resend)

## ⚙️ Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```env
# Payload CMS
PAYLOAD_SECRET=your-super-secret-payload-string

# Supabase (PostgreSQL)
DATABASE_URI=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-REF].supabase.co:5432/postgres

# Email Provider (e.g., Resend)
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=shemamanase992@gmail.com

# Next.js Public URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
