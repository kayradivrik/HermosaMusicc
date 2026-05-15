import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { client, urlFor } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';

interface SanityArtist {
  _id: string;
  name: string;
  genre: string;
  image: any;
  bannerImage?: any;
  bio?: any;
  socialLinks?: {
    instagram?: string;
    spotify?: string;
    twitter?: string;
  };
  metaTitle?: string;
  metaDescription?: string;
}

const ArtistDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [artist, setArtist] = useState<SanityArtist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const query = '*[_type == "artist" && (slug.current == $slug || _id == $slug)][0]';
        const data = await client.fetch(query, { slug });
        setArtist(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArtist();
    }
  }, [slug]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-black mb-4 uppercase font-display">Artist Not Found</h1>
          <Link to="/artists" className="text-primary-container hover:underline font-bold uppercase tracking-widest">Back to Artists</Link>
        </div>
      </div>
    );
  }

  const components = {
    block: {
      h1: ({ children }: any) => <h1 className="font-display text-4xl md:text-6xl text-black uppercase mt-12 mb-6 leading-tight">{children}</h1>,
      h2: ({ children }: any) => <h2 className="font-display text-3xl md:text-5xl text-black uppercase mt-10 mb-5 leading-tight">{children}</h2>,
      h3: ({ children }: any) => <h3 className="font-display text-2xl md:text-4xl text-black uppercase mt-8 mb-4 leading-tight">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-black/80 font-body text-lg">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-primary-container pl-6 py-2 my-8 italic text-black/60 text-xl bg-black/5">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-primary-container hover:underline font-bold transition-all">
            {children}
          </a>
        );
      },
    }
  };

  return (
    <>
      <SEO 
        title={artist.metaTitle || `${artist.name} | Hermosa Artists`} 
        description={artist.metaDescription || `Learn more about ${artist.name}, at Hermosa Music.`}
        ogImage={artist.image ? urlFor(artist.image).url() : undefined}
      />
      <TopNavBar />
      
      <main className="flex-grow bg-white overflow-x-hidden pt-20">
        {/* Banner Hero */}
        <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            {artist.bannerImage ? (
              <img src={urlFor(artist.bannerImage).url()} className="w-full h-full object-cover" alt={artist.name} />
            ) : artist.image ? (
              <img src={urlFor(artist.image).url()} className="w-full h-full object-cover blur-md scale-110 opacity-20" alt={artist.name} />
            ) : (
              <div className="w-full h-full bg-gray-50" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-margin-mobile md:p-margin-desktop pb-16 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto"
            >
              <Link to="/artists" className="inline-flex items-center gap-2 text-black/40 hover:text-primary-container transition-colors mb-6 uppercase text-[10px] font-bold tracking-widest">
                <span className="material-symbols-outlined text-sm">west</span> Back to Artists
              </Link>
              <h1 className="font-display text-6xl md:text-[8vw] text-black uppercase leading-[0.9] tracking-tighter mb-4 font-black">
                {artist.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-primary-container"></span>
                <span className="text-primary-container uppercase font-bold tracking-[0.3em] text-xs">{artist.genre}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
              
              {/* Sidebar Info */}
              <div className="lg:col-span-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="sticky top-32 space-y-12"
                >
                  <div className="aspect-[3/4] overflow-hidden border border-black/5 shadow-2xl bg-gray-50">
                    {artist.image ? (
                      <img src={urlFor(artist.image).url()} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt={artist.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/10 font-display text-2xl">NO IMAGE</div>
                    )}
                  </div>

                  <div className="flex flex-col gap-6 pt-4">
                    <h3 className="font-display text-xs uppercase tracking-[0.4em] text-primary-container font-black">Connect / Follow</h3>
                    <div className="flex gap-6">
                      {artist.socialLinks?.instagram && (
                        <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary-container transition-all hover:scale-125 transform duration-300">
                          <i className="fa-brands fa-instagram text-3xl"></i>
                        </a>
                      )}
                      {artist.socialLinks?.spotify && (
                        <a href={artist.socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary-container transition-all hover:scale-125 transform duration-300">
                          <i className="fa-brands fa-spotify text-3xl"></i>
                        </a>
                      )}
                      {artist.socialLinks?.twitter && (
                        <a href={artist.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary-container transition-all hover:scale-125 transform duration-300">
                          <i className="fa-brands fa-x-twitter text-3xl"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bio & Booking */}
              <div className="lg:col-span-8 space-y-24">
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight">
                  {artist.bio ? (
                    <PortableText value={artist.bio} components={components} />
                  ) : (
                    <p className="text-black/40 italic text-xl">The story of {artist.name} is unfolding. Biography coming soon.</p>
                  )}
                </div>

                {/* Redesigned Booking CTA - Fixed Width Issue */}
                <div className="py-20 border-t border-black/10 mt-16 w-full">
                  <div className="flex flex-col gap-10">
                    <div className="space-y-4">
                      <span className="text-primary-container font-bold uppercase tracking-[0.4em] text-[10px]">Booking Inquiry</span>
                      <h2 className="font-display text-4xl md:text-7xl text-black uppercase leading-tight tracking-tighter">Experience {artist.name}</h2>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                      <div className="flex-1">
                        <p className="text-black/60 text-xl md:text-2xl leading-relaxed max-w-3xl">
                          Hermosa Music represents {artist.name} for exclusive worldwide bookings, brand partnerships, and high-end production projects. Inquire now to secure availability for your next global event.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <Link 
                          to="/contact" 
                          className="inline-block bg-black text-white px-20 py-6 font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all duration-300 shadow-2xl"
                        >
                          Inquire Now
                        </Link>
                      </div>
                    </div>
                  </div>
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

export default ArtistDetail;
