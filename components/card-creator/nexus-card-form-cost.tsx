"use client"

import React, { useState } from 'react';
// Types
import { EnergyType } from '@/app/lib/types/components'
// Components
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import EnergyIcon from "@/components/card-creator/energy-icon";

const energyTypes: EnergyType[] = ['light', 'storm', 'dark', 'chaos', 'growth', 'voidx'];

export default function NexusCardFormCost() {
  const [speed, setSpeed] = useState(1);
  const [energyCosts, setEnergyCosts] = useState<Record<EnergyType, number>>(
    Object.fromEntries(energyTypes.map(type => [type, 0])) as Record<EnergyType, number>
  );

  const cycleSpeed = () => {
    setSpeed((prevSpeed) => (prevSpeed % 3) + 1);
  };

  const updateEnergyCost = (type: EnergyType, delta: number) => {
    setEnergyCosts(prev => {
      const newValue = Math.max(0, Math.min(5, (prev[type] || 0) + delta));
      return {...prev, [type]: newValue};
    });
  };

  return (
    <div className="absolute top-1 left-1 flex flex-col items-start z-30">
      <Button variant="ghost" size="sm" onClick={cycleSpeed} className="mb-1 p-1">
        <EnergyIcon type={`void${speed}`} />
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1">
            <EnergyIcon type="voidx" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px]">
          <div className="p-4">
            <h3 className="mb-2 text-sm font-semibold">Select energy cost</h3>
            <div className="grid grid-cols-3 gap-4">
              {energyTypes.map(type => (
                <div key={type} className="flex flex-col items-center bg-gray-800 p-2 rounded-md">
                  <EnergyIcon type={`void${speed}` as EnergyType} />
                  <div className="flex items-center mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => updateEnergyCost(type as EnergyType, -1)}
                      disabled={energyCosts[type as EnergyType] === 0}
                    >
                      -
                    </Button>
                    <span className="mx-2 text-sm">{energyCosts[type as EnergyType]}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => updateEnergyCost(type as EnergyType, 1)}
                      disabled={energyCosts[type as EnergyType] === 5}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Render selected energy icons */}
      <div className="flex flex-col items-start mt-1">
        {Object.entries(energyCosts).map(([type, cost]) => 
          cost > 0 && (
            <div key={type} className="flex items-center">
              <EnergyIcon type={type as EnergyType} />
              <span className="ml-1 text-xs">{cost}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}