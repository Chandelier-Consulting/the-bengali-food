# Catering Stack Category Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `Catering` a first-class menu category in the dashboard and render its items as a one-column photo-card stack on both the menu and catering pages.

**Architecture:** Keep using the existing `menuItems` Firestore collection and item shape. Add `Catering` to the built-in category defaults and filter it out of the regular menu-section renderer, then use one dedicated shared component that reads visible `Catering` items and the shared heading.

**Tech Stack:** Next.js App Router, React 19, Firebase Firestore, Node test runner, TypeScript

---

### Task 1: Lock expected behavior with a failing regression

**Files:**
- Modify: `tests/responsive-ui.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test("catering is a dedicated dashboard category rendered as stacked cards on menu and catering pages", async () => {
  const menuData = await read("../src/lib/menu-data.ts");
  const dashboard = await read("../src/app/dashboard/DashboardClient.tsx");
  const menuSections = await read("../src/components/ManagedMenuSections.tsx");
  const cateringPreview = await read("../src/components/ManagedCateringMenuPreview.tsx");

  assert.match(menuData, /name: "Catering"/);
  assert.match(dashboard, /"Catering"/);
  assert.match(menuSections, /hiddenCategories/);
  assert.match(cateringPreview, /img/);
  assert.match(cateringPreview, /category === "Catering"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: FAIL because `Catering` is not yet a built-in menu category and the preview does not yet render stacked image cards from `Catering` items.

- [ ] **Step 3: Write minimal implementation**

```ts
const baseCategories = ["Breakfast", "Tacos", "Mains", "Seafood Cocktails", "Drinks", "Catering"];
```

```ts
export const menuCategories: MenuCategory[] = [
  // existing categories...
  {
    name: "Catering",
    items: [
      { name: "...", price: "...", description: "...", imageSrc: tomysImages.cateringSalmon },
    ],
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/responsive-ui.test.mjs src/lib/menu-data.ts src/app/dashboard/DashboardClient.tsx
git commit -m "test(menu): lock catering category behavior"
```

### Task 2: Move catering rendering to one shared stacked-card component

**Files:**
- Modify: `src/components/ManagedCateringMenuPreview.tsx`
- Modify: `src/components/ManagedMenuSections.tsx`
- Modify: `src/app/menu/page.tsx`
- Modify: `src/app/group-orders/page.tsx`

- [ ] **Step 1: Write the failing test**

```js
assert.match(cateringPreview, /sm:grid-cols-\[160px_1fr_auto\]/);
assert.match(cateringPreview, /imageSrc/);
assert.match(menuPage, /hiddenCategories=\{\["Catering"\]\}/);
assert.match(groupOrdersPage, /ManagedCateringMenuPreview/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: FAIL because the current component uses a two-column section layout and accepts `featuredItems` instead of reading stacked `Catering` cards.

- [ ] **Step 3: Write minimal implementation**

```tsx
const items = liveItems.length ? liveItems : fallbackItems;
const cateringItems = items.filter((item) => item.category === "Catering");
```

```tsx
<div className="mt-10 grid gap-4">
  {cateringItems.map((item) => (
    <article className="grid gap-4 sm:grid-cols-[160px_1fr_auto]">
      <img src={item.imageSrc} alt={item.name} className="h-32 w-full rounded-2xl object-cover" />
    </article>
  ))}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ManagedCateringMenuPreview.tsx src/components/ManagedMenuSections.tsx src/app/menu/page.tsx src/app/group-orders/page.tsx tests/responsive-ui.test.mjs
git commit -m "feat(menu): stack catering cards from shared category"
```

### Task 3: Verify type safety and lint cleanliness

**Files:**
- Modify: `scripts/seed-firestore.mjs`

- [ ] **Step 1: Write the failing test**

```js
const seed = await read("../scripts/seed-firestore.mjs");
assert.match(seed, /name: "Catering"/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: FAIL if the seed script still omits the `Catering` defaults.

- [ ] **Step 3: Write minimal implementation**

```js
{
  name: "Catering",
  items: [
    { name: "...", price: "...", description: "..." },
  ],
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/seed-firestore.mjs tests/responsive-ui.test.mjs
git commit -m "chore(seed): include catering category defaults"
```

### Task 4: Final verification

**Files:**
- No code changes required unless verification fails

- [ ] **Step 1: Run targeted regression**

Run: `npm test -- tests/responsive-ui.test.mjs`
Expected: PASS

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with no errors

- [ ] **Step 3: Run typecheck**

Run: `npx tsc --noEmit`
Expected: PASS with no errors

- [ ] **Step 4: Inspect diff**

Run: `git diff --stat HEAD~1..HEAD`
Expected: Only the catering category, preview, menu page, dashboard, seed, and test files change.
