import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../lib/sanity';

interface SiteSettings {
  contactEmail?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  footerDescription?: string;
  footerLinks?: { label: string; url: string }[];
}

const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = '*[_type == "siteSettings"][0]';
        const data = await client.fetch(query);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const email = settings?.contactEmail || "selma@hermosamusicentertainment.com";
  const igUrl = settings?.instagramUrl || "https://www.instagram.com/hermosamusicen/";
  const tiktokUrl = settings?.tiktokUrl || "https://www.tiktok.com/@hermosamusicen";
  const youtubeUrl = settings?.youtubeUrl || "https://www.youtube.com/@hermosamusictv";
  const facebookUrl = settings?.facebookUrl || "#";
  const twitterUrl = settings?.twitterUrl || "#";
  const footerDesc = settings?.footerDescription || "A high-energy entertainment platform rising from the dark. A cyber-futuristic approach to music and event management.";
  const footerLinks = settings?.footerLinks || [
    { label: "Privacy Policy", url: "#" },
    { label: "Terms of Service", url: "#" }
  ];

  return (
    <footer className="bg-surface-container-lowest w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-primary/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
          <div className="font-display text-3xl sm:text-4xl text-black font-bold uppercase tracking-tighter">
            HERMOSA
          </div>
          <p className="font-body text-sm sm:text-base text-on-surface-variant w-full leading-relaxed">
            {footerDesc}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-xs text-black uppercase tracking-[0.2em] mb-2">Company</h4>
          <Link to="/about" className="font-body text-sm text-on-surface-variant hover:text-primary transition-all duration-200">About Us</Link>
          <Link to="/artists" className="font-body text-sm text-on-surface-variant hover:text-primary transition-all duration-200">Artists</Link>
          <Link to="/events" className="font-body text-sm text-on-surface-variant hover:text-primary transition-all duration-200">Events</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-xs text-black uppercase tracking-[0.2em] mb-2">Contact</h4>
          <Link to="/contact" className="font-body text-sm text-on-surface-variant hover:text-primary transition-all duration-200">Get in Touch</Link>
          <a className="font-body text-sm text-on-surface-variant hover:text-primary transition-all duration-200" href={`mailto:${email}`}>Press & Media</a>
          {footerLinks.map((link, i) => (
            <a key={i} className="font-body text-sm text-on-surface-variant hover:text-primary transition-all duration-200" href={link.url}>{link.label}</a>
          ))}
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto text-center md:text-left">
        <p className="font-body text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-widest opacity-60">
          © {currentYear} HERMOSA MUSIC & ENTERTAINMENT. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <a className="text-on-surface-variant/60 hover:text-primary transition-colors" href={igUrl} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram text-lg"></i>
          </a>
          <a className="text-on-surface-variant/60 hover:text-primary transition-colors" href={tiktokUrl} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok text-lg"></i>
          </a>
          <a className="text-on-surface-variant/60 hover:text-primary transition-colors" href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-youtube text-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
