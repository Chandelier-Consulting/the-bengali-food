import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tomy's Kitchen",
    short_name: "Tomy's",
    description: "Mexican food truck in Mountain View serving breakfast, tacos, seafood, and group pickup orders.",
    start_url: "/",
    display: "standalone",
    background_color: "#171615",
    theme_color: "#E45F3C",
    categories: ["food", "business"],
    icons: [
      {
        src: "/images/tomys/logo.jpg",
        sizes: "828x1042",
        type: "image/jpeg",
      },
    ],
  };
}
