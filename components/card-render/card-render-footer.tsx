import React from "react";
import { MdDesignServices } from "react-icons/md";

type CardRenderFooterProps = {
  username: string;
  mode: "initial" | "anomaly";
  isUncommon: boolean;
};

export default function CardRenderFooter({
  username,
  mode,
  isUncommon,
}: CardRenderFooterProps) {
  return (
    <div
      id="card-render-footer-container"
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
      {mode === "initial" || (mode === "anomaly" && isUncommon) ? (
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
      ) : null}
      <span className="flex justify-end items-center w-full ">
        {/* Filler to center card creator */}
      </span>
    </div>
  );
}
