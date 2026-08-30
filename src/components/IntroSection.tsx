import React from 'react';
import { motion } from 'motion/react';

export const IntroSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full h-[100vh] h-[100svh] min-h-[100vh] min-h-[100svh] px-6 bg-transparent flex flex-col items-center justify-center text-center select-none snap-screen overflow-hidden"
      aria-label="YOAの紹介"
    >
      {/* Delicate background ambient night depth */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[clamp(320px,50vw,560px)] h-[clamp(320px,50vw,560px)] rounded-full bg-[#0B142B]/40 blur-3xl opacity-60" />
      </div>

      {/* Very faint, delicate horizon light across the lower boundary */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#203254]/30 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B162E]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-[clamp(1.5rem,4vh,3rem)] flex flex-col items-center justify-center">
        {/* Paragraph 1 */}
        <div className="space-y-1.5 sm:space-y-2 text-[#EDE8E1] text-[clamp(0.95rem,1.8vw+0.35rem,1.22rem)] font-normal leading-[2.1] sm:leading-[2.4] tracking-[0.16em] ml-[0.16em]">
          {/* Line 1 (0.30秒 表示開始) */}
          <motion.p
            initial={{ opacity: 0, y: 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mb-2 sm:mb-2.5"
          >
            夜になると、
          </motion.p>
          {/* Line 2 (0.95秒 表示開始) */}
          <motion.p
            initial={{ opacity: 0, y: 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.95, ease: "easeOut" }}
          >
            ひとつの考えが、
          </motion.p>
          {/* Line 3 (1.70秒 表示開始) */}
          <motion.p
            initial={{ opacity: 0, y: 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 1.7, ease: "easeOut" }}
          >
            答えのように見えてくることがある。
          </motion.p>
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-1.5 sm:space-y-2 text-[#EDE8E1] text-[clamp(0.95rem,1.8vw+0.35rem,1.22rem)] font-normal leading-[2.1] sm:leading-[2.4] tracking-[0.16em] ml-[0.16em]">
          {/* Line 4 (2.85秒 表示開始) */}
          <motion.p
            initial={{ opacity: 0, y: 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 2.85, ease: "easeOut" }}
          >
            でも、今見えているものだけで、
          </motion.p>
          {/* Line 5 (3.65秒 表示開始) */}
          <motion.p
            initial={{ opacity: 0, y: 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 3.65, ease: "easeOut" }}
          >
            すべてが決まるわけじゃない。
          </motion.p>
        </div>

        {/* Paragraph 3 - Key phrase in warm ambient tone (4.90秒 表示開始) */}
        <div className="text-[#F4B982] text-[clamp(1rem,2vw+0.35rem,1.26rem)] font-normal leading-[2.1] sm:leading-[2.4] tracking-[0.18em] ml-[0.18em] pt-1 drop-shadow-[0_0_12px_rgba(244,185,130,0.22)]">
          {/* Line 6 */}
          <motion.p
            initial={{ opacity: 0, y: 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 4.9, ease: "easeOut" }}
          >
            答えは、朝まで置いておこう。
          </motion.p>
        </div>
      </div>
    </section>
  );
};

