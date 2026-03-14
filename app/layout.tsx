import type { Metadata } from "next";
import { Italiana, Cinzel, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://umstudios.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "UM Studios – Premium Unisex Salon & Spa in Ranchi",
  description:
    "Experience luxury grooming and wellness at UM Studios, Ranchi's premier unisex salon and spa. Expert hair styling, skincare, bridal packages, and relaxing spa treatments in an elegant setting. Book your appointment today.",
  keywords: "salon ranchi, unisex salon ranchi, best salon ranchi, bridal makeup ranchi, hair spa ranchi, nail bar ranchi, UM Studios",
  openGraph: {
    title: "UM Studios – Premium Unisex Salon & Spa in Ranchi",
    description: "Ranchi's premium unisex salon. Expert hairdressing, bridal makeup, nail art, vedic spa & skin care. Book your appointment today.",
    type: "website",
    locale: "en_IN",
    siteName: "UM Studios",
    images: ["/social_image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "UM Studios – Premium Unisex Salon & Spa in Ranchi",
    description: "Ranchi's premium unisex salon. Expert hairdressing, bridal makeup, nail art, vedic spa & skin care.",
    images: ["/social_image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${italiana.variable} ${cinzel.variable} ${manrope.variable} antialiased bg-black`}
        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
