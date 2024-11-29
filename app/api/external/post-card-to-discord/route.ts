import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
// Server
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Validation
import { CardDTO, CardsDTO } from "@/app/lib/types/dto";

export async function POST(req: NextRequest) {
  const { cardId } = await req.json();

  if (!cardId) {
    console.log("[Server] No card ID provided");
    return NextResponse.json({ error: "Card ID is required" }, { status: 400 });
  }

  // Fetch card based on ID
  const cardsDTO: CardsDTO | null = await getCardsDTO({ id: cardId });
  const card: CardDTO | null = cardsDTO?.length === 1 ? cardsDTO?.[0] : null;

  if (!card) {
    console.log("[Server] Card not found");
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    const DISCORD_FORUM_CHANNEL_ID = process.env.DISCORD_FORUM_CHANNEL_ID;

    if (!DISCORD_BOT_TOKEN || !DISCORD_FORUM_CHANNEL_ID) {
      console.log(
        "[Server] Discord bot token or forum channel ID is not configured",
      );
      throw new Error(
        "Discord bot token or forum channel ID is not configured",
      );
    }

    // Helper function to get tags that match card properties
    const getRelevantTagIds = (
      availableTags: any[],
      cardProperties: string[],
    ): string[] => {
      return availableTags
        .filter((tag) => cardProperties.includes(tag.name))
        .map((tag) => tag.id);
    };

    // Get available forum tags
    const tagsResponse = await fetch(
      `https://discord.com/api/v10/channels/${DISCORD_FORUM_CHANNEL_ID}/threads/tags`,
      {
        headers: {
          "Authorization": `Bot ${DISCORD_BOT_TOKEN}`,
        },
      },
    );

    if (!tagsResponse.ok) {
      console.log("[Server] Failed to fetch forum tags");
      throw new Error("Failed to fetch forum tags");
    }

    const forumTags = await tagsResponse.json();

    // Helper function to check if a card is a void card
    const isVoidCard = (energyCost: Record<string, number>): boolean => {
      return Object.values(energyCost).every((value) => value === 0);
    };

    // Prepare tag properties
    const tagProperties = [
      card.initialMode.type,
      card.grade,
    ];

    // Add energy type to tag properties
    const energyCost = card.initialMode.energy_cost;
    if (isVoidCard(energyCost)) {
      // If no energy cost, add "Void" tag
      tagProperties.push("Void");
    } else {
      // If energy cost, add energy type tags
      Object.entries(energyCost)
        .filter(([_, value]) => value > 0)
        .forEach(([type]) => {
          tagProperties.push(type.charAt(0).toUpperCase() + type.slice(1));
        });
    }

    // Get relevant tag IDs
    const appliedTags = getRelevantTagIds(
      forumTags,
      tagProperties.filter((tag): tag is string =>
        tag !== null && tag !== undefined
      ),
    );

    // Prepare card data
    const cardUrl = `https://play.nexus/cards/${card.id}`;
    const cardCreatedAt = card.created_at;
    const cardName = card.initialMode.name;
    const cardCreator = card.username;
    const cardRender = card.card_render;
    const cardType = card.initialMode.type;
    const cardGrade = card.grade;

    // Create formum post with rich embed
    const response = await fetch(
      `https://discord.com/api/v10/channels/${DISCORD_FORUM_CHANNEL_ID}/threads`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bot ${DISCORD_BOT_TOKEN}`,
        },
        body: JSON.stringify({
          name: cardName,
          applied_tags: appliedTags,
          message: {
            content:
              `**${cardName}** by ${cardCreator} - ${cardCreatedAt}\n\n${cardUrl}`,
          },
          embeds: [{
            title: cardName,
            url: cardUrl,
            image: {
              url: cardRender,
            },
            fields: [
              {
                name: "Type",
                value: cardType,
                inline: true,
              },
              {
                name: "Grade",
                value: cardGrade,
                inline: true,
              },
              {
                name: "Creator",
                value: cardCreator,
                inline: true,
              },
            ],
            color: 0x2ecc71,
          }],
        }),
      },
    );

    if (!response.ok) {
      console.log("[Server] Failed to create Discord thread");
      throw new Error(`Discord API error: ${response.statusText}`);
    }

    const result = await response.json();
    const discordPostUrl =
      `https://discord.com/channels/${result.guild_id}/${DISCORD_FORUM_CHANNEL_ID}/${result.id}`;

    // Update card record with Discord post URL
    const { error: updateError } = await supabase
      .from("nexus_cards")
      .update({
        discord_post: true,
        discord_post_url: discordPostUrl,
      })
      .eq("id", cardId);

    if (updateError) {
      console.log("[Server] Failed to update card record");
      throw new Error(`Supabase error: ${updateError.message}`);
    }

    return NextResponse.json({
      success: true,
      discordPostUrl,
    });
  } catch (error) {
    console.error("[Server] Error posting card to Discord:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
