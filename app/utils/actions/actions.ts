// Reusable actions
import { EnergyCost } from "@/app/lib/types/components";
import { energyToColorMap, energyOrder } from "@/app/lib/data/data"

export function calculateBgColor(
  energyCost: EnergyCost | null, 
  shade: number = 50
): string[] {
  if (!energyCost || Object.values(energyCost).every(cost => cost === 0)) {
    return [`bg-neutral-${shade}`];
  }

  const activeTypes = Object.entries(energyCost)
    .filter(([_, value]) => value > 0)
    .map(([type]) => type);

  if (activeTypes.length === 0) {
    return [`bg-neutral-${shade}`];
  }

  if (activeTypes.includes('void') && activeTypes.length === 1) {
    return [`bg-slate-${shade}`];
  }

  const nonVoidTypes = activeTypes.filter(type => type !== 'void');

  if (nonVoidTypes.length === 1) {
    const colorName = energyToColorMap[nonVoidTypes[0] as keyof typeof energyToColorMap];
    return [`bg-${colorName}-${shade}`];
  }

  if (nonVoidTypes.length === 2) {
    const sortedTypes = nonVoidTypes.sort((a, b) => 
      energyOrder.indexOf(a) - energyOrder.indexOf(b)
    );
    const gradientName = sortedTypes.join('-').toLowerCase();
    return [`bg-${gradientName}-${shade}`];
  }

  return [`bg-multi-${shade}`];
}