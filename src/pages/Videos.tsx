import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { client } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';

interface SanityVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  category: string;
  artist?: {
    _id: string;
    name: string;
  };
}

const PAGE_SIZE = 9;

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<SanityVideo[]>([]);
  interface SiteSettings {
    videoPageTitle?: string;
    videoPageSubtitle?: string;
    videoCtaTitle?: string;
    videoCtaSubtitle?: string;
    videoCtaButtonText?: string;
  }
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  // Filtering & Pagination State
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeArtist, setActiveArtist] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoQuery = `*[_type == "video"] | order(_createdAt desc) {
          _id,
          title,
          youtubeUrl,
          category,
          artist->{_id, name}
        }`;
        const settingsQuery = `*[_type == "siteSettings"][0] {
          videoPageTitle,
          videoPageSubtitle,
          videoCtaTitle,
          videoCtaSubtitle,
          videoCtaButtonText
        }`;
        
        const [videoData, settingsData] = await Promise.all([
          client.fetch(videoQuery),
          client.fetch(settingsQuery)
        ]);
        
        setSettings(settingsData);
        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getYoutubeId = (url: string) => {
    return url?.split('v=')[1]?.split('&')[0] || url?.split('be/')[1];
  };

  const getThumbnail = (url: string) => {
    const id = getYoutubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
  };

  // Logic: Extract Categories and Artists
  const categories = ['All', ...new Set(videos.map(v => v.category))];
  const artists = ['All', ...new Set(videos.filter(v => v.artist).map(v => v.artist!.name))];

  // Logic: Filter and Paginate
  const filteredVideos = videos.filter(v => {
    const catMatch = activeCategory === 'All' || v.category === activeCategory;
    const artMatch = activeArtist === 'All' || v.artist?.name === activeArtist;
    return catMatch && artMatch;
  });

  const totalPages = Math.ceil(filteredVideos.length / PAGE_SIZE);
  const paginatedVideos = filteredVideos.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const pageTitle = settings?.videoPageTitle || "Visual Stage";
  const pageSubtitle = settings?.videoPageSubtitle || "Immersive music videos and exclusive performances from the Hermosa ecosystem.";

  const videoCtaTitle = settings?.videoCtaTitle || "Your vision, our lens.";
  const videoCtaSubtitle = settings?.videoCtaSubtitle || "Elevate your visual storytelling with Hermosa's elite production team.";
  const videoCtaButtonText = settings?.videoCtaButtonText || "Start a Production";

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <SEO title={`${pageTitle} | Hermosa`} description={pageSubtitle} />
      <TopNavBar />
      
      <main className="bg-white min-h-screen pt-[140px]">
        
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
                  <span className="text-primary-container font-bold uppercase tracking-[0.6em] text-[10px]">Cinematic Experience</span>
                </div>
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-black font-black uppercase leading-[0.9] tracking-tighter">
                  {pageTitle}
                </h1>
                <p className="text-black/40 font-body text-base sm:text-xl max-w-2xl font-light leading-relaxed">
                  {pageSubtitle}
                </p>
              </motion.div>
              
              {/* Main Categories */}
              <div className="flex flex-wrap gap-4 lg:pb-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                    className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border
                      ${activeCategory === cat 
                        ? 'bg-black text-white border-black' 
                        : 'bg-transparent text-black/40 border-black/10 hover:border-black/30'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Main Layout: Content + Artist Sidebar ── */}
        <section className="px-6 sm:px-12 lg:px-20 pb-32">
          <div className="max-w-[95rem] mx-auto flex flex-col lg:flex-row gap-16">
            
            {/* Left: Video Grid & Pagination */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                <AnimatePresence mode="wait">
                  {paginatedVideos.map((video, idx) => (
                    <motion.div
                      key={video._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className="group cursor-pointer flex flex-col gap-6"
                      onClick={() => setSelectedVideo(getYoutubeId(video.youtubeUrl))}
                    >
                      <div className="relative aspect-video overflow-hidden rounded-[2rem] shadow-lg grayscale group-hover:grayscale-0 transition-all duration-1000">
                        <img 
                          src={getThumbnail(video.youtubeUrl)} 
                          alt={video.title} 
                          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl">
                            <span className="material-symbols-outlined text-black text-2xl ml-1">play_arrow</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 px-2">
                        <div className="flex items-center gap-3">
                           <span className="text-primary-container text-[9px] font-black uppercase tracking-[0.2em]">{video.artist?.name || 'Exclusive'}</span>
                        </div>
                        <h3 className="text-black font-display text-xl sm:text-2xl uppercase tracking-tighter leading-tight group-hover:text-primary-container transition-colors duration-500">
                          {video.title}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredVideos.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-black/20 text-xl font-light uppercase tracking-widest">No productions match these filters.</p>
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center gap-4 mt-20">
                  <div className="h-[1px] flex-grow bg-black/5" />
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <button
                        key={pageNum}
                        onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                        className={`w-12 h-12 rounded-full font-bold text-xs transition-all duration-500 border
                          ${currentPage === pageNum 
                            ? 'bg-black text-white border-black' 
                            : 'bg-transparent text-black/30 border-black/5 hover:border-black/20'}`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                  <div className="h-[1px] flex-grow bg-black/5" />
                </div>
              )}
            </div>

            {/* Right: Artist Sidebar Filter */}
            <div className="lg:w-[300px] flex-shrink-0">
              <div className="sticky top-32 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[1px] bg-primary-container" />
                    <span className="text-primary-container font-bold uppercase tracking-widest text-[9px]">Filter by Roster</span>
                  </div>
                  <h4 className="font-display text-2xl text-black uppercase tracking-tighter">Artists</h4>
                </div>
                
                <div className="flex flex-col gap-2">
                  {artists.map(art => (
                    <button
                      key={art}
                      onClick={() => { setActiveArtist(art); setCurrentPage(1); }}
                      className={`text-left py-3 px-6 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-500
                        ${activeArtist === art 
                          ? 'bg-black text-white translate-x-2' 
                          : 'text-black/40 hover:text-black hover:bg-black/5'}`}
                    >
                      {art}
                    </button>
                  ))}
                </div>

                {/* Sidebar Banner */}
                <div className="pt-10 border-t border-black/5">
                  <div className="bg-primary-container/5 rounded-[2rem] p-8 space-y-6">
                    <p className="text-black/60 text-xs font-light leading-relaxed uppercase tracking-wider">
                      Collaborate with our elite talent for your next visual masterpiece.
                    </p>
                    <button className="text-primary-container font-black text-[9px] uppercase tracking-[0.3em] flex items-center gap-3 group">
                      Book Now 
                      <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">east</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24 sm:py-32 bg-black text-white px-6 sm:px-12 lg:px-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,64,0.15),transparent)] pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-10 relative z-10">
            <h2 className="font-display text-4xl sm:text-7xl uppercase tracking-tighter leading-none font-black">
              {videoCtaTitle.split(',').map((part, i) => (
                <React.Fragment key={i}>
                  {part}{i === 0 && ','} {i === 0 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-white/50 text-base sm:text-xl font-light">
              {videoCtaSubtitle}
            </p>
            <div className="pt-6">
              <button className="bg-primary-container text-white px-14 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-700 shadow-2xl">
                {videoCtaButtonText}
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-12"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black shadow-[0_0_100px_rgba(255,85,64,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-16 right-0 text-white hover:text-primary-container transition-colors flex items-center gap-2 font-bold uppercase tracking-[0.5em] text-xs"
                onClick={() => setSelectedVideo(null)}
              >
                Close <span className="material-symbols-outlined text-base">close</span>
              </button>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Videos;
