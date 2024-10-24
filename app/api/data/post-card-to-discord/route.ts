import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const {
    cardId,
    cardName,
    cardCreator,
  } = await req.json();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const serverId = process.env.DISCORD_SERVER_ID;
    const channelId = process.env.DISCORD_CHANNEL_ID;
    const shareUrl = `https://play.nexus/cards/${cardId}`;

    console.log("webhookUrl: ", webhookUrl);
    console.log("serverId: ", serverId);
    console.log("channelId: ", channelId);

    if (!webhookUrl) {
      throw new Error("Discord webhook URL is not configured");
    }

    const message = {
      content: `${cardName} by ${cardCreator}!\n${shareUrl}`,
    };

    console.log("Message to Discord:", message);

    const webhookUrlWithParams = new URL(webhookUrl);
    webhookUrlWithParams.searchParams.append("wait", "true");

    const discordResponse = await fetch(webhookUrlWithParams.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const responseText = await discordResponse.text();
    console.log("Discord API response:", responseText);

    if (!discordResponse.ok) {
      throw new Error(
        `Failed to post card to Discord: ${discordResponse.status} ${responseText}`,
      );
    }

    let discordMessage;
    try {
      discordMessage = JSON.parse(responseText);
    } catch (error) {
      console.error("Failed to parse Discord response:", error);
      throw new Error("Invalid JSON response from Discord");
    }

    if (!discordMessage.id) {
      console.error("Invalid Discord response:", discordMessage);
      throw new Error("Invalid response from Discord: missing message id");
    }

    const discordPostUrl =
      `https://discord.com/channels/${serverId}/${channelId}/${discordMessage.id}`;

    // Update Supabase
    const { error } = await supabase
      .from("nexus_cards")
      .update({
        discord_post: true,
        discord_post_url: discordPostUrl,
      })
      .eq("id", cardId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      discordPostUrl,
    });
  } catch (error) {
    console.error("[Server] Error posting card to Discord", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
