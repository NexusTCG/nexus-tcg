"use server";

import { NextResponse } from "next/server";
import { getKeywordsDTO } from "@/app/server/data/keywords-dto";

export async function GET() {
  try {
    const keywords = await getKeywordsDTO();

    // console.log(`[Server] Keywords fetched: ${JSON.stringify(keywords)}`);

    if (!keywords || keywords.length === 0) {
      return NextResponse.json({
        message: "No keywords found",
        data: [],
      });
    }

    return NextResponse.json(keywords);
  } catch (error) {
    console.error(
      `[Server] Error fetching keywords: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return NextResponse.json({
      error: "Failed to fetch keywords",
      details: error instanceof Error ? error.message : String(error),
    }, {
      status: 500,
    });
  }
}
