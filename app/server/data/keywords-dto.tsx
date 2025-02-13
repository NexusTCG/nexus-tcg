import { cache } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { KeywordDTO, KeywordsDTO } from "@/app/lib/types/dto";

export const getKeywordsDTO = cache(async (): Promise<KeywordsDTO | null> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("keywords")
      .select("name, type, syntax, reminder, tip");

    if (error) {
      console.error(`[Server] Supabase error: ${error.message}`);
      throw new Error("Failed to fetch keywords");
    }

    if (!data || data.length === 0) {
      console.log("[Server] No keywords found in the database");
      throw new Error("No keywords found in the database");
    }

    const mappedData = data.map(
      (keyword): KeywordDTO => ({
        name: keyword.name,
        syntax: keyword.syntax,
        reminder: keyword.reminder,
        type: keyword.type,
        tip: keyword.tip,
      })
    );

    console.log(`[Server] Mapped ${mappedData.length} keywords`);
    return mappedData;
  } catch (error) {
    throw new Error("Failed to process keywords data");
  }
});
