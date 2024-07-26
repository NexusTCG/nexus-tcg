import React from "react"
import Image from "next/image"
import clsx from "clsx"

type SectionContainerProps = {
  label?: string
  bgImage?: boolean
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
}

export default function SectionContainer({ 
  label,
  bgImage = false,
  children, 
  size = "md" 
}: SectionContainerProps) {
  const randomBgImage = `/images/hero-img-${(Math.floor(Math.random() * 3) + 1)}.webp`

  return (
    <section
      id={`${label}-section-container`}
      className={clsx("flex flex-col justify-center items-center relative overflow-hidden w-full",
        {
          "min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]": size === "lg",
          "min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh]": size === "md",
          "min-h-[30vh] sm:min-h-[40vh]": size === "sm",
        }
      )}
    >
      {bgImage && (
        <>
          <Image
            src={randomBgImage}
            alt={`${label} background image`}
            fill
            style={{ objectFit: "cover" }}
            className="opacity-60"
          />
          <div className="absolute inset-0 bg-black opacity-40" />
        </>
      )}
      <div
        id={`${label}-content-container`}
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          w-full
          h-full
          md:max-w-4xl
          mx-auto
          px-4
          sm:px-6
          md:px-8
          lg:px-0
          py-12
          sm:py-16
          md:py-20
          lg:py-24
          z-10
        "
      >
        {children}
      </div>
    </section>
  )
}