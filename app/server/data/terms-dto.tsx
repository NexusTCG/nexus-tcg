import { cache } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { TermsDTO } from "@/app/lib/types/dto";

export const getTermsDTO = cache(async (): Promise<TermsDTO[] | null> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("glossary")
      .select("term, description, type");

    if (error) {
      console.error(`[Server] Supabase error: ${error.message}`);
      throw new Error("Failed to fetch glossary terms");
    }

    if (!data || data.length === 0) {
      console.log("[Server] No glossary terms found in the database");
      throw new Error("No glossary terms found in the database");
    }

    const mappedData = data.map(
      (term): TermsDTO => ({
        name: term.term,
        description: term.description,
        type: term.type,
      })
    );

    console.log(`[Server] Mapped ${mappedData.length} glossary terms`);
    return mappedData;
  } catch (error) {
    throw new Error("Failed to process glossary terms data");
  }
});
