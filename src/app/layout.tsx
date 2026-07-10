import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const businessName = "The Bengali Food";
const description =
  "Authentic Bengali cuisine in San Jose, with pickup, delivery, and event catering.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thebengalifood.example"),
  title: {
    default: `${businessName} | Authentic Bengali Cuisine in San Jose`,
    template: `%s | ${businessName}`,
  },
  description,
  icons: {
    icon: "/images/bengali/bengali-feast-hero.png",
    shortcut: "/images/bengali/bengali-feast-hero.png",
    apple: "/images/bengali/bengali-feast-hero.png",
  },
  openGraph: {
    title: `${businessName} | Authentic Bengali Cuisine in San Jose`,
    description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Bengali mustard prawn curry, rice, dal, and eggplant",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#142016",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: businessName,
  image: "https://thebengalifood.example/opengraph-image",
  priceRange: "$$",
  servesCuisine: ["Bengali", "Indian"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Jose",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: ["https://order.online/store/the-bengali-food-32130435?pickup=true"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <MobileActionBar />
      </body>
    </html>
  );
}
