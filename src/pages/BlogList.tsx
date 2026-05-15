import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { client, urlFor } from '../lib/sanity';
import SEO from '../components/SEO';
import LoadingOverlay from '../components/LoadingOverlay';

interface SanityBlog {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  mainImage: any;
  category?: string;
  views?: number;
}

type SortKey = 'newest' | 'oldest' | 'popular';

const SORT_OPTIONS: { key: SortKey; label: string; icon: string }[] = [
  { key: 'newest', label: 'Newest First',  icon: 'arrow_downward' },
  { key: 'oldest', label: 'Oldest First',  icon: 'arrow_upward'   },
  { key: 'popular', label: 'Most Popular', icon: 'trending_up'    },
];

const PAGE_SIZE = 9;

const BlogList: React.FC = () => {
  const [blogs, setBlogs]           = useState<SanityBlog[]>([]);
  const [pageTitle, setPageTitle]   = useState('BLOG');
  const [loading, setLoading]       = useState(true);
  const [sort, setSort]             = useState<SortKey>('newest');
  const [dropOpen, setDropOpen]     = useState(false);
  const [page, setPage]             = useState(1);
  const dropRef                     = useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsQuery    = '*[_type == "blog"] | order(publishedAt desc) { _id, title, slug, excerpt, publishedAt, mainImage, category, views }';
        const settingsQuery = '*[_type == "siteSettings"][0] { blogPageTitle }';
        const [blogsData, settingsData] = await Promise.all([
          client.fetch(blogsQuery),
          client.fetch(settingsQuery),
        ]);
        setBlogs(blogsData || []);
        if (settingsData?.blogPageTitle) setPageTitle(settingsData.blogPageTitle);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* Sort */
  const sorted = [...blogs].sort((a, b) => {
    if (sort === 'newest')  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    if (sort === 'oldest')  return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    if (sort === 'popular') return (b.views ?? 0) - (a.views ?? 0);
    return 0;
  });

  /* Pagination */
  const totalPages  = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated   = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const currentSort = SORT_OPTIONS.find(o => o.key === sort)!;

  const handleSort = (key: SortKey) => {
    setSort(key);
    setPage(1);
    setDropOpen(false);
  };

  return (
    <>
      <SEO
        title={`${pageTitle} | Hermosa`}
        description="Read the latest news and insights from Hermosa Music & Entertainment."
      />
      <TopNavBar />
      <main className="flex-grow bg-white pt-[100px] sm:pt-[120px] pb-24 overflow-x-hidden">

        {/* ─── Page Header ─── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop pt-12 pb-10 border-b border-black/5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-primary-container font-bold uppercase tracking-[0.8em] text-[10px] block mb-3">Hermosa Music</span>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-black uppercase leading-[0.9] tracking-tighter">
                {pageTitle}
              </h1>
            </div>

            {/* ─── Sort Dropdown ─── */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen(v => !v)}
                className="flex items-center gap-3 border border-black/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-black hover:border-black/30 transition-all duration-300 bg-white"
                style={{ minWidth: '200px' }}
              >
                <span className="material-symbols-outlined text-primary-container text-base">{currentSort.icon}</span>
                <span className="flex-1 text-left">{currentSort.label}</span>
                <span
                  className="material-symbols-outlined text-black/40 text-base transition-transform duration-300"
                  style={{ transform: dropOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-50 overflow-hidden"
                    style={{ minWidth: '200px' }}
                  >
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => handleSort(opt.key)}
                        className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-200 text-left
                          ${sort === opt.key
                            ? 'bg-black text-white'
                            : 'text-black hover:bg-black/5'
                          }`}
                      >
                        <span className={`material-symbols-outlined text-base ${sort === opt.key ? 'text-primary-container' : 'text-black/40'}`}>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ─── Content ─── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop py-16">
          {loading ? (
            <LoadingOverlay />
          ) : blogs.length === 0 ? (
            <div className="text-center py-32 text-black/40 text-lg font-light">No blog posts found yet.</div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${sort}-${page}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                  {paginated.map(blog => (
                    <Link
                      key={blog._id}
                      to={`/blog/${blog.slug?.current || blog._id}`}
                      className="group flex flex-col space-y-6"
                    >
                      {/* Image — same tall aspect ratio as Home Latest News */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-black/5 border border-black/5 rounded-[2rem]">
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
                        <div className="absolute top-6 left-6">
                          <div className="bg-white/80 backdrop-blur-md border border-black/10 text-black px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full">
                            {blog.category || 'News'}
                          </div>
                        </div>

                        {/* Date Badge */}
                        <div className="absolute bottom-6 right-6">
                          <div className="bg-black/80 backdrop-blur-md border border-black/10 text-white px-4 py-1.5 text-[10px] font-medium tracking-widest rounded-full">
                            {blog.publishedAt
                              ? new Date(blog.publishedAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
                              : '—'}
                          </div>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="space-y-3 px-2">
                        <h3 className="font-display text-xl sm:text-2xl text-black uppercase leading-tight group-hover:text-primary-container transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-black/40 text-base leading-relaxed line-clamp-2 font-light">
                          {blog.excerpt || 'Stay updated with the latest trends and elite productions from the Hermosa Music ecosystem.'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* ─── Pagination ─── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-20 flex-wrap">
                  {/* Prev */}
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-12 h-12 border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed rounded-full"
                  >
                    <span className="material-symbols-outlined text-sm">west</span>
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-12 h-12 border text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full
                        ${n === page
                          ? 'bg-black text-white border-black'
                          : 'border-black/10 text-black hover:border-black/40'
                        }`}
                    >
                      {n}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-12 h-12 border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed rounded-full"
                  >
                    <span className="material-symbols-outlined text-sm">east</span>
                  </button>
                </div>
              )}

              {/* Page info */}
              {totalPages > 1 && (
                <p className="text-center text-[11px] text-black/30 uppercase tracking-widest mt-4 font-bold">
                  Page {page} of {totalPages} · {sorted.length} articles
                </p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogList;
