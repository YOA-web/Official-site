import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DomainId, CompassQuestion, ChoiceScore } from '../types';
import {
  CHOICES,
  COMMON_QUESTIONS,
  DOMAIN_FOLLOWUP_QUESTIONS,
  NEUTRAL_FOLLOWUP_QUESTIONS,
  COMPASS_RESULTS,
  YOA_NOTE_URL,
} from '../data/compassData';
import { ArrowLeft, RotateCcw } from 'lucide-react';

type CompassState = 'intro' | 'questioning' | 'result';

interface AnswerRecord {
  questionId: string;
  domainId?: DomainId;
  score: ChoiceScore;
  isCommon?: boolean;
}

export const NightCompass: React.FC = () => {
  const [state, setState] = useState<CompassState>('intro');
  const [isStarting, setIsStarting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedTopDomains, setSelectedTopDomains] = useState<DomainId[]>([]);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  // Determine active questions sequence (12 questions total)
  const activeQuestions: CompassQuestion[] = useMemo(() => {
    const commonList = COMMON_QUESTIONS.map(item => item.question);
    
    // If not past 8 questions yet, we only know the 8 common ones
    if (answers.length < 8 && selectedTopDomains.length === 0) {
      return commonList;
    }

    // If top domains or neutral questions were selected
    if (selectedTopDomains.length === 1 && selectedTopDomains[0] === 'unclassified') {
      return [...commonList, ...NEUTRAL_FOLLOWUP_QUESTIONS];
    }

    if (selectedTopDomains.length >= 2) {
      const d1 = selectedTopDomains[0] as Exclude<DomainId, 'unclassified'>;
      const d2 = selectedTopDomains[1] as Exclude<DomainId, 'unclassified'>;
      const qDomain1 = DOMAIN_FOLLOWUP_QUESTIONS[d1] || [];
      const qDomain2 = DOMAIN_FOLLOWUP_QUESTIONS[d2] || [];
      return [...commonList, ...qDomain1, ...qDomain2];
    }

    return commonList;
  }, [answers.length, selectedTopDomains]);

  // Compute final result domain when all 12 questions are answered
  const resultDomain: DomainId = useMemo(() => {
    if (selectedTopDomains.length === 1 && selectedTopDomains[0] === 'unclassified') {
      return 'unclassified';
    }

    if (answers.length < 12) {
      return 'unclassified';
    }

    // Calculate score per domain
    const domainScores: Record<string, { total: number; common: number; followup: number }> = {};
    
    COMMON_QUESTIONS.forEach(item => {
      domainScores[item.domainId] = { total: 0, common: 0, followup: 0 };
    });

    answers.forEach(ans => {
      if (ans.domainId && ans.domainId !== 'unclassified' && domainScores[ans.domainId]) {
        domainScores[ans.domainId].total += ans.score;
        if (ans.isCommon) {
          domainScores[ans.domainId].common += ans.score;
        } else {
          domainScores[ans.domainId].followup += ans.score;
        }
      }
    });

    // Presentation order of the 8 common domains
    const domainOrder: DomainId[] = [
      'relationships',
      'failureEvaluation',
      'selfWorth',
      'belonging',
      'pastRecovery',
      'futureHope',
      'restHelp',
      'emotionsAnswers',
    ];

    let winningDomain: DomainId = domainOrder[0];
    let maxTotal = -1;
    let maxCommon = -1;
    let maxFollowup = -1;

    domainOrder.forEach(domain => {
      const stats = domainScores[domain];
      if (!stats) return;

      if (stats.total > maxTotal) {
        maxTotal = stats.total;
        maxCommon = stats.common;
        maxFollowup = stats.followup;
        winningDomain = domain;
      } else if (stats.total === maxTotal) {
        // Tiebreaker 1: Common question score
        if (stats.common > maxCommon) {
          maxTotal = stats.total;
          maxCommon = stats.common;
          maxFollowup = stats.followup;
          winningDomain = domain;
        } else if (stats.common === maxCommon) {
          // Tiebreaker 2: Followup question score
          if (stats.followup > maxFollowup) {
            maxTotal = stats.total;
            maxCommon = stats.common;
            maxFollowup = stats.followup;
            winningDomain = domain;
          } else if (stats.followup === maxFollowup) {
            // Tiebreaker 3: 'emotionsAnswers' has lowest priority among tied domains
            if (winningDomain === 'emotionsAnswers' && domain !== 'emotionsAnswers') {
              winningDomain = domain;
            }
          }
        }
      }
    });

    return winningDomain;
  }, [answers, selectedTopDomains]);

  // Handle start button with quiet, authentic compass movement & transition
  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);

    // Sequence:
    // 1. Needle rotates 90 degrees quietly over 1000ms
    // 2. Smoothly transition to first question after full rotation completes
    setTimeout(() => {
      setState('questioning');
      setIsStarting(false);
      setCurrentIndex(0);
      setAnswers([]);
      setSelectedTopDomains([]);
      setSelectedScore(null);
    }, 1100);
  };

  // Handle user answer selection
  const handleSelectOption = (score: ChoiceScore) => {
    setSelectedScore(score);

    const currentQ = activeQuestions[currentIndex];
    const newAnswers = [...answers.slice(0, currentIndex), {
      questionId: currentQ.id,
      domainId: currentQ.domainId,
      score,
      isCommon: currentQ.isCommon ?? (currentIndex < 8),
    }];

    setAnswers(newAnswers);

    // If we just answered question 8 (index 7), determine the next 4 questions
    if (currentIndex === 7) {
      // Check if all 8 questions scored <= 1 ("あまり近くない" or "今夜は違う")
      const allLow = newAnswers.slice(0, 8).every(a => a.score <= 1);
      
      if (allLow) {
        setSelectedTopDomains(['unclassified']);
      } else {
        // Compute scores for the 8 domains from the 8 common questions
        const scores = COMMON_QUESTIONS.map((item, idx) => ({
          domainId: item.domainId,
          score: newAnswers[idx]?.score ?? 0,
          index: idx,
        }));

        // Sort descending by score; if equal, other domains take priority over emotionsAnswers
        scores.sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          if (a.domainId === 'emotionsAnswers' && b.domainId !== 'emotionsAnswers') {
            return 1;
          }
          if (b.domainId === 'emotionsAnswers' && a.domainId !== 'emotionsAnswers') {
            return -1;
          }
          return a.index - b.index;
        });

        const top1 = scores[0].domainId;
        const top2 = scores[1].domainId;
        setSelectedTopDomains([top1, top2]);
      }
    }

    // Smooth transition to next question after small delay for tactile feedback
    setTimeout(() => {
      setSelectedScore(null);
      if (currentIndex + 1 >= 12) {
        setState('result');
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 280);
  };

  // Handle back button
  const handleBack = () => {
    if (currentIndex > 0) {
      setSelectedScore(null);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Handle reset / try again
  const handleReset = () => {
    setState('intro');
    setIsStarting(false);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedTopDomains([]);
    setSelectedScore(null);
  };

  const currentQ = activeQuestions[currentIndex];
  const resultData = COMPASS_RESULTS[resultDomain] || COMPASS_RESULTS.unclassified;

  return (
    <section
      id="night-compass"
      className={`relative w-full px-4 sm:px-6 bg-transparent flex flex-col items-center justify-center select-none snap-screen ${
        state === 'result'
          ? 'min-h-[100vh] min-h-[100svh] py-12 sm:py-16 md:py-20'
          : 'h-[100vh] h-[100svh] min-h-[100vh] min-h-[100svh] overflow-hidden py-4'
      }`}
      aria-label="夜のコンパス"
    >
      {/* Background ambient gentle night aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        <div className="w-[480px] sm:w-[580px] h-[480px] sm:h-[580px] rounded-full bg-[#0B142B]/35 blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {/* 1. Intro Screen */}
          {state === 'intro' && (
            <motion.div
              key="compass-intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-full flex flex-col items-center text-center"
            >
              {/* Refined compass beacon matching reference image */}
              <div className="relative mb-[clamp(1.25rem,3.5vh,2.25rem)] flex items-center justify-center pointer-events-none select-none">
                <svg
                  id="night-compass-symbol"
                  className="w-[clamp(92px,15vh,132px)] h-[clamp(92px,15vh,132px)] text-[#EAA86C] drop-shadow-[0_0_8px_rgba(234,168,108,0.25)]"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Soft atmospheric dawn glow */}
                    <radialGradient id="compassDawnGlow" cx="50%" cy="100%" r="100%">
                      <stop offset="0%" stopColor="#F5BE87" stopOpacity="0.75" />
                      <stop offset="35%" stopColor="#EAA86C" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#EAA86C" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFF4E6" stopOpacity="1" />
                      <stop offset="40%" stopColor="#F5BE87" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#EAA86C" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 1. Outer refined gold circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#EAA86C"
                    strokeWidth="1.8"
                    strokeOpacity="0.9"
                  />

                  {/* 2. Polaris (North Star) at top center */}
                  <g opacity="0.95">
                    {/* Vertical diamond beam */}
                    <path
                      d="M 100 28 Q 100 44 104.2 44 Q 100 44 100 60 Q 100 44 95.8 44 Q 100 44 100 28 Z"
                      fill="#FCE0C3"
                    />
                    {/* Horizontal diamond beam */}
                    <path
                      d="M 87.5 44 Q 100 44 100 41.2 Q 100 44 112.5 44 Q 100 44 100 46.8 Q 100 44 87.5 44 Z"
                      fill="#FCE0C3"
                    />
                    {/* Diagonal fine glints */}
                    <line x1="94.5" y1="38.5" x2="105.5" y2="49.5" stroke="#FCE0C3" strokeWidth="0.8" strokeOpacity="0.7" />
                    <line x1="105.5" y1="38.5" x2="94.5" y2="49.5" stroke="#FCE0C3" strokeWidth="0.8" strokeOpacity="0.7" />
                    {/* Center brilliant point */}
                    <circle cx="100" cy="44" r="1.3" fill="#FFFFFF" />
                  </g>

                  {/* 3. Dawn Horizon, Sun and Water Reflection */}
                  {/* Horizon line across lower region (gap A = 3.5 at ends) */}
                  <line
                    x1="35.4"
                    y1="142"
                    x2="164.6"
                    y2="142"
                    stroke="#EAA86C"
                    strokeWidth="1.5"
                    strokeOpacity="0.9"
                  />

                  {/* Soft atmospheric aura around rising sun */}
                  <circle
                    cx="100"
                    cy="142"
                    r="20"
                    fill="url(#sunAura)"
                    opacity="0.35"
                  />

                  {/* Rising Sun (half-circle on horizon) */}
                  <path
                    d="M 91.5 142 A 8.5 8.5 0 0 1 108.5 142 Z"
                    fill="#FCE0C3"
                  />
                  <path
                    d="M 94.5 142 A 5.5 5.5 0 0 1 105.5 142 Z"
                    fill="#FFF8EE"
                    opacity="0.9"
                  />

                  {/* Water reflections beneath the sun */}
                  <g stroke="#F5BE87" strokeLinecap="round">
                    <line x1="82" y1="146.5" x2="118" y2="146.5" strokeWidth="1.3" strokeOpacity="0.85" />
                    <line x1="87" y1="150.5" x2="113" y2="150.5" strokeWidth="1.1" strokeOpacity="0.75" />
                    <line x1="90" y1="154.5" x2="110" y2="154.5" strokeWidth="0.95" strokeOpacity="0.65" />
                    <line x1="85" y1="159" x2="115" y2="159" strokeWidth="0.85" strokeOpacity="0.55" />
                    <line x1="92" y1="164" x2="108" y2="164" strokeWidth="0.75" strokeOpacity="0.45" />
                    <line x1="95" y1="169" x2="105" y2="169" strokeWidth="0.65" strokeOpacity="0.35" />
                    <line x1="97.5" y1="174" x2="102.5" y2="174" strokeWidth="0.5" strokeOpacity="0.25" />
                  </g>

                  {/* 4. Compass Needle (pivot fixed at (100, 100), tilted at exact ~52deg angle) */}
                  <g
                    style={{
                      transformOrigin: '100px 100px',
                      transform: `rotate(${isStarting ? 142 : 52}deg)`,
                      transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {/* Rhombus needle outline with equal gap A = 3.5 from outer circle */}
                    <polygon
                      points="100,23.5 105.5,100 100,176.5 94.5,100"
                      stroke="#EAA86C"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                      fill="rgba(234, 168, 108, 0.04)"
                    />

                    {/* Double-ring Center Pivot */}
                    <circle
                      cx="100"
                      cy="100"
                      r="7.5"
                      stroke="#EAA86C"
                      strokeWidth="1.8"
                      fill="#070B16"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="4.2"
                      stroke="#EAA86C"
                      strokeWidth="1.2"
                      fill="#070B16"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="1.5"
                      fill="#FCE0C3"
                      opacity="0.95"
                    />
                  </g>
                </svg>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5 mb-[clamp(1.5rem,3.5vh,2.5rem)]">
                <h2 className="text-[#F4B982] text-xs sm:text-sm md:text-base tracking-[0.3em] pl-[0.3em] font-light">
                  夜のコンパス
                </h2>
                <p className="text-[#EDE8E1] text-[clamp(1rem,2.2vw+0.35rem,1.25rem)] font-normal tracking-[0.16em] leading-relaxed">
                  今夜、何が強く見えているか。
                </p>
              </div>

              {/* Start Button with refined warm contour and clear affordance */}
              <button
                id="compass-start-button"
                onClick={handleStart}
                disabled={isStarting}
                className="group relative inline-flex items-center justify-center px-10 py-3 sm:py-3.5 rounded-full border border-[#F4B982]/40 hover:border-[#F4B982]/80 bg-[#070B16]/80 hover:bg-[#F4B982]/10 text-[#EDE8E1] hover:text-[#F4B982] transition-all duration-500 text-sm sm:text-[0.95rem] font-light shadow-[0_0_16px_rgba(244,185,130,0.06)] hover:shadow-[0_0_22px_rgba(244,185,130,0.15)] focus:outline-none focus:ring-1 focus:ring-[#F4B982]/40 active:scale-[0.98] disabled:opacity-80 disabled:pointer-events-none"
              >
                <span className="tracking-[0.25em] ml-[0.25em] text-center select-none">はじめる</span>
              </button>
            </motion.div>
          )}

          {/* 2. Questioning Flow */}
          {state === 'questioning' && currentQ && (
            <motion.div
              key={`compass-q-${currentIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full flex flex-col items-center text-center max-w-xl mx-auto"
            >
              {/* Header: Title and Back Navigation */}
              <div className="w-full flex items-center justify-between mb-[clamp(0.85rem,2.2vh,1.75rem)]">
                <div className="w-16 text-left">
                  {currentIndex > 0 ? (
                    <button
                      id="compass-back-button"
                      onClick={handleBack}
                      className="inline-flex items-center space-x-1 text-xs tracking-[0.2em] text-[#A8A49E] hover:text-[#EDE8E1] transition-colors py-1 px-1 -ml-1 rounded focus:outline-none"
                      aria-label="前の質問に戻る"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>戻る</span>
                    </button>
                  ) : null}
                </div>

                <p className="text-[#F4B982] text-xs sm:text-sm tracking-[0.25em] pl-[0.25em] font-light">
                  夜のコンパス
                </p>

                <div className="w-16" />
              </div>

              {/* Question Text Container (stable height across questions, guaranteed 2 lines) */}
              <div className="min-h-[75px] sm:min-h-[95px] md:min-h-[110px] w-full flex flex-col justify-center items-center mb-[clamp(0.75rem,2vh,1.25rem)] overflow-hidden">
                <div className="w-full flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-[#EDE8E1] text-[clamp(0.82rem,2.7vw+0.15rem,1.22rem)] font-normal leading-[1.85] sm:leading-[2.1] tracking-[clamp(0.04em,0.8vw,0.16em)]">
                  {currentQ.lines.map((line, idx) => (
                    <p
                      key={idx}
                      className="whitespace-nowrap select-none text-center block w-full overflow-visible"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Auxiliary guidance text */}
              <div className="mb-[clamp(0.85rem,2.2vh,1.5rem)] flex items-center justify-center">
                <p className="text-[#C5C1B8] text-xs sm:text-[0.82rem] tracking-[0.18em] pl-[0.18em] font-light select-none">
                  今夜のあなたに、どれくらい近いですか。
                </p>
              </div>

              {/* 4 Choices: 2 cols on tablet/desktop, 1 or 2 on mobile with compact touch sizing */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {CHOICES.map((choice) => {
                  const isSelected = selectedScore === choice.score;
                  return (
                    <button
                      key={choice.score}
                      onClick={() => handleSelectOption(choice.score)}
                      className={`w-full py-3 sm:py-3.5 px-4 rounded-lg text-xs sm:text-sm md:text-[0.92rem] tracking-[0.16em] transition-all duration-300 border flex items-center justify-center text-center focus:outline-none active:scale-[0.99] ${
                        isSelected
                          ? 'border-[#F4B982]/70 bg-[#F4B982]/15 text-[#F4B982] shadow-[0_0_12px_rgba(244,185,130,0.1)]'
                          : 'border-[#EDE8E1]/15 hover:border-[#F4B982]/40 bg-[#070B16]/80 hover:bg-[#0A1124]/90 text-[#EDE8E1] hover:text-[#F4B982]'
                      }`}
                    >
                      <span className="pl-[0.16em]">{choice.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 12 Harbor Lights Progress Indicator */}
              <div className="w-full max-w-[220px] sm:max-w-[260px] flex flex-col items-center mt-[clamp(1.25rem,3.5vh,2.5rem)] space-y-2.5 pointer-events-none select-none">
                {/* 12 harbor lights aligned across the quiet horizon */}
                <div className="relative w-full flex items-center justify-between px-1 h-5">
                  {/* Subtle, faint waterline connecting the distant lights */}
                  <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-[1px] bg-[#1A2639]/40" />

                  {Array.from({ length: 12 }).map((_, idx) => {
                    const isAnswered = idx < currentIndex;
                    const isCurrent = idx === currentIndex;
                    const isLit = isAnswered || isCurrent;

                    return (
                      <div
                        key={idx}
                        className="relative z-10 flex flex-col items-center justify-center"
                      >
                        {/* Harbor Light Point */}
                        <div
                          className={`w-[5px] h-[5px] sm:w-1.5 sm:h-1.5 rounded-full transition-colors duration-500 ${
                            isCurrent
                              ? 'bg-[#ECC096]'
                              : isAnswered
                              ? 'bg-[#DB9F69]'
                              : 'bg-[#182334]'
                          }`}
                        />

                        {/* Faint, short water reflection under the distant lit points */}
                        {isLit && (
                          <div
                            className={`absolute top-full mt-[1.5px] w-[1px] rounded-full transition-opacity duration-500 ${
                              isCurrent
                                ? 'h-2 bg-gradient-to-b from-[#ECC096]/45 to-transparent'
                                : 'h-1.5 bg-gradient-to-b from-[#DB9F69]/30 to-transparent'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Question Number Counter */}
                <div
                  className="text-[11px] sm:text-xs text-[#9E9B95]/60 tracking-[0.2em] pl-[0.2em] font-light"
                  aria-live="polite"
                >
                  {currentIndex + 1} / 12
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. Result Screen */}
          {state === 'result' && (
            <motion.div
              key="compass-result"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-lg"
            >
              {/* Result Quiet Reflection Content */}
              <div className="space-y-6 sm:space-y-7 max-w-lg">
                {resultData.paragraphs.map((pGroup, pIdx) => (
                  <div
                    key={pIdx}
                    className="space-y-2 text-[#EDE8E1] text-[clamp(0.95rem,1.6vw+0.35rem,1.18rem)] font-normal leading-[2.1] sm:leading-[2.3] tracking-[0.16em]"
                  >
                    {pGroup.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                ))}

                {/* Closing Tagline in Result */}
                <div className="pt-2 text-[#F4B982] text-[clamp(1rem,1.8vw+0.35rem,1.2rem)] font-normal leading-[2.1] tracking-[0.2em] pl-[0.2em] drop-shadow-[0_0_12px_rgba(244,185,130,0.18)]">
                  <p>{resultData.closing}</p>
                </div>
              </div>

              {/* Actions & Next Steps in Result Screen */}
              <div className="pt-7 sm:pt-10 flex flex-col items-center justify-center w-full">
                {/* 1. Primary CTA to Note: ［ この夜を、もう少しほどく。 → ］ */}
                <a
                  id="compass-to-note-button"
                  href={YOA_NOTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-7 sm:px-9 py-3 sm:py-3.5 rounded-full border border-[#F4B982]/40 hover:border-[#F4B982]/80 bg-[#070B16]/80 hover:bg-[#F4B982]/10 text-[#EDE8E1] hover:text-[#F4B982] transition-all duration-500 text-xs sm:text-sm shadow-[0_0_16px_rgba(244,185,130,0.06)] hover:shadow-[0_0_22px_rgba(244,185,130,0.15)] focus:outline-none focus:ring-1 focus:ring-[#F4B982]/40 active:scale-[0.98]"
                >
                  <span className="tracking-[0.2em] ml-[0.2em] text-center inline-block select-none whitespace-nowrap">
                    この夜を、もう少しほどく。 →
                  </span>
                </a>

                {/* 2. Secondary subtle link to Social section: 「YOAに出会える場所へ」 */}
                <div className="mt-6 sm:mt-7">
                  <button
                    id="compass-to-social-button"
                    onClick={() => {
                      const socialEl = document.getElementById('yoa-social') || document.getElementById('social');
                      if (socialEl) {
                        socialEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="group inline-flex items-center justify-center py-1.5 px-3 text-xs text-[#A8A49E] hover:text-[#EDE8E1] tracking-[0.18em] ml-[0.18em] transition-colors duration-300 opacity-75 hover:opacity-100 focus:outline-none"
                  >
                    <span className="border-b border-transparent group-hover:border-[#A8A49E]/40 pb-0.5 transition-colors select-none">
                      YOAに出会える場所へ
                    </span>
                  </button>
                </div>

                {/* 3. Try Again Button: 「もう一度」 */}
                <div className="mt-2.5">
                  <button
                    id="compass-retry-button"
                    onClick={handleReset}
                    className="group flex items-center justify-center space-x-2 px-5 py-2 rounded-full text-[#A8A49E] hover:text-[#EDE8E1] transition-all duration-300 text-xs tracking-[0.2em] ml-[0.2em] focus:outline-none opacity-70 hover:opacity-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>もう一度</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
