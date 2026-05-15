import React from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

interface PlaceholderProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl md:text-7xl text-on-surface uppercase mb-sm">{title}</h1>
        <div className="w-24 h-[1px] bg-primary-container shadow-[0_0_10px_#ff5540] mb-lg"></div>
        <p className="font-body text-lg text-on-surface-variant max-w-2xl">
          Bu sayfa yakında yayına girecek. Hermosa Music & Entertainment ile en özel içerikler yolda.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default PlaceholderPage;
