import React from "react";
import Sidebar from "@/components/sidebar"

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div
      id="protected-routes-layout"
      className="
        flex
        flex-row
        justify-start
        items-start
        w-full
        h-min-screen
      "
    >
      <Sidebar />
      <div
        id="protected-routes-layout-content"
        className="
          flex
          flex-col
          justify-center
          items-center
          w-full
          h-full
          py-6
          px-12
        "
      >
        {children}
      </div>
    </div>
  )
}