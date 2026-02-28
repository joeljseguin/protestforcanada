export type ThreatLevel = "CRITICAL" | "HIGH" | "ELEVATED" | "MODERATE";

export type Mission = {
  rank: number;
  id: string;
  name: string;
  subtitle: string;
  xpBounty: number;
  threatLevel: ThreatLevel;
  description: string;
  humanCost: string[];
  progress: number;
  stages: { label: string; complete: boolean }[];
  stats: { label: string; value: string; source: string; sourceUrl: string }[];
  links: { label: string; url: string }[];
};

export const threatColors: Record<ThreatLevel, string> = {
  CRITICAL: "bg-threat-red text-primary-foreground",
  HIGH: "bg-threat-orange text-primary-foreground",
  ELEVATED: "bg-threat-yellow text-foreground",
  MODERATE: "bg-mission-blue text-primary-foreground",
};

export const missions: Mission[] = [
  {
    rank: 1,
    id: "water",
    name: "Water Equity",
    subtitle: "Seine River LTDWA — Added Feb 10, 2026",
    xpBounty: 500,
    threatLevel: "CRITICAL",
    description: "First Nations communities under long-term drinking water advisories. Seine River First Nation classified 'Long Term' as of Feb 10, 2026.",
    humanCost: [
      "28 long-term drinking water advisories remain active.",
      "34 First Nations communities affected — basic water access denied.",
      "$890M in infrastructure grants delayed from Budget 2024/25.",
    ],
    progress: 28,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Long-Term Advisories", value: "28", source: "ISC", sourceUrl: "https://www.sac-isc.gc.ca" },
      { label: "Communities Affected", value: "34", source: "ISC Feb 2026", sourceUrl: "https://www.sac-isc.gc.ca" },
      { label: "Delayed Grants", value: "$890M", source: "Budget 2024/25", sourceUrl: "https://open.canada.ca" },
    ],
    links: [
      { label: "ISC Water Dashboard", url: "https://www.sac-isc.gc.ca/eng/1506514143353/1533317130660" },
    ],
  },
  {
    rank: 2,
    id: "food",
    name: "Food Crisis",
    subtitle: "25.5% National Insecurity — 12M Canadians",
    xpBounty: 500,
    threatLevel: "CRITICAL",
    description: "1 in 4 Canadian households now food insecure. Grocery industry consolidation and unchecked lobbying fuel the crisis.",
    humanCost: [
      "1 in 4 Canadians are hungry. Average food cost up $994 this year.",
      "12 million Canadians affected by food insecurity.",
      "67 lobbyist meetings between grocery giants and Innovation Ministry.",
    ],
    progress: 72,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislation", complete: true },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Food Insecurity", value: "25.5%", source: "StatsCan 2026", sourceUrl: "https://www.statcan.gc.ca" },
      { label: "Grocery Inflation", value: "5.8%", source: "Food Price Report", sourceUrl: "https://www.dal.ca/sites/agri-food/research/canada-s-food-price-report.html" },
      { label: "Lobbyist Meetings", value: "67", source: "Commissioner of Lobbying", sourceUrl: "https://lobbycanada.gc.ca" },
    ],
    links: [
      { label: "Food Price Report 2026", url: "https://www.dal.ca/sites/agri-food/research/canada-s-food-price-report.html" },
      { label: "Competition Bureau", url: "https://www.competitionbureau.gc.ca" },
    ],
  },
  {
    rank: 3,
    id: "tax",
    name: "Tax the Rich",
    subtitle: "Petition e-6806 — 1% Wealth Tax",
    xpBounty: 500,
    threatLevel: "HIGH",
    description: "Parliamentary petition for a 1% annual wealth tax on net wealth over $20 million. Sign at ourcommons.ca.",
    humanCost: [
      "87 Canadian billionaires hold more wealth than the bottom 12 million Canadians combined.",
      "A 1% wealth tax would raise an estimated $5.6B annually for public services.",
      "Petition e-6806 needs 500,000 signatures to trigger Parliamentary debate.",
    ],
    progress: 35,
    stages: [
      { label: "Petition", complete: true },
      { label: "Signatures", complete: false },
      { label: "Debate", complete: false },
      { label: "Legislation", complete: false },
    ],
    stats: [
      { label: "Signatures Needed", value: "500K", source: "ourcommons.ca", sourceUrl: "https://petitions.ourcommons.ca" },
      { label: "Estimated Revenue", value: "$5.6B/yr", source: "PBO", sourceUrl: "https://www.pbo-dpb.ca" },
      { label: "Billionaires in Canada", value: "87", source: "Forbes 2025", sourceUrl: "https://www.forbes.com" },
    ],
    links: [
      { label: "Sign Petition e-6806", url: "https://petitions.ourcommons.ca" },
    ],
  },
  {
    rank: 4,
    id: "gaza",
    name: "Gaza/Palestine Accountability",
    subtitle: "Legacy Permits & Indirect Transfers",
    xpBounty: 500,
    threatLevel: "CRITICAL",
    description: "Tracking Canadian military exports despite the announced 'pause'. $18.9M exported via legacy permits.",
    humanCost: [
      "438+ shipments to conflict zones documented by Project Ploughshares.",
      "$18.9M in military goods exported despite official 'pause'.",
      "12 legacy permits still active under the Export and Import Permits Act.",
    ],
    progress: 50,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Military Exports", value: "$18.9M", source: "Ploughshares", sourceUrl: "https://ploughshares.ca" },
      { label: "Active Legacy Permits", value: "12", source: "Global Affairs", sourceUrl: "https://open.canada.ca" },
      { label: "Companies Flagged", value: "3", source: "CBC 2026", sourceUrl: "https://www.cbc.ca" },
    ],
    links: [
      { label: "Project Ploughshares Report", url: "https://ploughshares.ca" },
      { label: "CBC Investigation", url: "https://www.cbc.ca" },
    ],
  },
  {
    rank: 5,
    id: "housing",
    name: "Housing Affordability Crisis",
    subtitle: "7x Income-to-Price Ratio",
    xpBounty: 500,
    threatLevel: "CRITICAL",
    description: "Average home prices remain 7x median household income. Federal housing accelerator fund under scrutiny.",
    humanCost: [
      "Average home price: $716,000 — unaffordable for most families.",
      "1.87M households in core housing need across Canada.",
      "Rental vacancy rate at 1.5% — worst in decades.",
    ],
    progress: 40,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Avg Home Price", value: "$716K", source: "CMHC", sourceUrl: "https://www.cmhc-schl.gc.ca" },
      { label: "Core Housing Need", value: "1.87M", source: "StatsCan", sourceUrl: "https://www.statcan.gc.ca" },
      { label: "Vacancy Rate", value: "1.5%", source: "CMHC 2025", sourceUrl: "https://www.cmhc-schl.gc.ca" },
    ],
    links: [
      { label: "CMHC Housing Data", url: "https://www.cmhc-schl.gc.ca" },
    ],
  },
  {
    rank: 6,
    id: "healthcare",
    name: "Healthcare System Collapse",
    subtitle: "ER Wait Times at Historic Highs",
    xpBounty: 500,
    threatLevel: "HIGH",
    description: "Canada Health Transfer increased to $49.4B but wait times remain at historic highs.",
    humanCost: [
      "6.5 million Canadians lack a family doctor.",
      "Median ER wait time: 4.1 hours — record high.",
      "14,000+ nursing vacancies across Canada.",
    ],
    progress: 30,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Without Family Doctor", value: "6.5M", source: "CIHI", sourceUrl: "https://www.cihi.ca" },
      { label: "Canada Health Transfer", value: "$49.4B", source: "Dept of Finance", sourceUrl: "https://www.canada.ca/en/department-finance.html" },
      { label: "Nursing Vacancies", value: "14K+", source: "StatsCan", sourceUrl: "https://www.statcan.gc.ca" },
    ],
    links: [
      { label: "CIHI Health Data", url: "https://www.cihi.ca" },
    ],
  },
  {
    rank: 7,
    id: "phoenix",
    name: "Phoenix Pay System Scandal",
    subtitle: "$2.4B Wasted — No Fix in Sight",
    xpBounty: 500,
    threatLevel: "HIGH",
    description: "The failed Phoenix pay system continues to cost taxpayers billions with no replacement timeline.",
    humanCost: [
      "$2.4 billion spent on a system that doesn't work.",
      "Thousands of federal employees underpaid or not paid at all.",
      "No replacement timeline announced.",
    ],
    progress: 20,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Total Cost", value: "$2.4B", source: "PSPC", sourceUrl: "https://www.canada.ca/en/public-services-procurement.html" },
      { label: "Affected Workers", value: "150K+", source: "PSAC", sourceUrl: "https://psacunion.ca" },
      { label: "Years Broken", value: "10", source: "CBC", sourceUrl: "https://www.cbc.ca" },
    ],
    links: [],
  },
  {
    rank: 8,
    id: "climate",
    name: "Climate Accountability Gap",
    subtitle: "Oil & Gas Subsidies vs Paris Targets",
    xpBounty: 500,
    threatLevel: "ELEVATED",
    description: "Canada continues fossil fuel subsidies while missing emission reduction targets under the Paris Agreement.",
    humanCost: [
      "$18.5 billion in fossil fuel subsidies annually.",
      "Canada on track to miss 2030 Paris Agreement targets.",
      "Wildfires displaced 230,000+ Canadians in 2024-25.",
    ],
    progress: 25,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Fossil Fuel Subsidies", value: "$18.5B", source: "IISD", sourceUrl: "https://www.iisd.org" },
      { label: "Emissions Gap", value: "-22%", source: "ECCC", sourceUrl: "https://www.canada.ca/en/environment-climate-change.html" },
      { label: "Wildfire Displaced", value: "230K+", source: "Red Cross", sourceUrl: "https://www.redcross.ca" },
    ],
    links: [],
  },
  {
    rank: 9,
    id: "digital-rights",
    name: "Digital Rights & Online Harms",
    subtitle: "Bill C-63 — Free Expression Under Threat",
    xpBounty: 500,
    threatLevel: "ELEVATED",
    description: "Online Harms Act (Bill C-63) advancing through Parliament with implications for free expression.",
    humanCost: [
      "Bill C-63 could enable pre-crime speech regulation.",
      "Digital privacy eroding under expanded surveillance powers.",
      "No independent oversight body proposed.",
    ],
    progress: 45,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Bill Status", value: "Committee", source: "LEGISinfo", sourceUrl: "https://www.parl.ca/legisinfo" },
      { label: "Budget", value: "$210M", source: "PBO", sourceUrl: "https://www.pbo-dpb.ca" },
      { label: "Public Comments", value: "12K+", source: "Parl Canada", sourceUrl: "https://www.parl.ca" },
    ],
    links: [],
  },
  {
    rank: 10,
    id: "arrivcan",
    name: "ArriveCAN Scandal",
    subtitle: "$80K Budget → $59.5M Final Cost",
    xpBounty: 500,
    threatLevel: "MODERATE",
    description: "The ArriveCAN app ballooned from $80K to $59.5M with questionable subcontracting. Accountability demanded.",
    humanCost: [
      "Original budget: $80,000. Final cost: $59.5 million.",
      "Questionable sole-source contracts to GC Strategies.",
      "RCMP criminal investigation launched.",
    ],
    progress: 60,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Investigation", complete: true },
      { label: "Accountability", complete: false },
    ],
    stats: [
      { label: "Cost Overrun", value: "$59.5M", source: "AG Report", sourceUrl: "https://www.oag-bvg.gc.ca" },
      { label: "Subcontractors", value: "76", source: "OGGO", sourceUrl: "https://www.parl.ca" },
      { label: "RCMP Status", value: "Active", source: "CBC", sourceUrl: "https://www.cbc.ca" },
    ],
    links: [],
  },
];

