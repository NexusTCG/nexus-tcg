import React from "react";
// Providers
import { ThemeProvider } from "@/app/lib/styles/theme-provider"
import { Analytics } from "@vercel/analytics/react";
// Styles
import { Inter } from "next/font/google";
import "@/app/lib/styles/globals.css";
// Metadata
import type { Metadata } from 'next'
import { metadataKeywords } from "@/app/lib/data/data"
// Components
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  keywords: metadataKeywords,
  title: {
    default: "Nexus TCG",
    template: `%s | Nexus TCG`,
  },
  openGraph: {
    description: "Nexus TCG is a digital trading card game where players can make cards with the help of AI.",
    images: [
      `${defaultUrl}/opengraph-image.png`,
      `${defaultUrl}/twitter-image.png`,
    ],
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(
  props: RootLayoutProps
) {
  const { children } = props;

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            {children}
            <Analytics />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}