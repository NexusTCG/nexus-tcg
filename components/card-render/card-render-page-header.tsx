import React from "react";
// Types
import { ProfileDTO, CardDTO } from "@/app/lib/types/dto";
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// Custom components
// import CardVotes from "@/components/card-render/card-render-votes";
import ShareButtonDiscord from "@/components/card-render/share-button-discord";
// Icons
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";

type CardRenderPageHeaderProps = {
  user?: ProfileDTO | null;
  card: CardDTO;
  mode: "initial" | "anomaly";
};

export default function CardRenderPageHeader({
  user,
  card,
  mode,
}: CardRenderPageHeaderProps) {
  const isCardCreator = user?.user_id === card.user_id;

  return (
    <div
      id="card-render-header"
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        px-4
        py-2
        bg-zinc-900
        border-b
        border-zinc-700
      "
    >
      <div
        id="card-render-header-content"
        className="
          flex
          flex-col
          justify-start
          items-start
          gap-0.5
        "
      >
        <div
          id="card-render-header-content-name"
          className="
            flex
            flex-row
            justify-start
            items-baseline
            gap-2
          "
        >
          <h2 className="font-medium">
            {card.initialMode.name ? card.initialMode.name : "Card name"}
          </h2>
          {user?.user_id === card.user_id && (
            <div
              className="
                flex
                flex-row
                justify-start
                items-baseline
                gap-1
              "
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <MdOutlineEdit
                      className="
                        w-[16px]
                        h-[16px]
                        opacity-40
                        hover:opacity-60
                        cursor-pointer
                      "
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Edit{" "}
                    {mode === "initial"
                      ? card.initialMode.name
                      : card.anomalyMode.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MdOutlineDelete
                          className="
                            w-[16px]
                            h-[16px]
                            opacity-40
                            hover:opacity-60
                            cursor-pointer
                          "
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        Delete{" "}
                        {mode === "initial"
                          ? card.initialMode.name
                          : card.anomalyMode.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this card?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {card.initialMode.name}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        <small className="opacity-60 text-xs">{mode.toUpperCase()} MODE</small>
      </div>
      {card.id && (
        <ShareButtonDiscord
          cardId={card.id}
          isCardCreator={isCardCreator}
          discordPost={card.discord_post ?? false}
          discordPostUrl={card.discord_post_url ?? null}
        />
      )}
    </div>
  );
}
