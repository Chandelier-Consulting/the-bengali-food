import { tomysImages } from "./site-content";

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
    name: "Breakfast",
    items: [
      {
        name: "Breakfast Sandwich",
        price: "$8.50",
        description: "Egg, cheese, and your choice of bacon or sausage on a toasted bun",
        imageSrc: tomysImages.breakfastBurrito,
      },
      {
        name: "Cheese & Egg Muffin",
        price: "$6.00",
        description: "Classic egg and melted cheese on an English muffin",
        imageSrc: tomysImages.breakfastBurrito,
      },
      {
        name: "Breakfast Burrito",
        price: "$10.00",
        description: "Best seller with eggs, potatoes, cheese, salsa, and your choice of meat wrapped in a flour tortilla",
        imageSrc: tomysImages.breakfastBurrito,
      },
    ],
  },
  {
    name: "Tacos",
    items: [
      {
        name: "Fish Tacos (Tacos de Pescado)",
        price: "$6.00",
        description: "Crispy battered fish with cabbage slaw and creamy sauce",
        imageSrc: tomysImages.fishTacos,
      },
      {
        name: "Shrimp Tacos",
        price: "$7.00",
        description: "Grilled shrimp with fresh pico de gallo and avocado",
        imageSrc: tomysImages.shrimpTacos,
      },
      {
        name: "Asada Tacos",
        price: "$5.00",
        description: "Grilled marinated steak with onions and cilantro",
        imageSrc: tomysImages.fishTacos,
      },
      {
        name: "Al Pastor Tacos",
        price: "$5.00",
        description: "Spiced pork with pineapple, onion, and cilantro",
        imageSrc: tomysImages.shrimpTacos,
      },
    ],
  },
  {
    name: "Mains",
    items: [
      {
        name: "Quesabirria Combo",
        price: "$15.00",
        description: "Crispy cheese birria tacos with consommé, rice, and beans",
        imageSrc: tomysImages.cateringSteak,
      },
      {
        name: "Quesadilla with Shrimp",
        price: "$16.88",
        description: "Large flour tortilla stuffed with shrimp and melted cheese",
        imageSrc: tomysImages.shrimpTacos,
      },
      {
        name: "Torta Oaxaqueña",
        price: "$17.50",
        description: "Oaxacan-style sandwich with choice of meat, avocado, and queso fresco",
        imageSrc: tomysImages.torta,
      },
      {
        name: "Milanese Plate (Plato de Milanesa)",
        price: "$17.50",
        description: "Crispy breaded cutlet served with rice, beans, and salad",
        imageSrc: tomysImages.cateringSteak,
      },
      {
        name: "Shrimp Fajitas Plate",
        price: "$18.75",
        description: "Sizzling shrimp fajitas with peppers, onions, rice, and beans",
        imageSrc: tomysImages.shrimpTacos,
      },
      {
        name: "Burrito de Camarón o Pescado",
        price: "$17.50",
        description: "Large burrito with your choice of shrimp or fish, rice, beans, and fixings",
        imageSrc: tomysImages.breakfastBurrito,
      },
    ],
  },
  {
    name: "Seafood Cocktails",
    items: [
      {
        name: "Coctel Mixto",
        price: "$23.75",
        description: "Shrimp, octopus, and crab in a chilled tomato-based cocktail sauce",
        imageSrc: tomysImages.shrimpTacos,
      },
      {
        name: "Coctel Campechano",
        price: "$20.63",
        description: "Mixed seafood cocktail with fresh lime, avocado, and cilantro",
        imageSrc: tomysImages.shrimpTacos,
      },
      {
        name: "Tostada Aguachile",
        price: "$9.38",
        description: "Crispy tostada topped with shrimp cured in lime and chili",
        imageSrc: tomysImages.shrimpTacos,
      },
    ],
  },
  {
    name: "Drinks",
    items: [
      {
        name: "Horchata",
        price: "$4.00",
        description: "Creamy cinnamon rice milk drink",
        imageSrc: tomysImages.truck,
      },
      {
        name: "Jamaica",
        price: "$3.50",
        description: "Chilled hibiscus tea",
        imageSrc: tomysImages.truck,
      },
      {
        name: "Mexican Coke",
        price: "$3.00",
        description: "Made with real cane sugar",
        imageSrc: tomysImages.truck,
      },
      {
        name: "Jarritos",
        price: "$3.00",
        description: "Assorted Mexican fruit sodas",
        imageSrc: tomysImages.truck,
      },
    ],
  },
  {
    name: "Catering",
    items: [
      {
        name: "Taco Party Tray",
        price: "$145.00",
        description: "A practical taco spread with proteins, tortillas, salsa, onions, cilantro, and setup that feeds a hungry group fast.",
        imageSrc: tomysImages.cateringSalmon,
      },
      {
        name: "Mediterranean Chicken Tray",
        price: "$165.00",
        description: "Herb chicken with rice, vegetables, and bright sauces for events that want a lighter catering option.",
        imageSrc: tomysImages.cateringPasta,
      },
      {
        name: "Steak and Pasta Catering Pan",
        price: "$185.00",
        description: "A larger-format entree pan built for office lunches, family parties, and events that need fuller plates.",
        imageSrc: tomysImages.cateringSteak,
      },
    ],
  },
];
