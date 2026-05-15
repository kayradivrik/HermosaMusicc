import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import Events from './pages/Events';
import Agency from './pages/Agency';
import Admin from './pages/Admin';
import CustomPage from './pages/CustomPage';
import Videos from './pages/Videos';
import NotFound from './pages/NotFound';
import CookieConsent from './components/CookieConsent';

import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-on-background font-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:slug" element={<ArtistDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/agency" element={<Agency />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/:slug" element={<CustomPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
