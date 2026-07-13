# Editorial Restaurant UI/UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current AI-looking restaurant UI with a professional, editorial, conversion-focused restaurant experience while keeping static prose in code and making photos/menu items configurable.

**Architecture:** Keep the existing Next.js App Router, Firebase-backed `SiteContentProvider`, and dashboard. Refactor UI around shared visual primitives and semantic tokens, then rebuild public pages so static sections are polished and menu/photos remain managed data.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui Button/Card, Framer Motion, Firebase Firestore/Auth.

## Global Constraints

- Do not implement before plan approval.
- Static section copy lives in code, not Firebase.
- Firebase/dashboard configurable content is limited to photos and menu items.
- Every menu item must have its own configurable photo and the full menu must render item photos.
- Preserve existing Firebase collections: `siteContent/settings` and `menuItems`.
- No new runtime dependencies unless a task explicitly requires and justifies one; this plan requires none.
- Use real food photography from managed Firebase image URLs; avoid decorative generated-looking backgrounds.
- Keep UI restrained: no gradient orbs, no nested cards, no marketing fluff blocks.
- Cards use `8px` radius unless image/media framing needs a larger radius.
- Verify with `npm test`, `npm run lint`, `npm run build`, and route smoke checks.

---

## File Structure

- Modify `tests/responsive-ui.test.mjs`: add regression tests for design tokens, static copy boundaries, item photos on the menu, and dashboard photo/menu-only editing.
- Modify `src/app/globals.css`: replace monochrome/dark-heavy tokens with warm restaurant tokens and add reusable utility classes.
- Modify `src/app/layout.tsx`: remove forced dark mode, keep fonts simple, update viewport theme color.
- Modify `src/components/Navbar.tsx`: professional sticky nav with visible order action and clear active states.
- Modify `src/components/MobileActionBar.tsx`: fix 4-column bug, show three equal actions with 44px+ targets.
- Modify `src/components/Footer.tsx`: static restaurant footer with order/menu/service-area clarity.
- Modify `src/components/HomeTruckJourney.tsx`: rebuild homepage as editorial ordering surface.
- Modify `src/components/ManagedMenuSections.tsx`: render each item with its own configurable `imageSrc`.
- Modify `src/app/menu/page.tsx`: polish menu framing and sticky category nav.
- Modify `src/app/about/page.tsx`: cleaner static story page.
- Modify `src/app/location/page.tsx`: order/service info page, not fake physical location assumptions.
- Modify `src/app/group-orders/page.tsx`: professional group-order/catering flow.
- Modify `src/app/dashboard/DashboardClient.tsx`: improve admin ergonomics without adding static copy editing.

---

### Task 1: Lock UI/UX Requirements With Tests

**Files:**
- Modify: `tests/responsive-ui.test.mjs`

**Interfaces:**
- Consumes: current source files as text.
- Produces: tests that future tasks must satisfy.

- [ ] **Step 1: Replace/extend tests for the approved UI rules**

Add these tests to `tests/responsive-ui.test.mjs` after the existing dashboard/auth tests:

