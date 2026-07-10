import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, writeBatch } from "firebase/firestore";

const firebaseConfig = { apiKey: "AIzaSyAGRUIWpuGmHRgRH-SXHmF8n3WSRpeXQV0", authDomain: "tomys-kitchen.firebaseapp.com", projectId: "tomys-kitchen", storageBucket: "tomys-kitchen.firebasestorage.app", messagingSenderId: "688845926740", appId: "1:688845926740:web:5fffda536bf1679bc1d8c1" };
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
