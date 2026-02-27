import { Home, Heart, DollarSign, Shield, Scale } from "lucide-react";

export type Topic = {
  id: string;
  title: string;
  icon: keyof typeof topicIcons;
  status: string;
  statusType: "critical" | "warning" | "stable";
  description: string;
  keyFigure: string;
  keyFigureLabel: string;
};

export const topicIcons = { Home, Heart, DollarSign, Shield, Scale };

export const topics: Topic[] = [
  {
    id: "housing",
    title: "Housing",
    icon: "Home",
    status: "Crisis-level affordability gap",
    statusType: "critical",
    description: "Average home prices remain 7x median household income. Federal housing accelerator fund disbursement under scrutiny.",
    keyFigure: "$716,000",
    keyFigureLabel: "Avg. Home Price (2024)",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: "Heart",
    status: "Strained capacity",
    statusType: "warning",
    description: "Canada Health Transfer increased to $49.4B but wait times remain at historic highs across provinces.",
    keyFigure: "$49.4B",
    keyFigureLabel: "Canada Health Transfer",
  },
  {
    id: "spending",
    title: "Government Spending",
    icon: "DollarSign",
    status: "Deficit widening",
    statusType: "critical",
    description: "Federal deficit projected at $40B for FY2024-25. Public debt charges now exceed $46.5B annually.",
    keyFigure: "$46.5B",
    keyFigureLabel: "Annual Debt Charges",
  },
  {
    id: "liberties",
    title: "Civil Liberties",
    icon: "Shield",
    status: "Under review",
    statusType: "stable",
    description: "Online Harms Act (Bill C-63) advancing through Parliament. Digital privacy and free expression debates ongoing.",
    keyFigure: "C-63",
    keyFigureLabel: "Online Harms Act",
  },
];

export type Bill = {
  id: string;
  name: string;
  shortName: string;
  totalCost: string;
  status: "Passed" | "In Committee" | "Defeated";
  topic: string;
  votes: { mp: string; party: string; riding: string; vote: "Yes" | "No" }[];
};

export const bills: Bill[] = [
  {
    id: "c-56",
    name: "Affordable Housing and Groceries Act",
    shortName: "C-56",
    totalCost: "$2.1B",
    status: "Passed",
    topic: "Housing",
    votes: [
      { mp: "Sean Fraser", party: "Liberal", riding: "Central Nova", vote: "Yes" },
      { mp: "Pierre Poilievre", party: "Conservative", riding: "Carleton", vote: "No" },
      { mp: "Jagmeet Singh", party: "NDP", riding: "Burnaby South", vote: "Yes" },
      { mp: "Yves-François Blanchet", party: "Bloc Québécois", riding: "Beloeil—Chambly", vote: "No" },
      { mp: "Elizabeth May", party: "Green", riding: "Saanich—Gulf Islands", vote: "Yes" },
    ],
  },
  {
    id: "c-63",
    name: "Online Harms Act",
    shortName: "C-63",
    totalCost: "$210M",
    status: "In Committee",
    topic: "Civil Liberties",
    votes: [
      { mp: "Arif Virani", party: "Liberal", riding: "Parkdale—High Park", vote: "Yes" },
      { mp: "Michael Barrett", party: "Conservative", riding: "Leeds—Grenville", vote: "No" },
      { mp: "Niki Ashton", party: "NDP", riding: "Churchill—Keewatinook Aski", vote: "Yes" },
      { mp: "Alexis Brunelle-Duceppe", party: "Bloc Québécois", riding: "Lac-Saint-Jean", vote: "Yes" },
    ],
  },
  {
    id: "c-69",
    name: "Impact Assessment Act Amendments",
    shortName: "C-69",
    totalCost: "$780M",
    status: "Passed",
    topic: "Government Spending",
    votes: [
      { mp: "Steven Guilbeault", party: "Liberal", riding: "Laurier—Sainte-Marie", vote: "Yes" },
      { mp: "Shannon Stubbs", party: "Conservative", riding: "Lakeland", vote: "No" },
      { mp: "Charlie Angus", party: "NDP", riding: "Timmins—James Bay", vote: "Yes" },
    ],
  },
  {
    id: "c-234",
    name: "National Defence Procurement Reform",
    shortName: "C-234",
    totalCost: "$14.8B",
    status: "In Committee",
    topic: "Government Spending",
    votes: [
      { mp: "Bill Blair", party: "Liberal", riding: "Scarborough Southwest", vote: "Yes" },
      { mp: "James Bezan", party: "Conservative", riding: "Selkirk—Interlake—Eastman", vote: "Yes" },
      { mp: "Lindsay Mathyssen", party: "NDP", riding: "London—Fanshawe", vote: "No" },
    ],
  },
];

