import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { client, urlFor } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';

interface SiteSettings {
  contactEmail?: string;
  contactPhone?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  contactPageTitle?: string;
  contactPageSubtitle?: string;
  contactAddress?: string;
  contactMapImage?: any;
}

const Contact: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = '*[_type == "siteSettings"][0]';
        const data = await client.fetch(query);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const email = settings?.contactEmail || "selma@hermosamusicentertainment.com";
  const phone = settings?.contactPhone || "+90 (535) 847-7792";
  const igUrl = settings?.instagramUrl || "https://www.instagram.com/hermosamusicen/";
  const tiktokUrl = settings?.tiktokUrl || "https://www.tiktok.com/@hermosamusicen";
  const youtubeUrl = settings?.youtubeUrl || "https://www.youtube.com/@hermosamusictv";
  
  const pageTitle = settings?.contactPageTitle || "CONNECT WITH US";
  const pageSubtitle = settings?.contactPageSubtitle || "Architecting elite entertainment projects globally. Reach out for artist management, event bookings, or strategic partnerships.";
  const address = settings?.contactAddress || "Istanbul, Turkey";
  const mapImageSrc = settings?.contactMapImage ? urlFor(settings.contactMapImage).url() : "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop";

  if (loading) return <LoadingOverlay />;

  return (
    <>
      <SEO title={`${pageTitle} | Hermosa`} description={pageSubtitle} />
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
                  <span className="text-primary-container font-bold uppercase tracking-[0.6em] text-[10px]">Global Inquiries</span>
                </div>
                <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl text-black font-black uppercase leading-[0.85] tracking-tighter">
                  {pageTitle}
                </h1>
                <p className="text-black/40 font-body text-base sm:text-xl max-w-2xl font-light leading-relaxed">
                  {pageSubtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Contact Layout ── */}
        <section className="px-6 sm:px-12 lg:px-20">
          <div className="max-w-[95rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* Left: Contact Info */}
              <div className="lg:col-span-5 space-y-20">
                <div className="space-y-12">
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-container">Headquarters</h4>
                      <p className="text-black font-display text-2xl sm:text-3xl uppercase tracking-tighter leading-tight whitespace-pre-line">
                        {address}
                      </p>
                   </div>
                   
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-container">Direct Reach</h4>
                      <div className="space-y-2">
                        <p className="text-black font-display text-2xl sm:text-3xl uppercase tracking-tighter hover:text-primary-container transition-colors">
                          <a href={`tel:${phone}`}>{phone}</a>
                        </p>
                        <p className="text-black font-display text-2xl sm:text-3xl uppercase tracking-tighter hover:text-primary-container transition-colors break-all">
                          <a href={`mailto:${email}`}>{email}</a>
                        </p>
                      </div>
                   </div>

                   <div className="space-y-6 pt-10 border-t border-black/5">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Social Presence</h4>
                      <div className="flex gap-8">
                         <a href={igUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary-container transition-all hover:scale-125 transform duration-300">
                           <i className="fa-brands fa-instagram text-3xl"></i>
                         </a>
                         <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary-container transition-all hover:scale-125 transform duration-300">
                           <i className="fa-brands fa-tiktok text-3xl"></i>
                         </a>
                         <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary-container transition-all hover:scale-125 transform duration-300">
                           <i className="fa-brands fa-youtube text-3xl"></i>
                         </a>
                      </div>
                   </div>
                </div>

                {/* Map Section */}
                <div className="aspect-[16/9] lg:aspect-square rounded-[3rem] overflow-hidden border border-black/5 relative group grayscale transition-all duration-1000 hover:grayscale-0 shadow-2xl">
                   <img src={mapImageSrc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Map Location" />
                   <div className="absolute inset-0 bg-primary-container/10 group-hover:bg-transparent transition-colors duration-1000" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-500">
                         <span className="material-symbols-outlined text-sm">map</span> Open in Maps
                      </button>
                   </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-gray-50/50 rounded-[3.5rem] p-8 sm:p-16 space-y-12 border border-black/5">
                   <div className="space-y-4">
                      <h3 className="font-display text-4xl sm:text-5xl text-black uppercase tracking-tighter leading-none">Inquiry Form</h3>
                      <p className="text-black/40 text-sm font-light uppercase tracking-widest">Expected Response Time: &lt; 24 Hours</p>
                   </div>

                   <form className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/30 px-2">Your Name</label>
                            <input type="text" placeholder="ALEXANDER HERMOSA" className="w-full bg-transparent border-b-2 border-black/10 px-2 py-4 focus:border-primary-container transition-colors text-black font-display text-xl outline-none" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/30 px-2">Electronic Mail</label>
                            <input type="email" placeholder="HELLO@HERMOSA.COM" className="w-full bg-transparent border-b-2 border-black/10 px-2 py-4 focus:border-primary-container transition-colors text-black font-display text-xl outline-none" />
                         </div>
                      </div>
                      
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-black/30 px-2">Project Subject</label>
                         <input type="text" placeholder="GLOBAL ARTIST MANAGEMENT" className="w-full bg-transparent border-b-2 border-black/10 px-2 py-4 focus:border-primary-container transition-colors text-black font-display text-xl outline-none" />
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-black/30 px-2">Your Message</label>
                         <textarea rows={4} placeholder="DESCRIBE YOUR VISION..." className="w-full bg-transparent border-b-2 border-black/10 px-2 py-4 focus:border-primary-container transition-colors text-black font-display text-xl outline-none resize-none"></textarea>
                      </div>

                      <div className="pt-6">
                         <button className="bg-black text-white w-full sm:w-auto px-16 py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 group">
                            Submit Inquiry
                            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
                         </button>
                      </div>
                   </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Contact;
