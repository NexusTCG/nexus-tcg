"use client"

// Hooks
import React, { useState } from "react"
import { 
  useForm, 
  FormProvider 
} from 'react-hook-form';
import { useRouter } from "next/navigation";
// Utils
import PostHogClient from "@/app/utils/posthog/posthog";
// Validation
import { zodResolver } from '@hookform/resolvers/zod';
import { InitialModeCardSchema, AnomalyModeCardSchema } from '@/app/lib/schemas/database';
import { ProfileDTO } from "@/app/lib/types/dto";
import { CardFormDataType } from "@/app/lib/types/forms";
// Custom components
import CardCreatorHeader from "@/components/card-creator/card-creator-header";
import CardCreatorFooter from "@/components/card-creator/card-creator-footer"; 
import CardFormArt from "@/components/card-creator/card-form-art"
import CardFormText from "@/components/card-creator/card-form-text"
import CardContainer from "@/components/card-creator/card-container";
import CardFormHeader from "@/components/card-creator/card-form-header";
import CardFormStats from "@/components/card-creator/card-form-stats";
// Components
import { toast } from "sonner";
import { FaPersonThroughWindow } from "react-icons/fa6";

const cardSchema = InitialModeCardSchema.merge(AnomalyModeCardSchema);

// TODO: Replace with dynamic data
const cardArtUrl = "https://nxqwqvpgdaksxhkhkiem.supabase.co/storage/v1/object/public/card-art/card-art/1721896579240-flda1vy7c69.png"
const cardName = "Card Name"
const cardCreator = "Card Creator"
const currentCardEnergy = "light" // TODO: Dynamically determine based on energy_cost

type CardFormProps = {
  currentUserId?: string | null;
  userProfile?: ProfileDTO | null;
}

export default function CardForm({
  currentUserId,
  userProfile
}: CardFormProps) {
  const [activeMode, setActiveMode] = useState<'initial' | 'anomaly'>('initial');

  const methods = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      id: null,
      user_id: currentUserId || null,
      anomaly_mode_card_id: null,
      created_at: null,
      updated_at: null,
      username: userProfile?.username || "Username",
      name: "Card name",
      type: "agent",
      type_sub: [],
      type_super: null,
      grade: "core",
      text: [],
      lore: null,
      prompt_art: null,
      art_options: ["/images/default-art.jpg"],
      render: null,
      energy_value: 0,
      energy_cost: {
        light: 0,
        storm: 0,
        dark: 0,
        chaos: 0,
        growth: 0,
        void: 0,
      },
      energy_types: {
        light: "light",
        storm: "storm",
        dark: "dark",
        chaos: "chaos",
        growth: "growth",
        void: "void",
      },
      speed: 1,
      attack: 0,
      defense: 0,
      range: false,
    }
  });

  const { 
    setValue,
    handleSubmit,
    formState: { 
      errors 
    }
  } = methods;

  const posthog = PostHogClient()
  const router = useRouter()

  function toggleMode() {
    if (activeMode === 'initial') {
      setValue('type', 'anomaly');
      setActiveMode('initial');
      return;
    } else if (activeMode === 'anomaly') {
      setValue('type', 'agent');
      setActiveMode('anomaly');
      return;
    }
  };

  async function onSubmit(
    data: CardFormDataType // Update data type
  ) {
    toast("Saving card...")
    // TODO: Log in PostHog
    try {
      // Upload generated art (array) to supabase storage
      // Get the selected art for initial and anomaly modes
      // const uploadData = await uploadResponse.json() // Placeholder
      
      if (uploadData.im_art & uploadData.am_art) {
        const insertResponse = await fetch("/api/data/submit-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            im_art: uploadData.im_art,
            am_art: uploadData.am_art,
          }),
        })

        const insertData = await insertResponse.json();

        if (
          insertData.ok &&
          insertData.data
        ) {
          // posthog.capture("card_created", {
          //   distinctId: insertData.data.id,
          //   creator: insertData.data.username,
          // })

          toast("Card saved successfully!")
          setTimeout(() => {
            toast("Redirecting...")
            router.push(`/cards/${insertData.data.id}`)
          }, 2000)
        } else {
          toast("Failed to save card!")
          // TODO: Log error
        }
      }

    } catch (error) {
      toast(`Error saving card: ${error}`)
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full"
      >
        <div 
          id="card-creator-container" 
          className="
            flex 
            flex-col 
            justify-start 
            items-center 
            w-full 
            border 
            border-zinc-700 
            rounded-sm 
            overflow-hidden
          "
        >
          <CardCreatorHeader  />
          <div 
            id="card-creator-content" 
            className="
              flex 
              flex-col 
              justify-center 
              items-center 
              w-full 
              py-8 
              bg-zinc-800
            "
          >
            <CardContainer>
              <CardFormHeader energy={currentCardEnergy} />
              <div
                id="card-content-container"
                className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  w-full
                  h-full
                  px-2
                  border-x
                "
              >
                <CardFormArt />
                {/* TODO: Turn into component. Keyword select + text input */}
                <div
                  id="card-text-outer-container"
                  className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    w-full
                    h-full
                    p-2
                    pb-3
                    -mt-4
                  "
                >
                  <div
                    id="card-text-outer-container"
                    className="
                      flex
                      flex-col
                      justify-center
                      items-center
                      w-full
                      h-full
                      p-1
                      bg-yellow-500
                      border-2
                      shadow-sm
                      shadow-black/50
                      rounded-sm
                    "
                  >
                    <CardFormText />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 z-10">
                <CardFormStats />
              </div>
            </CardContainer>
          </div>
          <CardCreatorFooter />
        </div>
      </form>
    </FormProvider>
  )
}