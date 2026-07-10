import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const hero = "/images/bengali/bengali-feast-hero.png";
const fish = "/images/bengali/rohu-kalia.png";
const settings = {
  businessName: "The Bengali Food", locationLabel: "San Jose, CA", orderUrl: "https://order.online/store/the-bengali-food-32130435?pickup=true", ratingText: "4.3 rating from 20+ DoorDash customers",
  footerDescription: "Bengali fish curries, lentils, vegetables, and home-style comfort food for pickup, delivery, and gatherings.",
  home: { eyebrow: "Authentic Bengali cuisine · San Jose, CA", title: "Bengal, cooked close to home.", description: "Mustard-rich fish curries, comforting lentils, and Bengali classics made for weeknight comfort and special gatherings.", featuredEyebrow: "Start here", featuredTitle: "From mustard fish to generous prawn curry.", featuredDescription: "Bengali cooking brings freshwater fish, mustard, vegetables, and slow-building spice together in unmistakably comforting ways.", gatheringEyebrow: "For shared tables", gatheringTitle: "Bring Bengali comfort food to the gathering.", gatheringDescription: "Planning dinner for a group or an event? Start with the online menu and choose the dishes that make the table feel complete." },
  about: { eyebrow: "Our table", title: "Bengali food has a language of its own.", description: "Mustard, fish, lentils, seasonal vegetables, and carefully built spice are at the center of Bengali cooking. The Bengali Food brings those familiar flavors to the South Bay." },
  order: { eyebrow: "Pickup and delivery", title: "Order The Bengali Food in San Jose.", description: "Use the restaurant’s live menu to choose pickup or delivery, check current availability, and complete your order." },
  catering: { eyebrow: "Events and gatherings", title: "Bengali food for a table worth gathering around.", description: "The Bengali Food offers event catering for small gatherings and large celebrations. Use the live ordering menu to start a group order." },
  orderLinks: [{ label: "Order pickup or delivery", href: "https://order.online/store/the-bengali-food-32130435?pickup=true" }],
  images: { Hero: hero, "Fish & Seafood": fish, "Vegetarian Comforts": hero, "Bengali Classics": fish, Desserts: hero },
};
const categories = [
  ["Fish & Seafood", [["ilish Shorshe (Mustard Hilsa Fish) [1 ps]", "$16.00", "Tender hilsa fish in mustard-based curry sauce and poppy seeds."], ["Katla Kalia (Catla Fish Curry) [2 pieces]", "$18.00", "Mature catla carp in a fiery red onion, ginger, and yoghurt sauce."], ["Muri Ghonto Shorshe (Rohu Fish Head Curry with Mustard) [2 pieces]", "$14.00", "Rohu fish head cooked in mustard oil and mustard seeds."], ["Shorshe Chingri (Shrimp Mustard Curry)", "$20.00", "Shrimp in mustard-infused curry with onion, ginger, garlic, and Bengali spices."], ["Giant Prawns Curry", "$25.00", "Succulent prawns simmered in a rich spiced curry with green chilies."], ["Steam Fish Kalya Fish Curry [2 pieces]", "$16.00", "Tender fish pieces simmered in a rich spiced curry with green chilies."], ["Chingri Malaikari (Shrimp Malai Curry Special)", "$20.00", "Shrimp with onion, chili, tomato, and a special Bengali spice blend."], ["ilish Kalia (Hilsa Fish Curry) [1 piece]", "$25.00", "Hilsa fish in onion, spice, chili, ginger, garlic, and tomato curry."], ["Katla Shorshe (Mustard Catla Fish) [2 pieces]", "$18.00", "Catla fish in mustard oil and ground mustard."], ["Rui Maacher Kalia (Rohu Fish Curry) [2 Pieces]", "$16.00", "Traditional Bengali rohu fish curry with onion, tomato, ginger, garlic, coriander, yoghurt, and ghee."], ["Rui Shorshe (Rohu Fish Mustard Curry) [2 Pieces]", "$16.00", "Rohu fish cooked in mustard oil and mustard seeds."]]],
  ["Rice & Sides", [["Basmati (Plain Basmati Rice)", "$4.00", "Plain basmati rice to complement Bengali curries."]]],
  ["Desserts", [["Gurer Rasgulla (2 pieces)", "$6.00", "Soft cottage-cheese and semolina dumplings in jaggery sugar syrup."], ["Rasmalai", "$9.99", "Soft cheese patties in sweetened milk with saffron and pistachio."]]],
];
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
if (!projectId || !clientEmail || !privateKey) throw new Error("Missing Firebase Admin credentials in .env.local.");
const app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) }); const db = getFirestore(app); const existingItems = await db.collection("menuItems").get(); const batch = db.batch();
existingItems.docs.forEach((item) => batch.delete(item.ref));
batch.set(db.doc("siteContent/settings"), { ...settings, updatedAt: new Date().toISOString() });
for (const [category, items] of categories) {
  items.forEach(([name, price, description], sortOrder) => {
    const id = `${category}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    batch.set(db.collection("menuItems").doc(id), { name, price, description, category, visible: true, sortOrder, imageSrc: category === "Fish & Seafood" ? fish : hero });
  });
}
await batch.commit(); console.log("Seeded The Bengali Food Firestore content.");
