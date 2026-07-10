import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
const read = (file) => readFile(new URL(file, import.meta.url), "utf8");

test("seed script is the restaurant content source", async () => {
  const seed = await read("../scripts/seed-firestore.mjs");
  const site = await read("../src/lib/site-content.ts");
  assert.match(seed, /The Bengali Food/); assert.match(seed, /Shorshe Chingri/); assert.match(seed, /Chingri Malaikari/); assert.match(seed, /Gurer Rasgulla/); assert.match(seed, /order\.online\/store\/the-bengali-food/);
  assert.doesNotMatch(site, /The Bengali Food/);
});
test("public pages subscribe to Firestore-backed content", async () => {
  const provider = await read("../src/components/SiteContentProvider.tsx");
  const home = await read("../src/components/HomeTruckJourney.tsx");
  const menu = await read("../src/components/ManagedMenuSections.tsx");
  assert.match(provider, /onSnapshot/); assert.match(provider, /siteContent/); assert.match(provider, /menuItems/);
  assert.match(home, /useSiteContent/); assert.match(menu, /useSiteContent/);
});
test("dashboard can edit shared settings and menu", async () => {
  const dashboard = await read("../src/app/dashboard/DashboardClient.tsx");
  assert.match(dashboard, /Site settings/); assert.match(dashboard, /Save site settings/); assert.match(dashboard, /Save menu changes/); assert.match(dashboard, /JSON\.parse/);
});
test("Firebase writes require authentication", async () => {
  const rules = `${await read("../firestore.rules")}\n${await read("../storage.rules")}`;
  assert.match(rules, /request\.auth != null/); assert.doesNotMatch(rules, /allow write: if true/);
});
