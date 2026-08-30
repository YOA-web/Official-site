import React, { useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { NightCompass } from './components/NightCompass';
import { SocialSection } from './components/SocialSection';

export default function App() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        let id = hash.replace('#', '');
        if (id === 'social') id = 'yoa-social';
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Run on mount with slight delay for initial layout stabilization
    const timer = setTimeout(scrollToHash, 100);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <main className="relative w-full bg-[#060B18] text-[#EDE8E1] flex flex-col items-center selection:bg-[#F4B982]/20 selection:text-[#F4B982]">
      {/* 1. Top Section (トップ画面) */}
      <HeroSection />

      {/* 2. Introduction Section (YOAの紹介) */}
      <IntroSection />

      {/* 3. Night Compass Section (夜のコンパス) */}
      <NightCompass />

      {/* 4. Social Links & Supportive Connection (SNSへの導線) */}
      <SocialSection />
    </main>
  );
}
