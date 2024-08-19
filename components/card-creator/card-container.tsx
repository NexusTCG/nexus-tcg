import React from 'react';
// Custom components
import CardFormFooter from "@/components/card-creator/card-form-footer";
import CardFormStats from "@/components/card-creator/card-form-stats";

type CardContainerProps = {
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

export default function CardContainer({ 
  children 
}: CardContainerProps) {
  return (
    <div
      id="nexus-card-container"
      style={{ borderRadius: "16px" }}
      className="
        relative
        flex
        flex-col
        items-center
        w-[400px]
        h-[560px]
        bg-black
        overflow-hidden
        pt-3
        px-3
        shadow-lg
      "
    >
      <div
        id="-card-content-container"
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
      <CardFormFooter />
    </div>
  )
}