# Task 7 Report: Final Verification And Local Smoke Check

## Status

DONE_WITH_CONCERNS

## Changes

- Updated the homepage section-count test from eight to six, matching the approved six-band homepage plan.
- Replaced the menu checkout card frame with an existing full-width action-band pattern.

## Verification

- `npm test`: passed, 13 tests and 0 failures.
- `npm run lint`: passed with exit code 0.
- `npm run build`: passed; compilation, TypeScript, and static route generation completed.
- HTTP route smoke check against the existing repository dev server on port 3000: `/`, `/menu`, `/about`, `/location`, `/group-orders`, and `/dashboard` each returned `200`.
- Firebase data-shape check: `menuItemCount: 14`, `missingPhotoCount: 0`, `missing: []`.
- `git diff --check`: passed.

## Files Changed

- `tests/responsive-ui.test.mjs`
- `src/app/menu/page.tsx`
- `.superpowers/sdd/task-7-report.md`

## Concerns

- `agent-browser` is not installed, so visual browser verification could not run. The required HTTP route smoke check completed successfully instead.
- Next.js emitted the Node `DEP0205` deprecation warning during the production build; the build still completed successfully.

## Review Fix Pass

- `src/app/menu/page.tsx` changed because `npm test` failed the generic AI-looking pattern regex (`rounded-3xl border border-border bg-surface p-6`) for that file. Replacing the legacy framed checkout CTA with the existing full-width action-band pattern was the narrow source fix required to clear that failure.
- Added direct regression assertions for the approved homepage's six editorial bands and their content markers, rather than relying only on the homepage section count.

## Final Review Fixes

- Added `prepareMenuItemsForSave`, a Node-testable save-preparation helper that resolves uploads by each item's original client ID before generating persistent Firestore IDs. It rejects a `blob:` preview without a matching upload so no blob URL can be written.
- Removed static prose fields from the `SiteSettings` type and Firestore seed. The footer prose is now static code; `businessName`, `locationLabel`, and `orderUrl` remain operational configuration.
- Replaced customer-facing dashboard/managed-field copy on the menu page with dish, availability, pickup, and delivery guidance.
- Updated small footer headings to the primary color for sufficient contrast.

## Final Review Verification

- `npm test`: passed, 15 tests and 0 failures.
- `npm run lint`: passed with exit code 0.
- `npm run build`: passed; compilation, TypeScript, and static route generation completed. Next.js emitted the existing Node `DEP0205` deprecation warning.
- HTTP route smoke check against the existing repository dev server on port 3000: `/`, `/menu`, `/about`, `/location`, `/group-orders`, and `/dashboard` each returned `200`.
- Firebase data-shape check: `menuItemCount: 14`, `missingPhotoCount: 0`, `blobPhotoCount: 0`. The existing live `siteContent/settings` document still contains legacy prose keys; the application contract and seed no longer read or write them.
- `agent-browser` is not installed, so browser automation could not run.
