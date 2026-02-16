import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kim's Dreadlocks & Nails Spa | Kitengela",
  description:
    "Premier beauty and hair salon in Kitengela offering artificial dreadlocks, braids, nails, and spa services. Book your appointment today!",
  authors: [{ name: "Shema" }],
  openGraph: {
    title: "Kim's Dreadlocks & Nails Spa | Kitengela",
    description:
      "Premier beauty and hair salon in Kitengela offering artificial dreadlocks, braids, nails, and spa services.",
    type: "website",
    locale: "en_US",
    siteName: "Kim's Dreadlocks & Nails Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kim's Dreadlocks & Nails Spa | Kitengela",
    description:
      "Premier beauty and hair salon in Kitengela offering artificial dreadlocks, braids, nails, and spa services.",
  },
  keywords: [
    "dreadlocks",
    "braids",
    "nails",
    "spa",
    "Kitengela",
    "beauty salon",
    "hair salon",
    "artificial dreadlocks",
  ],
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
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
