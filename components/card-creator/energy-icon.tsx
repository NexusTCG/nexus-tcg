import React from 'react';
import Image from 'next/image';
import { energyIcons } from '@/app/lib/data/icons';
import { EnergyType } from '@/app/lib/types/components'

type EnergyIconProps = {
  type: EnergyType;
  inline?: boolean;
}

export default function EnergyIcon({ 
  type, 
  inline = false 
}: EnergyIconProps) {
  const size = inline ? 24 : 32;

  let IconComponent;

  if (type.startsWith("void")) {
    const voidNumber = type === "voidx" ? 16 : parseInt(type.slice(4));
    IconComponent = energyIcons.void[voidNumber];
  } else {
    IconComponent = energyIcons[type as keyof typeof energyIcons];
  }

  return (
    <div className={`relative w-[${size}px] h-[${size}px]`}>
      <Image
        src={IconComponent}
        alt={`${type} energy icon`}
        fill
        objectFit="contain"
      />
    </div>
  );
}