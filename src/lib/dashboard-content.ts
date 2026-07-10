import { menuCategories } from "@/lib/menu-data";
import { bengaliImages } from "@/lib/site-content";

export type DashboardImageOption = { label: string; src: string };
export type DashboardMenuItem = { id: string; name: string; price: string; description: string; category: string; visible: boolean; sortOrder: number; imageSrc: string };
export type DashboardImageSlot = { key: string; label: string; defaultSrc: string };

const imageSlots = [
  ["Hero", "Homepage Hero"], ["Fish & Seafood", "Fish & Seafood Category"], ["Vegetarian Comforts", "Vegetarian Comforts Category"], ["Bengali Classics", "Bengali Classics Category"],
] as const;

export const dashboardImageSlots: DashboardImageSlot[] = imageSlots.map(([key, label]) => ({ key, label, defaultSrc: bengaliImages.hero }));
export const dashboardImageOptions: DashboardImageOption[] = [{ label: "Bengali feast", src: bengaliImages.hero }];

function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
export function defaultImageSelections() { return Object.fromEntries(dashboardImageSlots.map((slot) => [slot.key, slot.defaultSrc])) as Record<string, string>; }
export function defaultMenuItems(): DashboardMenuItem[] { return menuCategories.flatMap((category) => category.items.map((item, index) => ({ id: `${slugify(category.name)}-${slugify(item.name)}`, name: item.name, price: item.price, description: item.description, category: category.name, visible: true, sortOrder: index, imageSrc: item.imageSrc || bengaliImages.hero }))); }
