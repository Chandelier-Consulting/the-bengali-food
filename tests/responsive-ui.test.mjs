import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (file) => readFile(new URL(file, import.meta.url), "utf8");

test("customer-facing content is branded for The Bengali Food", async () => {
  const source = await Promise.all([
    "../src/app/layout.tsx", "../src/components/HomeTruckJourney.tsx", "../src/components/Navbar.tsx", "../src/components/Footer.tsx", "../src/app/about/page.tsx",
  ].map(read));
  const content = source.join("\n");
  assert.match(content, /The Bengali Food/);
  assert.match(content, /Bengali/);
  assert.doesNotMatch(content, /Tomy&apos;s Kitchen/);
  assert.doesNotMatch(content, /Tomas Tejeda/);
});

test("ordering always uses the supplied Bengali Food ordering page", async () => {
  const source = `${await read("../src/lib/site-content.ts")}\n${await read("../src/components/OrderOnlineButton.tsx")}\n${await read("../src/components/MobileActionBar.tsx")}`;
  assert.match(source, /order\.online\/store\/the-bengali-food-32130435\?pickup=true/);
  assert.match(source, /Order pickup or delivery/);
  assert.doesNotMatch(source, /tomys-kitchen/);
  assert.doesNotMatch(source, /doordash\.com\/store\/tomys/);
});

test("menu presents verified Bengali dishes and does not retain Mexican food", async () => {
  const menu = await read("../src/lib/menu-data.ts");
  assert.match(menu, /Giant Prawns Curry/);
  assert.match(menu, /Shorshe Chingri/);
  assert.match(menu, /Rui Maacher Kalia/);
  assert.match(menu, /Chhola'r Dal/);
  assert.match(menu, /Muri Ghonto/);
  assert.doesNotMatch(menu, /Breakfast Burrito/);
  assert.doesNotMatch(menu, /Tacos/);
});

test("site pages avoid unverified address and phone claims", async () => {
  const source = await Promise.all([
    "../src/components/HomeTruckJourney.tsx", "../src/app/location/page.tsx", "../src/app/group-orders/page.tsx", "../src/components/Footer.tsx",
  ].map(read));
  const content = source.join("\n");
  assert.doesNotMatch(content, /239 W El Camino/);
  assert.doesNotMatch(content, /650\) 289/);
  assert.doesNotMatch(content, /8:30 AM/);
});

test("home and menu keep responsive media and accessible navigation", async () => {
  const source = `${await read("../src/components/HomeTruckJourney.tsx")}\n${await read("../src/app/menu/page.tsx")}\n${await read("../src/components/Navbar.tsx")}`;
  assert.match(source, /object-cover/);
  assert.match(source, /min-h-screen/);
  assert.match(source, /overflow-x-auto/);
  assert.match(source, /aria-label="Menu categories"/);
  assert.match(source, /aria-label="The Bengali Food home"/);
});

test("Firebase is configured for The Bengali Food and protects writes", async () => {
  const source = `${await read("../src/lib/firebase-client.ts")}\n${await read("../scripts/seed-firestore.mjs")}\n${await read("../.firebaserc")}`;
  const rules = `${await read("../firestore.rules")}\n${await read("../storage.rules")}`;
  assert.match(source, /the-bengali-food/);
  assert.doesNotMatch(source, /tomys-kitchen/);
  assert.match(rules, /request\.auth != null/);
  assert.doesNotMatch(rules, /allow write: if true/);
});
