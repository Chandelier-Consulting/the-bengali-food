import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGRUIWpuGmHRgRH-SXHmF8n3WSRpeXQV0",
  authDomain: "tomys-kitchen.firebaseapp.com",
  projectId: "tomys-kitchen",
  storageBucket: "tomys-kitchen.firebasestorage.app",
  messagingSenderId: "688845926740",
  appId: "1:688845926740:web:5fffda536bf1679bc1d8c1",
  measurementId: "G-CRQR2R4R9M",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const tomysImages = {
  logo: "/images/tomys/logo.jpg",
  truck: "/images/tomys/truck-still.jpg",
  breakfastBurrito: "/images/tomys/breakfast-burrito.jpg",
  fishTacos: "/images/tomys/fish-tacos.jpg",
  shrimpTacos: "/images/tomys/shrimp-tacos.jpg",
  torta: "/images/tomys/torta-oaxaquena.jpg",
  cateringSalmon: "/images/tomys/catering-salmon.jpg",
  cateringPasta: "/images/tomys/catering-pasta.jpg",
  cateringSteak: "/images/tomys/catering-steak.jpg",
};

const siteImages = {
  Logo: tomysImages.logo,
  Truck: tomysImages.truck,
  "Breakfast Burrito": tomysImages.breakfastBurrito,
  "Fish Tacos (Tacos de Pescado)": tomysImages.fishTacos,
  "Shrimp Tacos": tomysImages.shrimpTacos,
  "Torta Oaxaqueña": tomysImages.torta,
  Breakfast: tomysImages.breakfastBurrito,
  Tacos: tomysImages.fishTacos,
  Mains: tomysImages.torta,
  "Seafood Cocktails": tomysImages.shrimpTacos,
  Drinks: tomysImages.truck,
  Catering: tomysImages.cateringSalmon,
};

const orderLinks = [
  { label: "DoorDash", href: "https://www.doordash.com/store/tomys-kitchen-food-truck-mountain-view-30486102/?srsltid=AfmBOoqhFlpLiPRD7iptcszBpzFHfJ--YBiYcOsPj966-xshhFGhML1A" },
  { label: "Uber Eats", href: "https://www.ubereats.com/store/tomys-kitchen/JFvmxjFvUy2gaYKongCWeg?srsltid=AfmBOorKo-HKOONWeeg5U2CqsCpa1rlfml_yXOyGqlbXEK3WC-4DSHUN" },
  { label: "Postmates", href: "https://postmates.com/store/tomys-kitchen/JFvmxjFvUy2gaYKongCWeg" },
  { label: "Yelp", href: "https://www.yelp.com/biz/tomys-kitchen-mountain-view-5" },
];

const cateringMenuHeading = "Start with the reliable favorites.";

