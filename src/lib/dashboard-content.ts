export type DashboardImageOption = { label: string; src: string };
export type DashboardMenuItem = { id: string; name: string; price: string; description: string; category: string; visible: boolean; sortOrder: number; imageSrc: string };
export type DashboardImageSlot = { key: string; label: string; defaultSrc: string };
export const dashboardImageSlots: DashboardImageSlot[] = [];
export const dashboardImageOptions: DashboardImageOption[] = [];
export function defaultImageSelections() { return {}; }
export function defaultMenuItems(): DashboardMenuItem[] { return []; }
