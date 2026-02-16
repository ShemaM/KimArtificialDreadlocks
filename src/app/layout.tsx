import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppWidget from "@/components/ui/FloatingWhatsAppWidget";

export const metadata: Metadata = {
  title: {
    default: "Kim's Dreadlocks & Nails Spa | Premier Beauty Salon in Kitengela",
    template: "%s | Kim's Dreadlocks & Nails Spa"
  },
  description:
    "The Premier Destination for Congolese Artificial Dreadlocks in Kitengela & Environs. Expert hair styling, braids, and professional nail services. Located at Rontech Apartments, Deliverance Road, opposite Mission Care Hospital. Book your appointment today!",
  authors: [{ name: "Kim's Dreadlocks & Nails Spa" }],
  keywords: [
    "Congolese artificial dreadlocks Kitengela",
    "artificial dreadlocks Kitengela",
    "dreadlocks salon Kitengela",
    "knotless braids Kitengela",
    "nail salon Kitengela",
    "beauty salon Kitengela",
    "hair styling Kitengela",
    "manicure pedicure Kitengela",
    "Rontech Apartments beauty salon",
    "Deliverance Road salon",
    "Mission Care Hospital area salon",
    "professional hair braiding Kitengela",
  ],
  openGraph: {
    title: "Kim's Dreadlocks & Nails Spa | Premier Beauty Salon in Kitengela",
    description:
      "The Premier Destination for Congolese Artificial Dreadlocks in Kitengela. Expert hair styling, braids, and professional nail services at Rontech Apartments, Deliverance Road.",
    type: "website",
    locale: "en_KE",
    siteName: "Kim's Dreadlocks & Nails Spa",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://kimsspa.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kim's Dreadlocks & Nails Spa | Premier Beauty Salon in Kitengela",
    description:
      "The Premier Destination for Congolese Artificial Dreadlocks in Kitengela & Environs. Professional beauty services.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts - Loaded via CDN for production */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body  suppressHydrationWarning className="font-poppins antialiased bg-cream text-charcoal">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsAppWidget />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
