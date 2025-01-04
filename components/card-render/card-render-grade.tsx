import React from "react";
// Utils
import Image from "next/image";
// Data
import { gradeIcons } from "@/app/lib/data/icons";

type CardRenderGradeProps = {
  mode: string;
  grade: string;
};

export default function CardRenderGrade({ mode, grade }: CardRenderGradeProps) {
  const gradeIcon = gradeIcons.find(
    (g) => g.name === grade.toLowerCase()
  )?.icon;
  if (!gradeIcon) {
    console.error(`Grade icon not found for grade: ${grade}`);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "24px",
        height: "24px",
      }}
    >
      <Image
        id={`grade-icon-${mode}`}
        src={gradeIcon}
        alt={grade}
        fill
        loading="eager"
        priority
        data-testid={`grade-icon-${grade}`}
        style={{
          objectFit: "contain",
          visibility: "visible",
        }}
      />
    </div>
  );
}
