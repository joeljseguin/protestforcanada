export type ThreatLevel = "CRITICAL" | "HIGH" | "ELEVATED" | "MODERATE";

export type SideQuest = {
  id: string;
  title: string;
  task: string;
  xp: number;
  icon: "search" | "share" | "write" | "volunteer" | "calculate" | "attend" | "donate" | "read" | "track";
};

export type Mission = {
  rank: number;
  id: string;
  name: string;
  subtitle: string;
  xpBounty: number;
  threatLevel: ThreatLevel;
  description: string;
  whatYouNeedToKnow: string;
  humanCost: string[];
  humanCostLinks?: string[];
  progress: number;
  stages: { label: string; complete: boolean }[];
  stats: { label: string; value: string; description: string; source: string; sourceUrl: string }[];
  sideQuests: SideQuest[];
  links: { label: string; url: string }[];
  truthTab?: {
    title: string;
    timeline?: { year: string; event: string }[];
    details: string[];
  };
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
    whatYouNeedToKnow: "28 First Nations communities still lack clean drinking water in 2026. The government promised to fix this by 2021 — they failed. $890M in funding sits unspent while families boil water to survive.",
    humanCost: [
      "28 long-term drinking water advisories remain active.",
      "34 First Nations communities affected — basic water access denied.",
      "$890M in infrastructure grants delayed from Budget 2024/25.",
    ],
    humanCostLinks: [
      "https://www.cbc.ca/news/canada/thunder-bay/indigenous-water-9.7002248",
      "https://www.cbc.ca/news/canada/sudbury/kashechewan-clean-water-crisis-9.7040167",
      "https://www.cbc.ca/news/indigenous/first-nations-water-bill-9.7001699",
    ],
    progress: 28,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Long-Term Advisories", value: "28", description: "First Nations communities under long-term drinking water advisories with no safe tap water", source: "ISC", sourceUrl: "https://www.sac-isc.gc.ca" },
      { label: "Communities Affected", value: "34", description: "Indigenous communities still waiting for clean water despite federal promises since 2015", source: "ISC Feb 2026", sourceUrl: "https://www.sac-isc.gc.ca" },
      { label: "Delayed Grants", value: "$890M", description: "Federal infrastructure funding promised but delayed or unspent for water treatment projects", source: "Budget 2024/25", sourceUrl: "https://open.canada.ca" },
    ],
    sideQuests: [
      { id: "water-research", title: "Investigate Your Water", task: "Look up your municipality's water quality report and compare it to First Nations advisories", xp: 20, icon: "search" },
      { id: "water-share", title: "Spread the Word", task: "Share the water crisis stats on your social media — tag your MP", xp: 25, icon: "share" },
      { id: "water-donate", title: "Support Clean Water", task: "Donate to Water First or a clean water charity serving Indigenous communities", xp: 50, icon: "donate" },
    ],
    links: [
      { label: "ISC Water Dashboard", url: "https://www.sac-isc.gc.ca/eng/1506514143353/1533317130660" },
    ],
    truthTab: {
      title: "Seine River LTDWA — 10-Year Timeline of Neglect",
      timeline: [
        { year: "2016", event: "Federal government pledges to end all LTDWAs by 2021." },
        { year: "2017", event: "Seine River First Nation water plant flagged for aging infrastructure." },
        { year: "2019", event: "ISC allocates $1.5B for water infrastructure — Seine River not prioritized." },
        { year: "2020", event: "COVID-19 delays construction across 14 First Nations sites." },
        { year: "2021", event: "Original deadline missed. 52 LTDWAs still active nationally." },
        { year: "2022", event: "Revised target set for 2024. Seine River advisory continues." },
        { year: "2023", event: "Auditor General report criticizes ISC for 'systemic delays'." },
        { year: "2024", event: "Budget 2024/25 allocates $890M — funds not yet disbursed." },
        { year: "2025", event: "Seine River advisory surpasses 365 days. Still classified 'short-term'." },
        { year: "Feb 2026", event: "ISC reclassifies Seine River as 'Long-Term Drinking Water Advisory'." },
      ],
      details: [
        "Jordan's Principle ensures First Nations children receive services without jurisdictional delays — yet water remains unresolved.",
        "The government lifted 144 advisories since 2015 but 28 remain, many in remote fly-in communities.",
        "Infrastructure costs are 3-5x higher in remote communities due to transportation and labour shortages.",
      ],
    },
  },
  {
    rank: 3,
    id: "food",
    name: "Food Crisis",
    subtitle: "25.5% National Insecurity — 12M Canadians",
    xpBounty: 500,
    threatLevel: "CRITICAL",
    description: "1 in 4 Canadian households now food insecure. Grocery industry consolidation and unchecked lobbying fuel the crisis.",
    whatYouNeedToKnow: "1 in 4 Canadians can't afford to eat properly. Meanwhile, Loblaws, Sobeys, and Metro reported record billion-dollar profits. 67 lobbying meetings with government — zero price controls.",
    humanCost: [
      "1 in 4 Canadians are hungry. Average food cost up $994 this year.",
      "12 million Canadians affected by food insecurity.",
      "67 lobbyist meetings between grocery giants and Innovation Ministry.",
    ],
    humanCostLinks: [
      "https://www.cbc.ca/news/canada/grocery-prices-food-cost-9.6956462",
      "https://www.cbc.ca/news/canada/toronto/food-banks-poverty-report-1.7635362",
      "https://www.cbc.ca/news/marketplace/marketplace-cheat-sheet-jan-25-2025-9.7056656",
    ],
    progress: 72,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislation", complete: true },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Food Insecurity", value: "25.5%", description: "of Canadian households cannot afford enough food — up from 16% in 2021", source: "StatsCan 2026", sourceUrl: "https://www.statcan.gc.ca" },
      { label: "Grocery Inflation", value: "5.8%", description: "annual grocery price increase while corporate grocery profits hit record highs", source: "Food Price Report", sourceUrl: "https://www.dal.ca/sites/agri-food/research/canada-s-food-price-report.html" },
      { label: "Lobbyist Meetings", value: "67", description: "registered lobbying meetings by grocery corporations with MPs in the last year", source: "Commissioner of Lobbying", sourceUrl: "https://lobbycanada.gc.ca" },
    ],
    sideQuests: [
      { id: "food-volunteer", title: "Volunteer at a Food Bank", task: "Find your local food bank and sign up for a volunteer shift this week", xp: 50, icon: "volunteer" },
      { id: "food-track", title: "Track Grocery Prices", task: "Compare prices at 3 stores for 10 staple items and document the markup", xp: 20, icon: "track" },
      { id: "food-write", title: "Write Your MP", task: "Send a letter to your MP demanding the Grocery Code of Conduct be passed", xp: 40, icon: "write" },
    ],
    links: [
      { label: "Food Price Report 2026", url: "https://www.dal.ca/sites/agri-food/research/canada-s-food-price-report.html" },
      { label: "Competition Bureau", url: "https://www.competitionbureau.gc.ca" },
    ],
    truthTab: {
      title: "Corporate Profit vs. Family Food Inflation",
      details: [
        "Loblaws reported $1.2B net earnings in 2025 — up 12% while families pay $994 more per year on groceries.",
        "Empire (Sobeys) reported $780M net earnings — up 8% in same period.",
        "Metro Inc. reported $920M net earnings — dividend payouts increased 15%.",
        "The 'Grocery Code of Conduct' has been delayed 3 times since 2023 due to industry lobbying.",
        "67 registered lobbying communications between grocery executives and Innovation Ministry in 2025.",
        "Food bank usage hit record 2M visits/month — up 32% from 2023.",
      ],
    },
  },
  {
    rank: 4,
    id: "tax",
    name: "Tax the Rich",
    subtitle: "Petition e-6806 — 1% Wealth Tax",
    xpBounty: 500,
    threatLevel: "HIGH",
    description: "Parliamentary petition for a 1% annual wealth tax on net wealth over $20 million.",
    whatYouNeedToKnow: "87 billionaires hold more wealth than 12 million Canadians combined. A 1% wealth tax on fortunes over $20M would raise $5.6B/year — enough to end the water crisis 10 times over.",
    humanCost: [
      "87 Canadian billionaires hold more wealth than the bottom 12 million Canadians combined.",
      "A 1% wealth tax would raise an estimated $5.6B annually for public services.",
      "Petition e-6806 needs 500,000 signatures to trigger Parliamentary debate.",
    ],
    humanCostLinks: [
      "https://www.pbo-dpb.ca",
      "https://www.pbo-dpb.ca",
      "https://petitions.ourcommons.ca",
    ],
    progress: 35,
    stages: [
      { label: "Petition", complete: true },
      { label: "Signatures", complete: false },
      { label: "Debate", complete: false },
      { label: "Legislation", complete: false },
    ],
    stats: [
      { label: "Signatures Needed", value: "500K", description: "petition signatures required to trigger a Parliamentary debate on wealth taxation", source: "ourcommons.ca", sourceUrl: "https://petitions.ourcommons.ca" },
      { label: "Estimated Revenue", value: "$5.6B/yr", description: "projected annual revenue from a 1% tax on wealth over $20M — enough to fund housing", source: "PBO", sourceUrl: "https://www.pbo-dpb.ca" },
      { label: "Billionaires in Canada", value: "87", description: "Canadian billionaires whose combined wealth exceeds the bottom 12 million Canadians", source: "Forbes 2025", sourceUrl: "https://www.forbes.com" },
    ],
    sideQuests: [
      { id: "tax-calculate", title: "Calculate the Gap", task: "Use the PBO wealth tax calculator to see how much revenue a 1% tax would generate", xp: 20, icon: "calculate" },
      { id: "tax-share", title: "Share the Petition", task: "Post the e-6806 petition link on 3 social platforms and tag your MP", xp: 30, icon: "share" },
      { id: "tax-write", title: "Letter to Finance Minister", task: "Write a letter to the Finance Minister demanding a wealth tax debate", xp: 50, icon: "write" },
    ],
    links: [
      { label: "Sign Petition e-6806", url: "https://petitions.ourcommons.ca" },
    ],
    truthTab: {
      title: "The Wealth Gap — Who Benefits?",
      details: [
        "TD Bank revenue target: $10.4B (2026) — CEO compensation: $15.2M.",
        "RBC revenue target: $12.1B (2026) — CEO compensation: $16.8M.",
        "Top 87 billionaires combined wealth: $270B — bottom 12M Canadians: $260B.",
        "A 1% tax on wealth over $20M would affect ~13,000 families and raise $5.6B annually.",
        "Revenue could fund: 56,000 affordable housing units OR eliminate all 28 LTDWAs 10x over.",
      ],
    },
  },
  {
    rank: 2,
    id: "gaza",
    name: "Gaza/Palestine Accountability",
    subtitle: "Legacy Permits & Indirect Transfers",
    xpBounty: 500,
    threatLevel: "CRITICAL",
    description: "Tracking Canadian military exports despite the announced 'pause'. $18.9M exported via legacy permits.",
    whatYouNeedToKnow: "Canada officially 'paused' arms exports — but $18.9M in military goods still shipped through a loophole. Canadian-made components go to the US, get integrated into weapons, then sent to conflict zones. 438 shipments documented.",
    humanCost: [
      "438+ shipments to conflict zones documented by Project Ploughshares.",
      "$18.9M in military goods exported despite official 'pause'.",
      "12 legacy permits still active under the Export and Import Permits Act.",
    ],
    humanCostLinks: [
      "https://www.cbc.ca/news/politics/arms-ammunition-shipments-israel-canada-1.7596091",
      "https://cbc.ca/news/politics/probe-canadian-arms-us-israel-9.7074373",
      "https://www.cbc.ca/news/politics/canadian-company-pauses-shipments-to-israeli-defence-firm-after-sending-gps-antennas-last-weekend-1.7612913",
    ],
    progress: 50,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Military Exports", value: "$18.9M", description: "in Canadian military components exported via the US loophole bypassing the arms embargo", source: "Ploughshares", sourceUrl: "https://ploughshares.ca" },
      { label: "Active Legacy Permits", value: "12", description: "pre-existing export permits still active, allowing continued arms shipments through the US", source: "Global Affairs", sourceUrl: "https://open.canada.ca" },
      { label: "Companies Flagged", value: "3", description: "Canadian defence companies identified as routing arms through US intermediaries", source: "CBC 2026", sourceUrl: "https://www.cbc.ca" },
    ],
    sideQuests: [
      { id: "gaza-research", title: "Research Arms Exports", task: "Read the Project Ploughshares report and identify Canadian companies involved", xp: 25, icon: "read" },
      { id: "gaza-write", title: "Write Global Affairs", task: "Email Global Affairs Canada demanding full cancellation of legacy export permits", xp: 50, icon: "write" },
      { id: "gaza-attend", title: "Attend a Solidarity Event", task: "Find and attend a local solidarity event or vigil in your community", xp: 50, icon: "attend" },
    ],
    links: [
      { label: "Project Ploughshares Report", url: "https://ploughshares.ca" },
      { label: "CBC Investigation", url: "https://www.cbc.ca" },
    ],
    truthTab: {
      title: "The American Loophole — How It Works",
      details: [
        "Step 1: Canadian companies (GDLS, Elbit) receive export permits to ship to the United States.",
        "Step 2: US Department of Defense integrates Canadian components into weapons systems.",
        "Step 3: US exports completed systems to Israel — bypassing Canada's 'pause' entirely.",
        "438 shipments documented by Project Ploughshares in their 2025/26 annual report.",
        "GDLS London, Ontario plant produces LAV turret components and artillery propellant.",
        "General Dynamics CEO Danny Deep met with Minister Anand 4 times in Q4 2025.",
        "The Export and Import Permits Act (EIPA) has no mechanism to track end-use after US transfer.",
      ],
    },
  },
  {
    rank: 5,
    id: "housing",
    name: "Housing Affordability Crisis",
    subtitle: "7x Income-to-Price Ratio",
    xpBounty: 500,
    threatLevel: "CRITICAL",
    description: "Average home prices remain 7x median household income.",
    whatYouNeedToKnow: "The average Canadian home costs $716K — 7x the median income. 1.87 million households are in 'core housing need,' meaning they can't afford adequate shelter. Vacancy rates are at 1.5%, the worst in decades.",
    humanCost: [
      "Average home price: $716,000 — unaffordable for most families.",
      "1.87M households in core housing need across Canada.",
      "Rental vacancy rate at 1.5% — worst in decades.",
    ],
    humanCostLinks: [
      "https://www.cbc.ca/news/business/cmhc-housing-starts-october-2025-9.6982821",
      "https://www.cbc.ca/news/business/cmhc-affordability-homes-1.7565525",
      "https://www.cbc.ca/news/canada/calgary/rents-easing-major-markets-tenants-no-relief-cmhc-1.7579759",
    ],
    progress: 40,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Avg Home Price", value: "$716K", description: "national average home price — 10x the median household income, locking out a generation", source: "CMHC", sourceUrl: "https://www.cmhc-schl.gc.ca" },
      { label: "Core Housing Need", value: "1.87M", description: "Canadian households in core housing need — spending over 30% of income on inadequate housing", source: "StatsCan", sourceUrl: "https://www.statcan.gc.ca" },
      { label: "Vacancy Rate", value: "1.5%", description: "national rental vacancy rate — anything below 3% indicates a severe housing supply crisis", source: "CMHC 2025", sourceUrl: "https://www.cmhc-schl.gc.ca" },
    ],
    sideQuests: [
      { id: "housing-calculate", title: "Calculate Your Ratio", task: "Divide your local average home price by your household income — is it over 5x?", xp: 20, icon: "calculate" },
      { id: "housing-attend", title: "Attend a Council Meeting", task: "Go to your city council's next zoning or housing meeting and speak up", xp: 50, icon: "attend" },
      { id: "housing-share", title: "Share Housing Data", task: "Post your income-to-housing ratio on social media with #HousingCrisis", xp: 25, icon: "share" },
    ],
    links: [{ label: "CMHC Housing Data", url: "https://www.cmhc-schl.gc.ca" }],
  },
  {
    rank: 6,
    id: "healthcare",
    name: "Healthcare System Collapse",
    subtitle: "ER Wait Times at Historic Highs",
    xpBounty: 500,
    threatLevel: "HIGH",
    description: "Canada Health Transfer increased to $49.4B but wait times remain at historic highs.",
    whatYouNeedToKnow: "6.5 million Canadians don't have a family doctor. ER waits average 4.1 hours — a record. 14,000 nursing positions sit vacant while the system hemorrhages workers to burnout and better-paying US jobs.",
    humanCost: [
      "6.5 million Canadians lack a family doctor.",
      "Median ER wait time: 4.1 hours — record high.",
      "14,000+ nursing vacancies across Canada.",
    ],
    humanCostLinks: [
      "https://www.cbc.ca/news/canada/the-cure-solutions-for-canadian-doctor-shortage-1.7465633",
      "https://www.cbc.ca/news/marketplace/hospital-wait-times-9.6983849",
      "https://www.cbc.ca/news/canada/newfoundland-labrador/emergency-wait-times-9.7001473",
    ],
    progress: 30,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Without Family Doctor", value: "6.5M", description: "Canadians without a family doctor — forced to rely on overcrowded ERs for basic care", source: "CIHI", sourceUrl: "https://www.cihi.ca" },
      { label: "Canada Health Transfer", value: "$49.4B", description: "federal health transfer — increased but still not enough to address crumbling provincial systems", source: "Dept of Finance", sourceUrl: "https://www.canada.ca/en/department-finance.html" },
      { label: "Nursing Vacancies", value: "14K+", description: "unfilled nursing positions nationwide — driving burnout and record ER wait times of 4.1 hours", source: "StatsCan", sourceUrl: "https://www.statcan.gc.ca" },
    ],
    sideQuests: [
      { id: "health-search", title: "Find Walk-In Clinics", task: "Map all walk-in clinics within 30 min of your home — share the list with neighbours", xp: 20, icon: "search" },
      { id: "health-write", title: "Write Your MLA", task: "Send a letter to your provincial MLA demanding increased healthcare funding", xp: 50, icon: "write" },
      { id: "health-share", title: "Share Wait Time Data", task: "Check your local ER wait times online and post them with #FixHealthcare", xp: 25, icon: "share" },
    ],
    links: [{ label: "CIHI Health Data", url: "https://www.cihi.ca" }],
  },
  {
    rank: 7,
    id: "phoenix",
    name: "Phoenix Pay System Scandal",
    subtitle: "$2.4B Wasted — No Fix in Sight",
    xpBounty: 500,
    threatLevel: "HIGH",
    description: "The failed Phoenix pay system continues to cost taxpayers billions.",
    whatYouNeedToKnow: "The government spent $2.4 BILLION on a pay system that doesn't work. 150,000+ federal workers have been underpaid, overpaid, or not paid at all — for 10 years. There's still no replacement plan.",
    humanCost: [
      "$2.4 billion spent on a system that doesn't work.",
      "Thousands of federal employees underpaid or not paid at all.",
      "No replacement timeline announced.",
    ],
    humanCostLinks: [
      "https://www.cbc.ca/news/canada/ottawa/federal-phoenix-pay-system-10-year-anniversary-9.7093933",
      "https://www.cbc.ca/news/canada/ottawa/former-public-servant-says-phoenix-ruined-his-20s-and-haunts-him-still-9.7103932",
      "https://www.cbc.ca/news/canada/ottawa/government-demanding-public-servants-reimburse-years-old-phoenix-overpayments-9.6995231",
    ],
    progress: 20,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Total Cost", value: "$2.4B", description: "taxpayer dollars spent on a pay system that still doesn't work after a decade of failures", source: "PSPC", sourceUrl: "https://www.canada.ca/en/public-services-procurement.html" },
      { label: "Affected Workers", value: "150K+", description: "federal employees underpaid, overpaid, or not paid at all — some for years at a time", source: "PSAC", sourceUrl: "https://psacunion.ca" },
      { label: "Years Broken", value: "10", description: "years the Phoenix system has been failing with no replacement plan announced by government", source: "CBC", sourceUrl: "https://www.cbc.ca" },
    ],
    sideQuests: [
      { id: "phoenix-read", title: "Read the AG Report", task: "Read the Auditor General's Phoenix report and note 3 key failures", xp: 25, icon: "read" },
      { id: "phoenix-share", title: "Share the Scandal", task: "Post the Phoenix pay system story on social media — $2.4B wasted", xp: 20, icon: "share" },
      { id: "phoenix-write", title: "Write Treasury Board", task: "Email the Treasury Board President demanding a replacement timeline", xp: 50, icon: "write" },
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
    description: "Canada continues fossil fuel subsidies while missing emission reduction targets.",
    whatYouNeedToKnow: "Canada hands $18.5 billion per year to fossil fuel companies while missing every climate target it sets. 230,000 Canadians were displaced by wildfires in 2024-25 alone. The subsidies continue.",
    humanCost: [
      "$18.5 billion in fossil fuel subsidies annually.",
      "Canada on track to miss 2030 Paris Agreement targets.",
      "Wildfires displaced 230,000+ Canadians in 2024-25.",
    ],
    humanCostLinks: [
      "https://thenarwhal.ca/oil-and-gas-subsidies-canada/",
      "https://thenarwhal.ca/build-canada-list-requests-carney/",
      "https://thenarwhal.ca/2025-federal-election-platforms/",
    ],
    progress: 25,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: false },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Fossil Fuel Subsidies", value: "$18.5B", description: "annual public subsidies to oil and gas companies while Canada misses every climate target", source: "IISD", sourceUrl: "https://www.iisd.org" },
      { label: "Emissions Gap", value: "-22%", description: "below the reduction needed to meet 2030 Paris Agreement commitments — falling further behind", source: "ECCC", sourceUrl: "https://www.canada.ca/en/environment-climate-change.html" },
      { label: "Wildfire Displaced", value: "230K+", description: "Canadians displaced by wildfires in 2024-25 — climate impacts accelerating faster than policy", source: "Red Cross", sourceUrl: "https://www.redcross.ca" },
    ],
    sideQuests: [
      { id: "climate-calculate", title: "Calculate Your Footprint", task: "Use an online calculator to measure your carbon footprint and find 3 ways to reduce it", xp: 20, icon: "calculate" },
      { id: "climate-attend", title: "Join a Climate Rally", task: "Attend a local Fridays for Future or climate rally in your city", xp: 50, icon: "attend" },
      { id: "climate-write", title: "Write Environment Minister", task: "Email the Environment Minister demanding fossil fuel subsidy phase-out", xp: 40, icon: "write" },
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
    description: "Online Harms Act (Bill C-63) advancing with implications for free expression.",
    whatYouNeedToKnow: "Bill C-63 could let the government regulate speech before it happens — 'pre-crime' censorship. There's no independent oversight body proposed. Digital privacy is eroding under expanded surveillance powers.",
    humanCost: [
      "Bill C-63 could enable pre-crime speech regulation.",
      "Digital privacy eroding under expanded surveillance powers.",
      "No independent oversight body proposed.",
    ],
    humanCostLinks: [
      "https://www.canadaland.com/podcast/134-is-carneys-bill-c-2-much-worse-than-trump/",
      "https://www.cbc.ca/news/politics/online-harms-bill-c63-1.7150427",
      "https://www.parl.ca/legisinfo",
    ],
    progress: 45,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Legislation", complete: false },
      { label: "Resolved", complete: false },
    ],
    stats: [
      { label: "Bill Status", value: "Committee", description: "Bill C-63 currently in committee stage — could enable government pre-crime speech regulation", source: "LEGISinfo", sourceUrl: "https://www.parl.ca/legisinfo" },
      { label: "Budget", value: "$210M", description: "proposed budget for the new Digital Safety Commission with broad censorship powers", source: "PBO", sourceUrl: "https://www.pbo-dpb.ca" },
      { label: "Public Comments", value: "12K+", description: "public submissions opposing key provisions — most expressing free expression concerns", source: "Parl Canada", sourceUrl: "https://www.parl.ca" },
    ],
    sideQuests: [
      { id: "digital-read", title: "Read Bill C-63", task: "Read the summary of Bill C-63 on LEGISinfo and note provisions that concern you", xp: 25, icon: "read" },
      { id: "digital-write", title: "Submit a Comment", task: "Submit a public comment to the Parliamentary committee on Bill C-63", xp: 50, icon: "write" },
      { id: "digital-share", title: "Raise Awareness", task: "Share a breakdown of Bill C-63 on social media explaining what it means", xp: 20, icon: "share" },
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
    description: "The ArriveCAN app ballooned from $80K to $59.5M with questionable subcontracting.",
    whatYouNeedToKnow: "A travel app budgeted at $80,000 ended up costing taxpayers $59.5 MILLION. 76 subcontractors, sole-source contracts, and an active RCMP criminal investigation. Nobody has been held accountable.",
    humanCost: [
      "Original budget: $80,000. Final cost: $59.5 million.",
      "Questionable sole-source contracts to GC Strategies.",
      "RCMP criminal investigation launched.",
    ],
    humanCostLinks: [
      "https://www.cbc.ca/news/politics/arrivecan-gc-strategies-banned-contracts-1.7555239",
      "https://www.cbc.ca/news/politics/auditor-general-audit-all-gc-strategies-contracts-1.7359418",
      "https://www.cbc.ca/news/politics/contractor-companies-sued-billing-practices-1.7457657",
    ],
    progress: 60,
    stages: [
      { label: "Awareness", complete: true },
      { label: "MP Pressure", complete: true },
      { label: "Investigation", complete: true },
      { label: "Accountability", complete: false },
    ],
    stats: [
      { label: "Cost Overrun", value: "$59.5M", description: "final cost of an app originally budgeted at $80K — a 74,000% cost overrun with no accountability", source: "AG Report", sourceUrl: "https://www.oag-bvg.gc.ca" },
      { label: "Subcontractors", value: "76", description: "subcontractors involved in a single app project — many with no clear deliverables or oversight", source: "OGGO", sourceUrl: "https://www.parl.ca" },
      { label: "RCMP Status", value: "Active", description: "RCMP criminal investigation still ongoing — but no charges filed despite Auditor General findings", source: "CBC", sourceUrl: "https://www.cbc.ca" },
    ],
    sideQuests: [
      { id: "arrivecan-read", title: "Read the AG Audit", task: "Read the Auditor General's ArriveCAN audit and list 3 red flags", xp: 25, icon: "read" },
      { id: "arrivecan-share", title: "Share the Numbers", task: "Post the $80K → $59.5M cost overrun story on social media", xp: 20, icon: "share" },
      { id: "arrivecan-write", title: "Demand Accountability", task: "Write your MP demanding criminal charges for those responsible", xp: 50, icon: "write" },
    ],
    links: [],
  },
];

