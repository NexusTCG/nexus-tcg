import React from "react";
// Utils
import Image from "next/image";
import Link from "next/link";
// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LatestCards() {
  return (
    <Card className="w-full border border-zinc-700 overflow-hidden">
      <CardHeader
        className="
          flex
          flex-row
          justify-between
          items-center
          border-b 
          border-zinc-700 
          py-3
          px-4
        "
      >
        <CardTitle className="text-lg">
          Latest cards
        </CardTitle>
        <Link
          href="/cards"
          className="text-sm opacity-50 hover:opacity-80"
        >
          More cards
        </Link>
      </CardHeader>
      <CardContent
        className="
          flex
          flex-row
          justify-start
          items-center
          w-full
          pt-6
          gap-2
          overflow-hidden
          bg-zinc-800
          pr-0
          rounded-b-md
        "
      >
        {/* TODO: Fetch latest cards and render each */}
        <Image
          src="/images/card-placeholder.png"
          alt="Placeholder"
          width={240}
          height={336}
        />
        <Image
          src="/images/card-placeholder.png"
          alt="Placeholder"
          width={240}
          height={336}
        />
        <Image
          src="/images/card-placeholder.png"
          alt="Placeholder"
          width={240}
          height={336}
        />
        <Image
          src="/images/card-placeholder.png"
          alt="Placeholder"
          width={240}
          height={336}
        />
        <Image
          src="/images/card-placeholder.png"
          alt="Placeholder"
          width={240}
          height={336}
        />
      </CardContent>
    </Card>
  )
}