"use client";

// Hooks
import React, { useState, useEffect } from "react";
import { useFormContext } from 'react-hook-form';
// Components
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type CardTextProps = {
  activeMode: "initial" | "anomaly"
}

export default function CardText({ 
  activeMode,
}: CardTextProps) {
  const [maxLength, setMaxLength] = useState<number>(300)
  // const [height, setHeight] = useState<number>(200)
  const { 
    watch,
    control, 
    formState: { 
      isSubmitting 
    }
  } = useFormContext();
  const keywords = watch("initialMode.keywords")

  useEffect(() => {
    if (Array.isArray(keywords) && keywords.length >= 3) {
      setMaxLength(225)
    } else {
      setMaxLength(300)
    }
  }, [keywords])
  
  return (
    <FormField
      control={control}
      name={
        activeMode === "initial" 
          ? "initialMode.text" 
          : "anomalyMode.text"
      }
      render={({ field }) => (
        <FormItem className="w-full h-full">
          <FormControl>
            <Textarea
              {...field}
              disabled={isSubmitting}
              maxLength={maxLength}
              placeholder={`Enter ${activeMode} mode text...`}
              className="
                w-full
                h-full
                bg-transparent
                text-black
                font-medium
                text-md
                rounded-none
                outline-none
                border-none
                focus:ring-0
                focus:outline-none
                caret-black
                p-0
                card-text-input
                resize-none
              "
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}