// ============================
// INFLUENCE NETWORK — SPIDER WEB
// ============================

export type PersonDossier = {
  name: string;
  title: string;
  phone?: string;
  email?: string;
  assistant?: string;
  assistantEmail?: string;
  reportsTo?: string;
  website?: string;
  lobbyingActivity?: string;
  netWorth?: string;
  salary?: string;
  riding?: string;
  constituency?: string;
};

export type InfluenceNode = {
  id: string;
  type: "pmo" | "minister" | "corporation" | "lobbyist" | "bank" | "factory" | "intermediary" | "solution";
  label: string;
  role?: string;
  detail?: string;
  avatarInitials?: string;
  alertRed?: boolean;
  sourceUrl?: string;
  dossier?: PersonDossier;
  crisisLinks?: string[];
  location?: string;
  solutionType?: "petition" | "committee" | "senate" | "action";
};

export type InfluenceEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
  lobbyingFrequency?: string;
  grantAmount?: string;
};

export const influenceNodes: InfluenceNode[] = [
  // ===== TIER 0: EXECUTIVE =====
  {
    id: "pmo",
    type: "pmo",
    label: "Prime Minister's Office",
    role: "Executive Power Center",
    avatarInitials: "PMO",
    location: "Ottawa, Ontario",
    dossier: {
      name: "Prime Minister Mark Carney",
      title: "Prime Minister of Canada",
      phone: "613-992-4211",
      email: "pm@pm.gc.ca",
      assistant: "Katie Telford (Chief of Staff)",
      assistantEmail: "katie.telford@pmo-bpm.gc.ca",
      website: "https://pm.gc.ca",
      riding: "Ottawa Centre",
      constituency: "Ottawa, Ontario",
    },
  },
  {
    id: "treasury",
    type: "pmo",
    label: "Treasury Board",
    role: "Federal Spending Authority",
    avatarInitials: "TB",
    location: "Ottawa, Ontario",
    dossier: {
      name: "Treasury Board Secretariat",
      title: "Government Spending Oversight",
      phone: "613-957-2400",
      email: "questions@tbs-sct.gc.ca",
      website: "https://www.canada.ca/en/treasury-board-secretariat.html",
    },
  },

  // ===== TIER 1: MINISTERS =====
  {
    id: "anand",
    type: "minister",
    label: "Anita Anand",
    role: "Foreign Affairs",
    avatarInitials: "AA",
    location: "Oakville, Ontario",
    crisisLinks: ["Gaza Arms Exports"],
    dossier: {
      name: "Anita Anand",
      title: "Minister of Foreign Affairs",
      phone: "613-995-7749",
      email: "anita.anand@parl.gc.ca",
      assistant: "Parliamentary Assistant — TBD",
      reportsTo: "Prime Minister (PMO)",
      website: "https://www.ourcommons.ca/Members/en/anita-anand(105689)",
      lobbyingActivity: "Met with GDLS CEO Danny Deep 4x in Q4 2025. Met with Elbit reps 3x re: defence procurement.",
      riding: "Oakville",
      constituency: "Oakville, Ontario",
    },
  },
  {
    id: "hajdu",
    type: "minister",
    label: "Patty Hajdu",
    role: "Indigenous Services",
    avatarInitials: "PH",
    location: "Thunder Bay, Ontario",
    crisisLinks: ["Water Crisis"],
    dossier: {
      name: "Patty Hajdu",
      title: "Minister of Indigenous Services",
      phone: "613-996-4792",
      email: "patty.hajdu@parl.gc.ca",
      assistant: "Ministerial Office: 819-997-0002",
      reportsTo: "Prime Minister (PMO)",
      website: "https://www.ourcommons.ca/Members/en/patty-hajdu(72029)",
      lobbyingActivity: "Budget delays: $890M infrastructure grants pending for water systems.",
      riding: "Thunder Bay—Superior North",
      constituency: "Thunder Bay, Ontario",
    },
  },
  {
    id: "champagne",
    type: "minister",
    label: "François-Philippe Champagne",
    role: "Innovation & Industry",
    avatarInitials: "FC",
    location: "Saint-Maurice, Québec",
    crisisLinks: ["Food Crisis"],
    dossier: {
      name: "François-Philippe Champagne",
      title: "Minister of Innovation, Science & Economic Development",
      phone: "613-995-4895",
      email: "francois-philippe.champagne@parl.gc.ca",
      assistant: "Ministerial Office: 343-291-2700",
      reportsTo: "Prime Minister (PMO)",
      website: "https://www.ourcommons.ca/Members/en/francois-philippe-champagne(88633)",
      lobbyingActivity: "67 meetings with grocery lobbyists in 2025. Overseeing Grocery Code of Conduct delays.",
      riding: "Saint-Maurice—Champlain",
      constituency: "Saint-Maurice, Québec",
    },
  },
  {
    id: "freeland",
    type: "minister",
    label: "Chrystia Freeland",
    role: "Finance",
    avatarInitials: "CF",
    location: "Toronto, Ontario",
    crisisLinks: ["Wealth Tax Block"],
    dossier: {
      name: "Chrystia Freeland",
      title: "Minister of Finance",
      phone: "613-992-5234",
      email: "chrystia.freeland@parl.gc.ca",
      assistant: "Ministerial Office: 613-369-5696",
      reportsTo: "Prime Minister (PMO)",
      website: "https://www.ourcommons.ca/Members/en/chrystia-freeland(84665)",
      lobbyingActivity: "Controls federal budget allocations. Banking lobby met 34x re: wealth tax opposition.",
      riding: "University—Rosedale",
      constituency: "Toronto, Ontario",
    },
  },
  {
    id: "miller",
    type: "minister",
    label: "Marc Miller",
    role: "Immigration",
    avatarInitials: "MM",
    location: "Montréal, Québec",
    crisisLinks: ["Housing Crisis"],
    dossier: {
      name: "Marc Miller",
      title: "Minister of Immigration, Refugees and Citizenship",
      phone: "613-995-0121",
      email: "marc.miller@parl.gc.ca",
      assistant: "Ministerial Office: 613-954-1064",
      reportsTo: "Prime Minister (PMO)",
      website: "https://www.ourcommons.ca/Members/en/marc-miller(88660)",
      lobbyingActivity: "Linked to housing crisis — immigration targets vs housing supply gap.",
      riding: "Ville-Marie—Le Sud-Ouest—Île-des-Sœurs",
      constituency: "Montréal, Québec",
    },
  },
  {
    id: "leblanc",
    type: "minister",
    label: "Dominic LeBlanc",
    role: "Public Safety",
    avatarInitials: "DL",
    location: "Beauséjour, New Brunswick",
    dossier: {
      name: "Dominic LeBlanc",
      title: "Minister of Public Safety",
      phone: "613-992-1020",
      email: "dominic.leblanc@parl.gc.ca",
      assistant: "Ministerial Office: 613-991-2924",
      reportsTo: "Prime Minister (PMO)",
      website: "https://www.ourcommons.ca/Members/en/dominic-leblanc(2080)",
      lobbyingActivity: "Oversight of national security procurement and border agencies.",
      riding: "Beauséjour",
      constituency: "Beauséjour, New Brunswick",
    },
  },
  {
    id: "blair",
    type: "minister",
    label: "Bill Blair",
    role: "Defence",
    avatarInitials: "BB",
    location: "Scarborough, Ontario",
    crisisLinks: ["Gaza Arms Exports"],
    dossier: {
      name: "Bill Blair",
      title: "Minister of National Defence",
      phone: "613-995-0284",
      email: "bill.blair@parl.gc.ca",
      assistant: "Ministerial Office: 613-996-3100",
      reportsTo: "Prime Minister (PMO)",
      website: "https://www.ourcommons.ca/Members/en/bill-blair(88961)",
      lobbyingActivity: "Arms export oversight. Met with Irving Shipbuilding 6x in 2025 re: $80B shipbuilding contracts.",
      riding: "Scarborough Southwest",
      constituency: "Scarborough, Ontario",
    },
  },

  // ===== TIER 2: CORPORATIONS & BANKS =====
  {
    id: "gdls",
    type: "corporation",
    label: "General Dynamics / CCC",
    detail: "$30M Legacy Arms Permits",
    alertRed: true,
    location: "London, Ontario",
    dossier: {
      name: "Danny Deep",
      title: "CEO, General Dynamics Land Systems Canada",
      phone: "519-964-2251",
      email: "media@gdls.com",
      reportsTo: "Phebe Novakovic (CEO, General Dynamics Corp)",
      website: "https://www.gdls.com",
      lobbyingActivity: "42 communications filed in 2025-26. Met with Minister Anand 4x Q4 2025.",
      salary: "$1.2M base + performance bonuses",
    },
  },
  {
    id: "elbit",
    type: "corporation",
    label: "Elbit Systems",
    detail: "Defence electronics & UAVs",
    alertRed: true,
    location: "Kanata, Ontario",
    dossier: {
      name: "Bezhalel Machlis",
      title: "CEO, Elbit Systems Ltd",
      phone: "+972-4-831-5315",
      email: "info@elbitsystems.com",
      website: "https://elbitsystems.com",
      lobbyingActivity: "15 communications re: defence procurement via GCI Group.",
    },
  },
  {
    id: "water-backlog",
    type: "corporation",
    label: "Water Infrastructure Backlogs",
    detail: "28 LTDWAs Active · $890M delayed",
    alertRed: true,
    location: "Nationwide — Remote & Northern Communities",
  },
  {
    id: "loblaws",
    type: "corporation",
    label: "Loblaws / Weston",
    detail: "$1.2B profits · 30% market share",
    alertRed: false,
    location: "Brampton, Ontario",
    dossier: {
      name: "Per Bank",
      title: "President, Loblaw Companies Ltd",
      phone: "905-459-2500",
      email: "investor.relations@loblaw.ca",
      reportsTo: "Galen Weston Jr. (Chairman, George Weston Ltd)",
      website: "https://www.loblaw.ca",
      lobbyingActivity: "28 meetings with Ministry of Innovation via Counsel Public Affairs.",
      salary: "$5.8M total compensation (2025 proxy)",
      netWorth: "Galen Weston family net worth: $8.7B (Forbes 2025)",
    },
  },
  {
    id: "metro",
    type: "corporation",
    label: "Metro Inc.",
    detail: "$920M profits · 15% dividend hike",
    alertRed: false,
    location: "Montréal, Québec",
    dossier: {
      name: "Eric La Flèche",
      title: "President & CEO, Metro Inc.",
      phone: "514-643-1000",
      email: "investor.relations@metro.ca",
      reportsTo: "Board of Directors",
      website: "https://www.metro.ca",
      lobbyingActivity: "12 meetings with Innovation Ministry via Fleishman-Hillard.",
      salary: "$6.1M total compensation (2025 proxy)",
    },
  },
  {
    id: "empire",
    type: "corporation",
    label: "Empire / Sobeys",
    detail: "$780M profits · Sobeys chain",
    alertRed: false,
    location: "Stellarton, Nova Scotia",
    dossier: {
      name: "Michael Medline",
      title: "President & CEO, Empire Company Ltd",
      phone: "902-752-8371",
      email: "investor.relations@empireco.ca",
      reportsTo: "Board of Directors",
      website: "https://www.empireco.ca",
      lobbyingActivity: "8 meetings with Competition Bureau re: supplier terms.",
      salary: "$5.2M total compensation (2025 proxy)",
    },
  },
  {
    id: "snc",
    type: "corporation",
    label: "SNC-Lavalin / AtkinsRéalis",
    detail: "$7.4B revenue · Infrastructure",
    alertRed: false,
    location: "Montréal, Québec",
    dossier: {
      name: "Ian Edwards",
      title: "President & CEO, AtkinsRéalis",
      phone: "514-393-1000",
      email: "info@atkinsrealis.com",
      reportsTo: "Board of Directors",
      website: "https://www.atkinsrealis.com",
      lobbyingActivity: "22 communications with PSPC and DND in 2025. Federal contracts worth $2.1B.",
      salary: "$8.3M total compensation",
    },
  },
  {
    id: "irving",
    type: "corporation",
    label: "Irving Shipbuilding",
    detail: "$80B shipbuilding contracts",
    alertRed: false,
    location: "Halifax, Nova Scotia",
    dossier: {
      name: "Kevin McCoy",
      title: "President, Irving Shipbuilding",
      phone: "902-423-9271",
      email: "info@irvingshipbuilding.com",
      reportsTo: "James Irving (CEO, J.D. Irving Ltd)",
      website: "https://www.irvingshipbuilding.com",
      lobbyingActivity: "Met with Defence Minister Blair 6x in 2025. $80B National Shipbuilding Strategy.",
    },
  },
  {
    id: "td-bank",
    type: "bank",
    label: "TD Bank",
    detail: "Revenue: $10.4B",
    location: "Toronto, Ontario",
    dossier: {
      name: "Bharat Masrani",
      title: "Group President & CEO, TD Bank Group",
      phone: "416-982-8222",
      email: "td.investor.relations@td.com",
      reportsTo: "Board of Directors",
      website: "https://www.td.com",
      salary: "$15.2M total compensation",
      lobbyingActivity: "Lobbying against wealth tax provisions via CBA.",
    },
  },
  {
    id: "rbc",
    type: "bank",
    label: "RBC",
    detail: "Revenue: $12.1B",
    location: "Toronto, Ontario",
    dossier: {
      name: "Dave McKay",
      title: "President & CEO, Royal Bank of Canada",
      phone: "416-974-5151",
      email: "investor.relations@rbc.com",
      reportsTo: "Board of Directors",
      website: "https://www.rbc.com",
      salary: "$16.8M total compensation",
      lobbyingActivity: "Active lobbying on capital gains and wealth tax legislation.",
    },
  },
  {
    id: "cibc",
    type: "bank",
    label: "CIBC",
    detail: "Revenue: $6.2B",
    location: "Toronto, Ontario",
    dossier: {
      name: "Victor Dodig",
      title: "President & CEO, CIBC",
      phone: "416-980-2211",
      email: "investor.relations@cibc.com",
      reportsTo: "Board of Directors",
      website: "https://www.cibc.com",
      salary: "$10.1M total compensation",
      lobbyingActivity: "Active member of CBA opposing wealth tax. 8 communications with Finance.",
    },
  },
  {
    id: "bmo",
    type: "bank",
    label: "BMO",
    detail: "Revenue: $7.8B",
    location: "Montréal, Québec",
    dossier: {
      name: "Darryl White",
      title: "CEO, BMO Financial Group",
      phone: "416-867-6785",
      email: "investor.relations@bmo.com",
      reportsTo: "Board of Directors",
      website: "https://www.bmo.com",
      salary: "$12.4M total compensation",
      lobbyingActivity: "12 meetings with Finance Ministry re: capital gains taxation.",
    },
  },

  // ===== TIER 3: LOBBYISTS =====
  {
    id: "lob-gdls",
    type: "lobbyist",
    label: "Hill+Knowlton Strategies",
    detail: "Lobbying for GDLS — 42 comms",
    location: "Ottawa, Ontario",
    dossier: {
      name: "Hill+Knowlton Strategies",
      title: "Government Relations Firm",
      phone: "613-786-9930",
      email: "ottawa@hillandknowlton.ca",
      website: "https://hillandknowlton.ca",
      lobbyingActivity: "42 communications with Global Affairs and DND in 2025-26.",
    },
  },
  {
    id: "lob-elbit",
    type: "lobbyist",
    label: "GCI Group",
    detail: "Lobbying for Elbit — 15 comms",
    location: "Ottawa, Ontario",
    dossier: {
      name: "GCI Group",
      title: "Public Affairs & Communications",
      lobbyingActivity: "15 communications re: defence procurement contracts.",
    },
  },
  {
    id: "lob-loblaws",
    type: "lobbyist",
    label: "Counsel Public Affairs",
    detail: "Lobbying for Loblaws — 28 meetings",
    location: "Ottawa, Ontario",
    dossier: {
      name: "Counsel Public Affairs",
      title: "Government Relations & Advocacy",
      phone: "613-235-8444",
      email: "info@counselpa.com",
      website: "https://counselpa.com",
      lobbyingActivity: "28 meetings with Ministry of Innovation on Grocery Code of Conduct.",
    },
  },
  {
    id: "lob-banks",
    type: "lobbyist",
    label: "Canadian Bankers Association",
    detail: "Lobbying against Wealth Tax",
    location: "Toronto, Ontario",
    dossier: {
      name: "Canadian Bankers Association",
      title: "Industry Association",
      phone: "416-362-6092",
      email: "info@cba.ca",
      website: "https://cba.ca",
      lobbyingActivity: "34 meetings with Finance Ministry opposing Petition e-6806 provisions.",
    },
  },
  {
    id: "lob-mcmillan",
    type: "lobbyist",
    label: "McMillan Vantage",
    detail: "Banking lobby — 18 comms",
    location: "Ottawa, Ontario",
    dossier: {
      name: "McMillan Vantage",
      title: "Government Relations & Public Policy",
      phone: "613-232-1781",
      email: "info@mcmillanvantage.com",
      website: "https://mcmillanvantage.com",
      lobbyingActivity: "18 communications with Finance and Treasury Board on banking regulation.",
    },
  },
  {
    id: "lob-fleishman",
    type: "lobbyist",
    label: "Fleishman-Hillard",
    detail: "Grocery lobby — 12 meetings",
    location: "Toronto, Ontario",
    dossier: {
      name: "Fleishman-Hillard",
      title: "Global Communications & Public Affairs",
      phone: "416-214-0701",
      email: "toronto@fleishman.ca",
      website: "https://fleishmanhillard.com",
      lobbyingActivity: "12 meetings with Innovation Ministry on behalf of Metro Inc.",
    },
  },
  {
    id: "lob-prospectus",
    type: "lobbyist",
    label: "Prospectus Associates",
    detail: "Defence lobby — 20 comms",
    location: "Ottawa, Ontario",
    dossier: {
      name: "Prospectus Associates",
      title: "Government Relations — Defence & Aerospace",
      phone: "613-231-2727",
      email: "info@prospectus.ca",
      website: "https://prospectus.ca",
      lobbyingActivity: "20 communications with DND and PSPC on behalf of Irving Shipbuilding.",
    },
  },
  {
    id: "lob-earnscliffe",
    type: "lobbyist",
    label: "Earnscliffe Strategies",
    detail: "Cross-sector — 25 comms",
    location: "Ottawa, Ontario",
    dossier: {
      name: "Earnscliffe Strategies",
      title: "Government Relations & Strategic Communications",
      phone: "613-233-8080",
      email: "info@earnscliffe.ca",
      website: "https://earnscliffe.ca",
      lobbyingActivity: "25 communications across Finance, Innovation, and DND. Clients include SNC-Lavalin.",
    },
  },

  // ===== TIER 4: FACTORIES & INTERMEDIARIES =====
  {
    id: "gdls-factory",
    type: "factory",
    label: "GDLS London Plant",
    detail: "LAV turrets · artillery propellant · 2,500 employees",
    location: "1 General Dynamics Blvd, London, Ontario",
    alertRed: true,
    dossier: {
      name: "GDLS London Manufacturing Facility",
      title: "Primary Canadian Arms Manufacturing Site",
      phone: "519-964-2251",
      website: "https://www.gdls.com",
      lobbyingActivity: "Produces Light Armoured Vehicles (LAVs), turret components, and artillery propellant. 2,500 employees. Products exported via CCC to US, then re-exported to conflict zones.",
    },
  },
  {
    id: "elbit-factory",
    type: "factory",
    label: "Elbit Kanata Facility",
    detail: "UAV systems · defence electronics",
    location: "340 Legget Dr, Kanata, Ontario",
    alertRed: true,
    dossier: {
      name: "Elbit Systems of Canada",
      title: "Defence Electronics & UAV Systems",
      phone: "613-599-5000",
      website: "https://elbitsystems.com",
      lobbyingActivity: "Produces unmanned aerial vehicle (UAV) systems, electro-optic sensors, and electronic warfare systems. Components integrated into weapons platforms used in conflict zones.",
    },
  },
  {
    id: "ccc",
    type: "intermediary",
    label: "Canadian Commercial Corp",
    detail: "Crown Corp · Govt-to-Govt exports",
    location: "Ottawa, Ontario",
    dossier: {
      name: "Canadian Commercial Corporation",
      title: "Crown Corporation — Defence Export Intermediary",
      phone: "613-996-0034",
      email: "info@ccc.ca",
      website: "https://www.ccc.ca",
      lobbyingActivity: "Facilitates government-to-government sales of Canadian military goods. Key intermediary allowing GDLS and Elbit to export via 'government channel' — bypassing direct commercial export scrutiny.",
    },
  },
  {
    id: "gac-export",
    type: "intermediary",
    label: "Global Affairs — Export Controls",
    detail: "Permit processing division",
    location: "Ottawa, Ontario",
    dossier: {
      name: "Export Controls Division, Global Affairs Canada",
      title: "Processes Military Export Permits under EIPA",
      phone: "343-203-4331",
      email: "exportcontrols@international.gc.ca",
      website: "https://www.international.gc.ca",
      lobbyingActivity: "Processes export permit applications under the Export and Import Permits Act. Minister Anand has final sign-off authority. 12 legacy permits remain active despite 'pause'.",
    },
  },
  {
    id: "us-dod",
    type: "intermediary",
    label: "US Dept of Defense",
    detail: "Re-integrates Canadian components",
    location: "Arlington, Virginia, USA",
    alertRed: true,
    dossier: {
      name: "United States Department of Defense",
      title: "The 'American Loophole' Endpoint",
      website: "https://www.defense.gov",
      lobbyingActivity: "Receives Canadian-made military components (LAV turrets, electronics, propellant). Integrates into US weapons systems. Re-exports completed systems — Canada has NO tracking mechanism after US transfer.",
    },
  },
  {
    id: "conflict-zone",
    type: "intermediary",
    label: "CONFLICT ZONE",
    detail: "438 documented shipments · $18.9M",
    location: "Gaza, West Bank, Yemen",
    alertRed: true,
    dossier: {
      name: "End-Use: Active Conflict Zones",
      title: "Where Canadian Arms End Up",
      lobbyingActivity: "Project Ploughshares documented 438+ shipments to conflict zones in 2025-26. Canadian-made LAV components, artillery propellant, and electronic warfare systems deployed. The EIPA has NO mechanism to track end-use after US transfer.",
    },
  },

  // ===== TIER 5: SOLUTION PATHWAY =====
  {
    id: "sol-petition",
    type: "solution",
    label: "📋 E-PETITION",
    detail: "500 signatures → tabled in Parliament",
    solutionType: "petition",
    dossier: {
      name: "House of Commons E-Petition System",
      title: "Your First Legal Tool",
      website: "https://petitions.ourcommons.ca",
      lobbyingActivity: "ANY Canadian citizen or resident can create/sign an e-petition. At 500 signatures it MUST be tabled in the House of Commons. The government MUST respond within 120 days. At 2,500+ signatures, it triggers Standing Committee review.",
    },
  },
  {
    id: "sol-committee",
    type: "solution",
    label: "🏛️ STANDING COMMITTEE",
    detail: "Foreign Affairs & Int'l Development",
    solutionType: "committee",
    dossier: {
      name: "Standing Committee on Foreign Affairs (FAAE)",
      title: "Parliamentary Oversight Body",
      phone: "613-996-1540",
      website: "https://www.ourcommons.ca/Committees/en/FAAE",
      lobbyingActivity: "The FAAE committee can subpoena witnesses, demand documents, and issue binding recommendations. They can call Minister Anand, GDLS CEO Danny Deep, and CCC officials to testify. Committee reports require government response.",
    },
  },
  {
    id: "sol-house",
    type: "solution",
    label: "🏛️ HOUSE OF COMMONS",
    detail: "338 MPs · 3 readings required",
    solutionType: "committee",
    dossier: {
      name: "House of Commons — Bill Process",
      title: "Where Laws Are Made",
      phone: "613-992-4793",
      website: "https://www.ourcommons.ca",
      lobbyingActivity: "A Private Member's Bill or Government Bill to revoke legacy permits must pass 3 readings. Your MP can introduce a bill. The NDP and Bloc have supported arms export restrictions. Contact YOUR MP to demand action.",
    },
  },
  {
    id: "sol-senate",
    type: "solution",
    label: "🏛️ SENATE",
    detail: "105 Senators · Final review",
    solutionType: "senate",
    dossier: {
      name: "Senate of Canada",
      title: "Chamber of Sober Second Thought",
      phone: "613-992-1149",
      website: "https://sencanada.ca",
      lobbyingActivity: "After House passage, the Senate reviews and votes. Several Independent senators have spoken against arms exports. Senator Marilou McPhedran has been vocal on human rights and arms control.",
    },
  },
  {
    id: "sol-revoke",
    type: "solution",
    label: "✅ REVOKE ALL PERMITS",
    detail: "Royal Assent → Crisis Ends",
    solutionType: "action",
    dossier: {
      name: "The Goal: Revoke All Legacy Permits",
      title: "End Canadian Complicity in the Humanitarian Crisis",
      lobbyingActivity: "With Royal Assent, ALL 12 legacy permits are revoked. GDLS and Elbit can no longer export military goods through the American Loophole. The EIPA is amended to include end-use tracking. Canada complies with the Arms Trade Treaty. THE CRISIS CAN BE STOPPED.",
    },
  },
];