export type UpcomingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "protest" | "townhall" | "rally";
  topic: string;
  attendees: number;
};

export const events: UpcomingEvent[] = [
  { id: "1", title: "Housing Crisis March", date: "2026-03-15", time: "10:00 AM", location: "Parliament Hill, Ottawa", type: "protest", topic: "Housing", attendees: 2400 },
  { id: "2", title: "Healthcare Town Hall with MP", date: "2026-03-18", time: "7:00 PM", location: "Community Centre, Toronto", type: "townhall", topic: "Healthcare", attendees: 180 },
  { id: "3", title: "Budget Accountability Rally", date: "2026-03-22", time: "12:00 PM", location: "City Hall, Vancouver", type: "rally", topic: "Government Spending", attendees: 850 },
  { id: "4", title: "Digital Rights Forum", date: "2026-03-25", time: "6:00 PM", location: "University of Montreal", type: "townhall", topic: "Civil Liberties", attendees: 320 },
  { id: "5", title: "National Housing Day of Action", date: "2026-04-02", time: "9:00 AM", location: "Multiple Cities", type: "protest", topic: "Housing", attendees: 5000 },
  { id: "6", title: "Fiscal Transparency Town Hall", date: "2026-04-08", time: "7:30 PM", location: "Calgary Public Library", type: "townhall", topic: "Government Spending", attendees: 210 },
];

export type FlaggedSpending = {
  id: string;
  title: string;
  department: string;
  amount: string;
  flaggedBy: string;
  date: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  description: string;
};

export const flaggedSpending: FlaggedSpending[] = [
  { id: "1", title: "ArriveCAN App Development Overruns", department: "CBSA", amount: "$59.5M", flaggedBy: "OversightWatch", date: "2026-02-14", upvotes: 3420, downvotes: 180, comments: 287, description: "Original budget was $80K. Final cost ballooned to $59.5M with questionable subcontracting arrangements." },
  { id: "2", title: "McKinsey Consulting Contracts", department: "Multiple Departments", amount: "$209M", flaggedBy: "FiscalHawk", date: "2026-02-20", upvotes: 2890, downvotes: 340, comments: 198, description: "Significant increase in sole-source contracts to McKinsey & Company across multiple federal departments." },
  { id: "3", title: "Green Slush Fund Allegations", department: "SDTC", amount: "$390M", flaggedBy: "CleanGovCA", date: "2026-02-25", upvotes: 4100, downvotes: 520, comments: 456, description: "Sustainable Development Technology Canada board members allegedly directed funds to companies they had interests in." },
  { id: "4", title: "Phoenix Pay System Ongoing Costs", department: "PSPC", amount: "$2.4B", flaggedBy: "PublicServant22", date: "2026-01-30", upvotes: 5200, downvotes: 90, comments: 612, description: "Cumulative cost of the failed Phoenix pay system continues to grow with no replacement timeline." },
];

// Source attribution for data
export const dataSources = {
  spending: "GC InfoBase — Treasury Board of Canada Secretariat",
  housing: "CMHC Housing Market Information Portal",
  health: "Canadian Institute for Health Information (CIHI)",
  bills: "LEGISinfo — Parliament of Canada",
};
