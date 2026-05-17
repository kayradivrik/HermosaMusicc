import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';

interface NavItem {
  label: string;
  path: string;
}

interface SiteSettings {
  navItems?: NavItem[];
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  siteLogo?: any;
}

const TopNavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = '*[_type == "siteSettings"][0]';
        const data = await client.fetch(query);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching site settings for navbar:", error);
      }
    };
    fetchSettings();
  }, []);

  const defaultLinks = [
    { label: 'About', path: '/about' },
    { label: 'Artists', path: '/artists' },
    { label: 'Events', path: '/events' },
    { label: 'Services', path: '/services' },
    { label: 'Agency', path: '/agency' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const navLinks = settings?.navItems && settings.navItems.length > 0 
    ? settings.navItems 
    : defaultLinks;

  const igUrl = settings?.instagramUrl || "https://www.instagram.com/hermosamusicen/";
  const tiktokUrl = settings?.tiktokUrl || "https://www.tiktok.com/@hermosamusicen";
  const youtubeUrl = settings?.youtubeUrl || "https://www.youtube.com/@hermosamusictv";


  const menuVariants = {
    closed: { opacity: 0, y: '-100%' },
    open: { opacity: 1, y: 0 }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  const isExternal = (path: string) => path.startsWith('http');

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-[120] border-b border-black/5 flex justify-between items-center px-4 md:px-8 lg:px-10 py-3 sm:py-4 transition-all duration-300">
        <Link to="/" className="relative z-[130] flex flex-col leading-none group">
          {settings?.siteLogo ? (
            <img 
              src={urlFor(settings.siteLogo).url()} 
              alt="HERMOSA" 
              className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-all"
            />
          ) : (
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-display font-bold text-black tracking-tighter uppercase group-hover:text-primary transition-colors leading-none">HERMOSA</span>
              <span className="text-[7px] sm:text-[8px] text-primary tracking-[0.15em] mt-1 uppercase font-bold leading-none">MUSIC & ENTERTAINMENT</span>
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden min-[1200px]:flex items-center gap-4 xxl:gap-6">
          {navLinks.map((item) => (
            isExternal(item.path) ? (
              <a 
                key={item.label} 
                href={item.path} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-display text-xs xxl:text-sm uppercase tracking-widest text-on-surface/90 hover:text-primary transition-all duration-300 whitespace-nowrap"
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={item.label} 
                to={item.path} 
                className="font-display text-xs xxl:text-sm uppercase tracking-widest text-on-surface/90 hover:text-primary transition-all duration-300 whitespace-nowrap"
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-6 relative z-[130]">
          {/* Social Icons - Hidden on small mobile, shown from 'sm' up */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6 border-r border-black/10 pr-4 md:pr-6">
            <a href={igUrl} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-primary transition-colors">
              <i className="fa-brands fa-instagram text-lg"></i>
            </a>
            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-primary transition-colors">
              <i className="fa-brands fa-tiktok text-lg"></i>
            </a>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-primary transition-colors">
              <i className="fa-brands fa-youtube text-lg"></i>
            </a>
          </div>
          
          <button 
            className="flex min-[1200px]:hidden flex-col justify-center items-center w-10 h-10 relative z-[130]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <motion.div animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -4 }} className="w-6 h-[2px] bg-black absolute" />
            <motion.div animate={{ opacity: isMenuOpen ? 0 : 1 }} className="w-6 h-[2px] bg-black" />
            <motion.div animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 4 }} className="w-6 h-[2px] bg-black absolute" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed" animate="open" exit="closed" variants={menuVariants}
            className="fixed inset-0 w-screen h-screen bg-white z-[110] flex flex-col min-[1200px]:hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.02),transparent)] pointer-events-none" />
            <div className="flex flex-col h-full px-8 pt-32 pb-12 overflow-y-auto relative z-10">
              <nav className="flex flex-col gap-6 w-full">
                {navLinks.map((item, idx) => (
                  <motion.div 
                    key={item.label} 
                    variants={{
                      closed: { opacity: 0, x: -20 },
                      open: { opacity: 1, x: 0, transition: { delay: idx * 0.05 } }
                    }}
                  >
                    {isExternal(item.path) ? (
                      <a href={item.path} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between">
                        <span className="font-display text-4xl sm:text-5xl uppercase tracking-tighter text-black group-hover:text-primary-container transition-all duration-300">{item.label}</span>
                        <span className="material-symbols-outlined text-black/20 text-xl">open_in_new</span>
                      </a>
                    ) : (
                      <Link to={item.path} onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between">
                        <span className="font-display text-4xl sm:text-5xl uppercase tracking-tighter text-black group-hover:text-primary-container transition-all duration-300">{item.label}</span>
                        <span className="material-symbols-outlined text-primary-container opacity-0 group-hover:opacity-100 transition-all duration-300 text-3xl">east</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <motion.div variants={linkVariants} className="mt-12 pt-12 border-t border-black/5 flex items-center gap-8">
                  <a href={igUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/60 hover:text-primary-container hover:border-primary-container transition-all"><i className="fa-brands fa-instagram text-xl"></i></a>
                  <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/60 hover:text-primary-container hover:border-primary-container transition-all"><i className="fa-brands fa-tiktok text-xl"></i></a>
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-black/60 hover:text-primary-container hover:border-primary-container transition-all"><i className="fa-brands fa-youtube text-xl"></i></a>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavBar;
