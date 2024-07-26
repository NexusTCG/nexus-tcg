import React from "react"

export default function NexusCardFormHeader() {
  return (
    <div
      id="nexus-card-form-header-container"
      className="
        flex
        flex-row
        justify-start
        items-center
        w-full
        h-[40px]
        gap-2
        pl-2
        bg-yellow-50
        text-black
        border
        border-b-2
        z-20
      "
    >
      <div
        id="card-name-type-container"
      >
        {/* TODO: Turn into component. Name input. */}
        <div
          id="card-name"
          className="font-medium"
        >
          <span>Card name</span>
        </div>
        {/* TODO: Turn into component. Type select + Subtype select */}
        <div
          id="card-type-container"
          className="
            flex
            flex-row
            justify-start
            items-center
            gap-1
            text-sm
          "
        >
          <span>Type</span>
          <span className="text-xs opacity-60">•</span>
          <span>Subtype</span>
        </div>
      </div>
    </div>
  )
}