const menuCategories = [
  {
    name: "Breakfast",
    items: [
      { name: "Breakfast Sandwich", price: "$8.50", description: "Egg, cheese, and your choice of bacon or sausage on a toasted bun" },
      { name: "Cheese & Egg Muffin", price: "$6.00", description: "Classic egg and melted cheese on an English muffin" },
      { name: "Breakfast Burrito", price: "$10.00", description: "Best seller with eggs, potatoes, cheese, salsa, and your choice of meat wrapped in a flour tortilla" },
    ],
  },
  {
    name: "Tacos",
    items: [
      { name: "Fish Tacos (Tacos de Pescado)", price: "$6.00", description: "Crispy battered fish with cabbage slaw and creamy sauce" },
      { name: "Shrimp Tacos", price: "$7.00", description: "Grilled shrimp with fresh pico de gallo and avocado" },
      { name: "Asada Tacos", price: "$5.00", description: "Grilled marinated steak with onions and cilantro" },
      { name: "Al Pastor Tacos", price: "$5.00", description: "Spiced pork with pineapple, onion, and cilantro" },
    ],
  },
  {
    name: "Mains",
    items: [
      { name: "Quesabirria Combo", price: "$15.00", description: "Crispy cheese birria tacos with consommé, rice, and beans" },
      { name: "Quesadilla with Shrimp", price: "$16.88", description: "Large flour tortilla stuffed with shrimp and melted cheese" },
      { name: "Torta Oaxaqueña", price: "$17.50", description: "Oaxacan-style sandwich with choice of meat, avocado, and queso fresco" },
      { name: "Milanese Plate (Plato de Milanesa)", price: "$17.50", description: "Crispy breaded cutlet served with rice, beans, and salad" },
      { name: "Shrimp Fajitas Plate", price: "$18.75", description: "Sizzling shrimp fajitas with peppers, onions, rice, and beans" },
      { name: "Burrito de Camarón o Pescado", price: "$17.50", description: "Large burrito with your choice of shrimp or fish, rice, beans, and fixings" },
    ],
  },
  {
    name: "Seafood Cocktails",
    items: [
      { name: "Coctel Mixto", price: "$23.75", description: "Shrimp, octopus, and crab in a chilled tomato-based cocktail sauce" },
      { name: "Coctel Campechano", price: "$20.63", description: "Mixed seafood cocktail with fresh lime, avocado, and cilantro" },
      { name: "Tostada Aguachile", price: "$9.38", description: "Crispy tostada topped with shrimp cured in lime and chili" },
    ],
  },
  {
    name: "Drinks",
    items: [
      { name: "Horchata", price: "$4.00", description: "Creamy cinnamon rice milk drink" },
      { name: "Jamaica", price: "$3.50", description: "Chilled hibiscus tea" },
      { name: "Mexican Coke", price: "$3.00", description: "Made with real cane sugar" },
      { name: "Jarritos", price: "$3.00", description: "Assorted Mexican fruit sodas" },
    ],
  },
  {
    name: "Catering",
    items: [
      { name: "Taco Party Tray", price: "$145.00", description: "A practical taco spread with proteins, tortillas, salsa, onions, cilantro, and setup that feeds a hungry group fast." },
      { name: "Mediterranean Chicken Tray", price: "$165.00", description: "Herb chicken with rice, vegetables, and bright sauces for events that want a lighter catering option." },
      { name: "Steak and Pasta Catering Pan", price: "$185.00", description: "A larger-format entree pan built for office lunches, family parties, and events that need fuller plates." },
    ],
  },
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const defaultItemImage = (category, itemName) => {
  const normalized = `${category} ${itemName}`.toLowerCase();

  if (normalized.includes("breakfast")) return tomysImages.breakfastBurrito;
  if (normalized.includes("fish")) return tomysImages.fishTacos;
  if (normalized.includes("shrimp") || normalized.includes("coctel") || normalized.includes("aguachile")) return tomysImages.shrimpTacos;
  if (normalized.includes("torta")) return tomysImages.torta;
  if (normalized.includes("steak") || normalized.includes("milanesa") || normalized.includes("birria")) return tomysImages.cateringSteak;
  if (normalized.includes("drink") || normalized.includes("horchata") || normalized.includes("jamaica") || normalized.includes("jarritos") || normalized.includes("coke")) return tomysImages.truck;
  return tomysImages.cateringSalmon;
};

const db = getFirestore(app);
const batch = writeBatch(db);

batch.set(doc(db, "siteContent", "settings"), { orderLinks, images: siteImages, cateringMenuHeading, updatedAt: new Date().toISOString() }, { merge: true });

for (const category of menuCategories) {
  for (const [index, item] of category.items.entries()) {
    const id = `${slugify(category.name)}-${slugify(item.name)}`;
    batch.set(
      doc(db, "menuItems", id),
      { ...item, category: category.name, visible: true, sortOrder: index, imageSrc: defaultItemImage(category.name, item.name), updatedAt: new Date().toISOString() },
      { merge: true },
    );
  }
}

await batch.commit();

console.log("Seeded Tomy's Kitchen Firestore content.");
