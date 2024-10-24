import React from "react"
// Utils
import clsx from 'clsx';
// Icons
import { FaBullseye } from "react-icons/fa6";
import { MdOutlineNat } from "react-icons/md";

type CardRenderStatsProps = {
  attack: number;
  defense: number;
  reach: boolean;
}

export default function CardRenderStats({
  attack,
  defense,
  reach,
}: CardRenderStatsProps) {
  return (
    (<div
      id="card-render-stats-container"
      className="
        flex
        flex-row
        justify-start
        items-center
        w-[100px]
        bg-black
        pl-2
        pr-1.5
        pb-2
        pt-1
        mb-2
        ml-2
        gap-0.5
        rounded-tr-2xl
      "
    >
      <div
        id="reach-icon-container"
        className="cursor-pointer"
      >
        {reach ? (
          // Ranged
          (<FaBullseye
            className="
              w-[20px]
              h-[20px]
              text-neutral-100
            "
          />)
        ) : (
          // Melee
          (<MdOutlineNat
            className="
              w-[20px]
              h-[20px]
              text-neutral-100
            "
          />)
        )}
      </div>
      <div
        id="attack-defense-container"
        className={clsx(
          "flex flex-row justify-center items-center w-full pb-1",
          {
            "gap-0.5": attack > 9 && defense > 9,
            "gap-1": attack <= 9 || defense <= 9,
            "gap-1.5": attack <= 9 && defense <= 9,
          }
        )}
      >
        <p className="font-bold text-xl text-orange-400">
          {attack}
        </p>
        <p className="text-neutral-300">/</p>
        <p className="font-bold text-xl text-emerald-400">
          {defense}
        </p>
      </div>
    </div>)
  );
}