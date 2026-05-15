import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { client, urlFor } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';
import SEO from '../components/SEO';

interface SanityService {
  _id: string;
  title: string;
  description: string;
  image: any;
  order?: number;
}

const Services: React.FC = () => {
  interface SiteSettings {
    servicesPageTitle?: string;
    servicesCtaTitle?: string;
    servicesCtaSubtitle?: string;
    servicesCtaButtonText?: string;
  }
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<SanityService[]>([]);
  const [pageTitle, setPageTitle] = useState("OUR SERVICES");
  const [loading, setLoading] = useState(true);

  const defaultServices = [
    {
      _id: '1',
      title: "Music Distribution",
      description: "Elite distribution network covering 360+ digital platforms globally. We provide bespoke marketing strategies and performance analytics to maximize your reach.",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    },
    {
      _id: '2',
      title: "Digital Marketing",
      description: "Data-driven growth strategies tailored for the entertainment industry. From viral campaigns to targeted artist branding, we define your digital footprint.",
      image: "https://images.unsplash.com/photo-1514525253344-f814d0746b15?q=80&w=1974&auto=format&fit=crop",
    },
    {
      _id: '3',
      title: "Talent Management",
      description: "360-degree artist development and career architecture. We manage the complexity so you can focus on the creativity.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const query = '*[_type == "service"] | order(order asc)';
        const settingsQuery = '*[_type == "siteSettings"][0] { servicesPageTitle, servicesCtaTitle, servicesCtaSubtitle, servicesCtaButtonText }';
        
        const [data, settingsData] = await Promise.all([
          client.fetch(query),
          client.fetch(settingsQuery)
        ]);
        
        setSettings(settingsData);

        if (settingsData?.servicesPageTitle) {
          setPageTitle(settingsData.servicesPageTitle);
        }

        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(defaultServices as any);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices(defaultServices as any);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const ctaTitle = settings?.servicesCtaTitle || "Start Your Journey";
  const ctaSubtitle = settings?.servicesCtaSubtitle || "Ready to elevate your presence in the global entertainment matrix? Let's build something legendary together.";
  const ctaButtonText = settings?.servicesCtaButtonText || "Request a Consultation";

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <SEO title={`${pageTitle} | Hermosa`} description="Explore our elite music and entertainment services." />
      <TopNavBar />
      <main className="flex-grow bg-white overflow-x-hidden">
        
        {/* ── Light Hero Header (Consistent with Home) ── */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-white pt-[140px] pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden border-b border-black/5">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 w-full max-w-[95rem] mx-auto text-center lg:text-left flex flex-col lg:flex-row items-end justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-4xl"
            >
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-12 h-[1px] bg-primary-container" />
                <span className="text-primary-container font-bold uppercase tracking-[0.6em] text-[10px]">What We Do</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl text-black font-black uppercase leading-[0.95] tracking-tighter">
                {pageTitle}
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md"
            >
              <p className="text-black/50 text-base sm:text-lg font-light leading-relaxed border-l-2 border-primary-container/30 pl-8 text-left">
                Architecting the future of sound through elite production, strategic distribution, and global artist management.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Services List ── */}
        <section className="py-24 px-6 sm:px-12 lg:px-20 bg-white">
          <div className="max-w-[95rem] mx-auto flex flex-col gap-12 sm:gap-24">
            {services.map((service, index) => (
              <motion.div 
                key={service._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
              >
                {/* Number & Info */}
                <div className={`w-full lg:w-[50%] space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-6">
                    <span className="font-display text-3xl sm:text-4xl text-black/5 group-hover:text-primary-container/10 transition-colors duration-700 font-black">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-black uppercase tracking-tighter group-hover:text-primary-container transition-colors duration-700">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-black/50 text-base sm:text-lg leading-relaxed font-light">
                    {service.description}
                  </p>
                  <div className="pt-4">
                    <button className="group/btn flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.4em] text-black">
                      <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-all duration-700 shadow-sm">
                        <span className="material-symbols-outlined text-sm">east</span>
                      </div>
                      Explore Service
                    </button>
                  </div>
                </div>

                {/* Image Frame */}
                <div className={`w-full lg:w-[50%] ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-[4/3] overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-black/5 grayscale group-hover:grayscale-0 transition-all duration-[1.5s]">
                    <img 
                      src={service.image?.asset ? urlFor(service.image).url() : service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Final Call to Action ── */}
        <section className="py-24 sm:py-32 bg-white text-black px-6 sm:px-12 lg:px-20 text-center relative overflow-hidden border-t border-black/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,64,0.05),transparent)] pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-none font-black text-black">
              {ctaTitle.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word} {i === 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-black/40 text-base sm:text-lg font-light max-w-2xl mx-auto">
              {ctaSubtitle}
            </p>
            <div className="pt-8">
              <button className="bg-black text-white px-14 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-primary-container hover:text-white transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                {ctaButtonText}
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Services;
