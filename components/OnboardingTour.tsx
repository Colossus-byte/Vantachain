import React, { useState, useEffect, useCallback, useRef } from 'react';

const TOUR_STORAGE_KEY = 'clarix_tour_complete';

interface TourStep {
  title: string;
  description: string;
  targetSelector: string | null; // null = centered modal
  tooltipPosition: 'top' | 'bottom' | 'right' | 'center';
  icon: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to Clarix Protocol',
    description: 'This quick tour will walk you through the key features. You can skip at any time and replay from your Profile.',
    targetSelector: null,
    tooltipPosition: 'center',
    icon: 'fa-hand-wave',
  },
  {
    title: '$PATH Token Balance',
    description: 'You earn $PATH tokens by completing lessons, finishing modules, maintaining daily streaks, and earning credentials. Tokens are scarce — every lesson rewards 2–3, and credentials award 25.',
    targetSelector: '[data-tour="token-balance"]',
    tooltipPosition: 'bottom',
    icon: 'fa-coins',
  },
  {
    title: 'Knowledge Atlas',
    description: 'The Academy is your curriculum hub — 10 modules covering Crypto Foundations through Advanced DeFi. Each lesson takes 10–15 minutes and ends with an AI-generated quiz.',
    targetSelector: '[data-tour="nav-academy"]',
    tooltipPosition: 'right',
    icon: 'fa-graduation-cap',
  },
  {
    title: 'Live Market Intelligence',
    description: 'Market Intel surfaces real-time price data, AI sentiment analysis, and on-chain signals. Use it to connect what you learn to current market conditions.',
    targetSelector: '[data-tour="nav-market"]',
    tooltipPosition: 'right',
    icon: 'fa-chart-line',
  },
  {
    title: 'Clarix Credentials',
    description: 'Credentials are verifiable certificates tied to your wallet. Complete a module group to earn one. Each credential comes with a shareable verification link and 25 $PATH tokens.',
    targetSelector: '[data-tour="nav-certification"]',
    tooltipPosition: 'right',
    icon: 'fa-certificate',
  },
  {
    title: 'Portfolio Advisor',
    description: 'Connect your wallet and the AI Portfolio Advisor analyzes your on-chain holdings, suggests diversification strategies, and scores your portfolio against your knowledge level.',
    targetSelector: '[data-tour="nav-portfolio"]',
    tooltipPosition: 'right',
    icon: 'fa-wallet',
  },
  {
    title: 'You\'re all set',
    description: 'Start with Module 1: Crypto Foundations in the Academy. Complete your first lesson to earn your first $PATH tokens. You can replay this tour anytime from your Profile.',
    targetSelector: null,
    tooltipPosition: 'center',
    icon: 'fa-circle-check',
  },
];

interface TooltipCoords {
  top: number;
  left: number;
  width: number;
  arrowSide: 'top' | 'left' | null;
}

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

  // top
  const left = Math.min(
    Math.max(margin, rect.left + rect.width / 2 - tooltipWidth / 2),
    window.innerWidth - tooltipWidth - margin,
  );
  return { top: rect.top - tooltipHeight - margin, left, width: tooltipWidth, arrowSide: 'top' };
}

interface Props {
  isVisible: boolean;
  onComplete: () => void;
}

const TOOLTIP_WIDTH = 320;
const TOOLTIP_HEIGHT = 200; // estimate for positioning math

const OnboardingTour: React.FC<Props> = ({ isVisible, onComplete }) => {
  const [step, setStep] = useState(0);
  const [coords, setCoords] = useState<TooltipCoords | null>(null);
  const prevHighlightedEl = useRef<Element | null>(null);

  const current = TOUR_STEPS[step];

  const applyHighlight = useCallback((selector: string | null) => {
    // Remove previous highlight
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

    const c = getTooltipCoords(el, current.tooltipPosition, TOOLTIP_WIDTH, TOOLTIP_HEIGHT);
    setCoords(c);
  }, [current.tooltipPosition]);

  useEffect(() => {
    if (!isVisible) {
      if (prevHighlightedEl.current) {
        prevHighlightedEl.current.classList.remove('tour-highlight');
        prevHighlightedEl.current = null;
      }
      return;
    }
    // Small delay to let React render before querying DOM
    const t = setTimeout(() => applyHighlight(current.targetSelector), 50);
    return () => clearTimeout(t);
  }, [isVisible, step, applyHighlight, current.targetSelector]);

  // Cleanup on unmount
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

  const handleSkip = () => handleComplete();

  if (!isVisible) return null;

  const isCenter = current.tooltipPosition === 'center' || !coords;
  const isLast = step === TOUR_STEPS.length - 1;

  // Progress dots
  const dots = TOUR_STEPS.map((_, i) => (
    <div
      key={i}
      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
        i === step ? 'bg-cyan-400 w-4' : i < step ? 'bg-cyan-400/40' : 'bg-white/10'
      }`}
    />
  ));

  const card = (
    <div
      className="bg-[#111827] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
      style={{ width: TOOLTIP_WIDTH }}
    >
      {/* Arrow indicator for non-center tooltips */}
      {coords?.arrowSide === 'left' && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#111827] border-l border-t border-white/[0.08] rotate-[-45deg]" />
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
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">{dots}</div>

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
            {isLast ? 'Get started' : 'Next'}
            {!isLast && <i className="fa-solid fa-arrow-right text-[10px]"></i>}
          </button>
        </div>
      </div>
    </div>
  );

  if (isCenter) {
    return (
      <>
        {/* Full-screen dim overlay for centered steps */}
        <div className="fixed inset-0 bg-[#0A0E1A]/85 z-[9000]" onClick={handleSkip} />
        <div className="fixed inset-0 z-[9002] flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto">{card}</div>
        </div>
      </>
    );
  }

  return (
    <div
      className="fixed z-[9002] pointer-events-auto"
      style={{ top: coords!.top, left: coords!.left, width: TOOLTIP_WIDTH }}
    >
      {card}
    </div>
  );
};

export { TOUR_STORAGE_KEY };
export default OnboardingTour;
