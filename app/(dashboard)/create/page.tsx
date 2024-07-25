import React from "react";
// Components
import {Button } from "@/components/ui/button";
// Custom components
import Banner from "@/components/banner";
import NexusCardForm from "@/components/card-creator/nexus-card-form";
import { 
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

export default function Create() {
  return (
    <div
      id="create-page-container"
      className="
        flex
        flex-col
        justify-start
        items-center
        w-full
        gap-4
      "
    >
      <Banner
        message="This page is under construction."
        type="warning"
        autoExpire={false}
      />
      <div
        id="card-creator-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          w-full
          border
          border-zinc-700
          rounded-md
          overflow-hidden
        "
      >
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
          <div>
            <h2>Card Name</h2>
            <small>Card Mode</small>
          </div>
          <Button className="font-semibold">Finish</Button>
        </div>
        <div
          id="card-creator-content"
          className="
            flex
            flex-col
            justify-center
            items-center
            w-full
            py-8
            bg-zinc-800
          "
        >
          <NexusCardForm />
        </div>
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
          <div>
            <Button variant="ghost" size="icon">
                <MdChevronLeft
                  className="
                    h-[24px]
                    w-[24px]
                    text-neutral-500
                    opacity-80
                    hover:opacity-100
                    animate-all
                  "
                />
            </Button>
          </div>
          <div
            id="art-options-container"
            className="
              flex
              flex-row
              justify-center
              items-center
              w-full
              h-full
              bg-red-500/50
              gap-2
            "
          >
            <span>Card Art</span>
            <span>Card Art</span>
            <span>Card Art</span>
          </div>
          <div>
            <Button variant="ghost" size="icon">
                <MdChevronRight
                  className="
                    h-[24px]
                    w-[24px]
                    text-neutral-500
                    opacity-80
                    hover:opacity-100
                    animate-all
                  "
                />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}