// Icons
import { 
  FaDiscord, 
  FaGithub,
  FaLinkedin, 
  FaReddit, 
  FaTwitch, 
  FaYoutube,
  FaSteam,
  FaXTwitter 
} from "react-icons/fa6"
import { 
  MdHome, 
  MdDesignServices, 
  MdOutlineLayers, 
  MdNotifications,
  MdOutlinePeople,
  MdOutlineBook,
} from "react-icons/md";

export const navItems = [
  { href: "/home", icon: MdHome, label: "Home", requiresUser: true },
  { href: "/create", icon: MdDesignServices, label: "Create" },
  { href: "/cards", icon: MdOutlineLayers, label: "Cards" },
  { href: "/notifications", icon: MdNotifications, label: "Notifications", requiresUser: true },
];

export const secondaryNavItems = [
  { href: "/learn", icon: MdOutlineBook, label: "Learn" },
  { href: "/play", icon: MdOutlinePeople, label: "Play" },
];

export const socialChannels = {
  discord: {
    icon: FaDiscord,
    href: "https://discord.gg/nexus",
    label: "Discord",
    linkColor: "indigo"
  },
  github: {
    icon: FaGithub,
    href: "https://github.com/NexusTCG/nexus/wiki",
    label: "GitHub",
    linkColor: "slate"
  },
  linkedin: {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/nexus-tcg",
    label: "LinkedIn",
    linkColor: "blue"
  },
  reddit: {
    icon: FaReddit,
    href: "https://www.reddit.com/r/playnexus/",
    label: "Reddit",
    linkColor: "orange"
  },
  steam: {
    icon: FaSteam,
    href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3279618215",
    label: "Steam",
    linkColor: "stone"
  },
  twitch: {
    icon: FaTwitch,
    href: "https://twitch.tv/nexus_tcg/about",
    label: "Twitch",
    linkColor: "purple"
  },
  youtube: {
    icon: FaYoutube,
    href: "https://youtube.com/@PlayNexusTCG",
    label: "YouTube",
    linkColor: "red"
  },
  twitter: {
    icon: FaXTwitter,
    href: "https://twitter.com/PlayNexusTcg",
    label: "Twitter",
    linkColor: "sky"
  }
};

export const policyLinks = {
  guidelines: {
    href: "https://docs.google.com/document/d/1Pojoxyo1YZPLi7ZEuIzG9-RcTAUSO-C86HvU_NplY9I/edit#heading=h.m4dz65rg4sen",
    label: "Community Guidelines"
  },
  privacy: {
    href: "https://app.termly.io/policy-viewer/policy.html?policyUUID=ad50ccf1-c965-4b23-8bdb-77a1bca4cb54",
    label: "Privacy"
  },
  terms: {
    href: "https://app.termly.io/policy-viewer/policy.html?policyUUID=ed073254-9c41-4933-b15f-884e216e16de",
    label: "Terms of Service"
  },
  cookies: {
    href: "https://app.termly.io/policy-viewer/policy.html?policyUUID=a25f2c19-179e-41dd-90d1-a797291d8669",
    label: "Cookies"
  },
};

export const energyOrder = [
  'light', 
  'storm', 
  'dark', 
  'chaos', 
  'growth'
];

export const energyToColorMap = {
  light: 'yellow',
  storm: 'sky',
  dark: 'violet',
  chaos: 'red',
  growth: 'lime',
  void: 'slate'
};

export const cardTypes = [
  "Agent",
  "Anomaly",
  "Event",
  "Hardware",
  "Software",
]

export const agentTypes = [
  "Alchemist",
  "Amphibian",
  "Android",
  "Angel",
  "Apparition",
  "Arachnid",
  "Artisan",
  "Bear",
  "Beast",
  "Bird",
  "Cat",
  "Cosmic",
  "Cultist",
  "Cyborg",
  "Demon",
  "Dinosaur",
  "Dracan",
  "Dragon",
  "Drone",
  "Dwarf",
  "Elemental",
  "Elephant",
  "Elf",
  "Elk",
  "Engineer",
  "Explorer",
  "Fish",
  "Frock",
  "Giant",
  "Glitch",
  "Gnome",
  "Goblin",
  "God",
  "Goo",
  "Healer",
  "Highborn",
  "Horror",
  "Human",
  "Insect",
  "Lycan",
  "Lynxar",
  "Mercenary",
  "Merchant",
  "Mutant",
  "Nymph",
  "Octopi",
  "Paladin",
  "Phoenix",
  "Pilot",
  "Rodent",
  "Rogue",
  "Shaman",
  "Shapeshifter",
  "Soldier",
  "Sorcerer",
  "Specter",
  "Technomancer",
  "Telepath",
  "Tortoise",
  "Treant",
  "Vampire",
  "Vervai",
  "Warrior",
  "Wyrm",
  "Zombie",
]

export const artdirectionOptions = {
  "Style": [
    "Abstract",
    "Anime",
    "Art Deco",
    "Art Noveau",
    "Baroque",
    "Cyberpunk",
    "Gothic",
    "Glitch Art",
    "Minimalist",
    "Naturalism",
    "Pixel art",
    "Psychadelic",
    "Realism",
    "Steampunk",
    "Stylized",
    "Surrealism",
    "Vaporwave",
  ],
  "Prompt": [

  ],
}

export const metadataKeywords = [
  "TCG", 
  "Trading Card Game",
  "Trading Card Games",
  "Card Game",
  "Card Games",
  "Custom Card",
  "Custom Cards", 
  "AI",
  "Artificial Intelligence",
  "Generate AI",
  "AI card generator",
  "AI custom card",
  "AI custom TCG card",
  "AI TCG",
  "Nexus", 
  "Nexus TCG",
  "Nexus Trading Card Game",
  "Nexus Card Creator",
  "Nexus Card Generator",
  "Nexus Discord",
  "create trading cards online",
  "create custom trading cards",
  "how to create trading cards",
  "how to make trading cards",
  "how to create custom trading cards",
  "how to make custom trading cards",
  "DALL-E gaming",
  "ChatGPT gaming",
  "generative AI card game",
  "alternative to Magic the Gathering",
  "alternative to Yu-Gi-Oh",
  "alternative to Pokemon",
  "alternative to Hearthstone",
  "alternative to MTG",
  "alternative to YGO",
  "alternative to PTCG",
  "Magic the Gathering is expensive",
  "Yu-Gi-Oh is expensive",
  "Pokemon is expensive",
  "Hearthstone is expensive",
  "MTG is expensive",
  "TCG community",
  "trading card game community",
  "how to create your own digital cards with AI",
]