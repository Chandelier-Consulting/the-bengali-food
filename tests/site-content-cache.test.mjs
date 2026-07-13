import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (file) => readFile(new URL(file, import.meta.url), "utf8");

test("site content cache stores managed Firebase data with a schema version", async () => {
  const cache = await import("../src/lib/site-content-cache.mjs");
  const storage = new Map();
  const localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  };
  const data = {
    settings: { businessName: "The Bengali Food", locationLabel: "San Jose", orderUrl: "https://example.com", images: { Hero: "/hero.jpg" } },
    menuItems: [{ id: "fish", name: "Fish", price: "$18", description: "Mustard fish", imageSrc: "/fish.jpg", category: "Fish & Seafood", visible: true, sortOrder: 1 }],
  };

  cache.clearSiteContentMemoryCache();
  const saved = cache.writeSiteContentCache(data, localStorage);
  const hydrated = cache.readSiteContentCache(localStorage);

  assert.equal(saved.version, cache.SITE_CONTENT_CACHE_VERSION);
  assert.equal(storage.has(cache.SITE_CONTENT_CACHE_KEY), true);
  assert.deepEqual(hydrated.data.settings, data.settings);
  assert.deepEqual(hydrated.data.menuItems, data.menuItems);
  assert.equal(hydrated.source, "memory");
});

test("site content cache rejects stale schema versions", async () => {
  const cache = await import("../src/lib/site-content-cache.mjs");
  const storage = new Map([[cache.SITE_CONTENT_CACHE_KEY, JSON.stringify({ version: -1, settings: {}, menuItems: [] })]]);
  const localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  };

  cache.clearSiteContentMemoryCache();
  assert.equal(cache.readSiteContentCache(localStorage), null);
  assert.equal(storage.has(cache.SITE_CONTENT_CACHE_KEY), false);
});

test("site content cache rejects settings that cannot render public pages", async () => {
  const cache = await import("../src/lib/site-content-cache.mjs");
  const storage = new Map([[cache.SITE_CONTENT_CACHE_KEY, JSON.stringify({ version: cache.SITE_CONTENT_CACHE_VERSION, settings: {}, menuItems: [] })]]);
  const localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  };

  cache.clearSiteContentMemoryCache();
  assert.equal(cache.readSiteContentCache(localStorage), null);
  assert.equal(storage.has(cache.SITE_CONTENT_CACHE_KEY), false);
});

test("site content provider hydrates from cache and refreshes Firebase in the background", async () => {
  const provider = await read("../src/components/SiteContentProvider.tsx");

  assert.match(provider, /readSiteContentCache/);
  assert.match(provider, /writeSiteContentCache/);
  assert.match(provider, /setHydratedFromCache\(true\)/);
  assert.match(provider, /onSnapshot/);
  assert.match(provider, /GlobalLoadingOverlay/);
  assert.doesNotMatch(provider, /Loading The Bengali Food|Loading menu/);
});

test("global loading overlay is full-screen, motion-driven, and minimum-duration guarded", async () => {
  const overlay = await read("../src/components/GlobalLoadingOverlay.tsx");
  const provider = await read("../src/components/SiteContentProvider.tsx");

  assert.match(overlay, /AnimatePresence/);
  assert.match(overlay, /motion\.div/);
  assert.match(overlay, /fixed inset-0/);
  assert.match(overlay, /exit=/);
  assert.match(overlay, /useReducedMotion/);
  assert.match(provider, /MIN_LOADING_MS\s*=\s*900/);
  assert.match(provider, /minimumLoadingElapsed/);
});

test("card surfaces fade in around twenty percent and fade out near ten percent visibility", async () => {
  const reveal = await read("../src/components/Reveal.tsx");
  const home = await read("../src/components/HomeTruckJourney.tsx");
  const menu = await read("../src/components/ManagedMenuSections.tsx");
  const groupOrders = await read("../src/app/group-orders/page.tsx");

  assert.match(reveal, /ENTER_THRESHOLD\s*=\s*0\.2/);
  assert.match(reveal, /EXIT_THRESHOLD\s*=\s*0\.08/);
  assert.match(reveal, /threshold:\s*\[0,\s*EXIT_THRESHOLD,\s*ENTER_THRESHOLD,\s*1\]/);
  assert.match(reveal, /if \(prefersReducedMotion\)[\s\S]*return <div className=\{className\}>\{children\}<\/div>;/);
  assert.match(home, /variant="float"[^>]*>\s*<article key=\{item\.id\} className="menu-card/s);
  assert.match(menu, /variant="float"[^>]*>\s*<article key=\{item\.id\} className="menu-card/s);
  assert.match(groupOrders, /variant="float"[^>]*>\s*<article key=\{item\.id\}/s);
});
