import React from 'react';
import Image from 'next/image';
import { energyIcons } from '@/app/lib/data/icons';
import { EnergyType } from '@/app/lib/types/components'

type EnergyIconProps = {
  type: EnergyType;
  value?: number | 'x';
  inline?: boolean;
}

export default function EnergyIcon({ 
  type, 
  value,
  inline = false 
}: EnergyIconProps) {
  const size = inline ? 24 : 32;

  let IconComponent;

  if (type === 'void') {
    const index = value === -1 ? 16 : (value as number);
    IconComponent = energyIcons.void[index];
  } else {
    IconComponent = energyIcons[type];
  }

  return (
    <div className={`relative w-[${size}px] h-[${size}px]`}>
      <Image
        src={IconComponent}
        alt={`${type}${value !== undefined ? ` ${value}` : ''} energy icon`}
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}