```js
test("design tokens use warm restaurant palette instead of monochrome dark theme", async () => {
  const css = await read("../src/app/globals.css");
  assert.match(css, /--primary:\s*#[0-9a-fA-F]{6}/);
  assert.match(css, /--background:\s*#[0-9a-fA-F]{6}/);
  assert.match(css, /--surface:\s*#[0-9a-fA-F]{6}/);
  assert.doesNotMatch(css, /--primary:\s*oklch\(0\.205 0 0\)/);
  assert.doesNotMatch(css, /--secondary:\s*oklch\(0\.97 0 0\)/);
  assert.match(css, /\.section-shell/);
  assert.match(css, /\.eyebrow/);
});

test("root layout is not forced into global dark mode", async () => {
  const layout = await read("../src/app/layout.tsx");
  assert.doesNotMatch(layout, /className=\{cn\("dark"/);
  assert.match(layout, /themeColor:\s*"#f7f0e4"/);
});

test("full menu renders individual configurable item photos", async () => {
  const menuSections = await read("../src/components/ManagedMenuSections.tsx");
  assert.match(menuSections, /item\.imageSrc/);
  assert.match(menuSections, /alt=\{item\.name/);
  assert.match(menuSections, /MenuItemPhoto/);
});

test("mobile quick actions use three columns for three actions", async () => {
  const mobile = await read("../src/components/MobileActionBar.tsx");
  assert.match(mobile, /grid-cols-3/);
  assert.doesNotMatch(mobile, /grid-cols-4/);
});

test("public pages avoid generic AI-looking UI patterns", async () => {
  const files = [
    "../src/components/HomeTruckJourney.tsx",
    "../src/app/about/page.tsx",
    "../src/app/location/page.tsx",
    "../src/app/group-orders/page.tsx",
    "../src/app/menu/page.tsx",
  ];

  for (const file of files) {
    const source = await read(file);
    assert.doesNotMatch(source, /rounded-3xl border border-border bg-surface p-6/g, `${file} has repeated generic card styling`);
    assert.doesNotMatch(source, /gradient orb|bokeh|AI-powered|immersive experience/i);
  }
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run:

```bash
npm test
```

Expected: FAIL for the new UI tests because tokens are still monochrome/dark-heavy, menu item photo rendering needs a named item photo component, and mobile action bar still uses four columns.

- [ ] **Step 3: Commit tests only**

```bash
git add tests/responsive-ui.test.mjs
git commit -m "test(ui): lock restaurant UX requirements"
```

---

### Task 2: Reset Design Tokens And App Shell

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/MobileActionBar.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `SiteContentProvider` settings for `orderUrl`, `businessName`, and `locationLabel`.
- Produces: global CSS utilities used by public pages: `.section-shell`, `.section-kicker`, `.eyebrow`, `.display-heading`, `.body-copy`, `.media-frame`, `.menu-card`.

- [ ] **Step 1: Update `globals.css` tokens**

Replace the `:root` token values with:

```css
:root {
  --primary: #9f2f24;
  --primary-hover: #7f241d;
  --secondary: #251711;
  --accent: #b7791f;
  --surface: #fffaf1;
  --muted: #6f6257;
  --border: #e6d8c4;
  --kitchen-night: #1b130f;
  --cream: #f7f0e4;
  --leaf: #49613d;
  --background: #f7f0e4;
  --foreground: #251711;
  --card: #fffaf1;
  --card-foreground: #251711;
  --popover: #fffaf1;
  --popover-foreground: #251711;
  --primary-foreground: #fffaf1;
  --secondary-foreground: #fffaf1;
  --muted-foreground: #6f6257;
  --accent-foreground: #251711;
  --destructive: #b42318;
  --input: #eadfce;
  --ring: #9f2f24;
  --chart-1: #9f2f24;
  --chart-2: #b7791f;
  --chart-3: #49613d;
  --chart-4: #6f6257;
  --chart-5: #251711;
  --radius: 0.5rem;
  --sidebar: #fffaf1;
  --sidebar-foreground: #251711;
  --sidebar-primary: #9f2f24;
  --sidebar-primary-foreground: #fffaf1;
  --sidebar-accent: #f1e4d0;
  --sidebar-accent-foreground: #251711;
  --sidebar-border: #e6d8c4;
  --sidebar-ring: #9f2f24;
}
```

Add reusable classes near `.text-balance`:

```css
.section-shell {
  padding: 6rem 1.25rem;
}

.section-inner {
  margin-inline: auto;
  max-width: 72rem;
}

.eyebrow {
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.display-heading {
  color: var(--secondary);
  font-weight: 800;
  line-height: 0.98;
}

.body-copy {
  color: var(--muted);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.7;
}

.media-frame {
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface);
}

.menu-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 0.5rem;
}

@media (min-width: 1024px) {
  .section-shell {
    padding-block: 7rem;
  }
}
```

- [ ] **Step 2: Update `layout.tsx`**

Change:

```tsx
export const viewport: Viewport = {
  themeColor: "#f7f0e4",
};
```

Change `<html>` className to remove forced dark mode:

```tsx
<html lang="en" className={cn("h-full", "scroll-smooth", inter.variable, "font-sans", geist.variable)}>
```

- [ ] **Step 3: Rebuild navbar**

In `src/components/Navbar.tsx`, keep existing imports and component state. Replace the returned header classes with:

```tsx
className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-md"
```

Use this brand link:

```tsx
<Link
  href="/"
  className="flex shrink-0 items-center gap-3 text-lg font-extrabold text-secondary transition-colors sm:text-xl"
  aria-label={`${settings?.businessName ?? "The Bengali Food"} home`}
>
  <span>{settings?.businessName ?? "The Bengali Food"}</span>
