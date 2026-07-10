import type { MetadataRoute } from "next";

const baseUrl = "https://tomyskitchen.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu", "/group-orders", "/about", "/location"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/menu" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
