import { 
  MdPalette, 
  MdInvertColors, 
  MdBrush, 
  MdWbSunny, 
  MdLandscape, 
  MdAccessTime, 
  MdMood, 
  MdPublic, 
  MdTungsten,  
  MdCrop,  
  MdPhotoCamera 
} from "react-icons/md";

// Types
import { ArtPromptOptionsType } from "@/app/lib/types/components";

const artPromptOptionSectionIcons = {
  Palette: MdPalette,
  InvertColors: MdInvertColors,
  Brush: MdBrush,
  WbSunny: MdWbSunny,
  Planet: MdPublic,
  Landscape: MdLandscape,
  AccessTime: MdAccessTime,
  Mood: MdMood,
  Public: MdPublic,
  Tungsten: MdTungsten,
  Crop: MdCrop,
  LocalSee: MdPhotoCamera,
}

export const artPromptOptions: ArtPromptOptionsType = {
  style: {
    "title": "Style",
    "icon": artPromptOptionSectionIcons.Palette,
    "options": [
      { 
        "id": 1,
        "option": "Abstract",
        "image": "/images/art-option-tooltips/abstract.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Anime",
        "image": "/images/art-option-tooltips/anime.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "Art Deco",
        "image": "/images/art-option-tooltips/art-deco.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "Art Nouveau",
        "image": "/images/art-option-tooltips/art-nouveau.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 5,
        "option": "Baroque",
        "image": "/images/art-option-tooltips/baroque.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 6,
        "option": "Cyberpunk",
        "image": "/images/art-option-tooltips/cyberpunk.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 7,
        "option": "Gothic",
        "image": "/images/art-option-tooltips/gothic.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 8,
        "option": "Glitch art",
        "image": "/images/art-option-tooltips/glitch-art.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 9,
        "option": "Naturalism",
        "image": "/images/art-option-tooltips/naturalism.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 10,
        "option": "Pixel art",
        "image": "/images/art-option-tooltips/pixel-art.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 11,
        "option": "Psychedelic",
        "image": "/images/art-option-tooltips/psychedelic.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 12,
        "option": "Stylized",
        "image": "/images/art-option-tooltips/stylized.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 13,
        "option": "Surrealism",
        "image": "/images/art-option-tooltips/surrealism.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 14,
        "option": "Vaporwave",
        "image": "/images/art-option-tooltips/vaporwave.jpg",
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  color: {
    "title": "Color",
    "icon": artPromptOptionSectionIcons.InvertColors,
    "options": [
      { 
        "id": 1,
        "option": "Black and white",
        "image": "/images/art-option-tooltips/black-and-white.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "High contrast",
        "image": "/images/art-option-tooltips/high-contrast.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "High saturation",
        "image": "/images/art-option-tooltips/high-saturation.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "Duo-tone",
        "image": "/images/art-option-tooltips/duo-tone.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 5,
        "option": "Half-tone",
        "image": "/images/art-option-tooltips/half-tone.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 6,
        "option": "Desaturated",
        "image": "/images/art-option-tooltips/desaturated.jpg",
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  technique: {
    "title": "Technique",
    "icon": artPromptOptionSectionIcons.Brush,
    "options": [
      { 
        "id": 1,
        "option": "Airbrush",
        "image": "/images/art-option-tooltips/airbrush.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Charcoal",
        "image": "/images/art-option-tooltips/charcoal.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "Fine liner",
        "image": "/images/art-option-tooltips/fine-liner.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "Gouache",
        "image": "/images/art-option-tooltips/gouache.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 5,
        "option": "Ligne claire",
        "image": "/images/art-option-tooltips/ligne-claire.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 6,
        "option": "Oil painting",
        "image": "/images/art-option-tooltips/oil-painting.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 7,
        "option": "Pastel",
        "image": "/images/art-option-tooltips/pastel.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 8,
        "option": "Watercolor",
        "image": "/images/art-option-tooltips/watercolor.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 9,
        "option": "Cell shading",
        "image": "/images/art-option-tooltips/cell-shading.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 10,
        "option": "Stained glass",
        "image": "/images/art-option-tooltips/stained-glass.jpg",
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  lighting: {
    "title": "Lighting",
    "icon": artPromptOptionSectionIcons.Tungsten,
    "options": [
      { 
        "id": 1,
        "option": "Natural light",
        "image": "/images/art-option-tooltips/natural-light.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Florescent light",
        "image": "/images/art-option-tooltips/florescent-light.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "Tungsten light",
        "image": "/images/art-option-tooltips/tungsten-light.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "Backlight",
        "image": "/images/art-option-tooltips/backlight.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 5,
        "option": "Soft light",
        "image": "/images/art-option-tooltips/soft-light.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 6,
        "option": "Neon Light",
        "image": "/images/art-option-tooltips/neon-light.jpg",
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  subject: {
    "title": "Subject",
    "icon": artPromptOptionSectionIcons.Public,
    "options": [
      { 
        "id": 1, 
        "option": "No characters", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 2, 
        "option": "One character", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 3, 
        "option": "Two characters", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 4, 
        "option": "Group of characters", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 5, 
        "option": "Crowd", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  planet: {
    "title": "Planet",
    "icon": artPromptOptionSectionIcons.Planet,
    "options": [
      { 
        "id": 1, 
        "option": "Skandheim", 
        "image": null, 
        "description": "A cold world inhabited by futuristic cyberpunk viking.", 
        "prompt": "Snow, fjords, high mountains, and cyberpunk viking architecture." 
      },
      { 
        "id": 2, 
        "option": "Dunestar", 
        "image": null, 
        "description": "A hot desert world that hold untold ancient secrets.", 
        "prompt": "Desert, rocks, ancient technology, arabic architecture, and mystic ruins." 
      },
      { 
        "id": 3, 
        "option": "Deepmere", 
        "image": null, 
        "description": "A tropical world with seas as vast as they are deep.", 
        "prompt": "Vast seas, tropical flore, islands, and reefs." 
      },
      { 
        "id": 4, 
        "option": "Glintara", 
        "image": null, 
        "description": "A dark underground world lit by glowing flora and crystals.", 
        "prompt": "Dark artificial caverns, bioluminescent moss, and glowing crystals." 
      },
      { 
        "id": 5, 
        "option": "Lumina", 
        "image": null, 
        "description": "A bright planet-wide metropolis with galactic politics.", 
        "prompt": "Futuristic solarpunk metropolis, tall skyscrapers, and beautiful parks." 
      },
      { 
        "id": 6, 
        "option": "Moroseth", 
        "image": null, 
        "description": "A damned, dark world with horrid inhabitans and atmosphere.", 
        "prompt": "Medieval town, gothic futuristic buildings, darkness, fog, and moonlight." 
      },
      { 
        "id": 7, 
        "option": "Starhaven", 
        "image": null, 
        "description": "A vast ringworld and frontier town for spacefarers.", 
        "prompt": "Ringworld that stretches to the horizon, vegetation, buildings, and space ships." 
      },
      { 
        "id": 8, 
        "option": "Canopis", 
        "image": null, 
        "description": "A overgrown world dominated by gigantic flora and fauna.", 
        "prompt": "Dense jungle, giant flora, strange fauna, and tall artificial cliffs." 
      },
      { 
        "id": 9, 
        "option": "Secoria", 
        "image": null, 
        "description": "A chaotic and dangerous world and arena of the gods.", 
        "prompt": "Lava geysers, magma rivers, steam, lightning storms, meteors, and intense darkness." 
      }
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  setting: {
    "title": "Setting",
    "icon": artPromptOptionSectionIcons.Landscape,
    "options": [
      { 
        "id": 1, 
        "option": "Interior", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 2, 
        "option": "Exterior", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 3, 
        "option": "City", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 4, 
        "option": "Town", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 5, 
        "option": "Desert", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 6, 
        "option": "Field", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 7, 
        "option": "Forest", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 8, 
        "option": "Jungle", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 9, 
        "option": "Mountains", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 10, 
        "option": "Ocean", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 11, 
        "option": "Space", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 12, 
        "option": "Laboratory", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 13, 
        "option": "Tundra", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 14, 
        "option": "Swamp", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 15, 
        "option": "Cave", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 16, 
        "option": "Fortress", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 17, 
        "option": "Underground", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
      { 
        "id": 18, 
        "option": "Underwater", 
        "image": null, 
        "description": null, 
        "prompt": null 
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  time: {
    "title": "Time",
    "icon": artPromptOptionSectionIcons.AccessTime,
    "options": [
      { 
        "id": 1,
        "option": "Day",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Night",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "Sunrise",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "Sunset",
        "image": null,
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  weather: {
    "title": "Weather",
    "icon": artPromptOptionSectionIcons.WbSunny,
    "options": [
      { 
        "id": 1,
        "option": "Cloudy",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Foggy",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "Rainy",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "Snowy",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 5,
        "option": "Stormy",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 6,
        "option": "Sunny",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 7,
        "option": "Windy",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 8,
        "option": "Overcast",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 9,
        "option": "Clear",
        "image": null,
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  mood: {
    "title": "Mood",
    "icon": artPromptOptionSectionIcons.Mood,
    "options": [
      { 
        "id": 1,
        "option": "Calm",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Chaotic",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "Dramatic",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "Dreamy",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 5,
        "option": "Creepy",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 6,
        "option": "Heroic",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 7,
        "option": "Serious",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 8,
        "option": "Somber",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 9,
        "option": "Mysterious",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 10,
        "option": "Sinister",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 11,
        "option": "Whimsical",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 12,
        "option": "Otherworldly",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 13,
        "option": "Intense",
        "image": null,
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  perspective: {
    "title": "Perspective",
    "icon": artPromptOptionSectionIcons.Crop,
    "options": [
      { 
        "id": 1,
        "option": "Aerial",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/aerial.jpg?t=2024-09-08T19%3A26%3A49.398Z",
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Close-Up",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/close-up.jpg?t=2024-09-08T19%3A30%3A11.006Z",
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "Panorama",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/panorama.jpg?t=2024-09-08T19%3A36%3A58.076Z",
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "Low angle",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/low-angle.jpg?t=2024-09-08T19%3A34%3A57.177Z",
        "description": null,
        "prompt": null
      },
      { 
        "id": 5,
        "option": "Extreme Close-Up",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/extreme-close-up.jpg?t=2024-09-08T19%3A32%3A01.408Z",
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  framing: {
    "title": "Framing",
    "icon": artPromptOptionSectionIcons.Crop,
    "options": [
      { 
        "id": 1,
        "option": "Face portrait",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/face-portrait.jpg?t=2024-09-08T19%3A32%3A10.519Z",
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Full-body portrait",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/full-body-portrait.jpg?t=2024-09-08T19%3A32%3A48.199Z",
        "description": null,
        "prompt": null
      },
      { 
        "id": 3,
        "option": "Half-body portrait",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/half-body-portrait.jpg",
        "description": null,
        "prompt": null
      },
      { 
        "id": 4,
        "option": "One-quarter portrait",
        "image": "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/art-direction-option-tooltip/one-quarter-portrait.jpg?t=2024-09-08T19%3A36%3A45.802Z",
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
  composition: {
    "title": "Composition",
    "icon": artPromptOptionSectionIcons.LocalSee,
    "options": [
      { 
        "id": 1,
        "option": "Symmetry",
        "image": null,
        "description": null,
        "prompt": null
      },
      { 
        "id": 2,
        "option": "Asymmetry",
        "image": null,
        "description": null,
        "prompt": null
      },
    ].sort((a, b) => a.option.localeCompare(b.option)),
  },
};