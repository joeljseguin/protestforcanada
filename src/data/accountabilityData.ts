export type AccountabilityNode = {
  id: string;
  type: "government" | "instrument" | "corporation" | "lobbyist";
  label: string;
  detail?: string;
  amount?: string;
  alertRed?: boolean;
  sourceUrl?: string;
};

export type AccountabilityEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
};

export const accountabilityNodes: AccountabilityNode[] = [
  // Top tier — Government
  { id: "goc", type: "government", label: "Government of Canada", detail: "Global Affairs / Dept. of Finance" },
  { id: "isc", type: "government", label: "Indigenous Services Canada", detail: "Budget 2024/25 Allocations" },
  { id: "ised", type: "government", label: "Innovation, Science & Economic Dev.", detail: "Ministry of Innovation" },

  // Middle tier — Instruments
  { id: "eipa", type: "instrument", label: "Export & Import Permits Act", detail: "Military export permits & legacy permits" },
  { id: "sif", type: "instrument", label: "Strategic Innovation Fund", detail: "$7.2B allocated since 2017", amount: "$7.2B" },
  { id: "water-infra", type: "instrument", label: "First Nations Water Infrastructure", detail: "Budget 2024/25 delayed grants", amount: "$3.5B" },
  { id: "comp-bureau", type: "instrument", label: "Competition Bureau", detail: "Grocery sector review" },

  // Corporations
  { id: "gdls", type: "corporation", label: "General Dynamics Land Systems", detail: "LAV contracts — Saudi & US", amount: "$18.9M", alertRed: true, sourceUrl: "https://ploughshares.ca" },
  { id: "elbit", type: "corporation", label: "Elbit Systems Canada", detail: "Defence electronics & UAVs", amount: "$4.2M", alertRed: true },
  { id: "loblaws", type: "corporation", label: "Loblaws / Weston", detail: "Market dominance — 30% grocery share", amount: "$1.2B revenue", sourceUrl: "https://www.statcan.gc.ca" },
  { id: "metro", type: "corporation", label: "Metro Inc.", detail: "Grocery retail — 12% market share" },
  { id: "us-dod", type: "corporation", label: "US Dept of Defense", detail: "Artillery propellant transfers", alertRed: true },

  // Lobbyists
  { id: "lob-gdls", type: "lobbyist", label: "Hill+Knowlton (for GDLS)", detail: "42 communications in 2025-26", sourceUrl: "https://lobbycanada.gc.ca" },
  { id: "lob-loblaws", type: "lobbyist", label: "Counsel Public Affairs (Loblaws)", detail: "28 meetings with Ministry of Innovation", sourceUrl: "https://lobbycanada.gc.ca" },
  { id: "lob-elbit", type: "lobbyist", label: "GCI Group (Elbit)", detail: "15 communications re: defence procurement" },
];

export const accountabilityEdges: AccountabilityEdge[] = [
  { id: "e1", source: "goc", target: "eipa", label: "Authorizes" },
  { id: "e2", source: "goc", target: "sif", label: "Funds" },
  { id: "e3", source: "isc", target: "water-infra", label: "Administers" },
  { id: "e4", source: "ised", target: "comp-bureau", label: "Oversees" },
  { id: "e5", source: "eipa", target: "gdls", label: "Permits granted" },
  { id: "e6", source: "eipa", target: "elbit", label: "Legacy permits" },
  { id: "e7", source: "sif", target: "gdls", label: "$18.9M grant" },
  { id: "e8", source: "sif", target: "elbit", label: "$4.2M grant" },
  { id: "e9", source: "gdls", target: "us-dod", label: "Artillery propellants" },
  { id: "e10", source: "us-dod", target: "gdls", label: "→ Israel (indirect)" },
  { id: "e11", source: "comp-bureau", target: "loblaws", label: "Under review" },
  { id: "e12", source: "comp-bureau", target: "metro", label: "Under review" },
  { id: "e13", source: "gdls", target: "lob-gdls" },
  { id: "e14", source: "loblaws", target: "lob-loblaws" },
  { id: "e15", source: "elbit", target: "lob-elbit" },
];

export type Mission = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stages: { label: string; complete: boolean }[];
  progress: number;
  crisis: boolean;
  stats: { label: string; value: string; source: string; sourceUrl: string }[];
  links: { label: string; url: string }[];
};

