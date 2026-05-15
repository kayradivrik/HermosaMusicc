import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { client, urlFor } from '../lib/sanity';
import { Link } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay';

interface SanityArtist {
  _id: string;
  name: string;
  genre: string;
  slug: {
    current: string;
  };
  image: any;
  socialLinks?: {
    instagram?: string;
    spotify?: string;
    twitter?: string;
  };
}

const Artists: React.FC = () => {
  interface SiteSettings {
    artistsPageTitle?: string;
    artistCtaTitle?: string;
    artistCtaSubtitle?: string;
    artistCtaButtonText?: string;
  }
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [artists, setArtists] = useState<SanityArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsQuery = '*[_type == "artist"] | order(name asc)';
        const settingsQuery = '*[_type == "siteSettings"][0] { artistsPageTitle, artistCtaTitle, artistCtaSubtitle, artistCtaButtonText }';
        
        const [artistsData, settingsData] = await Promise.all([
          client.fetch(artistsQuery),
          client.fetch(settingsQuery)
        ]);
        
        setSettings(settingsData);
        setArtists(artistsData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pageTitle = settings?.artistsPageTitle || "ROSTER";
  const artistCtaTitle = settings?.artistCtaTitle || "Join the Elite Roster";
  const artistCtaSubtitle = settings?.artistCtaSubtitle || "Are you the next sound to define a generation? We are always seeking exceptional talent to join our global network.";
  const artistCtaButtonText = settings?.artistCtaButtonText || "Apply as Artist";

  const genres = ['All', ...new Set(artists.map(a => a.genre).filter(Boolean))];
  const filteredArtists = activeGenre === 'All' 
    ? artists 
    : artists.filter(a => a.genre === activeGenre);

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <SEO title={`${pageTitle} | Hermosa`} description="Explore our elite roster of global artists and performers." />
      <TopNavBar />
      
      <main className="bg-white min-h-screen pt-[140px] pb-32">
        
        {/* ── Editorial Header ── */}
        <section className="px-6 sm:px-12 lg:px-20 mb-20">
          <div className="max-w-[95rem] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-primary-container" />
                  <span className="text-primary-container font-bold uppercase tracking-[0.6em] text-[10px]">Global Roster</span>
                </div>
                <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl text-black font-black uppercase leading-[0.85] tracking-tighter">
                  {pageTitle}
                </h1>
                <p className="text-black/40 font-body text-base sm:text-xl max-w-2xl font-light leading-relaxed">
                  Defining the future of sound through elite talent management and global artist development.
                </p>
              </motion.div>
              
              {/* Genre Filter */}
              <div className="flex flex-wrap gap-3 lg:pb-4">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border
                      ${activeGenre === genre 
                        ? 'bg-black text-white border-black' 
                        : 'bg-transparent text-black/40 border-black/10 hover:border-black/30'}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Artists Grid ── */}
        <section className="px-6 sm:px-12 lg:px-20">
          <div className="max-w-[95rem] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-y-24">
              <AnimatePresence mode="wait">
                {filteredArtists.map((artist, idx) => (
                  <motion.div
                    key={artist._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                    className="group flex flex-col gap-8"
                  >
                    <Link 
                      to={`/artists/${artist.slug?.current || artist._id}`}
                      className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl bg-black/5"
                    >
                      {artist.image ? (
                        <img 
                          src={urlFor(artist.image).url()} 
                          alt={artist.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-2xl text-black/10 uppercase">No Portrait</div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                      
                      {/* Social Quick Links on Image */}
                      <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                        <div className="flex gap-5">
                          {artist.socialLinks?.spotify && (
                            <a href={artist.socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-container transition-colors transform hover:scale-125">
                              <i className="fa-brands fa-spotify text-2xl"></i>
                            </a>
                          )}
                          {artist.socialLinks?.instagram && (
                            <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-container transition-colors transform hover:scale-125">
                              <i className="fa-brands fa-instagram text-2xl"></i>
                            </a>
                          )}
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-xl">arrow_outward</span>
                        </div>
                      </div>
                    </Link>

                    <div className="space-y-4 px-2 text-center sm:text-left">
                      <div className="flex items-center gap-4 justify-center sm:justify-start">
                         <div className="w-8 h-[1px] bg-primary-container" />
                         <span className="text-primary-container text-[10px] font-black uppercase tracking-[0.4em]">{artist.genre}</span>
                      </div>
                      <h3 className="text-black font-display text-4xl sm:text-5xl uppercase tracking-tighter leading-tight group-hover:text-primary-container transition-colors duration-500">
                        {artist.name}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredArtists.length === 0 && (
              <div className="py-32 text-center">
                <p className="text-black/20 text-3xl font-light uppercase tracking-widest">Our roster is expanding.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="mt-32 py-24 sm:py-32 bg-black text-white px-6 sm:px-12 lg:px-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,64,0.15),transparent)] pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <h2 className="font-display text-4xl sm:text-7xl uppercase tracking-tighter leading-none font-black">
              {artistCtaTitle.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word} {i === 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-white/50 text-base sm:text-xl font-light max-w-2xl mx-auto">
              {artistCtaSubtitle}
            </p>
            <div className="pt-8">
              <button className="bg-primary-container text-white px-14 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-700 shadow-2xl">
                {artistCtaButtonText}
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Artists;
