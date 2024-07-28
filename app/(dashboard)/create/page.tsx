import React from "react";
// Custom components
import Banner from "@/components/banner";
import EnergyIcon from "@/components/card-creator/energy-icon";
import NexusCardForm from "@/components/card-creator/nexus-card-form";
import CardCreatorHeader from "@/components/card-creator/card-creator-header";
import CardCreatorFooter from "@/components/card-creator/card-creator-footer";

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
        py-4
        px-4
        md:px-8
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
        <CardCreatorHeader />
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
          <div className="flex flex-row gap-2 my-4">
            <EnergyIcon type="light" />
            <EnergyIcon type="storm" inline />
            <EnergyIcon type="dark" inline />
            <EnergyIcon type="chaos" />
            <EnergyIcon type="growth" />
            <EnergyIcon type="void0" />
            <EnergyIcon type="voidx" />
          </div>
          
          {/* TODO: Add anomaly mode & functionality to switch between them */}
          <NexusCardForm />
        </div>
        {/* TODO: Hide footer if fewer than 2 art options exist */}
        <CardCreatorFooter />
      </div>
    </div>
  )
}