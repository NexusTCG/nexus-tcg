import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { gradeIcons } from '@/app/lib/data/icons';

type GradeIconProps = {
  type: "core" | "uncommon" | "rare" | "prime";
}

export default function GradeIcon({ 
  type, 
}: GradeIconProps) {
  const iconData = gradeIcons.find(icon => icon.name === type);

  if (!iconData) {
    console.error(`Grade icon not found for type: ${type}`);
    return null;
  }

  return (
    <div
      className="w-[32px] h-[32px] relative transition-all duration-30"
    >
      <Image
        src={iconData.icon}
        alt={`${type} grade icon`}
        fill
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}