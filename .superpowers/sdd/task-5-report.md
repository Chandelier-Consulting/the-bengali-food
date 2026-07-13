# Task 5 Report: Rebuild Secondary Public Pages

## Scope

Updated only the Task 5-owned public pages:

- `src/app/about/page.tsx`
- `src/app/location/page.tsx`
- `src/app/group-orders/page.tsx`

Static prose remains in code. Managed content remains limited to `settings.images` and, where needed, `menuItems`.

## Delivered

### About

- Rebuilt as five sections: managed-photo hero, editorial image/text split, four editorial value rows, managed menu-category chips, and an order CTA.
- Used the specified value-row structure and replaced repeated framed cards with bordered rows.

### Location / Order

- Kept the required title: `Order The Bengali Food in San Jose.`
- Uses a managed hero image and honest static copy only: San Jose service area, live availability, and order-online-first guidance.
- Contains no street address and uses `OrderOnlineButton` as the only primary CTA.

### Group Orders

- Rebuilt as five sections: managed-photo hero, clean occasion rows, planning checklist, current menu anchors, and an order CTA.
- The current menu anchors use `menuItems.slice(0, 3)` and the required `item.imageSrc || heroImage` fallback with `h-48 w-full object-cover` item imagery.

## Self-review

- Confirmed the three pages contain no static prose sourced from `settings.home`, `settings.about`, `settings.order`, or `settings.catering`.
- Confirmed no fake street address, generic repeated `rounded-3xl` CTA frame, gradient orb, bokeh, or marketing-fluff pattern in the owned pages.
- Confirmed image framing and controls use 8px (`rounded-lg`) treatment.
- Reviewed the final diff for whitespace and scope; only the three page files and this report are staged for the task commit.

## Verification

- `npm run lint`: passed.
- `npm run build`: passed; `/about`, `/location`, and `/group-orders` were generated as static routes.
- Existing same-repository dev server smoke check: `/about`, `/location`, and `/group-orders` each returned HTTP 200 with no framework error overlay in their responses.
- `agent-browser` was unavailable in the environment, so the smoke check used direct HTTP responses instead.
- `npm test`: 10 passed, 2 failed outside Task 5 ownership:
  - The legacy homepage assertion still expects eight sections, while the approved Task 4 homepage has six editorial bands.
  - `src/app/menu/page.tsx` still contains the prohibited legacy CTA frame, causing the repository-wide generic public-page pattern test to fail. This file is outside Task 5 ownership and was not modified.

## Commit

`style(pages): polish restaurant secondary pages`
