# Body Alignment Clinic website

The production site for Body Alignment Clinic (Rainham, Essex), built to the approved "Concept 4, Colour" design. Vue 3, TypeScript, Vite, Vue Router, prerendered to static HTML with vite-ssg.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, prerender every page to dist/, write sitemap + robots
npm run preview    # serve dist/ locally
npm run check:contrast   # WCAG AA check for text on all four brand colours
```

`dev` and `build` first run `npm run images`, which turns the originals in `content/images/` into responsive AVIF and WebP files in `public/img/` (gitignored). The first run takes a few minutes; later runs only process what changed.

## How the colour system works

One mechanism, three files:

1. A route declares its sub-brand: `meta: { brand: 'hyper8' }` in [src/router/routes.ts](src/router/routes.ts).
2. [src/brands.ts](src/brands.ts) holds each brand's colours, nav logo and primary call to action.
3. [src/App.vue](src/App.vue) writes the active brand's colours onto the app root as CSS custom properties (`--brand`, `--brand-deep`, `--brand-soft`). Every component reads those.

To add a page, add a route with a `brand`. Nothing else needs to know.

Route changes run through [src/lib/viewTransition.ts](src/lib/viewTransition.ts): a change of brand floods the new colour out from the point tapped; same-brand navigation cross-fades.

## Where things live

| What | Where |
|---|---|
| Phone, email, address, social links, Acuity diary URLs, store URLs | [src/content/site.ts](src/content/site.ts) |
| Team bios, practitioner booking cards | [src/content/team.ts](src/content/team.ts) |
| Page copy: Home, Clinic, Pilates, Hyper 8, Academy | [src/content/pages.ts](src/content/pages.ts) |
| FAQs, clients, partner logos, Instagram tiles, form options | [src/content/shared.ts](src/content/shared.ts) |
| Page titles and descriptions | [src/router/routes.ts](src/router/routes.ts) |
| Photos (full-resolution originals) | `content/images/` |
| The function that sends both forms | [src/lib/submitEnquiry.ts](src/lib/submitEnquiry.ts) |

To replace a photo, drop the new file into `content/images/` under the same name and run `npm run images`. To add one, add the file, run `npm run images`, then use its name (without extension) with `<BacImage name="…" alt="…" />`. Image names are type-checked.

## Before it can go live

**1. The forms need somewhere to send to.** The contact form and the emergency / home visit request form both go through `submitEnquiry()`. Until a form endpoint is configured, the visitor's own email app opens with the message already written, and the form says so. To deliver directly, set `VITE_FORM_ENDPOINT` at build time to any service that accepts a JSON POST and emails the clinic (Formspree, Basin, Netlify Forms, or a small serverless function).

**2. The store must stay reachable.** The Hyper 8 buy buttons and Matt's course button link to `www.teamstraightspine.com/store/p/…`. Once this site takes over that domain, those addresses stop being Squarespace. Either keep Squarespace Commerce on a subdomain (for example `shop.teamstraightspine.com`) and update the two URLs in `src/content/site.ts`, or replace the store with Stripe Payment Links and point the buttons at those.

**3. The Instagram grid is a snapshot.** It shows nine posts copied from the current site, each linking to the profile. A live feed needs either a feed service (Behold, EmbedSocial, LightWidget) or Instagram's Graph API with a token that is refreshed every 60 days. Otherwise refresh the nine images by hand now and then.

**4. Hosting.** The build writes flat files (`our-team.html`) so URLs match the current site with no trailing slash. Netlify, Cloudflare Pages, Vercel and GitHub Pages serve that layout as-is and pick up `404.html`. `public/_redirects` covers three old addresses on Netlify and Cloudflare Pages; other hosts need the same three redirects set up by hand.

**5. Domain.** Canonical links, Open Graph tags and the sitemap assume `https://www.teamstraightspine.com` (`site.url` in `src/content/site.ts`).

## Things to know

- **Booking diaries.** General clinic booking goes to the `/book-appointment` hub and on to Sam's, Mason & Sam's or Hollie's diary. The diary the current site embeds for general clinic booking (`bodyalignmenttechnique.as.me`) reports "Scheduling is currently unavailable", so it is not used. See the note in `src/content/site.ts`.
- **Two colours differ slightly from the mock** so black text passes WCAG AA: Hyper 8 red is `#F22A30` (mock `#E8141C` gave 4.16:1), and the clinic's dark blue for small text is `#08739A`.
- **Our Clients** shows names as a list, not as photo captions, because the photos can't be reliably matched to names.
- **Academy dates** are shown as "Dates to be announced". The dates on the current site are from 2024 and 2025.

## Questions for the client

1. **General clinic diary.** The current site's general booking page embeds a diary that Acuity shows as paused. Is that account closed for good? The new site sends general bookings to the three practitioner diaries instead. Is that right, or should there be a single "any practitioner" diary?
2. **Academy.** What are the next dates for the 5 Day Master Class, Advanced Acupuncture & Cupping, and Advanced Massage? The Academy diary currently lists nothing bookable. Are course prices to be shown?
3. **Testimonials.** The current "Mentee Testimonials" section contains course guide pages and teaching photos but no testimonials. Are there written testimonials from mentees to add? Until then the section is titled "Inside the courses".
4. **Store.** Keep Squarespace for the two Hyper 8 products, or move to simple payment links? Should the Dynamic Stretch E-Book (£4.99), which is in the store but not linked from any page, appear on the site?
5. **Forms.** Which inbox should contact and emergency / home visit requests go to? Are the request prices still Emergency £200 and Home Visit £250?
6. **Our Clients.** The current site links each photo to an Instagram profile. If Sam confirms which photo is which person, the names can become captions.
7. **Opening hours.** There are none on the current site. Adding them would help the Google listing.
8. **Treatment prices.** Acuity shows session prices (from £99) and Pilates prices (£45 and £80) but the site does not. Should it?
9. **Sam's bio** says "a chain of clinics" across the UK, and the current site's Google description says "Upminster". Is Rainham the only location to list?
10. **Home page heading.** "One clinic, four colours" came from the design mock rather than the clinic. Keep it, or replace it?
11. **Acuity extras.** The clinic diary also has a "Hyper 8 Classes" category and a calendar for "Rebecca" that the site never mentions. Should either be bookable from the site?
