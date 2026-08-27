import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda, Geist_Mono, Sacramento } from "next/font/google";
import "./globals.css";
import { siteDescription, siteName, siteUrl, tagline } from "@/lib/site-config";
import { CartProvider } from "@/components/providers/CartProvider";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], display: "swap" });
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
// Monoline signature face — carries the "House of • Domination" wordmark.
const script = Sacramento({ variable: "--font-signature", weight: "400", subsets: ["latin"], display: "swap" });

const title = `${siteName} — ${tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0c0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${bodoni.variable} ${mono.variable} ${script.variable} bg-background`}>
      <body>
        <CartProvider>
          <SkipLink />
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
