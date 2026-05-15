import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NeonSeparator from '../components/NeonSeparator';
import { client, urlFor } from '../lib/sanity';
import { AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';



interface SiteSettings {
  heroTitle?: string;
  heroSubtitle?: string;
  heroLabel?: string; // e.g. "Global Agency"
  industryLabel?: string; // e.g. "Industry Leaders"
  estLabel?: string; // e.g. "Est. 2024"
  heroImages?: any[]; 
  platformTitle?: string;
  platformSubtitle?: string;
  platformLabel?: string; // e.g. "Service Domains"
  bentoArtist?: { title?: string; label?: string; image?: any; link?: string };
  bentoEvent?: { title?: string; label?: string; image?: any; link?: string };
  bentoService?: { title?: string; label?: string; description?: string; link?: string; image?: any };
  sliderLabel?: string; // e.g. "Global Elite"
  sliderYear?: string; // e.g. "2024"
  scrollLabel?: string; // e.g. "Explore"
  statsLabel?: string; // e.g. "Global Performance Matrix"
  statsTitle?: string;
  statsSubtitle?: string;
  stats?: Array<{ label: string; value: string; icon: string }>;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  blogLabel?: string; // e.g. "Hermosa Journal"
  blogTitle?: string; // e.g. "Latest News"
  showExploreButton?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    shareImage?: any;
  };
}

interface SanityBlog {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage: any;
  category?: string;
}

