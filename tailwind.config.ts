import type { Config } from "tailwindcss"

const colors = require('tailwindcss/colors');

const energyColors = [
  "yellow", // Light
  "sky",    // Storm
  "violet", // Dark
  "red",    // Chaos
  "lime",   // Growth
  "slate",  // Void
];

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function generateColorClasses(baseColor: string) {
  return shades.flatMap(function(shade) {
    return [
      `bg-${baseColor}-${shade}`,
    ];
  });
}

const baseColors = [
  "yellow", // Light
  "sky",    // Storm
  "violet", // Dark
  "red",    // Chaos
  "lime",   // Growth
  "slate",  // Void
  "light-storm",
  "light-dark",
  "light-chaos",
  "light-growth",
  "storm-dark",
  "storm-chaos",
  "storm-growth",
  "dark-chaos",
  "dark-growth",
  "chaos-growth",
  "anomaly",
  "multi",
];

const safelist = baseColors.flatMap(
  color => generateColorClasses(color)
);

const config: Config = {
  darkMode: ["class"],
  mode: 'jit',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: safelist,
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        // Hero bgImages
        "hero-img-1": "url('/images/hero-img-1.webp')",
        "hero-img-2": "url('/images/hero-img-2.webp')",
        "hero-img-3": "url('/images/hero-img-3.webp')",
        // Multi: light-storm-dark-chaos-green
        "multi-50": "linear-gradient(45deg, #fefce8 0%, #e0f2fe 20%, #f3e8ff 40%, #fee2e2 60%, #f7fee7 80%)",
        "multi-100": "linear-gradient(45deg, #fef9c3 0%, #bae6fd 20%, #ede9fe 40%, #fecaca 60%, #ecfccb 80%)",
        "multi-200": "linear-gradient(45deg, #fef08a 0%, #93c5fd 20%, #ddd6fe 40%, #fca5a5 60%, #d9f99d 80%)",
        "multi-300": "linear-gradient(45deg, #fde047 0%, #60a5fa 20%, #c4b5fd 40%, #f87171 60%, #bef264 80%)",
        "multi-400": "linear-gradient(45deg, #facc15 0%, #3b82f6 20%, #a78bfa 40%, #f87171 60%, #a3e635 80%)",
        "multi-500": "linear-gradient(45deg, #eab308 0%, #2563eb 20%, #8b5cf6 40%, #ef4444 60%, #84cc16 80%)",
        "multi-600": "linear-gradient(45deg, #ca8a04 0%, #1d4ed8 20%, #7c3aed 40%, #dc2626 60%, #65a30d 80%)",
        "multi-700": "linear-gradient(45deg, #a16207 0%, #1e40af 20%, #6d28d9 40%, #b91c1c 60%, #4d7c0f 80%)",
        "multi-800": "linear-gradient(45deg, #854d0e 0%, #1e3a8a 20%, #5b21b6 40%, #991b1b 60%, #3f6212 80%)",
        "multi-900": "linear-gradient(45deg, #713f12 0%, #1e3a8a 20%, #4c1d95 40%, #7f1d1d 60%, #365314 80%)",
        "multi-950": "linear-gradient(45deg, #422006 0%, #082f49 20%, #2e1065 40%, #450a0a 60%, #1a2e05 80%)",
        // Dual: lightStorm
        "light-storm-50": "linear-gradient(90deg, #fefce8 0%, #e0f2fe 100%)",
        "light-storm-100": "linear-gradient(90deg, #fef9c3 0%, #bae6fd 100%)",
        "light-storm-200": "linear-gradient(90deg, #fef08a 0%, #93c5fd 100%)",
        "light-storm-300": "linear-gradient(90deg, #fde047 0%, #60a5fa 100%)",
        "light-storm-400": "linear-gradient(90deg, #facc15 0%, #3b82f6 100%)",
        "light-storm-500": "linear-gradient(90deg, #eab308 0%, #2563eb 100%)",
        "light-storm-600": "linear-gradient(90deg, #ca8a04 0%, #1d4ed8 100%)",
        "light-storm-700": "linear-gradient(90deg, #a16207 0%, #1e40af 100%)",
        "light-storm-800": "linear-gradient(90deg, #854d0e 0%, #1e3a8a 100%)",
        "light-storm-900": "linear-gradient(90deg, #713f12 0%, #1e3a8a 100%)",
        "light-storm-950": "linear-gradient(90deg, #422006 0%, #082f49 100%)",
        // Dual: lightDark
        "light-dark-50": "linear-gradient(90deg, #fefce8 0%, #f3e8ff 100%)",
        "light-dark-100": "linear-gradient(90deg, #fef9c3 0%, #ede9fe 100%)",
        "light-dark-200": "linear-gradient(90deg, #fef08a 0%, #ddd6fe 100%)",
        "light-dark-300": "linear-gradient(90deg, #fde047 0%, #c4b5fd 100%)",
        "light-dark-400": "linear-gradient(90deg, #facc15 0%, #a78bfa 100%)",
        "light-dark-500": "linear-gradient(90deg, #eab308 0%, #8b5cf6 100%)",
        "light-dark-600": "linear-gradient(90deg, #ca8a04 0%, #7c3aed 100%)",
        "light-dark-700": "linear-gradient(90deg, #a16207 0%, #6d28d9 100%)",
        "light-dark-800": "linear-gradient(90deg, #854d0e 0%, #5b21b6 100%)",
        "light-dark-900": "linear-gradient(90deg, #713f12 0%, #4c1d95 100%)",
        "light-dark-950": "linear-gradient(90deg, #422006 0%, #2e1065 100%)",
        // Dual: lightChaos
        "light-chaos-50": "linear-gradient(90deg, #fefce8 0%, #fee2e2 100%)",
        "light-chaos-100": "linear-gradient(90deg, #fef9c3 0%, #fecaca 100%)",
        "light-chaos-200": "linear-gradient(90deg, #fef08a 0%, #fca5a5 100%)",
        "light-chaos-300": "linear-gradient(90deg, #fde047 0%, #f87171 100%)",
        "light-chaos-400": "linear-gradient(90deg, #facc15 0%, #f87171 100%)",
        "light-chaos-500": "linear-gradient(90deg, #eab308 0%, #ef4444 100%)",
        "light-chaos-600": "linear-gradient(90deg, #ca8a04 0%, #dc2626 100%)",
        "light-chaos-700": "linear-gradient(90deg, #a16207 0%, #b91c1c 100%)",
        "light-chaos-800": "linear-gradient(90deg, #854d0e 0%, #991b1b 100%)",
        "light-chaos-900": "linear-gradient(90deg, #713f12 0%, #7f1d1d 100%)",
        "light-chaos-950": "linear-gradient(90deg, #422006 0%, #450a0a 100%)",
        // Dual: lightGrowth
        "light-growth-50": "linear-gradient(90deg, #fefce8 100%, #f7fee7 100%)",
        "light-growth-100": "linear-gradient(90deg, #fef9c3 0%, #ecfccb 100%)",
        "light-growth-200": "linear-gradient(90deg, #fef08a 0%, #d9f99d 100%)",
        "light-growth-300": "linear-gradient(90deg, #fde047 0%, #bef264 100%)",
        "light-growth-400": "linear-gradient(90deg, #facc15 0%, #a3e635 100%)",
        "light-growth-500": "linear-gradient(90deg, #eab308 0%, #84cc16 100%)",
        "light-growth-600": "linear-gradient(90deg, #ca8a04 0%, #65a30d 100%)",
        "light-growth-700": "linear-gradient(90deg, #a16207 0%, #4d7c0f 100%)",
        "light-growth-800": "linear-gradient(90deg, #854d0e 0%, #3f6212 100%)",
        "light-growth-900": "linear-gradient(90deg, #713f12 0%, #365314 100%)",
        "light-growth-950": "linear-gradient(90deg, #422006 0%, #1a2e05 100%)",
        // Dual: stormDark
        "storm-dark-50": "linear-gradient(90deg, #e0f2fe 0%, #f3e8ff 100%)",
        "storm-dark-100": "linear-gradient(90deg, #bae6fd 0%, #ede9fe 100%)",
        "storm-dark-200": "linear-gradient(90deg, #93c5fd 0%, #ddd6fe 100%)",
        "storm-dark-300": "linear-gradient(90deg, #60a5fa 0%, #c4b5fd 100%)",
        "storm-dark-400": "linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)",
        "storm-dark-500": "linear-gradient(90deg, #2563eb 0%, #8b5cf6 100%)",
        "storm-dark-600": "linear-gradient(90deg, #1d4ed8 0%, #7c3aed 100%)",
        "storm-dark-700": "linear-gradient(90deg, #1e40af 0%, #6d28d9 100%)",
        "storm-dark-800": "linear-gradient(90deg, #1e3a8a 0%, #5b21b6 100%)",
        "storm-dark-900": "linear-gradient(90deg, #1e3a8a 0%, #4c1d95 100%)",
        "storm-dark-950": "linear-gradient(90deg, #082f49 0%, #2e1065 100%)",
        // Dual: stormChaos
        "storm-chaos-50": "linear-gradient(90deg, #e0f2fe 0%, #fee2e2 100%)",
        "storm-chaos-100": "linear-gradient(90deg, #bae6fd 0%, #fecaca 100%)",
        "storm-chaos-200": "linear-gradient(90deg, #93c5fd 0%, #fca5a5 100%)",
        "storm-chaos-300": "linear-gradient(90deg, #60a5fa 0%, #f87171 100%)",
        "storm-chaos-400": "linear-gradient(90deg, #3b82f6 0%, #f87171 100%)",
        "storm-chaos-500": "linear-gradient(90deg, #2563eb 0%, #ef4444 100%)",
        "storm-chaos-600": "linear-gradient(90deg, #1d4ed8 0%, #dc2626 100%)",
        "storm-chaos-700": "linear-gradient(90deg, #1e40af 0%, #b91c1c 100%)",
        "storm-chaos-800": "linear-gradient(90deg, #1e3a8a 0%, #991b1b 100%)",
        "storm-chaos-900": "linear-gradient(90deg, #1e3a8a 0%, #7f1d1d 100%)",
        "storm-chaos-950": "linear-gradient(90deg, #082f49 0%, #450a0a 100%)",
        // Dual: stormGrowth
        "storm-growth-50": "linear-gradient(90deg, #e0f2fe 0%, #f7fee7 100%)",
        "storm-growth-100": "linear-gradient(90deg, #bae6fd 0%, #ecfccb 100%)",
        "storm-growth-200": "linear-gradient(90deg, #93c5fd 0%, #d9f99d 100%)",
        "storm-growth-300": "linear-gradient(90deg, #60a5fa 0%, #bef264 100%)",
        "storm-growth-400": "linear-gradient(90deg, #3b82f6 0%, #a3e635 100%)",
        "storm-growth-500": "linear-gradient(90deg, #2563eb 0%, #84cc16 100%)",
        "storm-growth-600": "linear-gradient(90deg, #1d4ed8 0%, #65a30d 100%)",
        "storm-growth-700": "linear-gradient(90deg, #1e40af 0%, #4d7c0f 100%)",
        "storm-growth-800": "linear-gradient(90deg, #1e3a8a 0%, #3f6212 100%)",
        "storm-growth-900": "linear-gradient(90deg, #1e3a8a 0%, #365314 100%)",
        "storm-growth-950": "linear-gradient(90deg, #082f49 0%, #1a2e05 100%)",
        // Dual: darkChaos
        "dark-chaos-50": "linear-gradient(90deg, #f3e8ff 0%, #fee2e2 100%)",
        "dark-chaos-100": "linear-gradient(90deg, #ede9fe 0%, #fecaca 100%)",
        "dark-chaos-200": "linear-gradient(90deg, #ddd6fe 0%, #fca5a5 100%)",
        "dark-chaos-300": "linear-gradient(90deg, #c4b5fd 0%, #f87171 100%)",
        "dark-chaos-400": "linear-gradient(90deg, #a78bfa 0%, #f87171 100%)",
        "dark-chaos-500": "linear-gradient(90deg, #8b5cf6 0%, #ef4444 100%)",
        "dark-chaos-600": "linear-gradient(90deg, #7c3aed 0%, #dc2626 100%)",
        "dark-chaos-700": "linear-gradient(90deg, #6d28d9 0%, #b91c1c 100%)",
        "dark-chaos-800": "linear-gradient(90deg, #5b21b6 0%, #991b1b 100%)",
        "dark-chaos-900": "linear-gradient(90deg, #4c1d95 0%, #7f1d1d 100%)",
        "dark-chaos-950": "linear-gradient(90deg, #2e1065 0%, #450a0a 100%)",
        // Dual: darkGrowth
        "dark-growth-50": "linear-gradient(90deg, #f3e8ff 0%, #f7fee7 100%)",
        "dark-growth-100": "linear-gradient(90deg, #ede9fe 0%, #ecfccb 100%)",
        "dark-growth-200": "linear-gradient(90deg, #ddd6fe 0%, #d9f99d 100%)",
        "dark-growth-300": "linear-gradient(90deg, #c4b5fd 0%, #bef264 100%)",
        "dark-growth-400": "linear-gradient(90deg, #a78bfa 0%, #a3e635 100%)",
        "dark-growth-500": "linear-gradient(90deg, #8b5cf6 0%, #84cc16 100%)",
        "dark-growth-600": "linear-gradient(90deg, #7c3aed 0%, #65a30d 100%)",
        "dark-growth-700": "linear-gradient(90deg, #6d28d9 0%, #4d7c0f 100%)",
        "dark-growth-800": "linear-gradient(90deg, #5b21b6 0%, #3f6212 100%)",
        "dark-growth-900": "linear-gradient(90deg, #4c1d95 0%, #365314 100%)",
        "dark-growth-950": "linear-gradient(90deg, #2e1065 0%, #1a2e05 100%)",
        // Dual: chaosGrowth
        "chaos-growth-50": "linear-gradient(90deg, #fee2e2 0%, #f7fee7 100%)",
        "chaos-growth-100": "linear-gradient(90deg, #fecaca 0%, #ecfccb 100%)",
        "chaos-growth-200": "linear-gradient(90deg, #fca5a5 0%, #d9f99d 100%)",
        "chaos-growth-300": "linear-gradient(90deg, #f87171 0%, #bef264 100%)",
        "chaos-growth-400": "linear-gradient(90deg, #f87171 0%, #a3e635 100%)",
        "chaos-growth-500": "linear-gradient(90deg, #ef4444 0%, #84cc16 100%)",
        "chaos-growth-600": "linear-gradient(90deg, #dc2626 0%, #65a30d 100%)",
        "chaos-growth-700": "linear-gradient(90deg, #b91c1c 0%, #4d7c0f 100%)",
        "chaos-growth-800": "linear-gradient(90deg, #991b1b 0%, #3f6212 100%)",
        "chaos-growth-900": "linear-gradient(90deg, #7f1d1d 0%, #365314 100%)",
        "chaos-growth-950": "linear-gradient(90deg, #450a0a 0%, #1a2e05 100%)",
        // Dual: anomaly
        "anomaly-50": "linear-gradient(90deg, #fafafa 0%, #fafaf9 100%)",
        "anomaly-100": "linear-gradient(90deg, #f5f5f5 0%, #f5f5f4 100%)",
        "anomaly-200": "linear-gradient(90deg, #e5e5e5 0%, #e7e5e4 100%)",
        "anomaly-300": "linear-gradient(90deg, #d4d4d4 0%, #d6d3d1 100%)",
        "anomaly-400": "linear-gradient(90deg, #a3a3a3 0%, #a8a29e 100%)",
        "anomaly-500": "linear-gradient(90deg, #737373 0%, #78716c 100%)",
        "anomaly-600": "linear-gradient(90deg, #525252 0%, #57534e 100%)",
        "anomaly-700": "linear-gradient(90deg, #404040 0%, #44403c 100%)",
        "anomaly-800": "linear-gradient(90deg, #262626 0%, #292524 100%)",
        "anomaly-900": "linear-gradient(90deg, #171717 0%, #1c1917 100%)",
        "anomaly-950": "linear-gradient(90deg, #0a0a0a 0%, #0c0a09 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config