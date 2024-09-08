export type EnergyType =
  | "light"
  | "storm"
  | "dark"
  | "chaos"
  | "growth"
  | "void";

export type EnergyCost = {
  light: number;
  storm: number;
  dark: number;
  chaos: number;
  growth: number;
  void: number;
};

export type SpeedType = 1 | 2 | 3;

export type ArtPromptOptionType = {
  id: number;
  option: string;
  image: string | null;
  description: string | null;
  prompt: string | null;
};

export type ArtPromptOptionsSectionType = {
  title: string;
  icon: React.ElementType;
  options: ArtPromptOptionType[];
};

export type ArtPromptOptionsType = {
  [section: string]: ArtPromptOptionsSectionType;
};
