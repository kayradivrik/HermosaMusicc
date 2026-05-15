import React, { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { client, urlFor } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';

interface AboutSettings {
  title?: string;
  subtitle?: string;
  content?: any;
  image?: any;
}

const About: React.FC = () => {
  const [settings, setSettings] = useState<AboutSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = '*[_type == "aboutSettings"][0]';
        const data = await client.fetch(query);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching about settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const titleText = settings?.title || "ABOUT US";
  const subtitleText = settings?.subtitle || "Hermosa Music & Entertainment";
  const imageSrc = settings?.image ? urlFor(settings.image).url() : "https://lh3.googleusercontent.com/aida-public/AB6AXuBD5loPgne0onEA3YfdZY85YsRCBskpsNjKBsMX0mh78M0rc2dL1rDK_vur6Mnzq3djeG6Vjd8wBscATZHSszrD6_nYrx-vrWNc7r0pqt2nt-w8ve5aO2JbmKyBzkcnh9nogz28sLGRiNZ_RvoYIphK90o1OzACMSPQn56DyhsOdFR04vyI1x7JlwxECxvkOnzYQJQAKK41SJMnOgegjMlEabSrMsmHKNuhOu_nqWdF9Rq-TuYaT_UGozpE1ocGeVCKNS6tTl3YMSrz";

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <TopNavBar />
      <main className="flex-grow pt-[100px] sm:pt-[120px] pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-12 md:mb-16 relative">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-on-surface font-extrabold tracking-tight uppercase mb-sm">{titleText}</h1>
          <div className="w-16 md:w-24 h-[2px] bg-primary-container shadow-[0_0_10px_#ff5540] mb-lg"></div>
        </div>

        {loading ? (
          <LoadingOverlay />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-md">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-black uppercase tracking-tight">{subtitleText}</h2>
              <div className="font-body text-lg text-on-surface-variant leading-relaxed space-y-md prose prose-invert max-w-none">
                {settings?.content ? (
                  <PortableText value={settings.content} />
                ) : (
                  <>
                    <p>
                      Hermosa Music & Entertainment was founded to amplify brand voices, boost visibility, and build lasting digital identities. Inspired by music and driven by the energy of the entertainment industry, we blend aesthetics with strategy to deliver not just services, but real value.
                    </p>
                    <p>
                      Our mission is clear: to provide professional digital solutions for businesses of all sizes—from SMEs to individual entrepreneurs. We specialize in website creation, social media management, digital marketing strategies, and Google Ads campaigns to help brands grow online.
                    </p>
                    <p>
                      At Hermosa, every project is treated like a work of art. By merging technology with creativity, we become more than a service provider—we’re a true digital partner.
                    </p>
                    <p className="font-bold text-primary">
                      Our clients share one goal: not just to exist online, but to make an impact.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="relative aspect-square bg-surface-container-high overflow-hidden border border-white/10">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700"
                style={{ backgroundImage: `url('${imageSrc}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default About;

