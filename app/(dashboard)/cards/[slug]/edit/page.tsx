import React from "react";
// Utils
import { redirect } from "next/navigation";
// Server
import { getUserProfileDTO } from "@/app/server/data/user-dto";
import { getCardsDTO } from "@/app/server/data/cards-dto";
// Validation
import { CardsDTO, CardDTO } from "@/app/lib/types/dto";
// Components
import CardFormWrapper from "@/components/card-creator/card-form-wrapper";

export default async function EditCardSlug({
  params,
}: {
  params: { slug: string };
}) {
  const profileDTO = await getUserProfileDTO();

  if (!profileDTO?.user_id) {
    redirect("/login");
  }
  // Fetch card data
  const cardsDTO: CardsDTO | null = await getCardsDTO({
    id: parseInt(params.slug, 10),
  });
  const card: CardDTO | null =
    cardsDTO && cardsDTO.length > 0 ? cardsDTO[0] : null;

  // Verify card exists
  if (!card) {
    redirect("/cards");
  }

  // Verify card ownership
  if (card.user_id !== profileDTO.user_id) {
    redirect(`/cards/${params.slug}`);
  }

  // Populate form
  const initialFormData = {
    nexus_card_data: {
      user_id: card.user_id,
      username: card.username,
      approved: card.approved,
      grade: card.grade,
      card_render: card.card_render,
    },
    initialMode: {
      name: card.initialMode.name,
      type: card.initialMode.type,
      type_sub: card.initialMode.type_sub,
      mythic: card.initialMode.mythic,
      text: card.initialMode.text,
      keywords: card.initialMode.keywords,
      lore: card.initialMode.lore,
      prompt_art: card.initialMode.prompt_art,
      art_options: card.initialMode.art_options,
      art_direction_options: card.initialMode.art_direction_options,
      art_selected: card.initialMode.art_selected,
      energy_value: card.initialMode.energy_value,
      energy_cost: card.initialMode.energy_cost,
      speed: card.initialMode.speed,
      attack: card.initialMode.attack,
      defense: card.initialMode.defense,
      reach: card.initialMode.reach,
    },
    anomalyMode: {
      name: card.anomalyMode.name,
      mythic: card.anomalyMode.mythic,
      uncommon: card.anomalyMode.uncommon,
      text: card.anomalyMode.text,
      lore: card.anomalyMode.lore,
      prompt_art: card.anomalyMode.prompt_art,
      art_options: card.anomalyMode.art_options,
      art_direction_options: card.anomalyMode.art_direction_options,
      art_selected: card.anomalyMode.art_selected,
    },
  };

  return (
    <div
      id="edit-page-container"
      className="
        flex
        flex-col
        md:flex-row
        justify-start
        items-start
        w-full
      "
    >
      <div
        id="edit-content-container"
        className="
          flex
          flex-col
          justify-start
          items-start
          w-full
          px-4
          md:px-8
          py-4
          gap-4
        "
      >
        <CardFormWrapper
          currentUserId={profileDTO.user_id}
          userProfile={profileDTO}
          isEditing={true}
          cardId={card.id?.toString()}
          initialData={initialFormData}
        />
      </div>
    </div>
  );
}
