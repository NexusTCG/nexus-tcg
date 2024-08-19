import React from 'react';
import Image from 'next/image';
import { speedIcons } from '@/app/lib/data/icons';

type SpeedIconProps = {
  type: number;
  inline?: boolean;
}

export default function SpeedIcon({ 
  type, 
  inline = false 
}: SpeedIconProps) {
  const size = inline ? 24 : 32;
  const IconComponent = speedIcons[type - 1]

  console.log('speed icon', type);

  return (
    <div
      style={{
        position: 'relative',
      }}
      className={`w-[${size}px] h-[${size}px]`}>
      <Image
        src={IconComponent}
        alt={`${type} speed icon`}
        fill
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}