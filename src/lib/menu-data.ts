import { bengaliImages } from "./site-content";

export type MenuItem = {
  name: string;
  price: string;
  description: string;
  imageSrc: string;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    name: "Fish & Seafood",
    items: [
      { name: "Giant Prawns Curry", price: "$25", description: "Large prawns in a deeply spiced Bengali curry.", imageSrc: bengaliImages.prawns },
      { name: "Shorshe Chingri", price: "$20", description: "Shrimp curry with Bengali mustard and green chili.", imageSrc: bengaliImages.prawns },
      { name: "Katla Kalia", price: "$18", description: "Two pieces of catla fish in a rich, aromatic kalia curry.", imageSrc: bengaliImages.fish },
      { name: "Ilish Shorshe", price: "$16", description: "Hilsa fish in a fragrant mustard sauce.", imageSrc: bengaliImages.fish },
      { name: "Rui Maacher Kalia", price: "$16", description: "Two pieces of rohu fish curry, a Bengali favorite.", imageSrc: bengaliImages.fish },
      { name: "Steam Fish Kalia Curry", price: "$16", description: "Two pieces of steamed fish in a traditional kalia curry.", imageSrc: bengaliImages.fish },
    ],
  },
  {
    name: "Vegetarian Comforts",
    items: [
      { name: "Chhola'r Dal", price: "$8", description: "Bengal gram lentils tempered with warm spices.", imageSrc: bengaliImages.vegetables },
      { name: "Begun Bhaji", price: "See ordering menu", description: "Seasoned fried eggplant, served as a comforting Bengali side.", imageSrc: bengaliImages.vegetables },
      { name: "Shukto", price: "See ordering menu", description: "A gently spiced Bengali vegetable stew.", imageSrc: bengaliImages.vegetables },
    ],
  },
  {
    name: "Bengali Classics",
    items: [
      { name: "Muri Ghonto", price: "See ordering menu", description: "A classic rohu fish head curry with rice and warming spices.", imageSrc: bengaliImages.fish },
    ],
  },
];