export const influenceEdges: InfluenceEdge[] = [
  // PMO → Ministers
  { id: "e-pmo-anand", source: "pmo", target: "anand", label: "Directs Foreign Policy", lobbyingFrequency: "Daily briefings on export policy" },
  { id: "e-pmo-hajdu", source: "pmo", target: "hajdu", label: "Directs Indigenous Policy", lobbyingFrequency: "Water crisis updates weekly" },
  { id: "e-pmo-champagne", source: "pmo", target: "champagne", label: "Directs Innovation", lobbyingFrequency: "Grocery Code delays reported to PMO" },
  { id: "e-pmo-freeland", source: "pmo", target: "freeland", label: "Directs Budget", lobbyingFrequency: "Weekly fiscal briefings" },
  { id: "e-pmo-miller", source: "pmo", target: "miller", label: "Directs Immigration", lobbyingFrequency: "Housing-immigration policy coordination" },
  { id: "e-pmo-leblanc", source: "pmo", target: "leblanc", label: "Directs Public Safety", lobbyingFrequency: "National security briefings" },
  { id: "e-pmo-blair", source: "pmo", target: "blair", label: "Directs Defence", lobbyingFrequency: "Arms export oversight briefings" },
  { id: "e-treasury-pmo", source: "treasury", target: "pmo", label: "Budget Authority" },
  { id: "e-treasury-freeland", source: "treasury", target: "freeland", label: "Fiscal Policy", lobbyingFrequency: "Budget allocation coordination" },

  // Ministers → Corporations
  { id: "e-anand-gdls", source: "anand", target: "gdls", label: "Export Permits", lobbyingFrequency: "CEO Danny Deep met with Minister 4x Q4 2025", grantAmount: "$30M" },
  { id: "e-anand-elbit", source: "anand", target: "elbit", label: "Legacy Permits", lobbyingFrequency: "3 meetings in Q4 2025 re: defence procurement" },
  { id: "e-hajdu-water", source: "hajdu", target: "water-backlog", label: "Administers", lobbyingFrequency: "Budget delays: $890M grants pending", grantAmount: "$890M" },
  { id: "e-champagne-loblaws", source: "champagne", target: "loblaws", label: "Competition Review", lobbyingFrequency: "Per Bank met with Minister 4x Q4", grantAmount: "$1.2B profits" },
  { id: "e-champagne-metro", source: "champagne", target: "metro", label: "Grocery Code", lobbyingFrequency: "12 meetings via Fleishman-Hillard", grantAmount: "$920M profits" },
  { id: "e-champagne-empire", source: "champagne", target: "empire", label: "Grocery Code", lobbyingFrequency: "8 meetings with Competition Bureau", grantAmount: "$780M profits" },
  { id: "e-champagne-snc", source: "champagne", target: "snc", label: "SIF Grants", lobbyingFrequency: "22 comms with PSPC and DND", grantAmount: "$2.1B contracts" },
  { id: "e-blair-irving", source: "blair", target: "irving", label: "Shipbuilding", lobbyingFrequency: "Met with Irving 6x in 2025", grantAmount: "$80B contracts" },
  { id: "e-blair-gdls", source: "blair", target: "gdls", label: "Defence Procurement", lobbyingFrequency: "LAV production oversight" },
  { id: "e-freeland-td", source: "freeland", target: "td-bank", label: "Revenue Target", lobbyingFrequency: "Banking lobby active on wealth tax", grantAmount: "$10.4B" },
  { id: "e-freeland-rbc", source: "freeland", target: "rbc", label: "Revenue Target", lobbyingFrequency: "34 meetings opposing e-6806", grantAmount: "$12.1B" },
  { id: "e-freeland-cibc", source: "freeland", target: "cibc", label: "Revenue Target", lobbyingFrequency: "8 comms with Finance", grantAmount: "$6.2B" },
  { id: "e-freeland-bmo", source: "freeland", target: "bmo", label: "Revenue Target", lobbyingFrequency: "12 meetings re: capital gains", grantAmount: "$7.8B" },

  // Corporations → Lobbyists
  { id: "e-gdls-lob", source: "gdls", target: "lob-gdls", label: "Retains", lobbyingFrequency: "42 communications filed in 2025-26" },
  { id: "e-elbit-lob", source: "elbit", target: "lob-elbit", label: "Retains", lobbyingFrequency: "15 communications re: defence procurement" },
  { id: "e-loblaws-lob", source: "loblaws", target: "lob-loblaws", label: "Retains", lobbyingFrequency: "28 meetings with Ministry of Innovation" },
  { id: "e-metro-lob", source: "metro", target: "lob-fleishman", label: "Retains", lobbyingFrequency: "12 meetings with Innovation Ministry" },
  { id: "e-td-lob", source: "td-bank", target: "lob-banks", label: "Member", lobbyingFrequency: "Active lobbying against wealth tax" },
  { id: "e-rbc-lob", source: "rbc", target: "lob-banks", label: "Member", lobbyingFrequency: "34 meetings opposing Petition e-6806" },
  { id: "e-cibc-lob", source: "cibc", target: "lob-mcmillan", label: "Retains", lobbyingFrequency: "18 comms with Finance and Treasury" },
  { id: "e-bmo-lob", source: "bmo", target: "lob-mcmillan", label: "Retains", lobbyingFrequency: "Banking regulation lobbying" },
  { id: "e-irving-lob", source: "irving", target: "lob-prospectus", label: "Retains", lobbyingFrequency: "20 comms with DND and PSPC" },
  { id: "e-snc-lob", source: "snc", target: "lob-earnscliffe", label: "Retains", lobbyingFrequency: "25 comms across Finance, Innovation, DND" },

  // Lobbyist → Minister (Influence flowing UP)
  { id: "e-lob-gdls-anand", source: "lob-gdls", target: "anand", label: "42 Comms → Foreign Affairs", lobbyingFrequency: "Hill+Knowlton lobbying for GDLS arms exports" },
  { id: "e-lob-gdls-blair", source: "lob-gdls", target: "blair", label: "42 Comms → Defence", lobbyingFrequency: "Hill+Knowlton lobbying for defence procurement" },
  { id: "e-lob-elbit-anand", source: "lob-elbit", target: "anand", label: "15 Comms → Foreign Affairs", lobbyingFrequency: "GCI Group lobbying for Elbit defence contracts" },
  { id: "e-lob-loblaws-champ", source: "lob-loblaws", target: "champagne", label: "28 Meetings → Innovation", lobbyingFrequency: "Counsel PA blocking Grocery Code" },
  { id: "e-lob-fleish-champ", source: "lob-fleishman", target: "champagne", label: "12 Meetings → Innovation", lobbyingFrequency: "Fleishman-Hillard grocery lobbying" },
  { id: "e-lob-banks-freeland", source: "lob-banks", target: "freeland", label: "34 Meetings → Finance", lobbyingFrequency: "CBA opposing wealth tax provisions" },
  { id: "e-lob-mcm-freeland", source: "lob-mcmillan", target: "freeland", label: "18 Comms → Finance", lobbyingFrequency: "McMillan Vantage banking regulation lobbying" },
  { id: "e-lob-prosp-blair", source: "lob-prospectus", target: "blair", label: "20 Comms → Defence", lobbyingFrequency: "Prospectus Associates for Irving" },
  { id: "e-lob-earn-champ", source: "lob-earnscliffe", target: "champagne", label: "25 Comms → Innovation", lobbyingFrequency: "Earnscliffe cross-sector lobbying" },

  // ===== ARMS PIPELINE: Factories & Intermediaries =====
  // GDLS Factory → CCC → US DoD → Conflict Zone
  { id: "e-gdls-factory", source: "gdls", target: "gdls-factory", label: "Produces LAVs", lobbyingFrequency: "2,500 employees. LAV turrets, artillery propellant, armoured vehicles" },
  { id: "e-elbit-factory", source: "elbit", target: "elbit-factory", label: "Produces UAV Tech", lobbyingFrequency: "Defence electronics, drone systems, surveillance tech" },
  { id: "e-gdls-ccc", source: "gdls", target: "ccc", label: "Govt-to-Govt Export", lobbyingFrequency: "CCC facilitates government-to-government sales bypassing direct oversight", grantAmount: "$30M" },
  { id: "e-elbit-ccc", source: "elbit", target: "ccc", label: "Export Channel", lobbyingFrequency: "Defence procurement via Crown corporation" },
  { id: "e-anand-ccc", source: "anand", target: "ccc", label: "Issues Permits", lobbyingFrequency: "Foreign Affairs authorizes export permits through CCC", grantAmount: "12 Active Permits" },
  { id: "e-ccc-usdod", source: "ccc", target: "us-dod", label: "Ships to US", lobbyingFrequency: "The 'American Loophole' — components shipped to US, then re-exported", grantAmount: "$18.9M" },
  { id: "e-usdod-conflict", source: "us-dod", target: "conflict-zone", label: "Re-Exports to Conflict", lobbyingFrequency: "438 shipments documented by Project Ploughshares. No Canadian end-use tracking.", grantAmount: "438 Shipments" },
  { id: "e-blair-ccc", source: "blair", target: "ccc", label: "Defence Oversight", lobbyingFrequency: "Minister of Defence oversees military procurement and CCC operations" },
  { id: "e-gac-ccc", source: "gac-export", target: "ccc", label: "Processes Permits", lobbyingFrequency: "Export Controls Division processes applications, Minister signs off" },
  { id: "e-anand-gac", source: "anand", target: "gac-export", label: "Directs Division", lobbyingFrequency: "Minister Anand oversees Global Affairs export controls" },

  // ===== SOLUTION PATHWAY =====
  { id: "e-solution-petition", source: "conflict-zone", target: "sol-petition", label: "YOU CAN STOP THIS", lobbyingFrequency: "Citizens have legal tools to force Parliamentary action" },
  { id: "e-petition-committee", source: "sol-petition", target: "sol-committee", label: "2,500+ Signatures", lobbyingFrequency: "E-petitions with 500+ signatures get tabled. Standing Committee review at 2,500+" },
  { id: "e-committee-house", source: "sol-committee", target: "sol-house", label: "Committee Report", lobbyingFrequency: "Standing Committee on Foreign Affairs must respond within 120 days" },
  { id: "e-house-senate", source: "sol-house", target: "sol-senate", label: "Bill Passage", lobbyingFrequency: "Must pass 3 readings in House of Commons, then Senate" },
  { id: "e-senate-revoke", source: "sol-senate", target: "sol-revoke", label: "Royal Assent", lobbyingFrequency: "Law enacted → all legacy permits revoked → arms exports halted" },
];