const Home: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [blogs, setBlogs] = useState<SanityBlog[]>([]);
  const [blogIndex, setBlogIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsQuery = '*[_type == "siteSettings"][0]';
        const blogsQuery = '*[_type == "blog"] | order(publishedAt desc)[0...9]';

        const [settingsData, blogsData] = await Promise.all([
          client.fetch(settingsQuery),
          client.fetch(blogsQuery)
        ]);

        setSettings(settingsData);
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const nextBlogs = () => {
    if (blogs.length <= 3) return;
    setBlogIndex((prev) => (prev + 3 >= blogs.length ? 0 : prev + 3));
  };

  const prevBlogs = () => {
    if (blogs.length <= 3) return;
    setBlogIndex((prev) => (prev - 3 < 0 ? Math.floor((blogs.length - 1) / 3) * 3 : prev - 3));
  };



  const formatTitle = (title: string) => {
    const parts = title.split(/(Hermosa)/i);
    return parts.map((part, i) =>
      part.toLowerCase() === 'hermosa'
        ? <span key={i} className="text-primary-container">{part}</span>
        : part
    );
  };

  const titleText = settings?.heroTitle || "Push The Limits of Sound: Redefine Entertainment with Hermosa";
  const subtitleText = settings?.heroSubtitle || "The world's most prestigious events, artists, and production services on a single platform. Listen to the sound rising from the dark.";
  const heroLabel = settings?.heroLabel || "Global Agency";
  const industryLabel = settings?.industryLabel || "Industry Leaders";
  const estLabel = settings?.estLabel || "Est. 2024";

  // Slider Images & Labels Fallback
  const heroSliderImages = settings?.heroImages?.length 
    ? settings.heroImages.map(img => urlFor(img).url())
    : [
        "https://images.unsplash.com/photo-1514525253344-f814d0746b15?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
      ];
  const sliderLabel = settings?.sliderLabel || "Global Elite";
  const sliderYear = settings?.sliderYear || "2024";
  const scrollLabel = settings?.scrollLabel || "Explore";

  // Bento & Platform Fallbacks
  const platformLabel = settings?.platformLabel || "Service Domains";
  const platformTitle = settings?.platformTitle || "Bespoke Solutions";
  const platformSubtitle = settings?.platformSubtitle || "Tailored management and production strategies for the world's most demanding entertainment landscapes.";

  const bentoArt = {
    title: settings?.bentoArtist?.title || "Artists",
    label: settings?.bentoArtist?.label || "Talent Management",
    image: settings?.bentoArtist?.image ? urlFor(settings.bentoArtist.image).url() : "https://images.unsplash.com/photo-1514525253344-f814d0746b15?q=80&w=1974&auto=format&fit=crop",
    link: settings?.bentoArtist?.link || "/artists"
  };

  const bentoEve = {
    title: settings?.bentoEvent?.title || "Events",
    label: settings?.bentoEvent?.label || "Global Production",
    image: settings?.bentoEvent?.image ? urlFor(settings.bentoEvent.image).url() : "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    link: settings?.bentoEvent?.link || "/events"
  };

  const bentoSer = {
    title: settings?.bentoService?.title || "Services",
    label: settings?.bentoService?.label || "Infrastructure",
    description: settings?.bentoService?.description || "High-end technical infrastructure and sound design solutions.",
    image: settings?.bentoService?.image ? urlFor(settings.bentoService.image).url() : "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    link: settings?.bentoService?.link || "/services"
  };

  // Stats Fallback
  const statsLabel = settings?.statsLabel || "Global Performance Matrix";
  const statsTitle = settings?.statsTitle || "Impact Through Excellence";
  const statsSubtitle = settings?.statsSubtitle || "Setting new benchmarks in the music industry. Our trajectory is defined by measurable global success.";
  const homeStats = settings?.stats?.length ? settings.stats : [
    { label: 'Global Projects', value: '500+', icon: 'public' },
    { label: 'Talented Artists', value: '120+', icon: 'diversity_3' },
    { label: 'Event Attendees', value: '2M+',  icon: 'group' },
    { label: 'Years Experience', value: '15+',  icon: 'history' },
  ];

  // CTA Fallback
  const ctaTitle = settings?.ctaTitle || "Ready to elevate your sound?";
  const ctaSubtitle = settings?.ctaSubtitle || "Join the network of professionals and brands that are shaping the future of entertainment.";
  const ctaButtonText = settings?.ctaButtonText || "Start a Project";

  // Blog Section Fallback
  const blogLabel = settings?.blogLabel || "Hermosa Journal";
  const blogTitle = settings?.blogTitle || "Latest News";





  return (
    <>
      <SEO
        title={settings?.seo?.metaTitle}
        description={settings?.seo?.metaDescription}
        keywords={settings?.seo?.keywords}
        ogImage={settings?.seo?.shareImage ? urlFor(settings.seo.shareImage).url() : undefined}
      />
      <TopNavBar />
      <main className="flex-grow bg-white relative overflow-x-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-primary-container/5 rounded-full blur-[100px]"></div>
          <div className="absolute top-[40%] left-[60%] w-[25%] h-[25%] bg-black/[0.02] rounded-full blur-[80px]"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none z-0"></div>
        <section className="relative w-full min-h-screen lg:h-screen flex items-center justify-center overflow-hidden bg-white">
          {/* Background image layer with subtle light overlay */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <div
              className="w-full h-full bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
          </motion.div>

          <div className="relative z-30 w-full max-w-[95rem] mx-auto px-6 sm:px-12 lg:px-20 pt-[140px] pb-20 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-screen lg:h-screen">
            
            {/* Left Column: Expanded Text Area */}
            <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-[1px] bg-primary-container" />
                  <span className="text-primary-container font-bold uppercase tracking-[0.6em] text-[10px]">{heroLabel}</span>
                </div>
                <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-black font-black uppercase leading-[0.95] tracking-tighter drop-shadow-sm">
                  {formatTitle(titleText)}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-body text-sm sm:text-lg md:text-xl text-black/60 max-w-2xl font-light leading-relaxed"
              >
                {subtitleText}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap items-center gap-6 sm:gap-8 justify-center lg:justify-start"
              >
                <button
                  onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center gap-4 sm:gap-6 bg-black text-white pl-6 sm:pl-8 pr-2 sm:pr-3 py-2 sm:py-3 rounded-full hover:bg-primary-container hover:text-white transition-all duration-500 shadow-xl"
                >
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Discover Now</span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <span className="material-symbols-outlined text-sm text-white">east</span>
                  </div>
                </button>
                
                <div className="hidden sm:flex items-center gap-4 text-black/40">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{industryLabel}</span>
                  <div className="w-1 h-1 rounded-full bg-primary-container" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{estLabel}</span>
                </div></motion.div>
            </div>

            {/* Right Column: Hero Image Frame with Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="w-full lg:w-[40%] relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.08)] bg-white/50 backdrop-blur-sm">
                <Swiper
                  modules={[Autoplay, EffectFade]}
                  effect="fade"
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop={true}
                  className="w-full h-full"
                >
                  {heroSliderImages.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <img 
                        src={src} 
                        alt={`Hermosa ${idx + 1}`} 
                        className="w-full h-full object-cover grayscale opacity-60"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="absolute bottom-10 left-10 right-10 z-20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="w-8 h-[1px] bg-primary-container" />
                      <p className="text-xs text-black font-bold uppercase tracking-widest">{sliderLabel}</p>
                    </div>
                    <span className="text-[10px] text-black/30 font-medium">©{sliderYear}</span>
                  </div>
                </div>
              </div>

              {/* Minimal floating line decoration */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-[1px] bg-white/10 hidden lg:block" />
            </motion.div>
          </div>

          {/* ── Scroll indicator ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none hidden sm:flex"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/20">{scrollLabel}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-[1px] h-10 bg-gradient-to-b from-primary-container to-transparent"
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 w-full z-30">
            <NeonSeparator />
          </div>
        </section>


        {/* ── Transition Section: Marquee ── */}
        <section className="w-full bg-primary-container py-4 overflow-hidden flex items-center border-y border-white/10 z-40 relative">
          <div className="flex whitespace-nowrap font-display text-lg sm:text-2xl uppercase tracking-widest text-white font-black animate-marquee">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="px-md flex items-center gap-6">
                MUSIC <div className="w-2 h-2 rounded-full bg-white/30" /> 
                ENTERTAINMENT <div className="w-2 h-2 rounded-full bg-white/30" /> 
                EVENTS — 
              </span>
            ))}
          </div>
        </section>

        {/* ── Section: Service Domains (Back to White) ── */}
        <section id="discover" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-white text-black relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary-container/[0.03] rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-[95rem] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 sm:mb-24 gap-10 md:gap-20">
              <div className="space-y-4 sm:space-y-8 max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-primary-container" />
                  <span className="text-primary-container font-black uppercase tracking-[0.6em] text-[10px] block">{platformLabel}</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5vw] text-black uppercase leading-[0.85] tracking-tighter">{platformTitle}</h2>
              </div>
              <div className="md:w-[400px]">
                <p className="text-black/50 text-base sm:text-lg leading-relaxed font-light border-l-2 border-black/5 pl-8">
                  {platformSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { title: "Artists", label: "Talent Management", img: bentoArt.image },
                { title: "Events", label: "Global Production", img: bentoEve.image },
                { title: "Services", label: "Infrastructure", img: bentoSer.image }
              ].map((card, i) => (
                <Link
                  key={i}
                  to={`/${card.title.toLowerCase()}`}
                  className="group relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] overflow-hidden bg-zinc-900 rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/5 shadow-2xl transition-all duration-700 hover:border-primary-container/30"
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-80 transition-all duration-[2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-14 space-y-4 sm:space-y-6">
                    <span className="text-primary-container font-bold uppercase tracking-[0.4em] text-[10px] block translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                      {card.label}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tighter leading-none">
                      {card.title}
                    </h3>
                    
                    <div className="pt-6 overflow-hidden">
                      <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 translate-y-full group-hover:translate-y-0 transition-all duration-700">
                        <span>Discover Expertise</span>
                        <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 transition-all duration-700" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-black/5 bg-white">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24">
              {/* Left: Text — fixed width so text doesn't get squashed */}
              <div className="w-full md:w-1/2 space-y-8 min-w-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-primary-container" />
                  <span className="text-primary-container font-bold uppercase tracking-[0.8em] text-[10px] block">{statsLabel}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-black uppercase leading-[0.9] tracking-tighter">{statsTitle}</h2>
                <p className="text-black/50 text-base sm:text-xl leading-relaxed font-light">
                  {statsSubtitle}
                </p>
                <Link to="/about" className="group inline-flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <span className="material-symbols-outlined">east</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-black">Learn more about our vision</span>
                </Link>
              </div>

              {/* Right: Clean 2x2 stats grid */}
              <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {homeStats.map((stat, i) => (
                  <div key={i} className="bg-white border border-black/8 rounded-3xl p-6 sm:p-8 flex flex-col items-start gap-4 shadow-sm hover:shadow-md hover:border-primary-container/20 transition-all duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-black/4 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-container text-xl">{stat.icon}</span>
                    </div>
                    <div>
                      <div className="font-display text-5xl font-black text-black tracking-tighter leading-none">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-black/40 font-bold mt-2">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* News Slider Section - REDESIGNED TO WHITE */}
        {blogs.length > 0 && (
          <section className="py-32 px-margin-mobile md:px-margin-desktop bg-white relative overflow-hidden border-t border-black/5">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-[1px] bg-primary-container" />
                      <span className="text-primary-container font-bold uppercase tracking-[0.6em] text-[10px]">{blogLabel}</span>
                    </div>
                    <h2 className="font-display text-4xl sm:text-6xl text-black uppercase leading-none tracking-tighter">{blogTitle}</h2>
                  </div>
                <div className="flex gap-3">
                  <button
                    onClick={prevBlogs}
                    className="w-14 h-14 border border-black/10 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all group"
                  >
                    <span className="material-symbols-outlined group-active:-translate-x-1 transition-transform">west</span>
                  </button>
                  <button
                    onClick={nextBlogs}
                    className="w-14 h-14 border border-black/10 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all group"
                  >
                    <span className="material-symbols-outlined group-active:translate-x-1 transition-transform">east</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={blogIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                  >
                    {blogs.slice(blogIndex, blogIndex + 3).map((blog) => (
                      <Link
                        key={blog._id}
                        to={`/blog/${blog.slug.current}`}
                        className="group flex flex-col space-y-8"
                      >
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-black/5 border border-black/5">
                          {blog.mainImage ? (
                            <img
                              src={urlFor(blog.mainImage).url()}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                          ) : (
                            <div className="w-full h-full bg-black/5" />
                          )}

                          {/* Category Badge */}
                          <div className="absolute top-8 left-8">
                            <div className="bg-white/80 backdrop-blur-md border border-black/10 text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                              {blog.category || 'News'}
                            </div>
                          </div>

                          {/* Date Badge */}
                          <div className="absolute bottom-8 right-8">
                            <div className="bg-black/80 backdrop-blur-md border border-black/10 text-white px-5 py-2 rounded-full text-[10px] font-medium tracking-widest">
                              {new Date(blog.publishedAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 px-4">
                          <h3 className="font-display text-2xl md:text-3xl text-black uppercase leading-tight group-hover:text-primary-container transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-black/40 text-lg leading-relaxed line-clamp-3 font-body">
                            {/* English placeholder */}
                            Stay updated with the latest trends and elite productions from the Hermosa Music ecosystem.
                          </p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        <section className="py-xl px-margin-mobile md:px-margin-desktop bg-black/[0.02] border-y border-black/5">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-md">
            <h2 className="font-display text-4xl text-black uppercase">{ctaTitle}</h2>
            <p className="font-body text-lg text-on-surface-variant">
              {ctaSubtitle}
            </p>
            <div className="mt-md">
              <Link
                to="/contact"
                className="inline-block bg-black text-white px-xl py-sm font-bold uppercase tracking-widest hover:bg-primary-container hover:text-white transition-all duration-300"
              >
                {ctaButtonText}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
