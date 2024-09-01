"use client"

import React, { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from 'react-hook-form';
// Utils
import clsx from "clsx"
import { calculateBgColor } from "@/app/utils/actions/actions";
// Validation
import { KeywordsDTO } from "@/app/lib/types/dto";
// Components
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type CardFormHeaderProps = {
  activeMode: "initial" | "anomaly"
}

export default function CardFormText({
  activeMode
}: CardFormHeaderProps) {
  const [keywords, setKeywords] = useState<KeywordsDTO[] | null> (null)
  
  const { watch,  control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "initialMode.keywords"
  });

  const energyCost = watch('initialMode.energy_cost');
  const bgColorClass50 = activeMode === "anomaly" ? null : calculateBgColor(energyCost, 50)[0];
  
  const selectedKeywords = watch("initialMode.keywords") || [];

  function handleKeywordSelect(
    value: string, 
    index: number
  ) {
    if (index < fields.length) {
      fields[index] = { id: value }; // Update existing field
    } else {
      append({ id: value }); // Add new field
    }
  }

  useEffect(() => {
    async function fetchKeywords() {
      try {
        const response = await fetch('/api/data/fetch-keywords');
        if (!response.ok) {
          throw new Error('Failed to fetch keywords');
        }
        const data = await response.json();
        console.log("Keywords: ", data);
        setKeywords(data);
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    }
    fetchKeywords();
  }, []);

  return (
    <div
      id="card-form-text-container"
      style={{ 
        fontSize: "0.85rem" 
      }}
      className={clsx(
        "flex flex-col justify-start items-star w-full h-full gap-2 p-2 text-black border border-b-2",
        bgColorClass50 || "bg-neutral-50",
      )}
    >
      {activeMode === "initial" ? (
        <>
          {[...Array(4)].map((_, index) => (
            index < fields.length || index === 0 ? (
              <Select 
                key={index} 
                onValueChange={(value) => handleKeywordSelect(value, index)}
                value={fields[index]?.id || ""}
              >
                <SelectTrigger className="w-full rounded-sm text-white">
                  <SelectValue placeholder={`Select keyword ${index + 1}`} />
                </SelectTrigger>
                <SelectContent className="flex flex-wrap justify-start w-full max-w-[312px] text-white">
                  {keywords && keywords
                    .filter(kw => !selectedKeywords.includes(kw.name))
                    .map(keyword => (
                      <SelectItem key={keyword.id} value={keyword.name || ''}>
                        <p
                          className={clsx("font-semibold",
                            {
                              "text-blue-500": keyword.type?.toLowerCase() === "persistent",
                              "text-amber-500": keyword.type?.toLowerCase() === "reactive",
                              "text-emerald-500": keyword.type?.toLowerCase() === "active",
                            }
                          )}
                        >
                          {keyword.name}
                        </p>
                        <p
                          className={clsx("italic font-light text-xs",
                            {
                              "text-blue-500/80": keyword.type?.toLowerCase() === "persistent",
                              "text-amber-500/80": keyword.type?.toLowerCase() === "reactive",
                              "text-emerald-500/80": keyword.type?.toLowerCase() === "active",
                            }
                          )}
                        >
                          ({keyword.reminder})
                        </p>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ) : null
          ))}
        </>
      ) : (
        // TODO: Register in form
        <Textarea
          placeholder="Some card text..."
          className="
            w-full
            h-full 
            p-0 
            text-bd
            text-black 
            rounded-none
            bg-transparent 
            resize-none 
            border-none
            focus:bg-black/5
            focus:border-none
            focus-outline-none
            focus-visible:ring-0 
            focus-visible:ring-offset-0
          "
        />
      )}
    </div>
  )
}