export const missions: Mission[] = [
  {
    id: "gaza",
    title: "MISSION: Gaza/Palestine Accountability",
    subtitle: "Legacy Permits & Indirect Transfers",
    description: "Tracking Canadian military exports despite the announced 'pause'. Project Ploughshares 2025/26 report confirmed $18.9M in exports via legacy permits. Focus on General Dynamics ordnance → US DoD → Israel artillery propellant pipeline.",
    stages: [
      { label: "Public Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislative Review", complete: false },
      { label: "Resolved", complete: false },
    ],
    progress: 50,
    crisis: true,
    stats: [
      { label: "Military Exports (despite pause)", value: "$18.9M", source: "Project Ploughshares", sourceUrl: "https://ploughshares.ca" },
      { label: "Legacy Permits Active", value: "12", source: "Global Affairs Canada", sourceUrl: "https://open.canada.ca" },
      { label: "Companies Flagged", value: "3", source: "CBC Investigation 2026", sourceUrl: "https://www.cbc.ca" },
    ],
    links: [
      { label: "Project Ploughshares Report", url: "https://ploughshares.ca" },
      { label: "CBC Investigation: U.S.-Bound Shipments", url: "https://www.cbc.ca" },
    ],
  },
  {
    id: "water",
    title: "MISSION: Remote Water Security",
    subtitle: "Seine River First Nation & Long-Term Advisories",
    description: "Data-driven tracking of First Nations communities under long-term drinking water advisories. ISC confirms Seine River First Nation advisory now classified 'Long Term'. Budget 2024/25 infrastructure allocations delayed.",
    stages: [
      { label: "Public Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislative Review", complete: false },
      { label: "Resolved", complete: false },
    ],
    progress: 28,
    crisis: true,
    stats: [
      { label: "Long-Term Advisories Active", value: "28", source: "Indigenous Services Canada", sourceUrl: "https://www.sac-isc.gc.ca" },
      { label: "Communities Affected", value: "34", source: "ISC Feb 2026", sourceUrl: "https://www.sac-isc.gc.ca" },
      { label: "Delayed Infrastructure Grants", value: "$890M", source: "Budget 2024/25", sourceUrl: "https://open.canada.ca" },
    ],
    links: [
      { label: "ISC Water Advisories Dashboard", url: "https://www.sac-isc.gc.ca/eng/1506514143353/1533317130660" },
    ],
  },
  {
    id: "food",
    title: "MISSION: Food Inflation Crisis",
    subtitle: "1 in 4 Canadians Food Insecure",
    description: "Visualizing the 25% food insecurity rate (StatsCan 2026). Tracking Competition Bureau → Grocery Giants → Lobbyists meeting with Ministry of Innovation. Canada Food Price Report 2026 confirms crisis levels.",
    stages: [
      { label: "Public Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislative Review", complete: true },
      { label: "Resolved", complete: false },
    ],
    progress: 72,
    crisis: false,
    stats: [
      { label: "Food Insecurity Rate", value: "25%", source: "StatsCan 2026", sourceUrl: "https://www.statcan.gc.ca" },
      { label: "Avg. Grocery Inflation", value: "5.8%", source: "Canada Food Price Report", sourceUrl: "https://www.dal.ca/sites/agri-food/research/canada-s-food-price-report.html" },
      { label: "Lobbyist Meetings (Grocery)", value: "67", source: "Office of the Commissioner", sourceUrl: "https://lobbycanada.gc.ca" },
    ],
    links: [
      { label: "Canada Food Price Report 2026", url: "https://www.dal.ca/sites/agri-food/research/canada-s-food-price-report.html" },
      { label: "Competition Bureau Grocery Review", url: "https://www.competitionbureau.gc.ca" },
    ],
  },
];

export const mpDatabase: Record<string, { name: string; party: string; riding: string; email: string }> = {
  "K1A": { name: "Catherine McKenna", party: "Liberal", riding: "Ottawa Centre", email: "catherine.mckenna@parl.gc.ca" },
  "M5V": { name: "Kevin Vuong", party: "Independent", riding: "Spadina—Fort York", email: "kevin.vuong@parl.gc.ca" },
  "V6B": { name: "Jenny Kwan", party: "NDP", riding: "Vancouver East", email: "jenny.kwan@parl.gc.ca" },
  "T2P": { name: "Greg McLean", party: "Conservative", riding: "Calgary Centre", email: "greg.mclean@parl.gc.ca" },
  "H3A": { name: "Anthony Housefather", party: "Liberal", riding: "Mount Royal", email: "anthony.housefather@parl.gc.ca" },
};

export const emailTemplates: Record<string, string> = {
  gaza: `Dear [MP_NAME],

As your constituent in [RIDING], I am writing to express deep concern about Canada's continued military exports to entities involved in the Gaza conflict.

Project Ploughshares' 2025/26 report confirmed $18.9M in military goods exported despite the announced "pause" — enabled by legacy permits under the Export and Import Permits Act.

I urge you to:
1. Call for an immediate and comprehensive review of all legacy export permits
2. Support legislation requiring parliamentary approval for arms exports to conflict zones
3. Demand transparency on General Dynamics' artillery propellant transfers via the US

Source: Project Ploughshares (ploughshares.ca), CBC Investigation 2026

Sincerely,
[YOUR_NAME]`,

  water: `Dear [MP_NAME],

As your constituent in [RIDING], I am writing about the ongoing drinking water crisis in First Nations communities.

Indigenous Services Canada (Feb 2026) confirms that Seine River First Nation's advisory is now classified as "Long Term." 28 long-term advisories remain active, affecting 34 communities. Budget 2024/25 infrastructure grants totaling $890M have been delayed.

I urge you to:
1. Demand immediate disbursement of delayed water infrastructure funding
2. Support emergency legislation for clean water guarantees
3. Call for accountability on ISC budget allocation timelines

Source: Indigenous Services Canada (sac-isc.gc.ca)

Sincerely,
[YOUR_NAME]`,

  food: `Dear [MP_NAME],

As your constituent in [RIDING], I am alarmed by the food insecurity crisis — 1 in 4 Canadian households are now food insecure (StatsCan 2026).

The Canada Food Price Report 2026 shows grocery inflation at 5.8%. Meanwhile, grocery industry lobbyists have held 67 meetings with the Ministry of Innovation. The Competition Bureau's review of grocery consolidation must lead to action.

I urge you to:
1. Support stronger competition enforcement in the grocery sector
2. Back emergency food affordability measures
3. Demand full transparency on grocery industry lobbying activities

Source: StatsCan (statcan.gc.ca), Canada Food Price Report 2026

Sincerely,
[YOUR_NAME]`,
};
