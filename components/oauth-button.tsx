"use client";

// Hooks
import React, { 
  useState, 
  useEffect 
} from "react";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// Components
import { Button } from "@/components/ui/button"
// Icons
import { 
  FaGoogle,
  FaDiscord, 
  FaTwitch 
} from "react-icons/fa";

type NewAuthButtonProps = {
  cta: string | null;
  provider: "google" | "discord" | "twitch" | null;
  disabled?: boolean;
};

export default function OAuthButton({
  cta,
  provider,
  disabled = false,
}: NewAuthButtonProps) {
  const [providerIcon, setProviderIcon] = useState<React.ReactNode | null>(null);

  const supabase = createClient();

  // Sign in handler
  async function handleSignIn() {
    if (provider !== null) {
      const { error } = await supabase
        .auth
        .signInWithOAuth({
          provider: provider,
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback`,
          },
        });
        
        // TODO: Add tracking in PostHog

      if (error) {
        console.log(error);
      };
    };
  };

  useEffect(() => {
    switch (provider) {
      case "google":
        setProviderIcon(<FaGoogle className="h-[1.2rem] w-[1.2rem]" />);
        break;
      case "discord":
        setProviderIcon(<FaDiscord className="h-[1.2rem] w-[1.2rem]" />);
        break;
      case "twitch":
        setProviderIcon(<FaTwitch className="h-[1.2rem] w-[1.2rem]" />);
        break;
      default:
        setProviderIcon(null);
        break;
    }
  }, [provider]);

  return (
    <Button
      onClick={handleSignIn}
      disabled={disabled}
      className="
        flex
        flex-row
        justify-start
        items-center
        gap-2
        w-full
      "
    >
      {providerIcon}
      {cta}
    </Button>
  );
}