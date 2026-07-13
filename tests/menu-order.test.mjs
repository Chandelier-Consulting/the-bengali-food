import assert from "node:assert/strict";
import test from "node:test";
import { compareMenuItems } from "../src/lib/menu-order.mjs";

test("menu items sort by restaurant category before item order", () => {
  const items = [
    { name: "Rasmalai", category: "Desserts", sortOrder: 0 },
    { name: "Basmati", category: "Rice & Sides", sortOrder: 0 },
    { name: "Shorshe Chingri", category: "Fish & Seafood", sortOrder: 4 },
    { name: "Ilish Shorshe", category: "Fish & Seafood", sortOrder: 0 },
  ];

  assert.deepEqual(items.sort(compareMenuItems).map((item) => item.name), [
    "Ilish Shorshe",
    "Shorshe Chingri",
    "Basmati",
    "Rasmalai",
  ]);
});
