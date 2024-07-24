import React from "react";
// Components
import NavBar from "@/components/navbar"

export default function Marketing() {
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
      "
    >
      <div
        id="login-content-container"
        className="
          flex
          flex-col
          items-center
          justify-center
          w-full
          max-w-4xl
          mt-4
          relative
          z-10
        "
      >
        <NavBar />
        <div>Hero + login + card creator lite</div>
        <div>Intro video</div>
        <div>Featured cards</div>
        <div>Social proof</div>
        <div>Text ???</div>
        <div>Card creator page UI</div>
        <div>Steam Page</div>
        <div>Chatbot</div>
        <div>CTA + signup</div>
        <div>Footer</div>
      </div>
    </div>
  )
}