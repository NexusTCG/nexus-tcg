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
    href: "https://store.steampowered.com/app/1516030/Nexus/",
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