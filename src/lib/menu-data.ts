export type MenuItem = { id: string; name: string; price: string; description: string; imageSrc: string; category: string; visible: boolean; sortOrder: number };
export type MenuCategory = { name: string; items: MenuItem[] };
