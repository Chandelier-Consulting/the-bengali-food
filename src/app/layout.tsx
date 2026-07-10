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

const businessName = "Tomy's Kitchen";
const description =
  "Family-owned Mexican food truck serving fresh breakfast burritos, tacos, seafood, catering, and daily specials from Chef Tomas Tejeda in Mountain View.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tomyskitchen.example"),
  title: {
    default: `${businessName} | Mexican Food Truck in Mountain View`,
    template: `%s | ${businessName}`,
  },
  description,
  icons: {
    icon: "/images/tomys/logo.jpg",
    shortcut: "/images/tomys/logo.jpg",
    apple: "/images/tomys/logo.jpg",
  },
  openGraph: {
    title: `${businessName} | Mexican Food Truck in Mountain View`,
    description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Warm terracotta and gold Tomy's Kitchen brand artwork",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#E45F3C",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FoodTruck",
  name: businessName,
  image: "https://tomyskitchen.example/opengraph-image",
  telephone: "+16502898628",
  priceRange: "$$",
  servesCuisine: ["Mexican", "Mediterranean", "Italian", "American", "Continental"],
  founder: {
    "@type": "Person",
    name: "Tomas Tejeda",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "239 W El Camino Real",
    addressLocality: "Mountain View",
    addressRegion: "CA",
    postalCode: "94040",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "22",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:30",
      closes: "15:00",
    },
  ],
  sameAs: ["https://www.instagram.com/tomys_kitchen"],
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
