"use client";

// Hooks
import { useEffect, useRef, useState } from "react";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// Validation
import {
  SubscriptionDataType,
  SubscriptionPlanType,
} from "@/app/lib/types/components";
import { ProfileDTO } from "@/app/lib/types/dto";

// --> UTILS <-- //

export function useClickAway(handler: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
}

// --> STRIPE <-- //

export function useSubscription(): SubscriptionDataType {
  const [userId, setUserId] = useState<string | null>(null);
  const [plan, setPlan] = useState<SubscriptionPlanType>("free");
  const [credits, setCredits] = useState<number>(0);
  const [refreshDate, setRefreshDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  async function fetchSubscriptionData() {
    try {
      const response = await fetch("/api/data/fetch/user-dto");

      if (!response.ok) {
        throw new Error("Failed to fetch user profile.");
      }

      const profile: ProfileDTO = await response.json();
      setUserId(profile.user_id);
      setPlan(profile.plan ? profile.plan : "free");
      setCredits(profile.credits ? profile.credits : 0);
    } catch (error) {
      setError(error as Error);
      console.error("Error fetching subscription data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Calculate days until credits refresh
  function getDaysUntilRefresh(): number | null {
    if (!refreshDate) return null;

    const now = new Date();
    const refresh = new Date(refreshDate);
    const diffTime = refresh.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : null;
  }

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("profile_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new.plan) {
            setPlan(payload.new.plan !== "free" ? payload.new.plan : "free");
            setCredits(payload.new.credits ? payload.new.credits : 0);
          } else {
            fetchSubscriptionData();
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  // Initial Fetch
  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  return {
    plan,
    credits,
    daysUntilRefresh: getDaysUntilRefresh(),
    isLoading,
    error,
    refreshSubscription: fetchSubscriptionData,
  };
}
