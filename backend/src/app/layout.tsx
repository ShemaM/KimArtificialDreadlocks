import React from 'react';

export const metadata = {
  title: "Kim's Spa Admin",
  description: "Admin panel for Kim's Artificial Dreadlocks & Nails Spa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
