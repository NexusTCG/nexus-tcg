"use client";

// Hooks
import React, { useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMode } from "@/app/utils/context/CardModeContext";
// Utils
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import PostHogClient from "@/app/utils/posthog/posthog";
import {
  calculateTimeAgo,
  getCardFormFromStorage,
  saveCardFormToStorage,
  clearCardFormStorage,
} from "@/app/utils/actions/actions";
// Validation
import { ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardFormSchema } from "@/app/lib/schemas/database";
import { ProfileDTO } from "@/app/lib/types/dto";
import { CardFormDataType } from "@/app/lib/types/forms";
// Components
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Custom components
const CardCreatorHeader = dynamic(
  () => import("@/components/card-creator/card-creator-header")
);
const CardCreatorFooter = dynamic(
  () => import("@/components/card-creator/card-creator-footer")
);
const CardFormInitial = dynamic(
  () => import("@/components/card-creator/card-form-initial")
);
const CardFormAnomaly = dynamic(
  () => import("@/components/card-creator/card-form-anomaly")
);

type CardFormProps = {
  currentUserId?: string | null;
  userProfile?: ProfileDTO | null;
};

export default function CardForm({
  currentUserId,
  userProfile,
}: CardFormProps) {
  const posthog = PostHogClient();
  const router = useRouter();

  const { mode, setMode } = useMode();

  const defaultFormValues = {
    nexus_card_data: {
      user_id: currentUserId || null,
      created_at: null,
      updated_at: null,
      username: userProfile?.username || "Username",
      approved: false,
      grade: "core",
    },
    initialMode: {
      render: null,
      name: "",
      type: "agent",
      type_sub: [],
      mythic: false,
      text: "",
      keywords: [],
      lore: "",
      prompt_art: "",
      art_options: [],
      art_direction_options: [],
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
      name: "",
      mythic: false,
      uncommon: false,
      text: "",
      lore: "",
      prompt_art: "",
      art_options: [],
      art_direction_options: [],
      art_selected: 0,
    },
  };

  // Load saved form data on initial render
  const savedForm = getCardFormFromStorage();

  const methods = useForm({
    resolver: zodResolver(CardFormSchema),
    defaultValues: savedForm?.formData || defaultFormValues,
  });

  const { setValue, reset, watch } = methods;

  const cardVariants = {
    active: {
      y: 80,
      zIndex: 20,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
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
          values: [1, 0.4, 0.6],
        },
      },
    },
  };

  const toggleMode = useCallback(() => {
    const newMode = mode === "initial" ? "anomaly" : "initial";
    toast(`Editing ${newMode} mode!`);
    setMode(newMode);

    if (newMode === "initial") {
      setValue("initialMode.type", "agent");
    }
  }, [mode, setMode, setValue]);

  async function onSubmit(data: CardFormDataType) {
    toast("Saving card...");
    try {
      let initialModeArtUrls: string[] = [];
      let anomalyModeArtUrls: string[] = [];

      toast("Uploading card art...");
      // Upload initial mode art

      // TEMPORARILY DISABLED
      // Remove data.initialMode.art_options check
      if (
        data.initialMode.art_options &&
        data.initialMode.art_options.length > 0
      ) {
        const response = await fetch("/api/data/upload-generated-art", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrls: data.initialMode.art_options }),
        });
        const result = await response.json();
        initialModeArtUrls = result.uploadedUrls;
      }

      // Upload anomaly mode art if it exists
      if (
        data.anomalyMode.uncommon &&
        data.anomalyMode.art_options &&
        data.anomalyMode.art_options.length > 0
      ) {
        const response = await fetch("/api/data/upload-generated-art", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrls: data.anomalyMode.art_options }),
        });
        const result = await response.json();
        anomalyModeArtUrls = result.uploadedUrls;
      }

      const initialModeArtSelectedIndex =
        typeof data.initialMode.art_selected === "number"
          ? data.initialMode.art_selected
          : 0;

      const anomalyModeArtSelectedIndex =
        typeof data.anomalyMode.art_selected === "number"
          ? data.anomalyMode.art_selected
          : 0;

      // Update form data
      const cardData = {
        nexus_card_data: {
          user_id: data.nexus_card_data.user_id,
          username: data.nexus_card_data.username,
          approved: data.nexus_card_data.approved ?? false,
          grade: data.nexus_card_data.grade,
        },
        initialMode: {
          render: data.initialMode.render,
          name: data.initialMode.name,
          type: data.initialMode.type,
          type_sub: data.initialMode.type_sub,
          mythic: data.initialMode.mythic,
          text: data.initialMode.text,
          keywords: data.initialMode.keywords,
          lore: data.initialMode.lore,
          prompt_art: data.initialMode.prompt_art,
          art_options: initialModeArtUrls,
          art_direction_options:
            data.initialMode.art_direction_options?.map((opt, index) => ({
              section: opt.section,
              option: opt.option,
              url: initialModeArtUrls[index] ?? null,
            })) || [],
          art_selected: initialModeArtSelectedIndex,
          energy_value: data.initialMode.energy_value,
          energy_cost: data.initialMode.energy_cost,
          speed: data.initialMode.speed,
          attack: data.initialMode.attack,
          defense: data.initialMode.defense,
          reach: data.initialMode.reach,
        },
        anomalyMode: {
          render: data.anomalyMode.render,
          name: data.anomalyMode.name,
          mythic: data.anomalyMode.mythic,
          uncommon: data.anomalyMode.uncommon,
          text: data.anomalyMode.text,
          lore: data.anomalyMode.lore,
          prompt_art: data.anomalyMode.prompt_art,
          art_options: anomalyModeArtUrls,
          art_direction_options:
            data.anomalyMode.art_direction_options?.map((opt, index) => ({
              section: opt.section,
              option: opt.option,
              url: anomalyModeArtUrls[index] ?? null,
            })) || [],
          art_selected: anomalyModeArtSelectedIndex,
        },
      };

      // Debugging
      // console.log("Submitting card data:", JSON.stringify(cardData, null, 2));

      // Insert form data
      const insertResponse = await fetch("/api/data/submit-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      const insertData = await insertResponse.json();

      console.log("Server response:", insertData);

      if (insertResponse.ok && insertData.success && insertData.data?.id) {
        // Capture event
        (posthog.capture as any)("card_created", {
          distinctId: insertData.data.id,
          creator: insertData.data.username,
        });

        toast("Card saved successfully!");
        toast("Redirecting...");

        clearCardFormStorage();
        router.push(`/cards/${insertData.data.id}?mode=initial`);
      } else {
        toast("Failed to save card!");
        console.error("Card submit error:", insertData.error);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Zod validation error:", error);

        const invalidFields = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        console.log("Invalid fields:", invalidFields);

        invalidFields.forEach(({ field, message }) => {
          toast.error(`${field}: ${message}`);
        });
      } else {
        // Handle other types of errors
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    }
  }

  // Save form data to local storage on change
  useEffect(() => {
    const subscription = watch((formData) => {
      saveCardFormToStorage(formData);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Check for saved draft on mount
  useEffect(() => {
    const savedForm = getCardFormFromStorage();
    if (savedForm) {
      const timeAgo = calculateTimeAgo(savedForm.lastUpdated);

      toast.info("Found a saved draft from " + timeAgo, {
        action: {
          label: "Discard",
          onClick: () => {
            clearCardFormStorage();
            reset(defaultFormValues);
            toast.success("Draft discarded");
          },
        },
        duration: 10000,
      });
    }
  }, [reset, defaultFormValues]);

  // Debugging
  // useEffect(() => {
  //   if (!isValid) {
  //     try {
  //       CardFormSchema.parse(form);
  //     } catch (error) {
  //       if (error instanceof ZodError) {
  //         console.log('Zod validation error:', error);

  //         const invalidFields = error.errors.map(err => ({
  //           field: err.path.join('.'),
  //           message: err.message
  //         }));
  //         console.log('Invalid fields:', invalidFields);

  //         invalidFields.forEach(({ field, message }) => {
  //           toast.error(`${field}: ${message}`);
  //         });
  //       }
  //     }
  //   }
  // }, [form, isValid]);

  return (
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
                {["anomaly", "initial"].map((cardMode) => (
                  <motion.div
                    key={cardMode}
                    variants={cardVariants}
                    initial="inactive"
                    animate={mode === cardMode ? "active" : "inactive"}
                    className="absolute inset-0 flex justify-center items-center"
                  >
                    {mode === cardMode ? (
                      cardMode === "anomaly" ? (
                        <CardFormAnomaly />
                      ) : (
                        <CardFormInitial />
                      )
                    ) : (
                      // The tooltip is not working
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              onClick={() => toggleMode()}
                              className="w-full h-full flex justify-center items-center cursor-pointer"
                            >
                              {cardMode === "anomaly" ? (
                                <CardFormAnomaly />
                              ) : (
                                <CardFormInitial />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Edit {cardMode} mode</p>
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
  );
}
