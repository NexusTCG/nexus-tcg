"use client"

// Hooks
import React from "react"
import { OverlayProvider } from "@/app/utils/context/OverlayContext"
import { ModeProvider } from "@/app/utils/context/CardModeContext"
import Overlay from "@/components/overlay"
// Types
import { ProfileDTO } from "@/app/lib/types/dto";
// Custom components
import CardForm from "@/components/card-creator/card-form"

type CardFormWrapperProps = {
  currentUserId?: string | null;
  userProfile?: ProfileDTO | null;
}

export default function CardFormWrapper({
  currentUserId,
  userProfile
}: CardFormWrapperProps) {
  
  return (
    <OverlayProvider>
      <ModeProvider>
        <CardForm
          currentUserId={currentUserId}
          userProfile={userProfile}
        />
      </ModeProvider>
      <Overlay />
    </OverlayProvider>
  )
}