</Link>
```

Use link classes:

```tsx
className="relative whitespace-nowrap text-sm font-semibold text-muted-foreground transition-colors hover:text-secondary"
```

Use active underline:

```tsx
className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary"
```

Use desktop order button:

```tsx
className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-5 text-sm font-extrabold text-primary-foreground transition hover:bg-primary-hover"
```

- [ ] **Step 4: Fix mobile action bar**

In `src/components/MobileActionBar.tsx`, change wrapper to:

```tsx
className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-border bg-surface/96 p-2 shadow-[0_14px_36px_rgba(37,23,17,.18)] backdrop-blur-xl md:hidden"
```

Change grid to:

```tsx
<div className="grid grid-cols-3 gap-1">
```

Change item className to:

```tsx
const className = "grid min-h-14 place-items-center gap-1 rounded-lg px-2 py-2 text-[0.72rem] font-black uppercase tracking-[0.08em] text-muted-foreground transition hover:bg-background hover:text-secondary";
```

- [ ] **Step 5: Rebuild footer**

In `src/components/Footer.tsx`, make the footer light and practical:

```tsx
<footer className="border-t border-border bg-surface text-secondary">
  <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr] lg:px-8">
```

Use static fallback copy if settings are loading:

```tsx
{settings?.businessName ?? "The Bengali Food"}
{settings?.footerDescription ?? "Bengali fish curries, rice, lentils, vegetables, and sweets for pickup, delivery, and shared tables."}
```

- [ ] **Step 6: Run tests and commit**

Run:

```bash
npm test
npm run lint
```

Expected: tests still may fail for page-specific tasks, lint passes.

Commit:

```bash
git add src/app/globals.css src/app/layout.tsx src/components/Navbar.tsx src/components/MobileActionBar.tsx src/components/Footer.tsx
git commit -m "style(ui): reset restaurant design system"
```

---

### Task 3: Rebuild Menu UX With Per-Item Photos

**Files:**
- Modify: `src/components/ManagedMenuSections.tsx`
- Modify: `src/app/menu/page.tsx`

**Interfaces:**
- Consumes: `useSiteContent()` returning `{ settings, menuItems, ready }`.
- Consumes each menu item fields: `id`, `name`, `price`, `description`, `category`, `imageSrc`, `visible`, `sortOrder`.
- Produces: `MenuItemPhoto({ item, fallback }: { item: MenuItem; fallback: string })`.

- [ ] **Step 1: Add `MenuItemPhoto` component inside `ManagedMenuSections.tsx`**

```tsx
function MenuItemPhoto({ item, fallback }: { item: MenuItem; fallback: string }) {
  const src = item.imageSrc || fallback;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-background">
      {src ? (
        <img src={src} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="grid h-full place-items-center px-4 text-center text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
          Photo coming soon
        </div>
      )}
    </div>
  );
}
```

Ensure `MenuItem` is imported:

```tsx
import type { MenuItem } from "@/lib/menu-data";
```

- [ ] **Step 2: Replace category-heavy layout with item-photo menu layout**

Use this group rendering shape:

```tsx
<section className="section-shell">
  <div className="section-inner grid gap-16">
    {groups.map(([name, items]) => {
      const fallback = settings.images[name] || settings.images.Hero;

      return (
        <Reveal key={name}>
          <section id={sectionId(name)} className="scroll-mt-32">
            <div className="mb-8 grid gap-4 border-b border-border pb-5 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="eyebrow">Menu section</p>
                <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-secondary">{name}</h2>
              </div>
              <p className="text-sm font-semibold text-muted-foreground">{items.length} items</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((item) => (
                <article key={item.id} className="menu-card grid gap-4 p-3 sm:grid-cols-[150px_1fr]">
                  <MenuItemPhoto item={item} fallback={fallback} />
                  <div className="flex min-w-0 flex-col justify-between p-1">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-extrabold leading-tight text-secondary">{item.name}</h3>
                        <p className="shrink-0 font-extrabold tabular-nums text-primary">{item.price}</p>
                      </div>
                      <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>
      );
    })}
  </div>
</section>
```

- [ ] **Step 3: Polish `menu/page.tsx` shell**

Keep static copy. Use:

```tsx
<section className="section-shell pb-12 pt-32">
  <div className="section-inner">
    <p className="eyebrow">Live menu</p>
    <h1 className="mt-4 max-w-4xl text-5xl font-extrabold tracking-tight text-secondary sm:text-7xl">
      Bengali dishes, ready when you are.
    </h1>
    <p className="body-copy mt-5 max-w-2xl">
      Every menu item below can carry its own managed photo, description, price, and visibility from the dashboard.
    </p>
```

Sticky nav:

```tsx
<section className="sticky top-[72px] z-30 border-y border-border bg-background/95 px-5 py-3 backdrop-blur-xl">
```

- [ ] **Step 4: Run task verification**

```bash
npm test
npm run lint
```

Expected: item-photo tests pass; remaining tests may fail only for public page generic pattern until pages are rebuilt.

- [ ] **Step 5: Commit**

```bash
git add src/components/ManagedMenuSections.tsx src/app/menu/page.tsx
git commit -m "feat(menu): show configurable item photos"
```

---

### Task 4: Rebuild Homepage As Editorial Ordering Surface

**Files:**
- Modify: `src/components/HomeTruckJourney.tsx`

**Interfaces:**
- Consumes: `settings.images.Hero`, `settings.images["Fish & Seafood"]`, `settings.images["Bengali Classics"]`, `settings.images.Desserts`.
- Consumes: `menuItems` for current item cards.
- Produces: homepage sections with static prose and dynamic photos/menu.

- [ ] **Step 1: Replace repeated card-heavy homepage sections**

Structure the page as:

```tsx
return (
  <>
    <section className="relative isolate min-h-dvh overflow-hidden bg-kitchen-night px-5 pb-20 pt-28 text-white">
      ...
    </section>
    <section className="border-y border-border bg-surface px-5 py-5">proof strip</section>
    <section className="section-shell">current favorites from menuItems</section>
    <section className="section-shell bg-surface">Bengali table editorial split</section>
    <section className="relative isolate overflow-hidden px-5 py-28 text-white">group order image CTA</section>
    <section className="section-shell">how to order steps</section>
  </>
);
```

- [ ] **Step 2: Hero requirements**

Hero must use:

```tsx
<img src={heroImage} alt="Bengali food" className="absolute inset-0 -z-20 h-full w-full object-cover" />
<div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(27,19,15,.88),rgba(27,19,15,.44))]" />
```

Copy:

```tsx
<p className="eyebrow text-[#f4d28a]">Authentic Bengali cuisine · San Jose</p>
<h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.96] tracking-tight sm:text-7xl">
  Bengali comfort food, built for the whole table.
