"use client"

// Hooks
import React from "react"
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { OverlayProvider } from "@/app/utils/context/OverlayContext"
import Overlay from "@/components/overlay"
// Utils
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import PostHogClient from "@/app/utils/posthog/posthog";
// Validation
import { zodResolver } from '@hookform/resolvers/zod';
import { CardFormSchema } from "@/app/lib/schemas/database"
import { ProfileDTO } from "@/app/lib/types/dto";
import { CardFormDataType } from "@/app/lib/types/forms";
// Components
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Custom components
import CardCreatorHeader from "@/components/card-creator/card-creator-header";
import CardCreatorFooter from "@/components/card-creator/card-creator-footer"; 
import CardFormInitial from "@/components/card-creator/card-form-initial";
import CardFormAnomaly from "@/components/card-creator/card-form-anomaly";

type CardFormProps = {
  currentUserId?: string | null;
  userProfile?: ProfileDTO | null;
}

export default function CardForm({
  currentUserId,
  userProfile
}: CardFormProps) {
  const methods = useForm({
    resolver: zodResolver(CardFormSchema),
    defaultValues: {
      user_id: currentUserId || null,
      created_at: null,
      updated_at: null,
      username: userProfile?.username || "Username",
      grade: "core",
      activeMode: "initial",
      initialMode: {
        render: null,
        name: "",
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
    watch,
    trigger,
    setValue,
    handleSubmit,
    formState: { 
      errors 
    }
  } = methods;

  const posthog = PostHogClient()
  const router = useRouter()
  const activeMode = watch("activeMode")

  const cardVariants = {
    active: { 
      y: 80, 
      zIndex: 20, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    inactive: { 
      y: 0, 
      zIndex: 10, 
      opacity: 0.6, 
      scale: 0.9,
      transition: { 
        duration: 0.3,
        opacity: { 
          duration: 0.3, 
          times: [0, 0.5, 1], 
          values: [1, 0.4, 0.6] 
        }
      }
    }
  };

  function toggleMode() {
    toast(
      activeMode === "initial" 
        ? "Editing anomaly mode!" 
        : "Editing initial mode!"
      )
    if (activeMode  === 'initial') {
      setValue("activeMode", "anomaly");
      trigger("activeMode")
      return;
    } else if (activeMode  === 'anomaly') {
      setValue('initialMode.type', 'agent');
      setValue("activeMode", "initial");
      trigger("activeMode")
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
      if (
        data.anomalyMode.uncommon && 
        data.anomalyMode.art_options.length > 0
      ) {
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
    <OverlayProvider>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col"
        >
          <div 
            id="card-creator-container" 
            className="
              flex 
              flex-col 
              justify-start 
              items-center 
              w-full 
              h-full
              min-h-[calc(100vh-10rem)]
              border 
              border-zinc-700 
              rounded-sm 
              overflow-hidden
            "
          >
            <CardCreatorHeader />
            <div 
              id="card-creator-content" 
              className="
                flex 
                flex-col 
                justify-center 
                items-center 
                w-full 
                flex-grow
                py-8 
                bg-zinc-800
                relative
                pb-36
              "
            >
              <div
                id="card-frames-wrapper"
                className="
                  flex 
                  justify-center 
                  items-center
                  w-full 
                  h-full 
                  relative 
                "
              >
                <AnimatePresence initial={false}>
                  {["anomaly", "initial"].map((mode) => (
                    <motion.div
                      key={mode}
                      variants={cardVariants}
                      initial="inactive"
                      animate={activeMode === mode ? "active" : "inactive"}
                      onClick={() => activeMode !== mode ? toggleMode() : null}
                      className={clsx(
                        "absolute inset-0 flex justify-center items-center",
                        { "card-hover-effect cursor-pointer": activeMode !== mode }
                      )}
                    >
                      {activeMode === mode ? (
                        mode === "anomaly" ? <CardFormAnomaly /> : <CardFormInitial />
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-full flex justify-center items-center">
                              {mode === "anomaly" ? <CardFormAnomaly /> : <CardFormInitial />}
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Edit {mode} mode</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <CardCreatorFooter />
          </div>
        </form>
      </FormProvider>
      <Overlay />
    </OverlayProvider>
  )
}