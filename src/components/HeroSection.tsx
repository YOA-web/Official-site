import React from 'react';
import { motion } from 'motion/react';
import { getAssetUrl } from '../utils/asset';

export const HeroSection: React.FC = () => {
  return (
    <section 
      id="top" 
      className="relative w-full h-[100vh] h-[100svh] min-h-[100vh] min-h-[100svh] flex flex-col items-center justify-between overflow-hidden bg-[#060B18] snap-screen select-none"
      aria-label="YOA トップ"
    >
      {/* Background container with standard responsive picture */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.45, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      >
        <picture className="w-full h-full block">
          {/* Mobile vertical portrait */}
          <source 
            media="(max-width: 640px) and (orientation: portrait)" 
            srcSet={getAssetUrl('/harbor-mobile.jpg')} 
          />
          {/* Desktop / Landscape / Tablet */}
          <source 
            media="(min-width: 641px), (orientation: landscape)" 
            srcSet={getAssetUrl('/harbor-desktop.jpg')} 
          />
          {/* Fallback image */}
          <img 
            src={getAssetUrl('/harbor-desktop.jpg')} 
            alt="夜明け前の静かな港。木造の桟橋、温かなランタンの灯り、遠くの灯台と星空"
            className="w-full h-full object-cover object-center transform scale-[1.01]"
            loading="eager"
          />
        </picture>

        {/* Soft, natural nocturnal vignette and seamless section blending */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#060B18]/70 via-[#060B18]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 md:h-48 bg-gradient-to-t from-[#060B18] via-[#060B18]/50 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#060B18]/25 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#060B18]/25 to-transparent" />
      </motion.div>

      {/* Main Content Area in upper starfield on a single vertical center axis */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-[clamp(2.5rem,8vh,6rem)] flex-1 flex flex-col items-center justify-center text-center">
        {/* 1. YOA Official Logo (Quietly appears first) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' }}
          className="mb-[clamp(1.5rem,4vh,2.5rem)] flex justify-center w-full"
        >
          <div className="relative w-[clamp(10.06rem,26.45vw,16.68rem)] max-w-[80.5vw] aspect-[2.5/1] flex items-center justify-center mx-auto">
            <img
              src={getAssetUrl('/yoa-logo.png')}
              alt="YOA"
              className="w-full h-full object-contain filter drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* 3 & 4. Tagline & Core Statement (Appear sequentially) */}
        <div className="w-full flex flex-col items-center text-center space-y-[clamp(0.75rem,2vh,1.25rem)]">
          {/* 3. 「夜明けまで、ここで。」 */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.95, ease: 'easeOut' }}
            className="text-[#F4B982] text-[clamp(1.1rem,2.2vw+0.4rem,1.5rem)] font-light tracking-[0.25em] ml-[0.25em]"
          >
            夜明けまで、ここで。
          </motion.p>

          {/* 4. 「夜を越えるための場所。」 */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.35, ease: 'easeOut' }}
            className="text-[#EDE8E1] text-[clamp(0.85rem,1.6vw+0.3rem,1.125rem)] font-normal tracking-[0.2em] ml-[0.2em] leading-relaxed opacity-95"
          >
            夜を越えるための場所。
          </motion.p>
        </div>
      </div>

      {/* Guide to Night Compass - Exactly centered along the same vertical line at the bottom */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-[clamp(1.25rem,4vh,2.5rem)] flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.65, ease: 'easeOut' }}
          className="w-full flex flex-col items-center"
        >
          <a
            href="#night-compass"
            className="group flex flex-col items-center space-y-2 text-[#A8A49E] hover:text-[#F4B982] transition-colors duration-500 focus:outline-none py-1.5"
            aria-label="夜のコンパスへ進む"
          >
            <span className="text-[11px] sm:text-xs tracking-[0.25em] ml-[0.25em] font-light text-center">
              夜のコンパスへ
            </span>
            <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-[#F4B982]/40 via-[#F4B982]/20 to-transparent group-hover:from-[#F4B982]/80 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
