// Energy
import light from "@/public/icons/energy-icons/light.svg";
import storm from "@/public/icons/energy-icons/storm.svg";
import dark from "@/public/icons/energy-icons/dark.svg";
import chaos from "@/public/icons/energy-icons/chaos.svg";
import growth from "@/public/icons/energy-icons/growth.svg";
import void0 from "@/public/icons/energy-icons/void-0.svg";
import void1 from "@/public/icons/energy-icons/void-1.svg";
import void2 from "@/public/icons/energy-icons/void-2.svg";
import void3 from "@/public/icons/energy-icons/void-3.svg";
import void4 from "@/public/icons/energy-icons/void-4.svg";
import void5 from "@/public/icons/energy-icons/void-5.svg";
import void6 from "@/public/icons/energy-icons/void-6.svg";
import void7 from "@/public/icons/energy-icons/void-7.svg";
import void8 from "@/public/icons/energy-icons/void-8.svg";
import void9 from "@/public/icons/energy-icons/void-9.svg";
import void10 from "@/public/icons/energy-icons/void-10.svg";
import void11 from "@/public/icons/energy-icons/void-11.svg";
import void12 from "@/public/icons/energy-icons/void-12.svg";
import void13 from "@/public/icons/energy-icons/void-13.svg";
import void14 from "@/public/icons/energy-icons/void-14.svg";
import void15 from "@/public/icons/energy-icons/void-15.svg";
import voidx from "@/public/icons/energy-icons/void-x.svg";
// Speed icons
import speed1 from "@/public/icons/speed-icons/speed-1.svg";
import speed2 from "@/public/icons/speed-icons/speed-2.svg";
import speed3 from "@/public/icons/speed-icons/speed-3.svg";
// Grade icons
import core from "@/public/icons/grade-icons/core.svg";
import rare from "@/public/icons/grade-icons/rare.svg";
import epic from "@/public/icons/grade-icons/epic.svg";
import prime from "@/public/icons/grade-icons/prime.svg";
// Mythic icon
import mythic from "@/public/icons/mythic.svg";
// Reach icons
import melee from "@/public/icons/reach-icons/melee.svg";
import ranged from "@/public/icons/reach-icons/ranged.svg";
// Lock icons
import lock from "@/public/icons/lock.svg";
import unlock from "@/public/icons/unlock.svg";

export const energyIcons = {
  light,
  storm,
  dark,
  chaos,
  growth,
  void: [
    void0,
    void1,
    void2,
    void3,
    void4,
    void5,
    void6,
    void7,
    void8,
    void9,
    void10,
    void11,
    void12,
    void13,
    void14,
    void15,
    voidx,
  ],
};

export const speedIcons = [speed1, speed2, speed3];

export const gradeIcons = [
  { name: "core", icon: core },
  { name: "rare", icon: rare },
  { name: "epic", icon: epic },
  { name: "prime", icon: prime },
];

export const mythicIcon = mythic;

export const abbreviationIcons = {
  // Energy icons
  L: { icon: light, name: "Energy: Light" },
  S: { icon: storm, name: "Energy: Storm" },
  D: { icon: dark, name: "Energy: Dark" },
  C: { icon: chaos, name: "Energy: Chaos" },
  G: { icon: growth, name: "Energy: Growth" },
  // Void energy icons
  "X": { icon: voidx, name: "Energy: Void X" },
  "0": { icon: void0, name: "Energy: Void 0" },
  "1": { icon: void1, name: "Energy: Void 1" },
  "2": { icon: void2, name: "Energy: Void 2" },
  "3": { icon: void3, name: "Energy: Void 3" },
  "4": { icon: void4, name: "Energy: Void 4" },
  "5": { icon: void5, name: "Energy: Void 5" },
  "6": { icon: void6, name: "Energy: Void 6" },
  "7": { icon: void7, name: "Energy: Void 7" },
  "8": { icon: void8, name: "Energy: Void 8" },
  "9": { icon: void9, name: "Energy: Void 9" },
  "10": { icon: void10, name: "Energy: Void 10" },
  "11": { icon: void11, name: "Energy: Void 11" },
  "12": { icon: void12, name: "Energy: Void 12" },
  "13": { icon: void13, name: "Energy: Void 13" },
  "14": { icon: void14, name: "Energy: Void 14" },
  "15": { icon: void15, name: "Energy: Void 15" },
  // Speed icons
  "S1": { icon: speed1, name: "Speed: 1" },
  "S2": { icon: speed2, name: "Speed: 2" },
  "S3": { icon: speed3, name: "Speed: 3" },
  // Grade icons
  "GC": { icon: core, name: "Grade: Core" },
  "GR": { icon: rare, name: "Grade: Rare" },
  "GE": { icon: epic, name: "Grade: Epic" },
  "GP": { icon: prime, name: "Grade: Prime" },
  // Reach icons
  "RM": { icon: melee, name: "Reach: Melee" },
  "RR": { icon: ranged, name: "Reach: Ranged" },
  // Lock icons
  "LO": { icon: lock, name: "Lock" },
  "UL": { icon: unlock, name: "Unlock" },
};
