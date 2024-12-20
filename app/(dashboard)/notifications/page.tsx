import React from "react";
// Utils
import { notFound } from "next/navigation";
// Custom Components
import { NotificationsTable } from "@/components/notifications/notifications-table";

export default function Notifications() {
  // TEMPORARY: Remove this once notifications are implemented
  notFound();

  return (
    <div
      id="notifications-page-container"
      className="
        flex
        flex-col
        justify-start
        items-start
        w-full
        px-4
        md:px-8
        py-4
        gap-8
      "
    >
      <div
        id="notifications-page-content-container"
        className="
          flex 
          flex-col 
          justify-start 
          items-center 
          w-full 
          h-fulld
          border 
          border-zinc-700 
          rounded-sm 
          overflow-hidden
        "
      >
        <div
          id="notifications-page-content-header"
          className="
            flex
            flex-col
            justify-start
            items-start
            w-full
            p-4
            border-b
            border-zinc-700
          "
        >
          <h1>Notifications</h1>
        </div>
        <NotificationsTable />
      </div>
    </div>
  );
}
