import React from 'react';
import SpeedIcon from "@/components/card-creator/speed-icon";

type CardRenderSpeedProps = {
  speed: number;
};

export default function CardRenderSpeed({ speed }: CardRenderSpeedProps) {
  return (
    <div className="absolute top-0 left-0">
      <SpeedIcon type={speed} />
    </div>
  );
}