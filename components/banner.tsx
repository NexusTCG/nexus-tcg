import React from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
// Icons
import { 
  MdInfoOutline,
  MdOutlineWarningAmber,
  MdErrorOutline,
  MdCheck,
} from "react-icons/md";

type BannerProps = {
  type: "info" | "warning" | "error" | "success",
  autoExpire: boolean,
  message: string,
  cta?: string | null,
} 

export default function Banner({ 
  type,
  autoExpire,
  message,
  cta,
}: BannerProps) {

  // TODO: Implement auto-expire functionality

  return (
    <div
      id="banner-container"
      className={clsx("flex flex-row justify-between items-center w-full gap-2 p-2 rounded-sm border",
        {
          "bg-blue-700/10 hover:bg-blue-700/5 border-blue-500/20 hover:border-blue-500/20 text-blue-500 hover:text-blue-600": type === "info",
          "bg-yellow-700/10 hover:bg-yellow-700/5 border-yellow-500/20 hover:border-yellow-500/20 text-yellow-500 hover:text-yellow-600": type === "warning",
          "bg-red-700/10 hover:bg-red-700/5 border-red-500/20 hover:border-red-500/20 text-red-500 hover:text-red-600": type === "error",
          "bg-green-700/10 hover:bg-green-700/5 border-green-500/20 hover:border-green-500/20 text-green-500 hover:text-green-600": type === "success",
        }
      )}
    >
      <div
        id="banner-content-container"
        className="
          flex 
          flex-row 
          justify-start 
          items-center 
          w-full 
          gap-2
        "
      >
        <div className="flex flex-row gap-2">
          {type === "info" && (
            <MdInfoOutline className="h-[1.5rem] w-[1.5rem]" />
          )}
          {type === "warning" && (
            <MdOutlineWarningAmber className="h-[1.5rem] w-[1.5rem]" />
          )}
          {type === "error" && (
            <MdErrorOutline className="h-[1.5rem] w-[1.5rem]" />
          )}
          {type === "success" && (
            <MdCheck className="h-[1.5rem] w-[1.5rem]" />
          )}
        </div>
        <small>
          {message}
        </small>
      </div>
      {!autoExpire && (
        <Button variant="outline" size="sm" className={clsx("border p-2", 
          {
            "bg-blue-700/20 hover:bg-blue-700/10 border-blue-500/20 hover:border-blue-500/20 hover:text-blue-600": type === "info",
            "bg-yellow-700/20 hover:bg-yellow-700/10 border-yellow-500/20 hover:border-yellow-500/20 hover:text-yellow-600": type === "warning",
            "bg-red-700/20 hover:bg-red-700/10 border-red-500/20 hover:border-red-500/20 hover:text-red-600": type === "error",
            "bg-green-700/20 hover:bg-green-600/10 border-green-500/20 hover:border-green-500/20 hover:text-green-600": type === "success",
          }
        )}>
          <small>{cta ? cta : "OK"}</small>
        </Button>
      )}
    </div>
  )
}