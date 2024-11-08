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
  filter?: string;
  order?:
    | {
        column: string;
        direction: "asc" | "desc";
      }
    | "random";
  currentWeekOnly?: boolean;
  approvedOnly?: boolean;
};

export const getCardsDTO = cache(
  async (options: FetchCardsOptions = {}): Promise<CardsDTO | null> => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    try {
      // Create a base query
      let query = supabase.from("nexus_cards").select(`
          id,
          user_id,
          created_at,
          updated_at,
          username,
          grade,
          approved,
          card_render,
          discord_post,
          discord_post_url,
          initial_mode_cards!inner (
            id,
            card_id,
            render,
            name,
            type,
            type_sub,
            mythic,
            text,
            lore,
            prompt_art,
            energy_value,
            energy_cost,
            speed,
            attack,
            defense,
            reach,
            art_selected,
            art_direction_options,
            keywords,
            art_options
          ),
          anomaly_mode_cards!inner (
            id,
            card_id,
            render,
            name,
            mythic,
            uncommon,
            text,
            lore,
            prompt_art,
            art_selected,
            art_direction_options,
            art_options
          )
        `);

      // Add filter by specific card ID if specified
      if (options.id) {
        query = query.eq("id", options.id);
      }

      // Add filter for current week if specified
      if (options.currentWeekOnly) {
        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Starts on Monday
        const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

        query = query
          .gte("created_at", weekStart.toISOString())
          .lte("created_at", weekEnd.toISOString());
      }

      // Filter for specific card type if specified
      if (options.filter && options.filter !== "all") {
        query = query.eq("initial_mode_cards.type", options.filter);
      }

      // Filter for approved cards only if specified
      if (options.approvedOnly) {
        query = query.eq("approved", true);
      }

      // Order the cards if specified
      if (options.order && options.order !== "random") {
        const { column, direction } = options.order;
        const validColumns = ["id", "name", "type", "grade"];

        if (validColumns.includes(column)) {
          query = query.order(column, { ascending: direction === "asc" });
        }
      }

      // Log query for debugging
      console.log("[Server] Query:", query);

      // Execute the query
      const { data, error } = await query;

      if (error) {
        console.error(`[Server] Supabase error: ${error.message}`);
        throw new Error("Failed to fetch cards");
      }

      if (!data || data.length === 0) {
        console.log("[Server] No cards found in the database");
        return null;
      }

      // Map each card to CardDTO
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

      // Randomize order if specified
      if (options.order === "random") {
        mappedData = mappedData.sort(() => Math.random() - 0.5);
      }

      // Limit the number of cards if specified
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
