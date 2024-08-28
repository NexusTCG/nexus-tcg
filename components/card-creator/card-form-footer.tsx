"use client"

// Hooks
import React from "react";
import { useFormContext } from 'react-hook-form';
// Icons
import { MdDesignServices } from "react-icons/md";

export default function CardFormFooter() {
  const { watch } = useFormContext();
  const cardId = watch("id")
  const username = watch("username")

  return (
    <div
      id="card-footer-container"
      style={{ fontSize: "0.75rem" }}
      className="
        flex
        flex-row
        justify-between
        items-center
        w-full
        min-h-[24px]
        py-1.5
        font-light
        px-2
        opacity-60
      "
    >
      <small
        id="fineprint"
        style={{ fontSize: "0.6rem" }}
        className="
            flex
            justify-start
            items-end
            w-full
            gap-0
          "
        >
          <span>© Nexus Games {new Date().getFullYear()}</span>
      </small>
      <small
        id="card-creator"
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
          gap-0.5
        "
      >
        <MdDesignServices className="w-[0.75rem] h-[0.75rem]" />
        <span>{username}</span>
      </small>
      <span className="flex justify-end items-center w-full ">
        {/* Filler to center card creator */}
        {/* Card render links to play.nexus/cards/id */}
      </span>
    </div>
  )
}