import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { client, urlFor } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';
import NotFound from './NotFound';

interface SanityPage {
  _id: string;
  title: string;
  content: any;
  featuredImage?: any;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

const CustomPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<SanityPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const query = '*[_type == "page" && slug.current == $slug][0]';
        const data = await client.fetch(query, { slug });
        setPage(data);
      } catch (error) {
        console.error("Error fetching custom page:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!page) {
    return <NotFound />;
  }

  // PortableText components for custom rendering
  const components = {
    block: {
      h1: ({ children }: any) => <h1 className="font-display text-4xl md:text-7xl text-black uppercase mt-12 mb-6 leading-tight">{children}</h1>,
      h2: ({ children }: any) => <h2 className="font-display text-3xl md:text-5xl text-black uppercase mt-10 mb-5 leading-tight">{children}</h2>,
      h3: ({ children }: any) => <h3 className="font-display text-3xl md:text-4xl text-black uppercase mt-8 mb-4 leading-tight">{children}</h3>,
      h4: ({ children }: any) => <h4 className="font-display text-2xl md:text-3xl text-black uppercase mt-6 mb-3 leading-tight">{children}</h4>,
      normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-on-surface-variant">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-black/80 text-2xl bg-black/5">
          {children}
        </blockquote>
      ),
    },
    marks: {
      color: ({ children, value }: any) => {
        return <span style={{ color: value.hex }}>{children}</span>;
      },
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-primary hover:underline font-bold transition-all">
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }: any) => {
        const fullWidth = value.fullWidth;
        return (
          <div className={`${fullWidth ? 'w-screen -ml-[50vw] left-1/2 relative' : 'my-16 overflow-hidden border border-black/10 shadow-sm'} group relative`}>
            <img
              src={urlFor(value).url()}
              alt={value.alt || 'Page Image'}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            {value.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-white/60 backdrop-blur-sm p-4 text-xs text-black/70 uppercase tracking-widest">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      youtube: ({ value }: any) => {
        const id = value.url?.split('v=')[1]?.split('&')[0] || value.url?.split('be/')[1];
        if (!id) return null;
        return (
          <div className="my-16 aspect-video w-full border border-black/10 shadow-sm">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      },
      break: ({ value }: any) => {
        if (value.style === 'neon') {
          return <div className="my-24 h-[1px] w-full bg-primary shadow-[0_0_15px_rgba(255,85,64,0.8)]"></div>;
        }
        return <div className="my-24 h-[1px] w-full bg-black/10"></div>;
      },
    },
  };

  return (
    <>
      <SEO 
        title={page.seo?.metaTitle || `${page.title} | Hermosa`} 
        description={page.seo?.metaDescription}
        ogImage={page.featuredImage ? urlFor(page.featuredImage).url() : undefined}
      />
      <TopNavBar />
      
      <main className="flex-grow pt-[100px] md:pt-[130px] bg-background min-h-screen">
        {/* Page Header */}
        <div className="px-margin-mobile md:px-margin-desktop mb-24 md:mb-32">
          <div className="max-w-5xl mx-auto">
             <h1 className="font-display text-6xl md:text-9xl text-black uppercase mb-8 leading-[0.9] tracking-tighter">
              {page.title}
            </h1>
            <div className="w-32 h-[3px] bg-primary"></div>
          </div>
        </div>

        {/* Featured Image if exists */}
        {page.featuredImage && (
          <div className="w-full h-[50vh] md:h-[75vh] overflow-hidden mb-24 relative">
            <img 
              src={urlFor(page.featuredImage).url()} 
              alt={page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-60"></div>
          </div>
        )}

        {/* Page Content */}
        <div className="px-margin-mobile md:px-margin-desktop pb-32">
          <div className="max-w-4xl mx-auto">
            <div className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed prose max-w-none">
              {page.content ? (
                <PortableText value={page.content} components={components} />
              ) : (
                <p className="text-tertiary italic">This page has no content yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CustomPage;
