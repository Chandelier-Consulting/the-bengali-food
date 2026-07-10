# The Bengali Food Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` to execute this plan task by task.

**Goal:** Replace the inherited Tomy's Kitchen food-truck website with a delivery-first website for The Bengali Food in San Jose.

**Customer impact:** Visitors immediately see the correct cuisine and can place an order through the restaurant's live ordering page without being sent to another restaurant's marketplace links.

**Architecture:** Keep the existing Next.js App Router and editable Firebase content model. Consolidate verified Bengali Food facts and the canonical ordering URL in shared content, update the customer routes and shared UI to consume it, and seed new defaults for the optional manager dashboard.

**Tech stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Firebase, Node test runner.

## Tasks

- [x] Replace shared business identity, delivery CTA, default image set, and Bengali menu data.
- [x] Rebuild the homepage around Bengali cuisine, featured dishes, catering, and the live ordering flow.
- [x] Update navigation, footer, mobile controls, modal, route copy, metadata, structured data, manifest, sitemap, and robots.
- [x] Update dashboard defaults and seeding so manager edits start from the new restaurant content.
- [x] Replace stale Tomy's regression assertions with Bengali Food coverage.
- [x] Run lint, tests, production build, and desktop/mobile browser checks.

## Verified facts

- Restaurant: The Bengali Food, San Jose, California.
- Public service: pickup, delivery, and event catering.
- Canonical order link: `https://order.online/store/the-bengali-food-32130435?pickup=true`.
- Confirmed menu examples: Giant Prawns Curry, Shorshe Chingri, Katla Kalia, Ilish Shorshe, Rui Maacher Kalia, Steam Fish Kalia Curry, Chhola'r Dal, Begun Bhaji, Muri Ghonto, and Shukto.
- Do not claim a physical address, phone number, operating hours, or unverified social accounts.
