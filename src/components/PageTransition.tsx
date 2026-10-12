import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pageTransitionVariants } from '../utils/motion';

interface PageTransitionProps {
  keyValue: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ keyValue, children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [keyValue]);

  return (
    <div className="relative w-full flex-1 flex flex-col min-w-0">
      {/* 2px emerald/blue loading bar at the top of the content area */}
      <div className="absolute top-0 inset-x-0 h-[2px] z-40 pointer-events-none overflow-hidden">
        {isLoading && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400"
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={keyValue}
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 flex flex-col min-w-0"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
