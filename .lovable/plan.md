

## Plan: Add "Kindness is Free" Donation Button for Gaza Mission

### What to build
A donation action in the Gaza mission's stage actions, styled as a prominent "Kindness is Free" button that links to a Gaza relief fund and awards XP.

### Changes

1. **`src/data/stageActions.ts`** — Add a `gaza` mission entry with stage actions. The Awareness stage will include all social sharing actions (like water) plus a "Kindness is Free" donation action with a `donate` icon type pointing to a reputable Gaza relief fund (e.g., UNRWA or Canadian Red Cross Gaza appeal). Add MP Pressure and Legislation stages as well.

2. **`src/components/StageActionDialog.tsx`** — Add `"donate"` to the icon map (using `Heart` from lucide-react). Style the donation button distinctly — give it a highlighted/green treatment so it stands out from regular actions.

3. **`src/data/stageActions.ts` type** — Add `"donate"` to the `StageAction.icon` union type.

### Donation link
Will use the UNRWA donation page (`https://donate.unrwa.org`) as the external URL, or the Canadian Red Cross Gaza relief fund. The button will open in a new tab and award XP on click (same flow as other external actions).