export type InfluenceNode = {
  id: string;
  type: "minister" | "corporation" | "lobbyist";
  label: string;
  role?: string;
  detail?: string;
  avatarInitials?: string;
  alertRed?: boolean;
  sourceUrl?: string;
};

export type InfluenceEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
  lobbyingFrequency?: string;
};

export const influenceNodes: InfluenceNode[] = [
  { id: "anand", type: "minister", label: "Anita Anand", role: "Minister of Foreign Affairs", avatarInitials: "AA", sourceUrl: "https://www.canada.ca/en/global-affairs.html" },
  { id: "gull-masty", type: "minister", label: "Mandy Gull-Masty", role: "Minister of Indigenous Services", avatarInitials: "MG", sourceUrl: "https://www.sac-isc.gc.ca" },
  { id: "champagne", type: "minister", label: "François-Philippe Champagne", role: "Minister of Innovation", avatarInitials: "FC", sourceUrl: "https://ised-isde.canada.ca" },
  { id: "gdls", type: "corporation", label: "General Dynamics", detail: "CEO: Danny Deep", alertRed: true, sourceUrl: "https://www.gd.com" },
  { id: "water-backlog", type: "corporation", label: "Water Infrastructure Backlogs", detail: "28 LTDWAs Active", alertRed: true },
  { id: "loblaws", type: "corporation", label: "Loblaws / Weston", detail: "30% grocery market share", sourceUrl: "https://www.loblaw.ca" },
  { id: "elbit", type: "corporation", label: "Elbit Systems", detail: "Defence electronics & UAVs", alertRed: true },
  { id: "lob-gdls", type: "lobbyist", label: "Hill+Knowlton", detail: "Lobbying for GDLS", sourceUrl: "https://lobbycanada.gc.ca" },
  { id: "lob-loblaws", type: "lobbyist", label: "Counsel Public Affairs", detail: "Lobbying for Loblaws", sourceUrl: "https://lobbycanada.gc.ca" },
];

