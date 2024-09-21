"use client";

import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  active: { 
    y: 80, 
    zIndex: 20, 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  },
  inactive: { 
    y: 0, 
    zIndex: 10, 
    opacity: 0.6, 
    scale: 0.9,
    transition: { 
      duration: 0.3,
      opacity: { 
        duration: 0.3, 
        times: [0, 0.5, 1], 
        values: [1, 0.4, 0.6] 
      }
    }
  }
};

type CardAnimationWrapperProps = {
  isActive: boolean;
  children: React.ReactNode;
};

export default function CardAnimationWrapper({ 
  isActive,
  children
}: CardAnimationWrapperProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      className="absolute inset-0 flex justify-center items-center"
    >
      {children}
    </motion.div>
  );
}