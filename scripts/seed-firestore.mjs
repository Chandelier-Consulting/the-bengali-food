import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const hero = "/images/bengali/bengali-feast-hero.png";
const settings = {
  businessName: "The Bengali Food", locationLabel: "San Jose, CA", orderUrl: "https://order.online/store/the-bengali-food-32130435?pickup=true", ratingText: "4.3 rating from 20+ DoorDash customers",
  footerDescription: "Bengali fish curries, lentils, vegetables, and home-style comfort food for pickup, delivery, and gatherings.",
  home: { eyebrow: "Authentic Bengali cuisine · San Jose, CA", title: "Bengal, cooked close to home.", description: "Mustard-rich fish curries, comforting lentils, and Bengali classics made for weeknight comfort and special gatherings.", featuredEyebrow: "Start here", featuredTitle: "From mustard fish to generous prawn curry.", featuredDescription: "Bengali cooking brings freshwater fish, mustard, vegetables, and slow-building spice together in unmistakably comforting ways.", gatheringEyebrow: "For shared tables", gatheringTitle: "Bring Bengali comfort food to the gathering.", gatheringDescription: "Planning dinner for a group or an event? Start with the online menu and choose the dishes that make the table feel complete." },
  about: { eyebrow: "Our table", title: "Bengali food has a language of its own.", description: "Mustard, fish, lentils, seasonal vegetables, and carefully built spice are at the center of Bengali cooking. The Bengali Food brings those familiar flavors to the South Bay." },
  order: { eyebrow: "Pickup and delivery", title: "Order The Bengali Food in San Jose.", description: "Use the restaurant’s live menu to choose pickup or delivery, check current availability, and complete your order." },
  catering: { eyebrow: "Events and gatherings", title: "Bengali food for a table worth gathering around.", description: "Whether it is a family meal or a larger event, begin with the online menu to see current dishes and place an order." },
  images: { Hero: hero, "Fish & Seafood": hero, "Vegetarian Comforts": hero, "Bengali Classics": hero },
};
const categories = [
  ["Fish & Seafood", [["Giant Prawns Curry", "$25", "Large prawns in a deeply spiced Bengali curry."], ["Shorshe Chingri", "$20", "Shrimp curry with Bengali mustard and green chili."], ["Katla Kalia", "$18", "Two pieces of catla fish in a rich kalia curry."], ["Ilish Shorshe", "$16", "Hilsa fish in fragrant mustard sauce."], ["Rui Maacher Kalia", "$16", "Two pieces of rohu fish curry."], ["Steam Fish Kalia Curry", "$16", "Two pieces of steamed fish in kalia curry."]]],
  ["Vegetarian Comforts", [["Chhola'r Dal", "$8", "Bengal gram lentils tempered with warm spices."], ["Begun Bhaji", "See ordering menu", "Seasoned fried eggplant."], ["Shukto", "See ordering menu", "A gently spiced Bengali vegetable stew."]]],
  ["Bengali Classics", [["Muri Ghonto", "See ordering menu", "A classic rohu fish head curry with rice and spices."]]],
];
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
if (!projectId || !clientEmail || !privateKey) throw new Error("Missing Firebase Admin credentials in .env.local.");
const app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) }); const db = getFirestore(app); const batch = db.batch();
batch.set(db.doc("siteContent/settings"), { ...settings, updatedAt: new Date().toISOString() });
for (const [category, items] of categories) {
  items.forEach(([name, price, description], sortOrder) => {
    const id = `${category}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    batch.set(db.collection("menuItems").doc(id), { name, price, description, category, visible: true, sortOrder, imageSrc: hero });
  });
}
await batch.commit(); console.log("Seeded The Bengali Food Firestore content.");
