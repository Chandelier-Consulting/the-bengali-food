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
test("dashboard can edit photos and menu without editing static section prose", async () => {
  const dashboard = await read("../src/app/dashboard/DashboardClient.tsx");
  assert.match(dashboard, /Save photos/);
  assert.match(dashboard, /Save menu changes/);
  assert.doesNotMatch(dashboard, /JSON\.parse/);
  assert.doesNotMatch(dashboard, /Site settings/);
});
test("dashboard explains missing Firebase Auth setup", async () => {
  const access = await read("../src/app/dashboard/DashboardAccess.tsx");
  assert.match(access, /Firebase Auth is not enabled/);
  assert.match(access, /auth\/configuration-not-found|CONFIGURATION_NOT_FOUND/);
});
test("public pages include Tomy's-level content sections", async () => {
  const files = [
    ["../src/components/HomeTruckJourney.tsx", 8],
    ["../src/app/about/page.tsx", 5],
    ["../src/app/location/page.tsx", 3],
    ["../src/app/group-orders/page.tsx", 5],
    ["../src/app/menu/page.tsx", 3],
  ];

  for (const [file, minimumSections] of files) {
    const source = await read(file);
    const sectionCount = source.match(/<section/g)?.length ?? 0;
    assert.ok(sectionCount >= minimumSections, `${file} has ${sectionCount} sections, expected at least ${minimumSections}`);
  }
});
test("public page prose is static while photos and menu stay managed", async () => {
  const files = [
    "../src/components/HomeTruckJourney.tsx",
    "../src/app/about/page.tsx",
    "../src/app/location/page.tsx",
    "../src/app/group-orders/page.tsx",
    "../src/app/menu/page.tsx",
  ];

  for (const file of files) {
    const source = await read(file);
    assert.doesNotMatch(source, /settings\.(home|about|order|catering|businessName|ratingText|footerDescription|locationLabel)/, `${file} should not source static prose from Firestore settings`);
  }

  const home = await read("../src/components/HomeTruckJourney.tsx");
  const menu = await read("../src/components/ManagedMenuSections.tsx");
  assert.match(home, /settings\.images/);
  assert.match(home, /menuItems/);
  assert.match(menu, /menuItems/);
});
test("Firebase writes require authentication", async () => {
  const rules = `${await read("../firestore.rules")}\n${await read("../storage.rules")}`;
  assert.match(rules, /request\.auth != null/); assert.doesNotMatch(rules, /allow write: if true/);
});