</h1>
```

- [ ] **Step 3: Current favorites render item photos**

Use `picks = menuItems.slice(0, 4)` and render each card with `item.imageSrc`.

```tsx
<article className="menu-card overflow-hidden">
  <img src={item.imageSrc || heroImage} alt={item.name} className="h-56 w-full object-cover" loading="lazy" />
  <div className="p-5">
    <h3 className="text-xl font-extrabold text-secondary">{item.name}</h3>
    <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">{item.description}</p>
    <p className="mt-4 font-extrabold text-primary">{item.price}</p>
  </div>
</article>
```

- [ ] **Step 4: Remove overused `font-black`, `rounded-3xl`, and generic card strings**

Search:

```bash
rg "font-black|rounded-3xl border border-border bg-surface p-6" src/components/HomeTruckJourney.tsx
```

Expected: no `rounded-3xl border border-border bg-surface p-6`; limited `font-black` only if justified for tiny labels.

- [ ] **Step 5: Run task verification and commit**

```bash
npm test
npm run lint
git add src/components/HomeTruckJourney.tsx
git commit -m "style(home): create editorial ordering surface"
```

---

### Task 5: Rebuild Secondary Public Pages

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/location/page.tsx`
- Modify: `src/app/group-orders/page.tsx`

**Interfaces:**
- Consumes: `settings.images` for managed photos.
- Consumes: `menuItems` on about/group-orders only where current menu examples are needed.
- Produces: static copy pages with no `settings.home/about/order/catering` prose usage.

- [ ] **Step 1: About page**

Use five sections:

1. Hero with managed `Hero` photo.
2. Editorial image/text split.
3. Four value rows, not generic cards.
4. Menu category chips from `menuItems`.
5. Order CTA.

The value row pattern:

```tsx
<article className="grid gap-3 border-t border-border py-5 sm:grid-cols-[11rem_1fr]">
  <h3 className="text-xl font-extrabold text-secondary">{title}</h3>
  <p className="body-copy">{body}</p>
</article>
```

- [ ] **Step 2: Location/order page**

Keep it honest:

- Title: `Order The Bengali Food in San Jose.`
- No fake street address.
- Service area and ordering availability are static copy.
- Managed hero photo.
- Three practical facts: service area, live availability, order online first.

Use `OrderOnlineButton` as the only primary CTA.

- [ ] **Step 3: Group orders page**

Use:

- Hero with managed photo.
- “Good for” section as clean rows or low-elevation blocks.
- Planning checklist.
- Current menu anchors from `menuItems.slice(0, 3)` with item photos.
- CTA.

Ensure item examples use:

```tsx
<img src={item.imageSrc || heroImage} alt={item.name} className="h-48 w-full object-cover" />
```

- [ ] **Step 4: Run verification and commit**

```bash
npm test
npm run lint
git add src/app/about/page.tsx src/app/location/page.tsx src/app/group-orders/page.tsx
git commit -m "style(pages): polish restaurant secondary pages"
```