// ============================
// TRUTH VAULT / DOSSIERS
// ============================

export type DossierEntry = {
  id: string;
  term: string;
  category: "terminology" | "organization" | "person" | "special";
  definition: string;
  details?: string;
  sourceUrl?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
    assistant?: string;
    reportsTo?: string;
  };
};

export const dossierEntries: DossierEntry[] = [
  // TERMINOLOGY
  { id: "legacy-permit", term: "Legacy Permit", category: "terminology", definition: "An export permit approved before a policy change takes effect. Allows shipments to continue under old rules.", details: "Key loophole in the EIPA. Canada's 'pause' on arms exports to Israel did not revoke existing legacy permits, allowing $18.9M in continued shipments." },
  { id: "oic", term: "Order-in-Council", category: "terminology", definition: "A legal instrument made by the Governor in Council (Cabinet). Used to enact regulations without full Parliamentary debate.", details: "Often used for arms export decisions. Critics argue it bypasses democratic oversight." },
  { id: "ltdwa", term: "Long-Term Drinking Water Advisory (LTDWA)", category: "terminology", definition: "A drinking water advisory in place for more than one year. Indicates systemic failure in water infrastructure.", details: "As of Feb 2026, 28 LTDWAs remain active across 34 First Nations communities. Seine River First Nation added Feb 10, 2026." },
  { id: "eipa", term: "Export and Import Permits Act (EIPA)", category: "terminology", definition: "Federal legislation controlling the export and import of military goods and technology." },
  { id: "sif", term: "Strategic Innovation Fund (SIF)", category: "terminology", definition: "A $7.2B federal fund to support business innovation. Criticized for grants to defence companies.", details: "$18.9M to General Dynamics, $4.2M to Elbit Systems." },
  { id: "lobbying-registry", term: "Lobbying Registry", category: "terminology", definition: "Federal registry maintained by the Commissioner of Lobbying. All paid lobbying must be registered and disclosed.", sourceUrl: "https://lobbycanada.gc.ca" },
  { id: "jordans-principle", term: "Jordan's Principle", category: "terminology", definition: "A child-first principle ensuring First Nations children receive services without jurisdictional delays.", details: "Named after Jordan River Anderson who died waiting for governments to decide who would pay for his home care. Despite the principle, water infrastructure remains critically underfunded." },
  { id: "grocery-code", term: "Grocery Code of Conduct", category: "terminology", definition: "Voluntary code governing relationships between grocery retailers and suppliers. Delayed 3 times since 2023.", details: "Loblaws initially refused to sign. The code has no enforcement mechanism. Industry lobbying has weakened every draft." },

  // PEOPLE DOSSIERS
  {
    id: "per-bank",
    term: "Per Bank",
    category: "person",
    definition: "President of Loblaw Companies Ltd. Oversees Canada's largest grocery retailer (30% market share).",
    details: "Under Per Bank, Loblaws reported $1.2B net earnings in 2025 while food insecurity hit 25.5%. Total compensation: $5.8M. Met with Minister Champagne's office 4 times in Q4 2025 via Counsel Public Affairs.",
    sourceUrl: "https://www.loblaw.ca",
    contactInfo: {
      phone: "905-459-2500",
      email: "investor.relations@loblaw.ca",
      website: "https://www.loblaw.ca",
      reportsTo: "Galen Weston Jr. (Chairman, George Weston Ltd)",
    },
  },
  {
    id: "galen-weston",
    term: "Galen Weston Jr.",
    category: "person",
    definition: "Executive Chairman of George Weston Ltd and Loblaw Companies. Billionaire heir controlling 30% of Canadian grocery market.",
    details: "Family net worth: $8.7B (Forbes 2025). Controls Loblaw, Shoppers Drug Mart, President's Choice, No Frills, T&T Supermarket. Under scrutiny for bread price-fixing scandal ($500M settlement).",
    contactInfo: {
      phone: "416-922-2500",
      email: "investor.relations@weston.ca",
      website: "https://www.weston.ca",
      reportsTo: "Board of Directors, George Weston Ltd",
    },
  },
  {
    id: "danny-deep",
    term: "Danny Deep",
    category: "person",
    definition: "CEO of General Dynamics Land Systems Canada. Oversees LAV production and military exports from London, Ontario plant.",
    details: "Met with Minister Anand 4 times in Q4 2025. GDLS received $18.9M in SIF grants while exporting military goods via legacy permits. Retained Hill+Knowlton Strategies for government relations (42 communications filed).",
    sourceUrl: "https://www.gdls.com",
    contactInfo: {
      phone: "519-964-2251",
      email: "media@gdls.com",
      website: "https://www.gdls.com",
      reportsTo: "Phebe Novakovic (CEO, General Dynamics Corporation)",
    },
  },
  {
    id: "anita-anand",
    term: "Anita Anand",
    category: "person",
    definition: "Minister of Foreign Affairs. Responsible for export permits including military goods under the EIPA.",
    details: "Authorized continuation of legacy permits despite announced 'pause'. Met with GDLS CEO 4x and Elbit reps 3x in Q4 2025. Previously served as Minister of National Defence and President of the Treasury Board.",
    sourceUrl: "https://www.ourcommons.ca/Members/en/anita-anand(105689)",
    contactInfo: {
      phone: "613-995-7749",
      email: "anita.anand@parl.gc.ca",
      website: "https://www.ourcommons.ca/Members/en/anita-anand(105689)",
      reportsTo: "Prime Minister (PMO)",
    },
  },
  {
    id: "patty-hajdu",
    term: "Patty Hajdu",
    category: "person",
    definition: "Minister of Indigenous Services. Responsible for water infrastructure and Jordan's Principle implementation.",
    details: "Overseeing 28 active LTDWAs. $890M in Budget 2024/25 water infrastructure grants remain undisbursed. Seine River LTDWA added under her watch Feb 2026.",
    sourceUrl: "https://www.ourcommons.ca/Members/en/patty-hajdu(72029)",
    contactInfo: {
      phone: "613-996-4792",
      email: "patty.hajdu@parl.gc.ca",
      assistant: "Ministerial Office: 819-997-0002",
      website: "https://www.ourcommons.ca/Members/en/patty-hajdu(72029)",
      reportsTo: "Prime Minister (PMO)",
    },
  },
  {
    id: "champagne-dossier",
    term: "François-Philippe Champagne",
    category: "person",
    definition: "Minister of Innovation, Science & Economic Development. Oversees Competition Bureau and Grocery Code of Conduct.",
    details: "67 lobbying meetings with grocery industry in 2025. Grocery Code of Conduct delayed 3 times under his oversight. Also administers Strategic Innovation Fund grants to defence companies.",
    sourceUrl: "https://www.ourcommons.ca/Members/en/francois-philippe-champagne(88633)",
    contactInfo: {
      phone: "613-995-4895",
      email: "francois-philippe.champagne@parl.gc.ca",
      assistant: "Ministerial Office: 343-291-2700",
      website: "https://www.ourcommons.ca/Members/en/francois-philippe-champagne(88633)",
      reportsTo: "Prime Minister (PMO)",
    },
  },

  // ORGANIZATIONS
  { id: "ploughshares", term: "Project Ploughshares", category: "organization", definition: "Canada's leading peace research institute, based at University of Waterloo.", details: "Primary researcher exposing the 'American Loophole' — Canadian military goods exported to the US, then re-exported to conflict zones. 2025/26 report documented 438+ shipments.", sourceUrl: "https://ploughshares.ca", contactInfo: { phone: "519-888-6541", email: "plough@ploughshares.ca", website: "https://ploughshares.ca" } },
  { id: "competition-bureau", term: "Competition Bureau of Canada", category: "organization", definition: "Independent law enforcement agency for competitive marketplace. Currently reviewing grocery sector consolidation.", contactInfo: { phone: "819-997-4282", email: "compbureau@cb-bc.gc.ca", website: "https://www.competitionbureau.gc.ca" } },
  { id: "lobbyist-commissioner", term: "Office of the Commissioner of Lobbying", category: "organization", definition: "Federal body maintaining the Registry of Lobbyists. All paid lobbying activity must be disclosed.", sourceUrl: "https://lobbycanada.gc.ca", contactInfo: { phone: "613-957-2760", website: "https://lobbycanada.gc.ca" } },
  { id: "ccc", term: "Canadian Commercial Corporation (CCC)", category: "organization", definition: "Crown corporation facilitating government-to-government defence exports. Key intermediary for GDLS exports.", contactInfo: { phone: "613-996-0034", email: "info@ccc.ca", website: "https://www.ccc.ca" } },

  // SPECIAL
  { id: "human-machine", term: "The Human & The Machine", category: "special", definition: "How this platform was built: A Canadian citizen and AI bypassed corporate bureaucracy to map government accountability data in February 2026.", details: "Cross-referencing open government data, lobbying registries, military export reports, and ISC records — work that would normally require months of ATIP requests. Built in days, not years." },
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
  lat: number;
  lng: number;
  organizer: string;
  organizerEmail: string;
  source: string;
  sourceUrl: string;
  verified: boolean;
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "PSAC Rally Against Job Cuts",
    date: "2026-03-08",
    time: "12:00 PM",
    location: "Parliament Hill, Ottawa",
    type: "rally",
    missionId: "phoenix",
    attendees: 5000,
    xpReward: 200,
    lat: 45.4236,
    lng: -75.7009,
    organizer: "Public Service Alliance of Canada",
    organizerEmail: "info@psac-afpc.com",
    source: "PSAC / Ottawa Citizen",
    sourceUrl: "https://psacunion.ca",
    verified: true,
  },
  {
    id: "2",
    title: "March to Ottawa — Gaza Solidarity",
    date: "2026-03-15",
    time: "10:00 AM",
    location: "Parliament Hill, Ottawa",
    type: "protest",
    missionId: "gaza",
    attendees: 8000,
    xpReward: 200,
    lat: 45.4246,
    lng: -75.6999,
    organizer: "March to Ottawa Coalition",
    organizerEmail: "info@marchtoottawa.com",
    source: "marchtoottawa.com",
    sourceUrl: "https://www.marchtoottawa.com",
    verified: true,
  },
  {
    id: "3",
    title: "Healthcare Lobby Day — Parliament Hill",
    date: "2026-03-18",
    time: "9:00 AM",
    location: "Parliament Hill, Ottawa",
    type: "townhall",
    missionId: "healthcare",
    attendees: 200,
    xpReward: 200,
    lat: 45.4240,
    lng: -75.6995,
    organizer: "Canadian Health Coalition",
    organizerEmail: "hello@healthcoalition.ca",
    source: "Canadian Health Coalition",
    sourceUrl: "https://www.healthcoalition.ca/2026-parliament-hill-lobby-for-public-health-care/",
    verified: true,
  },
  {
    id: "4",
    title: "National Housing Day of Action",
    date: "2026-03-22",
    time: "11:00 AM",
    location: "City Hall, Toronto",
    type: "protest",
    missionId: "housing",
    attendees: 3500,
    xpReward: 200,
    lat: 43.6534,
    lng: -79.3841,
    organizer: "ACORN Canada",
    organizerEmail: "info@acorncanada.org",
    source: "ACORN Canada",
    sourceUrl: "https://acorncanada.org",
    verified: true,
  },
  {
    id: "5",
    title: "Tax the Rich Rally — Parliament Hill",
    date: "2026-03-25",
    time: "12:00 PM",
    location: "Parliament Hill, Ottawa",
    type: "rally",
    missionId: "tax",
    attendees: 3200,
    xpReward: 200,
    lat: 45.4238,
    lng: -75.7005,
    organizer: "Canadians for Tax Fairness",
    organizerEmail: "info@taxfairness.ca",
    source: "Canadians for Tax Fairness",
    sourceUrl: "https://www.taxfairness.ca",
    verified: true,
  },
  {
    id: "6",
    title: "Water Walk — Seine River First Nation",
    date: "2026-04-02",
    time: "9:00 AM",
    location: "Seine River First Nation, Ontario",
    type: "protest",
    missionId: "water",
    attendees: 400,
    xpReward: 200,
    lat: 48.6500,
    lng: -91.9200,
    organizer: "David Suzuki Foundation / First Nations Water Authority",
    organizerEmail: "contact@davidsuzuki.org",
    source: "ISC / David Suzuki Foundation",
    sourceUrl: "https://davidsuzuki.org",
    verified: true,
  },
  {
    id: "7",
    title: "Food Security Town Hall",
    date: "2026-04-08",
    time: "7:00 PM",
    location: "University of British Columbia, Vancouver",
    type: "townhall",
    missionId: "food",
    attendees: 350,
    xpReward: 150,
    lat: 49.2606,
    lng: -123.2460,
    organizer: "Food Banks Canada / Dalhousie Agri-Food Analytics Lab",
    organizerEmail: "info@foodbankscanada.ca",
    source: "Dalhousie Food Price Report",
    sourceUrl: "https://www.dal.ca/sites/agri-food/research/canada-s-food-price-report.html",
    verified: true,
  },
  {
    id: "8",
    title: "Climate Justice March",
    date: "2026-04-12",
    time: "1:00 PM",
    location: "Place du Canada, Montreal",
    type: "protest",
    missionId: "climate",
    attendees: 6000,
    xpReward: 200,
    lat: 45.4988,
    lng: -73.5674,
    organizer: "Fridays for Future Canada / Greenpeace",
    organizerEmail: "info@greenpeace.ca",
    source: "Greenpeace Canada",
    sourceUrl: "https://www.greenpeace.org/canada/",
    verified: true,
  },
  {
    id: "9",
    title: "Digital Rights Forum — Bill C-63",
    date: "2026-04-15",
    time: "6:00 PM",
    location: "Carleton University, Ottawa",
    type: "townhall",
    missionId: "digital-rights",
    attendees: 300,
    xpReward: 150,
    lat: 45.3876,
    lng: -75.6960,
    organizer: "OpenMedia / Canadian Civil Liberties Association",
    organizerEmail: "info@openmedia.org",
    source: "OpenMedia / CCLA",
    sourceUrl: "https://openmedia.org",
    verified: true,
  },
  {
    id: "10",
    title: "Iran Solidarity Rally",
    date: "2026-04-20",
    time: "2:00 PM",
    location: "Mel Lastman Square, Toronto",
    type: "rally",
    missionId: "gaza",
    attendees: 2000,
    xpReward: 200,
    lat: 43.7672,
    lng: -79.4135,
    organizer: "Iranian-Canadian Community Organizations",
    organizerEmail: "solidarity@irancommunity.ca",
    source: "Policy Options / IRPP",
    sourceUrl: "https://policyoptions.irpp.org/2026/01/iran-canada-stand/",
    verified: true,
  },
];
