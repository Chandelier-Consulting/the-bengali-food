# Tomy's Kitchen — Website Build Spec

## Business Info
- **Name:** Tomy's Kitchen
- **Type:** Mexican food truck
- **Location:** 239 W El Camino Real, Mountain View, CA 94040
- **Phone:** (650) 289-8628
- **Hours:** 8:30 AM – 3:00 PM, Monday–Saturday
- **Owner/Chef:** Tomas Tejeda
- **Instagram:** @tomys_kitchen
- **Yelp:** 5.0 ⭐ (22 reviews)
- **DoorDash:** Available

## Design Direction
**Clean modern** with subtle Mexican warmth. Think: airy whitespace, warm terracotta accents, dark charcoal text, gold highlights. Professional but approachable — like a food truck that takes its craft seriously.

## Design Tokens
- **Primary:** #E05D3A (terracotta/coral) — CTAs, accents, hover states
- **Secondary:** #1A1A2E (deep charcoal) — headings, footer bg
- **Accent:** #F0A500 (warm gold) — highlights, badges, star ratings
- **Background:** #FAF7F2 (warm cream) — page background
- **Surface:** #FFFFFF — cards, sections
- **Muted:** #6B7280 — secondary text
- **Border:** #E5E0D9 — subtle dividers
- **Font:** Inter (300, 400, 500, 600, 700, 800 weights)

## Sitemap (4 pages)

### 1. Home (`/`)
**Hero Section**
- Full-width hero with warm gradient overlay (terracotta → charcoal)
- Large headline: "Authentic Mexican Street Food" or similar
- Subheadline: "Fresh breakfast, tacos & seafood from Chef Tomas Tejeda"
- CTA button (primary): "View Our Menu" → /menu
- Background: abstract food-themed pattern or solid gradient
- Framer: headline slides up + fades in, CTA bounces in after delay

**Featured Items**
- 3-4 featured dishes in card grid (image placeholder, name, price, short desc)
- Cards have subtle shadow, rounded corners, hover lift effect
- Framer: cards stagger-fade-in on scroll (useInView)

**Location & Hours Strip**
- Clean horizontal strip with icon + text
- Address, hours, phone number
- Subtle background tint

**CTA Banner**
- "Come find us on El Camino Real" or similar
- Button to Location page
- Warm background

### 2. Menu (`/menu`)
**Page Header**
- Title: "Our Menu"
- Subtitle: "Everything made fresh daily by Chef Tomas"

**Menu Categories** (from research):
- Breakfast (Breakfast Sandwich, Cheese & Egg Muffin, etc.)
- Tacos ($3 each — Fish Tacos, etc.)
- Mains (Quesabirria Combo, Quesadilla w/ Shrimp, Torta Oaxaqueña, Milanese Plate, Burrito de Camarón o Pescado, Shrimp Fajitas Plate)
- Seafood Cocktails (Coctel Mixto, Coctel Campechano, Tostada Aguachile)
- Drinks (Horchata)

**Layout:**
- Category tabs or sections with sticky category nav
- Each item: name, description, price — clean list style
- Price aligned right, name bold
- Framer: items fade in on scroll, category transitions

### 3. About (`/about`)
**Hero**
- Large headline: "Meet Chef Tomas"
- Subtitle about the food truck story

**Story Section**
- Two-column: photo placeholder left, story text right
- Warm, personal tone about authentic Mexican cooking
- Framer: parallax-ish fade on scroll

**Values/Philosophy**
- 3 icon-cards: Fresh Ingredients, Family Recipes, Made Daily
- Clean icon + short text

### 4. Location (`/location`)
**Map Embed**
- Google Maps embed showing 239 W El Camino Real, Mountain View

**Info Cards**
- Address card
- Hours card (Mon–Sat, 8:30a–3p, closed Sunday)
- Phone card with click-to-call

**Parking/Transit**
- Brief note about where to park, El Camino access

## Global Components

### Navbar
- Fixed top, transparent on home hero → solid white on scroll
- Logo: "Tomy's Kitchen" (text-based, primary color)
- Nav links: Home, Menu, About, Location
- Mobile: hamburger menu with slide-out drawer
- Framer: smooth background transition on scroll, mobile menu slide

### Footer
- Dark background (secondary)
- Three columns: Brand (logo + tagline), Quick Links, Contact Info
- Social link: Instagram
- Copyright line

