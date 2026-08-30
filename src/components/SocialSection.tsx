import React from 'react';
import { SOCIAL_LINKS } from '../data/compassData';

// Monochromatic refined SVG icons harmonized with YOA's lantern & night palette
const renderSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'instagram':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2-2.75v-3.6a6.34 6.34 0 1 0 5.45 6.27V9.75a8.28 8.28 0 0 0 3.77.94V7.27a4.91 4.91 0 0 1 0-.58z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
        </svg>
      );
    case 'x':
      return (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'note':
      return (
        /* note official symbol mark (squircle with clean geometric 'n') */
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 7C3 4.79 4.79 3 7 3h10c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4H7c-2.21 0-4-1.79-4-4V7zm4.75 3.5h2.15v1.22c.54-.86 1.48-1.37 2.5-1.37 2.1 0 3.35 1.44 3.35 3.75V18.5h-2.2v-4.1c0-1.25-.65-1.95-1.75-1.95-1.08 0-1.85.75-1.85 2.05v4.0h-2.2v-8.0z"
          />
        </svg>
      );
    case 'line':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.5 10.7c0-4.3-4.5-7.7-10-7.7S1.5 6.4 1.5 10.7c0 3.8 3.5 7.1 8.2 7.6.3.1.8.2.9.5.1.3.1.7 0 1l-.2.9c-.1.3-.3 1.1 1 .6 1.2-.5 6.4-3.8 8.8-6.5 1.8-2 1.3-3.6 1.3-4.1z" />
        </svg>
      );
    default:
      return null;
  }
};

export const SocialSection: React.FC = () => {
  return (
    <footer
      id="yoa-social"
      className="relative w-full h-[100vh] h-[100svh] min-h-[100vh] min-h-[100svh] px-6 bg-transparent flex flex-col items-center justify-center select-none snap-screen overflow-hidden scroll-mt-0"
      aria-label="YOAに出会える場所"
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center justify-between sm:justify-center h-full max-h-[100svh] py-[clamp(1.5rem,4vh,3rem)] space-y-[clamp(1rem,3vh,2rem)]">
        {/* Section Header */}
        <div className="space-y-2.5 w-full flex flex-col items-center">
          <h2 className="text-[#EDE8E1] text-[clamp(0.95rem,1.8vw+0.35rem,1.25rem)] font-light tracking-[0.25em] ml-[0.25em] text-center">
            YOAに出会える場所。
          </h2>
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#F4B982]/40 to-transparent mx-auto" />
        </div>

        {/* SNS Cards Grid:
            Desktop / Tablet (md:): 3 cols x 2 rows
            Mobile: 2 cols x 3 rows
        */}
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 max-w-2xl mx-auto">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center min-h-[76px] sm:min-h-[92px] md:min-h-[106px] py-3.5 sm:py-4 md:py-5 px-3 rounded-xl border border-[#EDE8E1]/25 hover:border-[#F4B982]/65 bg-[#070B16]/85 hover:bg-[#0A1124]/95 text-[#EDE8E1] hover:text-[#F4B982] transition-all duration-500 focus:outline-none focus:ring-1 focus:ring-[#F4B982]/40 hover:shadow-[0_0_24px_rgba(244,185,130,0.1)] active:scale-[0.99] motion-reduce:transition-none"
                aria-label={`YOA 公式 ${link.name} (新しいタブで開く)`}
              >
                {/* Subtle internal warm aura on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#F4B982]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Uniform Brand Icon */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[#EDE8E1]/80 group-hover:text-[#F4B982] transition-colors duration-500 mb-1.5 sm:mb-2">
                  {renderSocialIcon(link.iconName)}
                </div>

                {/* Service Name */}
                <span className="text-[11px] sm:text-xs md:text-sm tracking-[0.18em] font-light text-[#EDE8E1] group-hover:text-[#F4B982] transition-colors duration-500 whitespace-nowrap text-center">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Final quiet phrase & copyright */}
        <div className="space-y-2 w-full flex flex-col items-center">
          <p className="text-xs sm:text-sm text-[#A8A49E] tracking-[0.3em] ml-[0.3em] font-light text-center">
            夜明けまで、ここで。
          </p>
          <p className="text-[10px] text-[#A8A49E]/50 tracking-[0.25em] ml-[0.25em] font-light text-center">
            © YOA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
