import React, { useEffect, useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { client, urlFor } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';

interface AgencySettings {
  title?: string;
  description?: string;
  image?: any;
}

const Agency: React.FC = () => {
  const [settings, setSettings] = useState<AgencySettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = '*[_type == "agencySettings"][0]';
        const data = await client.fetch(query);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching agency settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const titleText = settings?.title || "AGENCY";
  const descText = settings?.description || "This page will be live soon. Get ready for exclusive content with Hermosa Music & Entertainment.";
  const imageSrc = settings?.image ? urlFor(settings.image).url() : "";

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <TopNavBar />
      <main className="flex-grow pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center text-center relative overflow-hidden">
        {imageSrc && (
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center opacity-30 grayscale"
              style={{ backgroundImage: `url('${imageSrc}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/30"></div>
          </div>
        )}
        
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="font-display text-4xl md:text-7xl text-on-surface uppercase mb-sm drop-shadow-2xl">{titleText}</h1>
          <div className="w-24 h-[1px] bg-primary-container shadow-[0_0_10px_#ff5540] mb-lg"></div>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl drop-shadow-md">
            {descText}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Agency;
