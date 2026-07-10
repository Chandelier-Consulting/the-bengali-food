# Tomy's Kitchen Komala-Inspired Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved Komala-inspired, chef-led redesign for Tomy's Kitchen with restaurant-specific copy and a practical menu page.

**Architecture:** This is a focused Next.js App Router UI update. Keep page content in the existing route files, reuse existing images and menu data, and make shared components slightly more cohesive rather than introducing a new design system.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Node test runner.

---

## Files

- Modify: `tests/responsive-ui.test.mjs` for regression coverage around banned visible copy and required restaurant story content.
- Modify: `src/app/globals.css` to rename the internal dark token away from `--charcoal` and add subtle global texture helpers.
- Modify: `src/app/layout.tsx` to remove charcoal wording from Open Graph alt text.
- Modify: `src/components/Navbar.tsx` to align nav surface styling with the warmer editorial theme.
- Modify: `src/components/Footer.tsx` to make footer copy more restaurant-specific.
- Modify: `src/components/InfoCard.tsx` and `src/components/SectionHeading.tsx` for cohesive section/card treatment.
- Modify: `src/app/page.tsx` for the homepage editorial structure.
- Modify: `src/app/about/page.tsx` for Tomas-centered storytelling.
- Modify: `src/app/menu/page.tsx` for a more cohesive but still practical menu.

## Task 1: Add Regression Tests

**Files:**
- Modify: `tests/responsive-ui.test.mjs`

- [ ] **Step 1: Add tests before production changes**

Add tests that read touched source files and assert:

```js
test("visible restaurant copy avoids theme placeholder language", async () => {
  const files = [
    "../src/app/page.tsx",
    "../src/app/about/page.tsx",
    "../src/app/menu/page.tsx",
    "../src/app/layout.tsx",
    "../src/components/Footer.tsx",
  ];

  const source = (
    await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), "utf8")))
  ).join("\n");

  assert.doesNotMatch(source, /charcoal/i);
  assert.doesNotMatch(source, /built around workflows/i);
});

test("about page tells a Tomas Tejeda restaurant story", async () => {
  const aboutPage = await readFile(new URL("../src/app/about/page.tsx", import.meta.url), "utf8");

  assert.match(aboutPage, /Tomas Tejeda/);
  assert.match(aboutPage, /El Camino Real/);
  assert.match(aboutPage, /food truck/);
  assert.match(aboutPage, /made daily/i);
});
```

- [ ] **Step 2: Run tests to verify red**

Run: `npm test`

Expected: `visible restaurant copy avoids theme placeholder language` fails because existing code contains `charcoal`.

## Task 2: Shared Theme And Component Polish

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/InfoCard.tsx`
- Modify: `src/components/SectionHeading.tsx`

- [ ] **Step 1: Rename the dark token and update visible metadata copy**

In `globals.css`, replace `--charcoal` with `--kitchen-night`. In `layout.tsx`, change the Open Graph image alt to:

```ts
alt: "Warm terracotta and gold Tomy's Kitchen brand artwork",
```

- [ ] **Step 2: Warm up shared surfaces**

Update shared components to use warmer borders, restrained rounded corners, and restaurant copy in the footer. Keep APIs unchanged so pages do not need new abstractions.

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: The microcopy test may still fail until page copy is updated, but no syntax errors should appear.

## Task 3: Homepage Editorial Refresh

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace hero copy and structure**

Use a text-led hero with layered existing food images. Required visible concepts:

```txt
Tomy's Kitchen · Mountain View
Mexican cooking from Chef Tomas Tejeda's food truck.
Breakfast, tacos, seafood, and daily plates made fresh on El Camino Real.
```

- [ ] **Step 2: Replace lower homepage sections**

Add a signature dishes section, a restaurant-belief pull quote, and a visit CTA. Use existing assets:

```txt
/images/tomys-hero.png
/images/tomys-tacos.png
/images/tomys-quesabirria.png
```

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: Homepage imagery and microcopy tests pass if all banned copy is removed from touched files.

## Task 4: About Page Storytelling Refresh

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Build Tomas-centered story sections**

Include:

```txt
Tomas Tejeda
El Camino Real
food truck
made daily
```

Use sections for daily rhythm, menu range, and values grounded in fresh prep and regular guests.

- [ ] **Step 2: Run tests**

Run: `npm test`

Expected: About story test passes.

## Task 5: Menu Cohesion Pass

**Files:**
- Modify: `src/app/menu/page.tsx`

- [ ] **Step 1: Preserve practical menu behavior**

Keep:

```txt
max-w-full
overflow-x-auto
sticky category nav
item names, descriptions, and prices
```

- [ ] **Step 2: Restyle category sections**

Use warmer editorial section headers and less isolated-card styling while keeping the category scan easy.

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: Existing responsive menu test passes.

## Task 6: Verification

**Files:**
- Read: `node_modules/next/dist/docs/` if dependencies are installed; if unavailable before install, install dependencies and then check relevant docs before final verification.

- [ ] **Step 1: Install dependencies if needed**

Run: `npm install`

Expected: `node_modules` exists and package lock remains consistent.

- [ ] **Step 2: Check local Next docs**

Run: `find node_modules/next/dist/docs -maxdepth 2 -type f | head`

Expected: If docs exist, inspect relevant App Router/CSS guidance before final build. If the package does not ship docs at that path, record that fact.

- [ ] **Step 3: Run full verification**

Run:

```bash
npm run lint
npm test
npm run build
```

Expected: All commands exit 0.

