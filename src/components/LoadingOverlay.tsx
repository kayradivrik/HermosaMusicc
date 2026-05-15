import React from 'react';
import { motion } from 'framer-motion';

const LoadingOverlay: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Animated Rings */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
            borderColor: ['#ff5540', '#ffffff', '#ff5540']
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-primary rounded-full shadow-[0_0_15px_rgba(255,85,64,0.5)]"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-white/20 rounded-full"
        />
        
        {/* Central Logo Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-display text-xl text-white font-bold tracking-tighter"
        >
          HERMOSA
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 font-display text-xs text-primary uppercase tracking-[0.5em] animate-pulse"
      >
        Initializing ecosystem
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;