export const influenceEdges: InfluenceEdge[] = [
  { id: "e1", source: "anand", target: "gdls", label: "Export Permits", lobbyingFrequency: "CEO Danny Deep met with Minister 4 times in Q4 2025" },
  { id: "e2", source: "anand", target: "elbit", label: "Legacy Permits", lobbyingFrequency: "3 meetings in Q4 2025 re: defence procurement" },
  { id: "e3", source: "gull-masty", target: "water-backlog", label: "Administers", lobbyingFrequency: "Budget delays: $890M infrastructure grants pending" },
  { id: "e4", source: "champagne", target: "loblaws", label: "Competition Review", lobbyingFrequency: "CEO Per Bank met with Minister 4 times in Q4" },
  { id: "e5", source: "gdls", target: "lob-gdls", label: "Retains", lobbyingFrequency: "42 communications filed in 2025-26" },
  { id: "e6", source: "loblaws", target: "lob-loblaws", label: "Retains", lobbyingFrequency: "28 meetings with Ministry of Innovation" },
];

export type DossierEntry = {
  id: string;
  term: string;
  category: "terminology" | "organization" | "special";
  definition: string;
  details?: string;
  sourceUrl?: string;
};

export const dossierEntries: DossierEntry[] = [
  { id: "legacy-permit", term: "Legacy Permit", category: "terminology", definition: "An export permit approved before a policy change takes effect. Allows shipments to continue under old rules even after new restrictions are announced.", details: "Key loophole in the Export and Import Permits Act (EIPA). Canada's 'pause' on arms exports to Israel did not revoke existing legacy permits, allowing $18.9M in continued shipments." },
  { id: "oic", term: "Order-in-Council", category: "terminology", definition: "A legal instrument made by the Governor in Council (Cabinet). Used to enact regulations, make appointments, or implement policy without full Parliamentary debate.", details: "Often used for arms export decisions. Critics argue it bypasses democratic oversight." },
  { id: "ltdwa", term: "Long-Term Drinking Water Advisory (LTDWA)", category: "terminology", definition: "A drinking water advisory that has been in place for more than one year. Indicates systemic failure in water infrastructure.", details: "As of Feb 2026, 28 LTDWAs remain active across 34 First Nations communities. Seine River First Nation added Feb 10, 2026." },
  { id: "eipa", term: "Export and Import Permits Act (EIPA)", category: "terminology", definition: "Federal legislation controlling the export and import of goods designated on Canada's export control list, including military goods and technology." },
  { id: "sif", term: "Strategic Innovation Fund (SIF)", category: "terminology", definition: "A $7.2B federal fund administered by ISED to support business innovation. Criticized for grants to defence companies during humanitarian crises.", details: "$18.9M granted to General Dynamics, $4.2M to Elbit Systems." },
  { id: "ploughshares", term: "Project Ploughshares", category: "organization", definition: "An operating program of the Canadian Council of Churches based at the University of Waterloo. Canada's leading peace research institute.", details: "Primary researcher exposing the 'American Loophole' — Canadian military goods exported to the US, then re-exported to conflict zones like Israel. Their 2025/26 report documented 438+ shipments.", sourceUrl: "https://ploughshares.ca" },
  { id: "competition-bureau", term: "Competition Bureau of Canada", category: "organization", definition: "Independent law enforcement agency ensuring Canadian businesses and consumers prosper in a competitive and innovative marketplace.", details: "Currently reviewing grocery sector consolidation. Loblaws (30% market share) and Metro (12%) under scrutiny." },
  { id: "lobbyist-registry", term: "Office of the Commissioner of Lobbying", category: "organization", definition: "Federal body maintaining the Registry of Lobbyists. All paid lobbying activity must be registered and disclosed.", sourceUrl: "https://lobbycanada.gc.ca" },
  { id: "human-machine", term: "The Human & The Machine", category: "special", definition: "How this platform was built: A Canadian citizen and AI (working together in February 2026) bypassed corporate bureaucracy to map government accountability data that should be public by default.", details: "The founder used AI tools to cross-reference open government data, lobbying registries, military export reports, and Indigenous Services records — work that would normally require a team of researchers and months of ATIP requests. Built in days, not years. This is what civic technology looks like when the barriers are removed." },
];

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "protest" | "townhall" | "rally" | "signing";
  missionId: string;
  attendees: number;
  xpReward: number;
};

export const calendarEvents: CalendarEvent[] = [
  { id: "1", title: "Tax the Rich Rally — Parliament Hill", date: "2026-03-15", time: "10:00 AM", location: "Parliament Hill, Ottawa", type: "rally", missionId: "tax", attendees: 3200, xpReward: 200 },
  { id: "2", title: "Water Equity March", date: "2026-03-18", time: "11:00 AM", location: "Queen's Park, Toronto", type: "protest", missionId: "water", attendees: 1800, xpReward: 200 },
  { id: "3", title: "Food Crisis Town Hall", date: "2026-03-22", time: "7:00 PM", location: "Community Centre, Vancouver", type: "townhall", missionId: "food", attendees: 450, xpReward: 150 },
  { id: "4", title: "Petition Signing Drive — e-6806", date: "2026-03-25", time: "12:00 PM", location: "Multiple Cities", type: "signing", missionId: "tax", attendees: 5000, xpReward: 500 },
  { id: "5", title: "Housing Affordability March", date: "2026-04-02", time: "9:00 AM", location: "City Hall, Montreal", type: "protest", missionId: "housing", attendees: 2400, xpReward: 200 },
];
