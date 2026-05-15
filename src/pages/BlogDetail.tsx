import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { client, urlFor } from '../lib/sanity';
import LoadingOverlay from '../components/LoadingOverlay';

interface SanityBlog {
  _id: string;
  title: string;
  publishedAt: string;
  mainImage: any;
  category?: string;
  body: any;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<SanityBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const query = '*[_type == "blog" && (slug.current == $id || _id == $id)][0]';
        const data = await client.fetch(query, { id });
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-black">
        <h2 className="text-4xl font-display mb-4">POST NOT FOUND</h2>
        <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={blog.metaTitle || blog.title} 
        description={blog.metaDescription || blog.excerpt}
        ogImage={blog.mainImage ? urlFor(blog.mainImage).url() : undefined}
        ogType="article"
      />
      <TopNavBar />
      <main className="flex-grow pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
        <Link to="/blog" className="flex items-center gap-xs text-tertiary hover:text-primary transition-colors mb-lg uppercase text-sm font-bold tracking-widest">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Blog
        </Link>
        
        <div className="mb-xl">
          <div className="flex gap-md items-center mb-sm text-sm text-tertiary font-body">
            <span className="bg-primary-container text-white px-2 py-0.5 text-xs font-bold">{blog.category || 'NEWS'}</span>
            <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US') : 'No date'}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-black uppercase mb-lg leading-tight">
            {blog.title}
          </h1>
          {blog.mainImage && (
            <div className="aspect-[21/9] w-full overflow-hidden mb-xl border border-black/10">
              <img 
                src={urlFor(blog.mainImage).url()} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="font-body text-lg text-on-surface-variant leading-relaxed space-y-md blog-content prose max-w-none">
            {blog.body ? <PortableText value={blog.body} /> : <p>Content not found.</p>}
          </div>
        </div>

        {/* Post Footer */}
        <div className="pt-xl border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-lg">
          <div className="flex flex-col gap-sm">
            <span className="text-tertiary uppercase text-xs font-bold tracking-widest">Share this post:</span>
            <div className="flex gap-md">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-black/10 hover:border-primary transition-colors text-on-surface hover:text-primary"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-black/10 hover:border-primary transition-colors text-on-surface hover:text-primary"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + " " + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-black/10 hover:border-primary transition-colors text-on-surface hover:text-primary"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
