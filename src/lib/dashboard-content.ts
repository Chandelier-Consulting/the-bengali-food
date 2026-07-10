import { menuCategories } from "@/lib/menu-data";
import { tomysImages } from "@/lib/site-content";

export type DashboardImageOption = {
  label: string;
  src: string;
};

export type DashboardMenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  visible: boolean;
  sortOrder: number;
  imageSrc: string;
};

export type DashboardImageSlot = {
  key: string;
  label: string;
  defaultSrc: string;
};

export const dashboardImageSlots: DashboardImageSlot[] = [
  { key: "Logo", label: "Logo", defaultSrc: tomysImages.logo },
  { key: "Truck", label: "Truck", defaultSrc: tomysImages.truck },
  { key: "Breakfast Burrito", label: "Breakfast Burrito", defaultSrc: tomysImages.breakfastBurrito },
  { key: "Fish Tacos (Tacos de Pescado)", label: "Fish Tacos", defaultSrc: tomysImages.fishTacos },
  { key: "Shrimp Tacos", label: "Shrimp Tacos", defaultSrc: tomysImages.shrimpTacos },
  { key: "Torta Oaxaqueña", label: "Torta Oaxaqueña", defaultSrc: tomysImages.torta },
  { key: "Catering Salmon", label: "Catering Salmon", defaultSrc: tomysImages.cateringSalmon },
  { key: "Catering Pasta", label: "Catering Pasta", defaultSrc: tomysImages.cateringPasta },
  { key: "Catering Steak", label: "Catering Steak", defaultSrc: tomysImages.cateringSteak },
  { key: "Catering feature 1", label: "Homepage Catering Feature 1", defaultSrc: tomysImages.cateringSalmon },
  { key: "Catering feature 2", label: "Homepage Catering Feature 2", defaultSrc: tomysImages.cateringPasta },
  { key: "Catering feature 3", label: "Homepage Catering Feature 3", defaultSrc: tomysImages.cateringSteak },
  { key: "Family-owned service", label: "Homepage Service Card: Family-Owned", defaultSrc: tomysImages.truck },
  { key: "Fresh favorites all day", label: "Homepage Service Card: Fresh Favorites", defaultSrc: tomysImages.fishTacos },
  { key: "Catering for the whole group", label: "Homepage Service Card: Catering", defaultSrc: tomysImages.cateringSalmon },
  { key: "Breakfast", label: "Breakfast Category", defaultSrc: tomysImages.breakfastBurrito },
  { key: "Tacos", label: "Tacos Category", defaultSrc: tomysImages.fishTacos },
  { key: "Mains", label: "Mains Category", defaultSrc: tomysImages.torta },
  { key: "Seafood Cocktails", label: "Seafood Category", defaultSrc: tomysImages.shrimpTacos },
  { key: "Drinks", label: "Drinks Category", defaultSrc: tomysImages.truck },
  { key: "Catering", label: "Catering", defaultSrc: tomysImages.cateringSalmon },
];

export const dashboardImageOptions: DashboardImageOption[] = [
  { label: "Breakfast Burrito", src: tomysImages.breakfastBurrito },
  { label: "Fish Tacos", src: tomysImages.fishTacos },
  { label: "Shrimp Tacos", src: tomysImages.shrimpTacos },
  { label: "Torta Oaxaquena", src: tomysImages.torta },
  { label: "Truck", src: tomysImages.truck },
  { label: "Logo", src: tomysImages.logo },
  { label: "Catering Salmon", src: tomysImages.cateringSalmon },
  { label: "Catering Pasta", src: tomysImages.cateringPasta },
  { label: "Catering Steak", src: tomysImages.cateringSteak },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function defaultImageSelections() {
  return Object.fromEntries(dashboardImageSlots.map((slot) => [slot.key, slot.defaultSrc])) as Record<string, string>;
}

export function defaultMenuItems(): DashboardMenuItem[] {
  return menuCategories.flatMap((category) =>
    category.items.map((item, index) => ({
      id: `${slugify(category.name)}-${slugify(item.name)}`,
      name: item.name,
      price: item.price,
      description: item.description,
      category: category.name,
      visible: true,
      sortOrder: index,
      imageSrc: item.imageSrc || tomysImages.cateringSalmon,
    })),
  );
}
