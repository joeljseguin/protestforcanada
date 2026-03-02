

## Plan: Add 80s Movie Tagline to Hero

Add "The Game that fixes democracy" as a secondary tagline positioned to the right of the main heading, styled with an 80s movie title aesthetic (italic, gradient/chrome effect, slightly rotated).

### Changes

**`src/components/Hero.tsx`**:
- After the `<h1>` block, add a positioned element to the right side displaying the tagline
- Style it with VT323 mono font, italic styling, a chrome/gold gradient text effect, and slight rotation to evoke 80s movie poster vibes
- Use `absolute` positioning on larger screens, and display inline on mobile

