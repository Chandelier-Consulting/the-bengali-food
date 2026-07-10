import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, writeBatch } from "firebase/firestore";

const firebaseConfig = { apiKey: "AIzaSyAc-ceSvDfItj4ndimhCh6lz0_s07REFfo", authDomain: "the-bengali-food.firebaseapp.com", projectId: "the-bengali-food", storageBucket: "the-bengali-food.firebasestorage.app", messagingSenderId: "439739291044", appId: "1:439739291044:web:7c342926c4c244f4ce9d31", measurementId: "G-FQHSG9DJHS" };
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const hero = "/images/bengali/bengali-feast-hero.png";
const menuCategories = [
  ["Fish & Seafood", [["Giant Prawns Curry", "$25", "Large prawns in a deeply spiced Bengali curry."], ["Shorshe Chingri", "$20", "Shrimp curry with Bengali mustard and green chili."], ["Katla Kalia", "$18", "Two pieces of catla fish in a rich kalia curry."], ["Ilish Shorshe", "$16", "Hilsa fish in fragrant mustard sauce."], ["Rui Maacher Kalia", "$16", "Two pieces of rohu fish curry."], ["Steam Fish Kalia Curry", "$16", "Two pieces of steamed fish in kalia curry."]]],
  ["Vegetarian Comforts", [["Chhola'r Dal", "$8", "Bengal gram lentils tempered with warm spices."], ["Begun Bhaji", "See ordering menu", "Seasoned fried eggplant."], ["Shukto", "See ordering menu", "A gently spiced Bengali vegetable stew."]]],
  ["Bengali Classics", [["Muri Ghonto", "See ordering menu", "A classic rohu fish head curry with rice and spices."]]],
];
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const db = getFirestore(app); const batch = writeBatch(db);
batch.set(doc(db, "siteContent", "settings"), { orderLinks: [{ label: "Order pickup or delivery", href: "https://order.online/store/the-bengali-food-32130435?pickup=true" }], images: { Hero: hero, "Fish & Seafood": hero, "Vegetarian Comforts": hero, "Bengali Classics": hero }, updatedAt: new Date().toISOString() }, { merge: true });
for (const [category, items] of menuCategories) for (const [index, [name, price, description]] of items.entries()) batch.set(doc(db, "menuItems", `${slugify(category)}-${slugify(name)}`), { name, price, description, category, visible: true, sortOrder: index, imageSrc: hero }, { merge: true });
await batch.commit();
console.log("Seeded The Bengali Food Firestore content.");
