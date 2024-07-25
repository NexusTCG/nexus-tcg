import React from "react"
// Icons
import { 
  MdOutlineSpeed,
  MdOutlineBrightnessLow,
} from "react-icons/md";

// TODO: Dynamically update bg color based on energy types

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
        pl-0.5
        bg-yellow-50
        text-black
        border
        border-b-2
        z-20
      "
    >
      <div
        id="card-speed-energy-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          gap-1
          z-50
          border
          border-blue-500
        "
      >
        {/* TODO: Turn into component. Speed popover + render */}
        <div
          id="card-speed-select-popover"
        >
          <MdOutlineSpeed />
        </div>
        {/* TODO: Turn into component. Energy popover + render */}
        <div
          id="card-energy-select-popover"
          className="
            flex
            flex-col
            justify-start
            items-center
            gap-0.5
            h-full
          "
        >
          <MdOutlineBrightnessLow
            style={{ boxShadow: "0 2px 0 0 rgb(0 0 0 / 0.25)" }}
            className="
              w-[24px]
              h-[24px]
              p-0.5
              bg-yellow-500
              rounded-full
              border-2
            "
          />
          <MdOutlineBrightnessLow
            style={{ boxShadow: "0 2px 0 0 rgb(0 0 0 / 0.25)" }}
            className="
              w-[24px]
              h-[24px]
              p-0.5
              bg-yellow-500
              rounded-full
              border-2
            "
          />
          <MdOutlineBrightnessLow
            style={{ boxShadow: "0 2px 0 0 rgb(0 0 0 / 0.25)" }}
            className="
              w-[24px]
              h-[24px]
              p-0.5
              bg-yellow-500
              rounded-full
              border-2
            "
          />
        </div>
      </div>
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