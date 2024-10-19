import React from "react";
// Utils
import Image from "next/image";
import Link from "next/link";
// Types
import { CardsDTO } from "@/app/lib/types/dto";

type CardsGalleryProps = {
  cards: CardsDTO;
  currentPage: number;
  totalPages: number;
};

export default function CardsGallery({
  cards,
  currentPage,
  totalPages,
}: CardsGalleryProps) {
  return (
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-4
      "
    >
      {cards.map((card) => (
        <Link href={`/cards/${card.id}`} key={card.id}>
          <div 
            className="
              relative 
              w-full 
              aspect-[5/7] 
              rounded-lg 
              overflow-hidden 
              hover:shadow-lg 
              transition-shadow
            "
          >
            <Image
              src={card.initialMode.render || '/images/card-placeholder.png'}
              alt={card.initialMode.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              className="object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
