import React, { useState, useEffect, useCallback, useRef } from 'react';

export const TOUR_STORAGE_KEY = 'clarix_tour_complete';

interface TourStep {
  title: string;
  description: string;
  targetSelector: string | null; // null = centered modal
  tooltipPosition: 'top' | 'bottom' | 'right' | 'left' | 'center';
  icon: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to Clarix Protocol',
    description: 'This quick tour walks you through every major feature. You can skip at any time and replay from your Profile whenever you like.',
    targetSelector: null,
    tooltipPosition: 'center',
    icon: 'fa-hand-wave',
  },
  {
    title: 'Live Market Overview',
    description: 'Real-time crypto prices, AI-generated sentiment signals, and on-chain data — all on the landing page before you even sign in.',
    targetSelector: '[data-tour="market-overview"]',
    tooltipPosition: 'bottom',
    icon: 'fa-chart-line',
  },
  {
    title: 'Knowledge Atlas — 10 Modules',
    description: 'Start with Crypto Foundations and work through 10 full modules covering DeFi, security, NFTs, governance and more. Every lesson earns you 3 $PATH tokens.',
    targetSelector: '[data-tour="nav-academy"]',
    tooltipPosition: 'right',
    icon: 'fa-graduation-cap',
  },
  {
    title: 'Portfolio Advisor',
    description: 'Connect your wallet and the AI Portfolio Advisor analyses your on-chain holdings, scores your diversification, and suggests your next move.',
    targetSelector: '[data-tour="nav-portfolio"]',
    tooltipPosition: 'right',
    icon: 'fa-briefcase',
  },
  {
    title: 'Market Intel — Daily AI Brief',
    description: 'Every day the AI synthesises price action, sentiment, and on-chain signals into a plain-English brief you can actually act on.',
    targetSelector: '[data-tour="nav-market"]',
    tooltipPosition: 'right',
    icon: 'fa-newspaper',
  },
  {
    title: 'Guild Network',
    description: 'Join a guild — Architects, Sentinels, Arbiters, or Catalysts — to compete on the leaderboard and earn guild-exclusive $PATH rewards.',
    targetSelector: '[data-tour="nav-guilds"]',
    tooltipPosition: 'right',
    icon: 'fa-shield-halved',
  },
  {
    title: 'Governance DAO',
    description: 'Spend your $PATH to vote on protocol proposals. Your knowledge directly shapes the direction of Clarix Protocol.',
    targetSelector: '[data-tour="nav-governance"]',
    tooltipPosition: 'right',
    icon: 'fa-landmark',
  },
  {
    title: 'Clarix Credentials',
    description: 'Complete a full module group to earn a verifiable on-chain credential. Each credential awards 25 $PATH and comes with a shareable verification link.',
    targetSelector: '[data-tour="nav-certification"]',
    tooltipPosition: 'right',
    icon: 'fa-certificate',
  },
  {
    title: 'Refer & Earn',
    description: 'Share your unique referral link. You earn 15 $PATH every time a friend completes their first lesson. Your friend gets a 5 $PATH welcome bonus.',
    targetSelector: '[data-tour="referral-card"]',
    tooltipPosition: 'top',
    icon: 'fa-share-nodes',
  },
  {
    title: 'Connect Your Wallet',
    description: 'Connect MetaMask or any WalletConnect-compatible wallet to unlock credential minting, portfolio analysis, and on-chain identity. Free to start — no email required.',
    targetSelector: '[data-tour="token-balance"]',
    tooltipPosition: 'bottom',
    icon: 'fa-wallet',
  },
];

interface TooltipCoords {
  top: number;
  left: number;
  width: number;
  arrowSide: 'top' | 'left' | 'bottom' | null;
}

const TOOLTIP_WIDTH = 320;
const TOOLTIP_HEIGHT = 220;

function getTooltipCoords(
  el: Element,
  position: TourStep['tooltipPosition'],
  tooltipWidth: number,
  tooltipHeight: number,
): TooltipCoords {
  const rect = el.getBoundingClientRect();
  const margin = 16;

  if (position === 'bottom') {
    const left = Math.min(
      Math.max(margin, rect.left + rect.width / 2 - tooltipWidth / 2),
      window.innerWidth - tooltipWidth - margin,
    );
    return { top: rect.bottom + margin, left, width: tooltipWidth, arrowSide: 'top' };
  }

  if (position === 'right') {
    const top = Math.min(
      Math.max(margin, rect.top + rect.height / 2 - tooltipHeight / 2),
      window.innerHeight - tooltipHeight - margin,
    );
    return { top, left: rect.right + margin, width: tooltipWidth, arrowSide: 'left' };
  }

  if (position === 'left') {
    const top = Math.min(
      Math.max(margin, rect.top + rect.height / 2 - tooltipHeight / 2),
      window.innerHeight - tooltipHeight - margin,
    );
    return { top, left: rect.left - tooltipWidth - margin, width: tooltipWidth, arrowSide: null };
  }

  // top
  const left = Math.min(
    Math.max(margin, rect.left + rect.width / 2 - tooltipWidth / 2),
    window.innerWidth - tooltipWidth - margin,
  );
  return { top: rect.top - tooltipHeight - margin, left, width: tooltipWidth, arrowSide: 'bottom' };
}

