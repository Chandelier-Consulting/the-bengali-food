export type DashboardImageOption = { label: string; src: string };
export type DashboardMenuItem = { id: string; name: string; price: string; description: string; category: string; visible: boolean; sortOrder: number; imageSrc: string };
export type DashboardImageSlot = { key: string; label: string; defaultSrc: string };

export const dashboardImageSlots: DashboardImageSlot[] = [
  { key: "Hero", label: "Homepage hero", defaultSrc: "" },
  { key: "Fish & Seafood", label: "Fish & Seafood section", defaultSrc: "" },
  { key: "Vegetarian Comforts", label: "Vegetarian Comforts section", defaultSrc: "" },
  { key: "Bengali Classics", label: "Bengali Classics section", defaultSrc: "" },
  { key: "Rice & Sides", label: "Rice & Sides section", defaultSrc: "" },
  { key: "Desserts", label: "Desserts section", defaultSrc: "" },
];
export const dashboardImageOptions: DashboardImageOption[] = [];
export function defaultImageSelections() { return {}; }
export function defaultMenuItems(): DashboardMenuItem[] { return []; }