---

### Task 6: Dashboard UX Polish For Photos And Menu Editing

**Files:**
- Modify: `src/app/dashboard/DashboardClient.tsx`
- Modify: `src/app/dashboard/DashboardAccess.tsx` only if sign-in copy needs visual polish.

**Interfaces:**
- Consumes: existing props on `DashboardClient`.
- Produces: dashboard still writes only `{ images }` to `siteContent/settings` and menu records to `menuItems`.

- [ ] **Step 1: Keep dashboard dense and utilitarian**

No public-site editorial styles. Dashboard shell should use compact panels:

```tsx
className="rounded-lg border border-white/10 bg-white/[0.06] p-4"
```

Allowed because dashboard is an admin tool, not the public marketing UI.

- [ ] **Step 2: Make per-item photo requirement obvious**

Near menu save status add:

```tsx
<p className="text-xs font-semibold leading-5 text-white/54">
  Each menu item needs its own photo before it can be saved.
</p>
```

Keep existing validation:

```tsx
const invalidItem = preparedItems.find((item) => !item.name || !item.price || !item.description || !item.category || !item.imageSrc);
```

- [ ] **Step 3: Improve photo upload empty states**

Keep `PhotoPreview`, but make dimensions stable:

```tsx
className="aspect-[4/3] w-full rounded-lg object-cover"
```

Use this for section and item photos so upload/selection never shifts layout.

- [ ] **Step 4: Run verification and commit**

```bash
npm test
npm run lint
git add src/app/dashboard/DashboardClient.tsx src/app/dashboard/DashboardAccess.tsx
git commit -m "style(dashboard): clarify photo and menu editing"
```

---

### Task 7: Final Verification And Local Smoke Check

**Files:**
- No code changes expected.

**Interfaces:**
- Consumes: completed tasks.
- Produces: verified build and clean git state.

- [ ] **Step 1: Run full verification**

```bash
npm test
npm run lint
npm run build
```

Expected:

- `npm test`: 0 failures.
- `npm run lint`: exit 0.
- `npm run build`: compiled successfully, TypeScript passes, routes generated.

- [ ] **Step 2: Start or reuse dev server**

```bash
npm run dev
```

If port 3000 is already occupied by this repo, reuse it.

- [ ] **Step 3: Route smoke check**

```bash
for path in / /menu /about /location /group-orders /dashboard; do
  printf '%s ' "$path"
  curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:3000$path"
done
```

Expected:

```text
/ 200
/menu 200
/about 200
/location 200
/group-orders 200
/dashboard 200
```

- [ ] **Step 4: Check Firebase data shape**

```bash
node --env-file=.env.local --input-type=module -e 'import { cert, initializeApp } from "firebase-admin/app"; import { getFirestore } from "firebase-admin/firestore"; const projectId=process.env.FIREBASE_ADMIN_PROJECT_ID; const clientEmail=process.env.FIREBASE_ADMIN_CLIENT_EMAIL; const privateKey=process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g,"\n"); initializeApp({credential: cert({projectId, clientEmail, privateKey})}); const db=getFirestore(); const items=await db.collection("menuItems").get(); const missing=items.docs.filter((doc)=>!doc.data().imageSrc).map((doc)=>doc.id); console.log(JSON.stringify({menuItemCount: items.size, missingPhotoCount: missing.length, missing}, null, 2));'
```

Expected: `missingPhotoCount` is `0`. If not, do not fake it in code; report which menu items need photos uploaded in the dashboard.

- [ ] **Step 5: Commit final verification note only if files changed**

If no files changed:

```bash
git status --short
```

Expected: no output.

If files changed from formatting or test edits:

```bash
git add <changed-files>
git commit -m "chore(ui): finalize restaurant ux polish"
```

---

## Self-Review

**Spec coverage:**  
- Professional, non-AI-looking UI: Tasks 2, 4, 5.  
- Inspiration-driven restaurant UX: Tasks 2-5.  
- Plan before implementation: this document.  
- Static sections in code: Tasks 1, 4, 5.  
- Photos/menu configurable: Tasks 3, 6.  
- Every menu item has a photo: Tasks 1, 3, 6, 7.  
- Verification: Task 7.

**Placeholder scan:** No `TBD`, `TODO`, “similar to,” or unspecified edge handling remains.

**Type consistency:** `MenuItemPhoto` consumes `MenuItem` from `src/lib/menu-data.ts`; `DashboardClient` continues using `DashboardMenuItem` from `src/lib/dashboard-content.ts`; both use the existing `imageSrc` property.
