// components/CardRender.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InitialModeCard, AnomalyModeCard } from '@/app/lib/types/database';
import { Button } from '@/components/ui/button';

type CardRenderProps = {
  initialMode: InitialModeCard;
  anomalyMode: AnomalyModeCard;
};

const cardVariants = {
  top: { 
    scale: 1, 
    y: 0, 
    zIndex: 2, 
    transition: { duration: 0.3 } 
  },
  bottom: { 
    scale: 0.95, 
    y: 40, 
    zIndex: 1, 
    transition: { duration: 0.3 } 
  },
  exit: (direction: 'left' | 'right') => ({ 
    x: direction === 'left' ? -300 : 300, 
    opacity: 0, 
    transition: { duration: 0.2 } 
  }),
  enter: (direction: 'left' | 'right') => ({ 
    x: direction === 'left' ? 300 : -300, 
    opacity: 0 
  }),
};

export default function CardRender({ initialMode, anomalyMode }: CardRenderProps) {
  const [activeMode, setActiveMode] = useState<'initial' | 'anomaly'>('initial');
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const toggleMode = () => {
    setDirection(activeMode === 'initial' ? 'left' : 'right');
    setActiveMode(prev => prev === 'initial' ? 'anomaly' : 'initial');
  };

  const renderCard = (card: InitialModeCard | AnomalyModeCard, position: 'top' | 'bottom') => (
    <motion.div 
      className="absolute bg-white rounded-lg shadow-lg p-4 w-[300px] h-[420px] cursor-pointer"
      variants={cardVariants}
      initial="enter"
      animate={position}
      exit="exit"
      custom={direction}
      onClick={position === 'bottom' ? toggleMode : undefined}
    >
      <h2 className="text-xl font-bold">{card.name}</h2>
      <p>Type: {card.type}</p>
      {/* Render other card details here */}
    </motion.div>
  );

  return (
    <div className="relative h-[500px] w-[320px]">
      <AnimatePresence initial={false} custom={direction}>
        {activeMode === 'initial' ? (
          <React.Fragment key="initial">
            {renderCard(initialMode, 'top')}
            {renderCard(anomalyMode, 'bottom')}
          </React.Fragment>
        ) : (
          <React.Fragment key="anomaly">
            {renderCard(anomalyMode, 'top')}
            {renderCard(initialMode, 'bottom')}
          </React.Fragment>
        )}
      </AnimatePresence>
      <Button onClick={toggleMode} className="mt-4">
        Switch Mode
      </Button>
    </div>
  );
}