export type StageAction = {
  id: string;
  label: string;
  description: string;
  xp: number;
  icon: "share" | "petition" | "email" | "call" | "protest" | "research" | "vote" | "donate";
  platform?: string;
  shareUrl?: string;
  externalUrl?: string;
};

export type StageConfig = {
  stageLabel: string;
  title: string;
  description: string;
  totalXP: number;
  actions: StageAction[];
};

export type MissionStageActions = {
  [missionId: string]: {
    [stageLabel: string]: StageConfig;
  };
};

const waterShareText = encodeURIComponent(
  "28 First Nations communities STILL don't have clean drinking water in 2026. Canada promised to fix this by 2021. They failed. Learn more & take action: #WaterEquity #ProtestForCanada"
);

const waterShareUrl = encodeURIComponent("https://protestforcanada.lovable.app/quest?mission=water");

export const missionStageActions: MissionStageActions = {
  water: {
    Awareness: {
      stageLabel: "Awareness",
      title: "Spread Awareness — Water Equity",
      description:
        "28 First Nations communities lack clean water. Share this mission to earn XP and amplify the cause. Every share counts.",
      totalXP: 250,
      actions: [
        {
          id: "water-awareness-facebook",
          label: "Share on Facebook",
          description: "Post the Water Equity mission to your Facebook feed.",
          xp: 50,
          icon: "share",
          platform: "facebook",
          shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${waterShareUrl}&quote=${waterShareText}`,
        },
        {
          id: "water-awareness-twitter",
          label: "Share on X (Twitter)",
          description: "Tweet about the water crisis with verified stats.",
          xp: 50,
          icon: "share",
          platform: "twitter",
          shareUrl: `https://twitter.com/intent/tweet?text=${waterShareText}&url=${waterShareUrl}`,
        },
        {
          id: "water-awareness-bluesky",
          label: "Share on Bluesky",
          description: "Post on Bluesky to reach a new audience.",
          xp: 50,
          icon: "share",
          platform: "bluesky",
          shareUrl: `https://bsky.app/intent/compose?text=${waterShareText}%20${waterShareUrl}`,
        },
        {
          id: "water-awareness-instagram",
          label: "Share on Instagram",
          description: "Create an Instagram story or post. Screenshot your share for proof.",
          xp: 50,
          icon: "share",
          platform: "instagram",
        },
        {
          id: "water-awareness-tiktok",
          label: "Share on TikTok",
          description: "Make a TikTok about the water crisis. Use #WaterEquity.",
          xp: 50,
          icon: "share",
          platform: "tiktok",
        },
      ],
    },
    "MP Pressure": {
      stageLabel: "MP Pressure",
      title: "Pressure Your MP — Water Equity",
      description:
        "Your MP needs to hear from you. Use these tools to demand action on First Nations water infrastructure.",
      totalXP: 300,
      actions: [
        {
          id: "water-mp-email",
          label: "Email Your MP",
          description: "Use the Action Center to send a verified email script to your MP demanding water action.",
          xp: 100,
          icon: "email",
        },
        {
          id: "water-mp-call",
          label: "Call Your MP's Office",
          description: "Call your MP's constituency office and demand a timeline for water infrastructure.",
          xp: 100,
          icon: "call",
        },
        {
          id: "water-mp-petition",
          label: "Sign Water Petition",
          description: "Sign the official House of Commons petition for clean water.",
          xp: 100,
          icon: "petition",
          externalUrl: "https://petitions.ourcommons.ca",
        },
      ],
    },
    Legislation: {
      stageLabel: "Legislation",
      title: "Push for Legislation — Water Equity",
      description:
        "Demand legislative change. These actions push the crisis from awareness into law.",
      totalXP: 350,
      actions: [
        {
          id: "water-leg-brief",
          label: "Read the Policy Brief",
          description: "Read the ISC policy analysis on water infrastructure delays.",
          xp: 50,
          icon: "research",
          externalUrl: "https://www.sac-isc.gc.ca/eng/1506514143353/1533317130660",
        },
        {
          id: "water-leg-committee",
          label: "Submit to Committee",
          description: "Submit a written brief to the Standing Committee on Indigenous Affairs.",
          xp: 150,
          icon: "petition",
          externalUrl: "https://www.ourcommons.ca/Committees/en/INAN",
        },
        {
          id: "water-leg-protest",
          label: "Join a Rally",
          description: "Attend or organize a local rally for water equity. Check the protest calendar.",
          xp: 150,
          icon: "protest",
        },
      ],
    },
    Resolved: {
      stageLabel: "Resolved",
      title: "Victory — Water Equity",
      description: "This stage unlocks when the crisis is resolved. Keep fighting.",
      totalXP: 0,
      actions: [],
    },
  },
  gaza: {
    Awareness: {
      stageLabel: "Awareness",
      title: "Spread Awareness — Gaza Relief",
      description:
        "The humanitarian crisis in Gaza demands global attention. Share this mission and donate to amplify the cause.",
      totalXP: 350,
      actions: [
        {
          id: "gaza-awareness-donate",
          label: "Kindness is Free — Donate",
          description: "Donate to UNRWA's Gaza emergency relief fund. Every dollar saves lives.",
          xp: 100,
          icon: "donate",
          externalUrl: "https://donate.unrwa.org/-/en",
        },
        {
          id: "gaza-awareness-facebook",
          label: "Share on Facebook",
          description: "Post the Gaza Relief mission to your Facebook feed.",
          xp: 50,
          icon: "share",
          platform: "facebook",
          shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://protestforcanada.lovable.app/quest?mission=gaza")}&quote=${encodeURIComponent("The humanitarian crisis in Gaza needs our voices. Learn more & take action: #GazaRelief #ProtestForCanada")}`,
        },
        {
          id: "gaza-awareness-twitter",
          label: "Share on X (Twitter)",
          description: "Tweet about the Gaza crisis with verified stats.",
          xp: 50,
          icon: "share",
          platform: "twitter",
          shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent("The humanitarian crisis in Gaza needs our voices. Learn more & take action: #GazaRelief #ProtestForCanada")}&url=${encodeURIComponent("https://protestforcanada.lovable.app/quest?mission=gaza")}`,
        },
        {
          id: "gaza-awareness-bluesky",
          label: "Share on Bluesky",
          description: "Post on Bluesky to reach a new audience.",
          xp: 50,
          icon: "share",
          platform: "bluesky",
          shareUrl: `https://bsky.app/intent/compose?text=${encodeURIComponent("The humanitarian crisis in Gaza needs our voices. #GazaRelief #ProtestForCanada https://protestforcanada.lovable.app/quest?mission=gaza")}`,
        },
        {
          id: "gaza-awareness-instagram",
          label: "Share on Instagram",
          description: "Create an Instagram story or post. Screenshot your share for proof.",
          xp: 50,
          icon: "share",
          platform: "instagram",
        },
        {
          id: "gaza-awareness-tiktok",
          label: "Share on TikTok",
          description: "Make a TikTok about the Gaza crisis. Use #GazaRelief.",
          xp: 50,
          icon: "share",
          platform: "tiktok",
        },
      ],
    },
    "MP Pressure": {
      stageLabel: "MP Pressure",
      title: "Pressure Your MP — Gaza Relief",
      description:
        "Canada must act. Contact your MP and demand action on the humanitarian crisis in Gaza.",
      totalXP: 300,
      actions: [
        {
          id: "gaza-mp-email",
          label: "Email Your MP",
          description: "Send a verified email to your MP demanding Canada take action on Gaza.",
          xp: 100,
          icon: "email",
        },
        {
          id: "gaza-mp-call",
          label: "Call Your MP's Office",
          description: "Call your MP's constituency office and demand humanitarian action.",
          xp: 100,
          icon: "call",
        },
        {
          id: "gaza-mp-petition",
          label: "Sign Gaza Petition",
          description: "Sign the official petition demanding a ceasefire and humanitarian aid.",
          xp: 100,
          icon: "petition",
          externalUrl: "https://petitions.ourcommons.ca",
        },
      ],
    },
    Legislation: {
      stageLabel: "Legislation",
      title: "Push for Legislation — Gaza Relief",
      description:
        "Demand legislative action. Push Canada to enforce international humanitarian law.",
      totalXP: 350,
      actions: [
        {
          id: "gaza-leg-brief",
          label: "Read the Policy Brief",
          description: "Read Global Affairs Canada's position on the Gaza crisis.",
          xp: 50,
          icon: "research",
          externalUrl: "https://www.international.gc.ca",
        },
        {
          id: "gaza-leg-committee",
          label: "Submit to Committee",
          description: "Submit a written brief to the Standing Committee on Foreign Affairs.",
          xp: 150,
          icon: "petition",
          externalUrl: "https://www.ourcommons.ca/Committees/en/FAAE",
        },
        {
          id: "gaza-leg-protest",
          label: "Join a Rally",
          description: "Attend or organize a local rally for Gaza relief.",
          xp: 150,
          icon: "protest",
        },
      ],
    },
    Resolved: {
      stageLabel: "Resolved",
      title: "Victory — Gaza Relief",
      description: "This stage unlocks when the crisis is resolved. Keep fighting.",
      totalXP: 0,
      actions: [],
    },
  },
};

// Fallback for missions without specific stage actions
export const getStageActions = (missionId: string, stageLabel: string): StageConfig | null => {
  return missionStageActions[missionId]?.[stageLabel] ?? null;
};
