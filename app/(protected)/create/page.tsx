import React from "react";
import Banner from "@/components/banner";

export default function Create() {
  return (
    <div
      id="create-container"
      className="
        flex
        flex-col
        justify-start
        items-center
        w-full
        h-full
        gap-4
      "
    >
      <Banner
        message="This page is under construction."
        type="warning"
        autoExpire={false}
      />
      <div className="border p-4 w-full rounded-sm">
      Create page
      </div>
    </div>
  )
}