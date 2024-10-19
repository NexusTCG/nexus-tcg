import React from "react";
// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function Learn() {
  return (
    <div
      id="learn-page-container"
      className="
        flex
        flex-col
        md:flex-row
        justify-start
        items-start
        w-full
      "
    >
      <div
        id="learn-content-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          px-4
          md:px-8
          py-4
        "
      >
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="manual">Game Manual</TabsTrigger>
            <TabsTrigger value="docs">Game Docs</TabsTrigger>
            <TabsTrigger value="info">Game Info</TabsTrigger>
            <TabsTrigger value="guide">Game Guide</TabsTrigger>
            <TabsTrigger value="news">Game News</TabsTrigger>
          </TabsList>
          {/* Manual */}
          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Game Manual</CardTitle>
                <CardDescription>
                  Dive into the rules of Nexus TCG and learn how to play. The
                  rules may change over time, so make sure to check back often.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <iframe
                  style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                  width="575"
                  height="960"
                  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fg4cssoPU52hHs08alvRuf1%2FContent%3Fnode-id%3D2091-575%26t%3DVqQypbFoweVrSClO-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D1%253A2%26starting-point-node-id%3D2091%253A575"
                  allowFullScreen
                ></iframe>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Docs */}
          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>Game Documentation</CardTitle>
                <CardDescription>
                  Learn about the game's mechanics, card types, and more. The
                  documentation may change over time, so make sure to check back
                  often.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                TODO: Embed docs here Glossary Keywords Lore
              </CardContent>
            </Card>
          </TabsContent>
          {/* Info */}
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Game Info</CardTitle>
                <CardDescription>
                  View the latest information about the game, including patch
                  notes, updates, and more.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                Game lore Roadmap Team About
              </CardContent>
            </Card>
          </TabsContent>
          {/* Guide */}
          <TabsContent value="guide">
            <Card>
              <CardHeader>
                <CardTitle>Game Guide</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                YouTube playlist Interactive tutorial with Figma
              </CardContent>
            </Card>
          </TabsContent>
          {/* News */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>Game News</CardTitle>
                <CardDescription>
                  View the latest news about the game, including patch notes,
                  updates, and more.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                news Patch notes Updates
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div
        id="nexus-chat-bot-container"
        className="
          hidden
          lg:flex
          flex-col
          justify-between
          items-center
          max-w-[360px]
          w-full
          h-screen
          p-4
          border-l
          border-zinc-700
          overflow
          sticky
          top-0
        "
      >
        <span>Chat bot</span>
        <span>Send Message</span>
        <Input type="text" placeholder="Your message" />
      </div>
    </div>
  );
}
