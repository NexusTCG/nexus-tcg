import React from "react"
import NavBar from "@/components/navbar"
import Image from "next/image"

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout(
  props: RootLayoutProps
) {
  const { children } = props;
  const heroImg = `/images/hero-img-${Math.floor(Math.random() * 3) + 1}.webp`;

  return (
    <div
      id="login-page-container"
      style={{ 
        position: "relative", 
        overflow: "hidden" 
      }}
      className="
        flex
        flex-col
        justify-start
        items-center
        min-h-screen
        w-full
        pt-4
      "
    >
      {heroImg && (
        <Image
          src={heroImg}
          alt="Nexus TCG background image"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40"
        />
      )}
      <div
        id="login-content-container"
        className="
          flex
          flex-col
          flex-grow
          w-full
          max-w-4xl
          mx-auto
          relative
          z-10
        "
      >
        <NavBar />
        {children}
      </div>
    </div>
  )
}