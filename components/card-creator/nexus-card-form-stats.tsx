import React from "react"
import { FaBullseye } from "react-icons/fa6";
import { MdOutlineNat } from "react-icons/md";

// TODO: Accept stats from parent

export default function NexusCardFormStats() {
  const rangeType = "ranged"; // TODO: Replace with dynamic value
  const statsAttack = 55; // TODO: Replace with dynamic value
  const statsDefense = 55; // TODO: Replace with dynamic value

  return (
    <div
      id="card-stats-container"
      className="
        flex
        flex-row
        justify-start
        items-center
        w-[100px]
        bg-black
        p-1.5
        mb-2
        ml-2
        gap-0.5
        rounded-tr-2xl
      "
    >
      {rangeType === "ranged" ? (
        <FaBullseye
          className="
            w-[20px] 
            h-[20px] 
            text-neutral-100
          "
        />
      ) : (
        // TODO: Add ranged & melee icons. And dynamically render.
        <FaBullseye
          className="
            w-[20px] 
            h-[20px] 
            text-neutral-100
          "
        />
      )}
      <div
        id="attack-defense-container"
        className="
          flex
          flex-row
          justify-center
          items-center
          w-full
          gap-0.5
        "
      >
        <p className="font-extrabold text-xl text-orange-400">{statsAttack}</p>
        <p className="text-neutral-300">/</p>
        <p className="font-extrabold text-xl text-emerald-400">{statsAttack}</p>
      </div>
    </div>
  )
}