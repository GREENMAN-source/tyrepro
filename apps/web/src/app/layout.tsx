import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TyrePro Motors | Tyre Shop ERP and Service Center",
  description: "Premium tyre shop website and ERP system for inventory, billing, sales, services, and analytics.",
  keywords: ["tyre shop", "wheel alignment", "tyre ERP", "GST invoice", "Razorpay"]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "TyrePro Motors",
    "image": "https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=900&q=80",
    "@id": "https://tyrepromotors.com",
    "url": "https://tyrepromotors.com",
    "telephone": "+919876543210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tyre Street",
      "addressLocality": "Chennai",
      "postalCode": "600001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0827,
      "longitude": 80.2707
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
