import React from "react";
// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/card-render/share-buttons";

type ShareModalProps = {
  cardId: number;
  cardName: string;
};

export function ShareModal({ cardId, cardName }: ShareModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="font-medium">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share <span className="text-foreground">{cardName}</span> on social.
          </DialogDescription>
        </DialogHeader>
        <ShareButtons cardId={cardId} cardName={cardName} />
      </DialogContent>
    </Dialog>
  );
}