### SEO Metadata (per page)
- Title + description tags
- OG image config (we'll use a gradient placeholder)
- Structured data for LocalBusiness (Schema.org)
- Favicon setup

## Technical Requirements
- **Next.js 15+ App Router** — already scaffolded with TypeScript, Tailwind v4
- **Framer Motion** — installed. Use for: scroll reveals, page transitions, hover effects, nav transitions
- **React Icons** — installed. Use for: menu icons, location pins, phone, clock, Instagram, stars
- **Responsive:** Mobile-first, breakpoints at sm(640), md(768), lg(1024), xl(1280)
- **Accessibility:** Semantic HTML, aria labels, keyboard nav, color contrast 4.5:1 minimum
- **Performance:** Next.js Image component for any images (use placeholder gradients or Unsplash URLs for now), font optimization
- **No forms** — no contact form, no ordering integration. Keep pages clean and static.

## File Structure
```
src/
├── app/
│   ├── layout.tsx          (metadata, fonts, global layout with Navbar + Footer)
│   ├── page.tsx            (Home)
│   ├── globals.css         (design tokens — already configured)
│   ├── menu/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── location/
│       └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── MenuItem.tsx
│   ├── SectionHeading.tsx
│   └── InfoCard.tsx
└── lib/
    └── menu-data.ts        (menu items as typed data)
```

## Build Order
1. Configure `layout.tsx` — metadata, Navbar, Footer wrapper
2. Build `Navbar.tsx` and `Footer.tsx`
3. Build shared components (SectionHeading, InfoCard)
4. Build `menu-data.ts` with all menu items
5. Build Home page (`page.tsx`)
6. Build Menu page (`menu/page.tsx`)
7. Build About page (`about/page.tsx`)
8. Build Location page (`location/page.tsx`)
9. Verify: `npm run build` passes with zero errors
10. Verify: `npm run dev` loads all pages without runtime errors

## Menu Data (complete)
Copy this into `src/lib/menu-data.ts`:

```typescript
export const menuCategories = [
  {
    name: "Breakfast",
    items: [
      { name: "Breakfast Sandwich", price: "$8.50", description: "Egg, cheese, and your choice of bacon or sausage on a toasted bun" },
      { name: "Cheese & Egg Muffin", price: "$6.00", description: "Classic egg and melted cheese on an English muffin" },
      { name: "Breakfast Burrito", price: "$10.00", description: "Scrambled eggs, potatoes, cheese, and salsa wrapped in a flour tortilla" },
    ]
  },
  {
    name: "Tacos",
    items: [
      { name: "Fish Tacos (Tacos de Pescado)", price: "$6.00", description: "Crispy battered fish with cabbage slaw and creamy sauce" },
      { name: "Shrimp Tacos", price: "$7.00", description: "Grilled shrimp with fresh pico de gallo and avocado" },
      { name: "Asada Tacos", price: "$5.00", description: "Grilled marinated steak with onions and cilantro" },
      { name: "Al Pastor Tacos", price: "$5.00", description: "Spiced pork with pineapple, onion, and cilantro" },
    ]
  },
  {
    name: "Mains",
    items: [
      { name: "Quesabirria Combo", price: "$15.00", description: "Crispy cheese birria tacos with consommé, rice, and beans" },
      { name: "Quesadilla with Shrimp", price: "$16.88", description: "Large flour tortilla stuffed with shrimp and melted cheese" },
      { name: "Torta Oaxaqueña", price: "$17.50", description: "Oaxacan-style sandwich with choice of meat, avocado, and queso fresco" },
      { name: "Milanese Plate (Plato de Milanesa)", price: "$17.50", description: "Crispy breaded cutlet served with rice, beans, and salad" },
      { name: "Shrimp Fajitas Plate", price: "$18.75", description: "Sizzling shrimp fajitas with peppers, onions, rice, and beans" },
      { name: "Burrito de Camarón o Pescado", price: "$17.50", description: "Large burrito with your choice of shrimp or fish, rice, beans, and fixings" },
    ]
  },
  {
    name: "Seafood Cocktails",
    items: [
      { name: "Coctel Mixto", price: "$23.75", description: "Shrimp, octopus, and crab in a chilled tomato-based cocktail sauce" },
      { name: "Coctel Campechano", price: "$20.63", description: "Mixed seafood cocktail with fresh lime, avocado, and cilantro" },
      { name: "Tostada Aguachile", price: "$9.38", description: "Crispy tostada topped with shrimp cured in lime and chili" },
    ]
  },
  {
    name: "Drinks",
    items: [
      { name: "Horchata", price: "$4.00", description: "Creamy cinnamon rice milk drink" },
      { name: "Jamaica", price: "$3.50", description: "Chilled hibiscus tea" },
      { name: "Mexican Coke", price: "$3.00", description: "Made with real cane sugar" },
      { name: "Jarritos", price: "$3.00", description: "Assorted Mexican fruit sodas" },
    ]
  },
];
```

## Image Strategy
Use placeholder gradient divs or Unsplash source URLs for food images. Examples:
- Hero bg: dark gradient overlay, no image needed
- Food cards on home: use colored gradient placeholders matching primary palette
- About photo: placeholder circle/rounded div
- Do NOT use Next/Image with external URLs without configuring the domain in next.config.ts

## Important Notes
- The `globals.css` is already configured with design tokens — use `bg-primary`, `text-primary`, `bg-secondary`, `text-secondary`, `bg-accent`, `text-muted`, `border-border`, `bg-surface`, `bg-background` classes
- Use Tailwind v4 syntax (CSS-based config via `@theme inline`)
- All pages must be responsive (mobile-first)
- Use `'use client'` directive on components using Framer Motion or React hooks
- Add Schema.org LocalBusiness JSON-LD in the layout for SEO
- DO NOT modify globals.css unless necessary — the design tokens are set
