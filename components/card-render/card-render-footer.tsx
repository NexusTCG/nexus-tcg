import React from "react";
// Components
import { Button } from "@/components/ui/button";

export default function CardFooter() {
  return (
    <div 
        id="card-creator-footer" 
        className="
          flex 
          flex-row 
          justify-between 
          items-center 
          w-full 
          border-t 
          border-zinc-700 
          px-2 
          py-2 
          gap-2
        "
      >
        Created
        <Button>Share</Button>
        <Button>Download</Button>
      </div>
  )
}