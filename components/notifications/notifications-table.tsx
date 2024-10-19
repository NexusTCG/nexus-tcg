import React from "react";
// Utils
import Link from "next/link";
import { calculateTimeAgo } from "@/app/utils/actions/actions";
// Components
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockNotifications = [
  {
    username: "John Doe",
    action: "comment",
    originId: "123",
    createdAt: new Date(),
  },
  {
    username: "Jane Smith",
    action: "vote",
    originId: "456",
    createdAt: new Date(),
  },
  {
    username: "Alex Johnson",
    action: "share",
    originId: "789",
    createdAt: new Date(),
  },
];

export function NotificationsTable() {
  return (
    <div className="w-full">
      <Table>
        <TableBody>
          {mockNotifications.map((notification) => (
            <TableRow key={notification.originId}>
              <TableCell className="text-muted-foreground">
                <Link
                  href={`/profile/${notification.username.toLowerCase()}`}
                  className="text-foreground font-medium hover:underline hover:opacity-80"
                >
                  {notification.username}
                </Link>{" "}
                {notification.action === "vote"
                  ? "voted on"
                  : notification.action === "share"
                  ? "shared"
                  : "commented on"}{" "}
                <Link
                  href={`/cards/${notification.originId}`}
                  className="text-foreground font-medium hover:underline hover:opacity-80"
                >
                  Card {notification.originId}
                </Link>{" "}
                {calculateTimeAgo(notification.createdAt.toISOString())}
              </TableCell>
              <TableCell className="flex justify-end">
                <Link href={`/cards/${notification.originId}`}>
                  <Button variant="outline">View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
