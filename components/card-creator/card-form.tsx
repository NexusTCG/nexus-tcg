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
import { CardFormSchema } from "@/app/lib/schemas/database"
import { ProfileDTO } from "@/app/lib/types/dto";
import { CardFormDataType } from "@/app/lib/types/forms";
// Actions
import { uploadGeneratedArt } from "@/app/server/actions";
// Components
import { toast } from "sonner";
// Custom components
import CardCreatorHeader from "@/components/card-creator/card-creator-header";
import CardCreatorFooter from "@/components/card-creator/card-creator-footer"; 
import CardFormArt from "@/components/card-creator/card-form-art"
import CardFormText from "@/components/card-creator/card-form-text"
import CardContainer from "@/components/card-creator/card-container";
import CardFormHeader from "@/components/card-creator/card-form-header";
import CardFormStats from "@/components/card-creator/card-form-stats";

const currentCardEnergy = "light" // TODO: Dynamically determine based on energy_cost

type CardFormProps = {
  currentUserId?: string | null;
  userProfile?: ProfileDTO | null;
}

export default function CardForm({
  currentUserId,
  userProfile
}: CardFormProps) {
  // Move to child client component
  const [activeMode, setActiveMode] = useState<'initial' | 'anomaly'>('initial');

  const methods = useForm({
    resolver: zodResolver(CardFormSchema),
    defaultValues: {
      id: null,
      user_id: currentUserId || null,
      created_at: null,
      updated_at: null,
      username: userProfile?.username || "Username",
      grade: "core",
      initialMode: {
        render: null,
        name: "Card name",
        type: "agent",
        type_sub: [],
        type_super: null,
        mythic: false,
        text: [],
        lore: null,
        prompt_art: null,
        art_options: [],
        art_selected: 0,
        energy_value: 0,
        energy_cost: {
          light: 0,
          storm: 0,
          dark: 0,
          chaos: 0,
          growth: 0,
          void: 0,
        },
        speed: 1,
        attack: 0,
        defense: 0,
        reach: false,
      },
      anomalyMode: {
        render: null,
        name: "Common Anomaly",
        mythic: false,
        uncommon: false,
        text: [],
        lore: null,
        prompt_art: null,
        art_options: [],
        art_selected: 0,
      }
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
      setValue('initialMode.type', 'anomaly');
      setActiveMode('anomaly');
      return;
    } else if (activeMode === 'anomaly') {
      setValue('initialMode.type', 'agent');
      setActiveMode('anomaly');
      return;
    }
  };

  async function onSubmit(
    data: CardFormDataType
  ) {
    toast("Saving card...")
    try {
      let initialModeArtUrls: string[] = [];
      let anomalyModeArtUrls: string[] = [];

      // Upload initial mode art
      if (data.initialMode.art_options.length > 0) {
        const response = await fetch('/api/data/upload-generated-art', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrls: data.initialMode.art_options }),
        });
        const result = await response.json();
        initialModeArtUrls = result.uploadedUrls;
      }

      // Upload anomaly mode art if it exists
      if (data.anomalyMode.uncommon && data.anomalyMode.art_options.length > 0) {
        const response = await fetch('/api/data/upload-generated-art', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrls: data.anomalyMode.art_options }),
        });
        const result = await response.json();
        anomalyModeArtUrls = result.uploadedUrls;
      }
      
      // Update form data
      const cardData = {
        ...data,
        initialMode: {
          ...data.initialMode,
          art_selected: initialModeArtUrls[data.initialMode.art_selected] || null,
        },
        anomalyMode: {
          ...data.anomalyMode,
          art_selected: anomalyModeArtUrls[data.anomalyMode.art_selected] || null,
        },
      };
  
      // Insert form data
      const insertResponse = await fetch("/api/data/submit-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });
  
      const insertData = await insertResponse.json();
  
      if (insertData.ok && insertData.data) {
        // Capture event
        (posthog.capture as any)("card_created", {
          distinctId: insertData.data.id,
          creator: insertData.data.username,
        });
  
        toast("Card saved successfully!");
        setTimeout(() => {
          toast("Redirecting...");
          router.push(`/cards/${insertData.data.id}`);
        }, 2000);
      } else {
        toast("Failed to save card!");
        console.error("Card submit error:", insertData.error);
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
          <CardCreatorHeader activeMode={activeMode} />
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