import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { SiteChrome } from "@/components/SiteChrome";
import { brand, siteUrl } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keshamrit Herbal Hair Oil | Herbal Hair Care Routine",
  description:
    "Discover Keshamrit herbal hair oil with product details, usage steps, customer stories, and WhatsApp ordering.",
  keywords: [
    "herbal hair oil",
    "hair care oil",
    "Keshamrit",
    "Ayurvedic hair oil",
    "hair fall care routine",
    "WhatsApp order hair oil"
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Keshamrit Herbal Hair Oil | Herbal Hair Care Routine",
    description:
      "A minimal herbal hair oil website with product details, WhatsApp ordering, and Supabase sales tracking.",
    url: siteUrl,
    siteName: "Keshamrit",
    type: "website",
    locale: "en_IN"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#19452b"
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Keshamrit Herbal Hair Oil",
  brand: {
    "@type": "Brand",
    name: brand.name
  },
  category: "Herbal hair care oil",
  description:
    "A herbal hair oil routine focused on scalp nourishment, simple usage guidance, Supabase order tracking, and WhatsApp ordering.",
  offers: {
    "@type": "Offer",
    price: "499",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          id="keshamrit-product-jsonld"
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
