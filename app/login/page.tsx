import React from "react";
import Image from "next/image";
import OAuthButton from "@/components/oauth-button";
import NexusIconWhite from "@/public/brand-assets/nexus-icon-white.svg";

export default function LoginPage() {
  return (
    <div
      id="login-page-container"
      className="
        flex
        flex-col
        flex-grow
        justify-center
        items-center
        w-full
        h-full
        pb-24
      "
    >
      <div
        id="login-content-container"
        className="
          flex
          flex-col
          justify-center
          items-center
          max-w-[480px]
          w-full
          rounded-lg
          border
          border-zinc-700
          overflow-hidden
          shadow-md
        "
      >
        <div
          id="login-header-container"
          className="
            flex
            flex-row
            justify-between
            items-center
            w-full
            px-4
            py-3
            bg-zinc-900
            border-b
            border-zinc-700
          "
        >
          <Image
            src={NexusIconWhite}
            alt="Nexus TCG icon"
            width={32}
            height={32}
          />
          <h4>Login to Nexus</h4>
        </div>
        <div
          id="login-buttons-container"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            gap-4
            p-4
            pb-6
            bg-zinc-800
          "
        >
          {["Google", "Discord", "Twitch"].map((provider: string) => (
            <OAuthButton
              key={provider}
              cta={`Log in with ${provider}`}
              provider={provider.toLowerCase() as "google" | "discord" | "twitch" | "github" | null}
              disabled={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};