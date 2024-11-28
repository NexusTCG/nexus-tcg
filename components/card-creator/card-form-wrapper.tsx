"use client";

// Hooks
import React from "react";
import { OverlayProvider } from "@/app/utils/context/OverlayContext";
import { ModeProvider } from "@/app/utils/context/CardModeContext";
import Overlay from "@/components/overlay";
// Types
import { ProfileDTO } from "@/app/lib/types/dto";
// Custom components
import CardForm from "@/components/card-creator/card-form";

type CardFormWrapperProps = {
  currentUserId?: string | null;
  userProfile?: ProfileDTO | null;
  isEditing?: boolean;
  cardId?: string;
  initialData?: any;
};

export default function CardFormWrapper({
  currentUserId,
  userProfile,
  isEditing,
  cardId,
  initialData,
}: CardFormWrapperProps) {
  return (
    <OverlayProvider>
      <ModeProvider>
        <CardForm
          currentUserId={currentUserId}
          userProfile={userProfile}
          isEditing={isEditing}
          cardId={cardId}
          initialData={initialData}
        />
      </ModeProvider>
      <Overlay />
    </OverlayProvider>
  );
}
