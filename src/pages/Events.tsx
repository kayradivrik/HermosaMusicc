import React, { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { client, urlFor } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';

interface SanityEvent {
  _id: string;
  title: string;
  date: string;
  location: string;
  image: any;
  ticketUrl?: string;
  content?: any;
  isPast?: boolean;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<SanityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<{ title?: string; subtitle?: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsQuery = '*[_type == "event"] | order(date desc) { _id, title, date, location, image, ticketUrl, content, isPast }';
        const settingsQuery = '*[_type == "siteSettings"][0] { eventsPageTitle, eventsPageSubtitle }';
        
        const [eventsData, settingsData] = await Promise.all([
          client.fetch(eventsQuery),
          client.fetch(settingsQuery)
        ]);

        setEvents(eventsData);
        setSettings({
          title: settingsData?.eventsPageTitle,
          subtitle: settingsData?.eventsPageSubtitle
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pageTitle = settings.title || "GLOBAL EVENTS";
  const pageSubtitle = settings.subtitle || "Exclusive showcases and worldwide productions defining the elite entertainment landscape.";

  const upcomingEvents = events.filter(e => !e.isPast);
  const pastEvents = events.filter(e => e.isPast);

  const renderEventCard = (event: SanityEvent, isPast: boolean = false) => (
    <motion.div 
      key={event._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-white border border-black/5 flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[2rem] transition-all duration-700 ${isPast ? 'opacity-60 grayscale-[0.8] hover:grayscale-0 hover:opacity-100' : 'hover:border-primary-container/30 shadow-[0_20px_50px_rgba(0,0,0,0.03)]'}`}
    >
      <div className="w-full lg:w-[400px] shrink-0 aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100 relative">
        {event.image ? (
          <img 
            src={urlFor(event.image).url()} 
            alt={event.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        {isPast && (
          <div className="absolute top-6 left-6 bg-white/90 text-black px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-black/5 backdrop-blur-md z-10">
            Archived
          </div>
        )}
      </div>
      
      <div className="p-8 sm:p-12 flex-grow flex flex-col justify-between items-start gap-8">
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-4">
            <span className="text-primary-container font-black uppercase tracking-[0.3em] text-[10px]">
              {event.date ? new Date(event.date).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              }) : 'Upcoming'}
            </span>
            <div className="w-6 h-[1px] bg-black/10" />
            <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
               <span className="material-symbols-outlined text-sm">location_on</span> {event.location || 'TBA'}
            </span>
          </div>
          
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black uppercase tracking-tighter leading-none group-hover:text-primary-container transition-colors duration-700">
            {event.title}
          </h3>
          
          {event.content && (
            <div className="text-black/50 text-base sm:text-lg font-light leading-relaxed max-w-2xl line-clamp-2">
              <PortableText value={event.content} />
            </div>
          )}
        </div>

        {!isPast && event.ticketUrl && (
          <a 
            href={event.ticketUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-black group/btn"
          >
            <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-all duration-700 shadow-sm">
              <span className="material-symbols-outlined text-sm">confirmation_number</span>
            </div>
            Get Tickets
          </a>
        )}
      </div>
    </motion.div>
  );

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
                  <span className="text-primary-container font-bold uppercase tracking-[0.6em] text-[10px]">World Tour / Showcases</span>
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

        {/* ── Events List ── */}
        <section className="px-6 sm:px-12 lg:px-20">
          <div className="max-w-[95rem] mx-auto space-y-24">
            {events.length === 0 ? (
              <div className="py-32 text-center">
                <p className="text-black/20 text-3xl font-light uppercase tracking-widest">No events scheduled at this moment.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-12 lg:gap-16">
                {upcomingEvents.map(event => renderEventCard(event))}
                
                {pastEvents.length > 0 && (
                  <div className="pt-24 border-t border-black/5">
                    <div className="flex items-center gap-8 mb-16">
                      <h2 className="font-display text-2xl sm:text-4xl text-black/20 uppercase tracking-tighter">Past Productions</h2>
                      <div className="flex-grow h-[1px] bg-black/5" />
                    </div>
                    <div className="flex flex-col gap-10">
                      {pastEvents.map(event => renderEventCard(event, true))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="mt-32 py-24 sm:py-32 bg-black text-white px-6 sm:px-12 lg:px-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,64,0.15),transparent)] pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <h2 className="font-display text-4xl sm:text-7xl uppercase tracking-tighter leading-none font-black">
              Organize <br />Exclusive Showcase
            </h2>
            <p className="text-white/50 text-base sm:text-xl font-light max-w-2xl mx-auto">
              Bring the Hermosa experience to your city. We specialize in high-end production and elite artist bookings for global events.
            </p>
            <div className="pt-8">
              <button className="bg-primary-container text-white px-14 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-700 shadow-2xl">
                Contact for Booking
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Events;
