import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('hermosa-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem('hermosa-cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-[#121212] border border-white/10 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md bg-opacity-95">
            <div className="flex-grow">
              <h4 className="font-display text-white text-lg uppercase tracking-widest mb-2">Privacy & Transparency</h4>
              <p className="font-body text-sm text-tertiary max-w-3xl leading-relaxed">
                Hermosa Music uses essential cookies to enhance your experience. By continuing to explore our ecosystem, you agree to our use of digital identifiers for performance optimization.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button 
                onClick={acceptConsent}
                className="bg-white text-black px-8 py-3 font-display font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all duration-300"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
