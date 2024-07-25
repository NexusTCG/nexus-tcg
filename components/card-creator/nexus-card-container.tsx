import React from 'react';
import Image from "next/image";
import { MdDesignServices } from "react-icons/md";


type NexusCardContainerProps = {
  children: React.ReactNode;
  // Add form or render prop
  // Add size prop
  // Add energy type prop
  // Add card type prop
};

// TODO: Add form or render prop
// TODO: Add size prop
// TODO: Logic to change energy type
// TODO: Logic to change card type

export default function NexusCardContainer({ 
  children 
}: NexusCardContainerProps) {
  return (
    <div
      id="nexus-card-container"
      style={{
        borderRadius: "16px",

      }}
      className="
        flex
        flex-col
        items-center
        w-[400px]
        h-[560px]
        bg-black
        overflow-hidden
        pt-3
        px-3
        border
        border-white/20
      "
    >
      <div
        id="nexus-card-content-container"
        className="
          flex
          flex-col
          justify-start
          items-center
          h-full
          w-full
          rounded-md
          bg-yellow-500
          overflow-hidden
        "
      >
        {children}
      </div>
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
    </div>
  )
}