import React from "react";
// Icons
import { MdDesignServices } from "react-icons/md";

export default function NexusCardFormFooter() {

  return (
    <div
      id="nexus-card-footer-container"
      style={{ fontSize: "0.75rem" }}
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        min-h-[24px]
        py-1
        gap-2
        text-neutral-300
        font-light
      "
    >
      <span className="w-full flex justify-start"></span>
      <small
        id="card-creator"
        className="
          flex
          flex-row
          justify-center
          items-center
          w-full
          gap-0.5
        "
      >
        <MdDesignServices className="w-[0.75rem] h-[0.75rem]" />
        {/* <span>Made by</span> */}
        <span>Creator Name</span>
      </small>
      <small
        id="fineprint"
        style={{ fontSize: "0.6rem" }}
        className="
            flex
            flex-col
            justify-center
            items-end
            w-full
            text-neutral-400
            gap-0
          "
        >
          {/* <span>Make cards at play.nexus</span> */}
          <span>© Nexus Games 2024</span>
      </small>
    </div>
  )
}