

## Power Map Redesign — Hierarchical Web with XP Actions

### What's Changing

The current Power Map has nodes scattered without clear hierarchy. The redesign will create a proper **top-down power hierarchy** (PM at top → Ministers → Corporations → Lobbyists) with visible connection lines forming a web, plus an XP reward system for civic actions, and significantly more nodes to fill in the blanks.

### 1. Restructure Layout as Power Hierarchy

**`src/components/InfluenceNetwork.tsx`** — Replace the current flat spider-web with a clear **tiered vertical layout**:

```text
TIER 0 (y=0):     [PMO] ———— [Treasury Board]
                   / | \           |
TIER 1 (y=200):  [Anand] [Hajdu] [Champagne] [Freeland] [Miller] [LeBlanc]
                   / \      |       / \          |         |
TIER 2 (y=420):  [GDLS] [Elbit] [Water] [Loblaws] [Metro] [Empire] [TD] [RBC] [CIBC] [BMO]
                   |      |              |         |        |        |    |
TIER 3 (y=620):  [H+K]  [GCI]         [Counsel] [FGR]   [CBA]   [McMillan] [etc]
```

- All connection lines remain visible at all times (not just on hover)
- Red animated lines for crisis-linked connections, grey for standard
- Hover on any line shows a tooltip with lobbying frequency + grant amount
- Uniform node sizing within each tier for visual consistency

### 2. Add More Nodes to `src/data/gameData.ts`

Expand the `influenceNodes` and `influenceEdges` arrays with:

**New Ministers (~3-4 more):**
- Chrystia Freeland (Finance — controls budget allocations)
- Marc Miller (Immigration — linked to housing crisis)
- Dominic LeBlanc (Public Safety)
- Bill Blair (Defence — arms export oversight)

**New Corporations (~4-5 more):**
- Metro Inc. ($920M profits)
- Empire/Sobeys ($780M profits)
- CIBC, BMO (additional banks for wealth tax web)
- SNC-Lavalin/AtkinsRéalis (infrastructure contracts)
- Irving Group (defence shipbuilding)

**New Lobbyists (~3-4 more):**
- McMillan Vantage (banking lobby)
- Fleishman-Hillard (grocery industry)
- Prospectus Associates (defence)
- Earnscliffe Strategies (cross-sector)

Each new node gets a full dossier with phone, email, assistant, reports-to, website, lobbying activity.

### 3. Uniform Neubrutalist Node Styling

Update all custom node components in `InfluenceNetwork.tsx`:
- **PMO/Ministers**: Circular avatars with initials, 4px black border, white bg, role text below
- **Corporations**: White rectangles, 4px black border, bold label + financial detail
- **Lobbyists**: Light grey (`bg-secondary`) rectangles, 4px black border
- **Banks**: Light yellow rectangles, 4px black border
- All nodes same width within their tier for uniform grid appearance

### 4. XP Action Buttons on Node Click

When a user clicks a node and sees the dossier panel, add action buttons:
- **"Call This Office" → +10 XP** (logs via existing `addXP` from `useAuth`)
- **"Email This Office" → +5 XP**
- **"Share Dossier" → +5 XP**

This requires:
- Import `useAuth` in `InfluenceNetwork.tsx`
- Add XP action buttons to the `DossierPanel` component
- Show a toast notification on XP earn

### 5. Increase Canvas Height & Fit

- Increase the ReactFlow container height from 700px to 900px to accommodate the 4 tiers
- Adjust `fitViewOptions` padding for the wider graph
- Keep header untouched as requested

### Files to Modify
1. **`src/data/gameData.ts`** — Add ~15 new nodes + ~20 new edges with full dossiers
2. **`src/components/InfluenceNetwork.tsx`** — Restructure layout positions for hierarchy, update node components for uniformity, add XP buttons to dossier panel, integrate `useAuth`
3. **`src/pages/PowerMap.tsx`** — No changes needed (keeps header/footer as-is)

