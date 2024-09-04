"use client";

// Hooks
import React from "react";
import { useFormContext } from 'react-hook-form';
// Components
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type CardFormTextBoxProps = {
  activeMode: "initial" | "anomaly"
  length: "s" | "md" | "lg" | "xl"
}

export default function CardText({ 
  activeMode,
  length, 
}: CardFormTextBoxProps) {
  const { 
    control, 
    formState: { 
      isSubmitting 
    }
  } = useFormContext();

  const MAX_LENGTH = length === "s" 
    ? 75 : length === "md" 
    ? 150 : length === "lg" 
    ? 225 : 300;

  // TODO: Add "/" for dropdown menu to add inline icons or syntax
  // TODO: Remove icon with backspace
  // TODO: Add space after each new paragraph break.
  // TODO: Make sure height is always the full available height
  // TODO: Add syntax correction for text input (based on game terminology)
  // TODO: Add spellcheck to text input
  
  return (
    <FormField
      control={control}
      name={
        activeMode === "initial" 
          ? "initialMode.text" 
          : "anomalyMode.text"
      }
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            {/* Placeholder div for text input visibility */}
            <div className="w-full h-full border border-red-500">
              <Textarea
                {...field}
                disabled={isSubmitting}
                maxLength={MAX_LENGTH}
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
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}