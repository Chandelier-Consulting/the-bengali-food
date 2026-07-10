# Tomy's Kitchen Komala-Inspired Redesign

## Goal

Refresh Tomy's Kitchen so the UI feels cohesive and restaurant-specific while keeping the existing warm red, gold, cream, and dark kitchen color theme. Use the Komala Vilas demo as the structural inspiration: editorial pacing, layered food imagery, strong restaurant copy, pull-quote moments, and story-led sections.

The redesign must not copy Komala Vilas wholesale. Tomy's should feel like a Mountain View Mexican food truck led by Chef Tomas Tejeda, with a practical menu page that remains easy to scan.

## Scope

- Home page visual and copy refresh.
- About page storytelling refresh focused on Tomas Tejeda.
- Menu page visual cohesion pass while preserving its category-based utility.
- Shared component and theme cleanup where needed for consistent typography, buttons, surfaces, and section rhythm.
- Visible microcopy cleanup across touched pages and shared components.

## Out Of Scope

- New ordering flow.
- New CMS or menu data model.
- Major changes to location/map behavior.
- Replacing the current food photography assets unless existing assets cannot support the layout.

## Design Direction

Use a hybrid direction:

- Borrow Komala Vilas's editorial restaurant-site rhythm.
- Keep Tomy's palette and food-truck identity.
- Make About the richest storytelling experience.
- Keep Menu more functional than cinematic.

## Microcopy Requirements

All visible copy should sound like it belongs to Tomy's Kitchen, not a generic design spec. Avoid placeholder or theme-descriptor language such as "charcoal", "charcoal-fired", "built around workflows", or similarly abstract phrasing.

Preferred language should emphasize:

- Chef Tomas Tejeda.
- Fresh Mexican cooking.
- Breakfast, tacos, seafood, and daily plates.
- Mountain View and El Camino Real.
- The working rhythm of a food truck.
- Warm service, regular guests, and made-daily preparation.

## Home Page

The homepage should open with a text-led hero similar in confidence to Komala Vilas, but with Tomy's identity:

- A small location/restaurant identity line.
- A direct headline about Tomas's Mexican food truck cooking.
- Supporting copy about breakfast, tacos, seafood, and daily plates.
- Primary CTA to the menu and secondary CTA to location.
- Compact service facts for hours, address, and phone.
- Layered food imagery using existing Tomy's assets.

Below the hero:

- Signature dish section with fewer, stronger cards or image-led dishes.
- A pull-quote or statement section that feels like a restaurant belief, not a marketing slogan.
- A practical visit section with address, hours, phone, and clear CTA.

## About Page

The About page should be a storytelling experience centered on Tomas Tejeda:

- Open with a stronger editorial hero introducing Tomas.
- Use sections that describe the truck's daily rhythm, the menu's range, and the care behind made-daily cooking.
- Include visual moments using food imagery and warm surface treatments.
- Keep values concrete: fresh prep, family-rooted flavor, generous plates, and regular-guest hospitality.
- End with a natural CTA to visit or view the menu.

## Menu Page

The menu page should remain distinct from Komala Vilas:

- Preserve the sticky/scrollable category navigation.
- Preserve scannable item names, descriptions, and prices.
- Restyle section headers, category nav, and menu item surfaces to match the refreshed editorial system.
- Avoid making the menu harder to use for lunch-time scanning.

## Shared UI

- Replace visible "charcoal" framing with restaurant-specific language.
- Keep the dark warm palette, but avoid exposing token names or abstract color concepts in copy.
- Reduce the feeling of isolated floating cards where full-width sections or grounded editorial bands work better.
- Keep rounded corners restrained and consistent.
- Maintain accessible contrast for cream text on dark surfaces and red/gold accents.

## Testing

- Run lint.
- Run the existing Node test suite.
- Run a production build.
- Visually inspect desktop and mobile layouts, especially the hero, About story sections, menu category nav, and footer.