interface Props {
  isVisible: boolean;
  onComplete: () => void;
  onSkip?: (stepNumber: number) => void;
}

const OnboardingTour: React.FC<Props> = ({ isVisible, onComplete, onSkip }) => {
  const [step, setStep] = useState(0);
  const [coords, setCoords] = useState<TooltipCoords | null>(null);
  const prevHighlightedEl = useRef<Element | null>(null);

  const current = TOUR_STEPS[step];

  const applyHighlight = useCallback((selector: string | null, position: TourStep['tooltipPosition']) => {
    if (prevHighlightedEl.current) {
      prevHighlightedEl.current.classList.remove('tour-highlight');
      prevHighlightedEl.current = null;
    }

    if (!selector) {
      setCoords(null);
      return;
    }

    const el = document.querySelector(selector);
    if (!el) {
      setCoords(null);
      return;
    }

    el.classList.add('tour-highlight');
    prevHighlightedEl.current = el;

    const c = getTooltipCoords(el, position, TOOLTIP_WIDTH, TOOLTIP_HEIGHT);
    setCoords(c);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      if (prevHighlightedEl.current) {
        prevHighlightedEl.current.classList.remove('tour-highlight');
        prevHighlightedEl.current = null;
      }
      return;
    }
    const t = setTimeout(() => applyHighlight(current.targetSelector, current.tooltipPosition), 80);
    return () => clearTimeout(t);
  }, [isVisible, step, applyHighlight, current.targetSelector, current.tooltipPosition]);

  useEffect(() => {
    return () => {
      if (prevHighlightedEl.current) {
        prevHighlightedEl.current.classList.remove('tour-highlight');
      }
    };
  }, []);

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleComplete = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    if (prevHighlightedEl.current) {
      prevHighlightedEl.current.classList.remove('tour-highlight');
      prevHighlightedEl.current = null;
    }
    onComplete();
  };

  const handleSkip = () => {
    onSkip?.(step + 1);
    handleComplete();
  };

  if (!isVisible) return null;

  const isCenter = current.tooltipPosition === 'center' || !coords;
  const isLast = step === TOUR_STEPS.length - 1;

  const dots = TOUR_STEPS.map((_, i) => (
    <div
      key={i}
      onClick={() => setStep(i)}
      className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
        i === step ? 'bg-cyan-400 w-4' : i < step ? 'bg-cyan-400/40 w-1.5' : 'bg-white/10 w-1.5'
      }`}
    />
  ));

  const card = (
    <div
      className="bg-[#0D1117] border border-white/[0.10] rounded-2xl shadow-2xl overflow-hidden relative"
      style={{ width: TOOLTIP_WIDTH }}
      onClick={e => e.stopPropagation()}
    >
      {/* Arrow left */}
      {coords?.arrowSide === 'left' && (
        <div className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#0D1117] border-l border-t border-white/[0.10] rotate-[-45deg]" />
      )}
      {/* Arrow top */}
      {coords?.arrowSide === 'top' && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-[7px] w-3.5 h-3.5 bg-[#0D1117] border-l border-t border-white/[0.10] rotate-45" />
      )}

      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-white/[0.06]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <i className={`fa-solid ${current.icon} text-cyan-400 text-sm`}></i>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-cyan-400/70 uppercase tracking-widest mb-0.5">
                Step {step + 1} of {TOUR_STEPS.length}
              </p>
              <h3 className="text-sm font-semibold text-white leading-tight">{current.title}</h3>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="text-slate-600 hover:text-slate-400 transition-colors flex-shrink-0 mt-0.5"
            aria-label="Skip tour"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-sm text-slate-400 leading-relaxed">{current.description}</p>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">{dots}</div>
        <div className="flex items-center gap-2">
          {step > 0 && (
            <button
              onClick={handlePrev}
              className="px-3 py-2 text-xs text-slate-400 hover:text-white border border-white/[0.07] rounded-lg transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
          >
            {isLast ? 'Finish Tour' : 'Next'}
            {!isLast && <i className="fa-solid fa-arrow-right text-[10px]"></i>}
          </button>
        </div>
      </div>
    </div>
  );

  if (isCenter) {
    return (
      <>
        <div className="fixed inset-0 bg-[#0A0E1A]/85 z-[9000]" onClick={handleSkip} />
        <div className="fixed inset-0 z-[9002] flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto">{card}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-[#0A0E1A]/60 z-[9000]" onClick={handleSkip} />
      <div
        className="fixed z-[9002] pointer-events-auto"
        style={{ top: coords!.top, left: coords!.left, width: TOOLTIP_WIDTH }}
      >
        {card}
      </div>
    </>
  );
};

// ── Floating "App Tour" button — always visible ───────────────────────────────
interface TourButtonProps {
  onClick: () => void;
}

export const TourButton: React.FC<TourButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    title="App Tour"
    className="fixed bottom-5 md:bottom-8 right-20 md:right-24 z-[8000] w-10 h-10 md:w-11 md:h-11 rounded-full bg-cyan-500/90 hover:bg-cyan-400 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
    style={{ animation: 'tour-pulse 3s ease-in-out infinite' }}
  >
    <i className="fa-solid fa-map text-black text-xs"></i>
  </button>
);

export default OnboardingTour;
