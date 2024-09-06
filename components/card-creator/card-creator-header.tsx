"use client";

// Hooks
import React from "react";
import { useFormContext } from 'react-hook-form';
import { useMode } from "@/app/utils/context/CardFormModeContext";
// Utils
import clsx from "clsx";
// Components
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"

export default function CardCreatorHeader() {
  const { mode } = useMode();
  const { 
    watch, 
    setValue,
    formState: { 
      isSubmitting, 
      isValid 
    } 
  } = useFormContext();
  const cardName = watch("initialMode.name");
  const postToDiscord = watch("postToDiscord");
  
  return (
    <div
      id="card-creator-header"
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
        id="card-creator-header-content"
        className="
          flex
          flex-col
          justify-start
          items-start
          gap-0.5
        "
      >
        <h2 className="font-medium">{cardName ? cardName : "Card name"}</h2>
        <small className="opacity-50 text-xs">{mode.toUpperCase()}</small>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-2 bg-neutral-900 rounded-md px-2 py-1">
          <small
            className={clsx("text-xs", postToDiscord ? "opacity-80" : "opacity-40")}
          >
            {postToDiscord ? "Post to Discord" : "Don't post to Discord"}
          </small>
          <Switch
            id="post-to-discord"
            checked={postToDiscord} 
            onClick={() => setValue("postToDiscord", !postToDiscord)}
          />
        </div>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          size="sm"
          className="font-semibold"
        >
          Finish
        </Button>
      </div>
    </div>
  )
}