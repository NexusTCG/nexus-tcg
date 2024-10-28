import { cache } from "react";
// Utils
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { startOfWeek, endOfWeek } from "date-fns";
// Types
import { CardDTO, CardsDTO } from "@/app/lib/types/dto";
import {
  NexusCardType,
  InitialCardType,
  AnomalyCardType,
} from "@/app/lib/types/database";

type FetchCardsOptions = {
  id?: number;
  limit?: number;
  filters?: Record<string, any>;
  order?:
    | {
        column: string;
        direction: "asc" | "desc";
      }
    | "random";
  currentWeekOnly?: boolean;
};

export const getCardsDTO = cache(
  async (options: FetchCardsOptions = {}): Promise<CardsDTO | null> => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    try {
      // Create a base query
      let query = supabase.from("nexus_cards").select(`
          *,
          initial_mode_cards(*),
          anomaly_mode_cards(*)
        `);

      // Add filter by specific card ID if provided
      if (options.id) {
        query = query.eq("id", options.id);
      }

      // Add filter for current week if specified in options
      if (options.currentWeekOnly) {
        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Starts on Monday
        const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

        query = query
          .gte("created_at", weekStart.toISOString())
          .lte("created_at", weekEnd.toISOString());
      }

      // Add additional filters if provided
      if (options.filters) {
        Object.entries(options.filters).forEach(([column, value]) => {
          if (column === "name") {
            query = query.ilike("initial_mode_cards.name", `%${value}%`);
          } else if (column === "type") {
            query = query.eq("initial_mode_cards.type", value);
          } else {
            query = query.eq(column, value);
          }
        });
      }

      // Determine sorting
      if (options.order && options.order !== "random") {
        const { column, direction } = options.order;
        const validColumns = ["created_at", "name", "type", "grade"];

        if (validColumns.includes(column)) {
          if (column === "name" || column === "type" || column === "grade") {
            query = query.order(`initial_mode_cards.${column}`, {
              ascending: direction === "asc",
            });
          } else {
            query = query.order(column, { ascending: direction === "asc" });
          }
        } else {
          console.error(`[Server] Invalid order column: ${column}`);
          query = query.order("created_at", { ascending: false });
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error(`[Server] Supabase error: ${error.message}`);
        throw new Error("Failed to fetch cards");
      }

      if (!data || data.length === 0) {
        console.log("[Server] No cards found in the database");
        return null;
      }

      let mappedData = data.map((card: any): CardDTO => {
        const nexusCard = card as NexusCardType;
        const initialCard = card.initial_mode_cards[0] as InitialCardType;
        const anomalyCard = card.anomaly_mode_cards[0] as AnomalyCardType;

        return {
          id: nexusCard.id ?? null,
          user_id: nexusCard.user_id,
          created_at: nexusCard.created_at ?? null,
          updated_at: nexusCard.updated_at ?? null,
          username: nexusCard.username ?? null,
          grade: nexusCard.grade ?? null,
          approved: nexusCard.approved ?? null,
          card_render: nexusCard.card_render ?? null,
          discord_post: nexusCard.discord_post ?? null,
          discord_post_url: nexusCard.discord_post_url ?? null,
          initialMode: initialCard ?? null,
          anomalyMode: anomalyCard ?? null,
        };
      });

      if (options.order === "random") {
        mappedData = mappedData.sort(() => Math.random() - 0.5);
      }

      if (options.limit) {
        mappedData = mappedData.slice(0, options.limit);
      }

      console.log(`[Server] Mapped ${mappedData.length} cards`);

      return mappedData;
    } catch (error) {
      console.error(
        `[Server] Unexpected error in getCardsDTO: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      throw new Error("An unexpected error occurred while fetching cards");
    }
  }
);
