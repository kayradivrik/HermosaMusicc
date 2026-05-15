import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../lib/sanity';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  favicon?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  ogImage, 
  ogType = 'website',
  keywords,
  favicon
}) => {
  const [globalSettings, setGlobalSettings] = useState<any>(null);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const query = '*[_type == "siteSettings"][0]';
        const data = await client.fetch(query);
        setGlobalSettings(data);
      } catch (error) {
        console.error("Error fetching global SEO settings:", error);
      }
    };
    fetchGlobalSettings();
  }, []);

  const siteTitle = globalSettings?.seo?.metaTitle || "Hermosa Music & Entertainment";
  const defaultDesc = globalSettings?.seo?.metaDescription || "Hermosa Music & Entertainment is a professional digital agency specializing in music distribution, artist management, events, and digital marketing.";
  
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  const finalFavicon = favicon || (globalSettings?.siteFavicon ? urlFor(globalSettings.siteFavicon).url() : null);
  const finalOgImage = ogImage || (globalSettings?.seo?.shareImage ? urlFor(globalSettings.seo.shareImage).url() : null);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Favicon */}
      {finalFavicon && <link rel="icon" href={finalFavicon} />}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {finalOgImage && <meta property="og:image" content={finalOgImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      {finalOgImage && <meta name="twitter:image" content={finalOgImage} />}
    </Helmet>
  );
};

export default SEO;
