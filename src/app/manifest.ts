import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Bengali Food",
    short_name: "Bengali Food",
    description: "Authentic Bengali cuisine in San Jose for pickup, delivery, and gatherings.",
    start_url: "/",
    display: "standalone",
    background_color: "#142016",
    theme_color: "#142016",
    categories: ["food", "business"],
    icons: [
      {
        src: "/images/bengali/bengali-feast-hero.png",
        sizes: "1664x936",
        type: "image/png",
      },
    ],
  };
}
