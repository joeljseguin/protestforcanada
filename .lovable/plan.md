

## Fix Header Layout

Two issues to fix in `src/components/Header.tsx`:

### 1. Separate v3.5 badge from logo
The `v3.5` span (line 30) is inside the logo `<Link>`, visually merging it with the PROTEST text. Move it outside the Link so it stands alone as a separate element in the header bar.

### 2. Uniform nav item sizing
All nav links (Missions, Power Map, Quest, Truth Vault) should have identical padding and min-width so they appear as same-size boxes regardless of text length. Add a `min-w-[120px] text-center` to each nav link to ensure uniform box sizing.

### File: `src/components/Header.tsx`
- Move the `v3.5` badge span out of the logo `<Link>` so it's a sibling element
- Add `min-w-[120px] text-center` to each nav link class to ensure uniform box widths

