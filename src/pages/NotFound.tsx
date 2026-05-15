import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavBar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop relative overflow-hidden pt-[120px]">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="font-display text-[120px] md:text-[200px] leading-none text-black/5 uppercase tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            404
          </h1>
          
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-6xl mb-6 shadow-[0_0_20px_#ff5540]">
              error
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-black uppercase mb-4 tracking-tight">
              Lost in the Dark?
            </h2>
            <div className="w-24 h-[1px] bg-primary-container shadow-[0_0_10px_#ff5540] mb-8 mx-auto"></div>
            <p className="font-body text-lg text-tertiary max-w-md mb-12 leading-relaxed">
              The page you are looking for has been moved or exists only in the shadows of the underground.
            </p>
            
            <Link 
              to="/" 
              className="bg-black text-white px-12 py-4 font-display font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 btn-glow"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
