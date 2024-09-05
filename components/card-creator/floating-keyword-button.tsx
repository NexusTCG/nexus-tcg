"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";

type FloatingKeywordButtonProps = {
  isVisible: boolean;
}

export default function FloatingKeywordButton({ 
  isVisible 
}: FloatingKeywordButtonProps) {
  if (!isVisible) return null;

  return (
    <DrawerTrigger asChild>
      <Button
        variant="secondary"
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        Add Keywords
      </Button>
    </DrawerTrigger>
  );
}