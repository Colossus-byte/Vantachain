import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, serverTimestamp, getCountFromServer, collection } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
  uid: string | undefined;
  walletAddress: string | undefined;
  completedSubtopics: string[];
  onStartLesson: () => void;
}

const SESSION_DISMISSED_KEY = 'clarix_incentive_banner_dismissed';
const PREFS_COLLECTION = 'user_prefs';

/** Returns a stable doc ID for the banner pref — prefers uid, falls back to wallet. */
function prefDocId(uid: string | undefined, walletAddress: string | undefined): string | null {
  if (uid) return uid;
  if (walletAddress) return walletAddress.toLowerCase();
  return null;
}

const IncentiveBanner: React.FC<Props> = ({ uid, walletAddress, completedSubtopics, onStartLesson }) => {
  const [visible, setVisible] = useState(false);
  const [earnerCount, setEarnerCount] = useState<number | null>(null);
  const [dismissing, setDismissing] = useState(false);

  // ── Determine initial visibility ────────────────────────────────────────────
  useEffect(() => {
    // Don't show if lesson 1 already started
    if (completedSubtopics.length > 0) return;

    // Don't show if dismissed this session
    if (sessionStorage.getItem(SESSION_DISMISSED_KEY)) return;

    const docId = prefDocId(uid, walletAddress);

    const check = async () => {
      if (docId) {
        try {
          const snap = await getDoc(doc(db, PREFS_COLLECTION, docId));
          if (snap.exists()) {
            const dismissedAt: number = snap.data().bannerDismissedAt?.toMillis?.() ?? 0;
            // Reappear after 24 hours
            if (Date.now() - dismissedAt < 86_400_000) return;
          }
        } catch {
          // Firestore unavailable — fall through and show banner
        }
      }
      setVisible(true);
    };

    check();
  }, [uid, walletAddress, completedSubtopics.length]);

  // ── Fetch live earner count from leaderboard ────────────────────────────────
  useEffect(() => {
    getCountFromServer(collection(db, 'leaderboard'))
      .then(snap => setEarnerCount(snap.data().count))
      .catch(() => setEarnerCount(null));
  }, []);

  // ── Dismiss handler ─────────────────────────────────────────────────────────
  const handleDismiss = async () => {
    setDismissing(true);
    sessionStorage.setItem(SESSION_DISMISSED_KEY, '1');

    const docId = prefDocId(uid, walletAddress);
    if (docId) {
      try {
        await setDoc(
          doc(db, PREFS_COLLECTION, docId),
          { bannerDismissedAt: serverTimestamp() },
          { merge: true },
        );
      } catch {
        // non-critical — session flag already set above
      }
    }

    setTimeout(() => setVisible(false), 300);
  };

  if (!visible || completedSubtopics.length > 0) return null;

  const count = earnerCount ?? 0;
  const displayCount = count > 0
    ? count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString()
    : null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#0A0E1A] via-[#0D1520] to-[#0A0E1A] transition-all duration-300 ${dismissing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      style={{ boxShadow: '0 0 40px rgba(0,212,255,0.07), inset 0 1px 0 rgba(0,212,255,0.1)' }}
    >
      {/* Ambient glow blob — clipped by overflow-hidden on parent */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-cyan-500/[0.06] blur-[60px] md:blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-36 h-36 md:w-48 md:h-48 bg-amber-500/[0.05] blur-[50px] md:blur-[60px] rounded-full pointer-events-none" />

      {/* Dismiss button — absolute top-right on all sizes */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-600 hover:text-slate-400 transition-colors z-10"
        aria-label="Dismiss banner"
      >
        <i className="fa-solid fa-xmark text-xs"></i>
      </button>

      <div className="relative px-4 py-4 md:px-8 md:py-6 pr-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">

        {/* Icon cluster */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center">
            <i className="fa-solid fa-bolt text-cyan-400 text-base md:text-lg"></i>
          </div>
          <div className="md:hidden">
            <p className="text-[9px] font-black text-cyan-400/70 uppercase tracking-widest mb-0.5">New to Clarix?</p>
            <p className="text-sm font-black text-white leading-tight">Start earning in 10 minutes</p>
          </div>
        </div>

        {/* Main copy */}
        <div className="flex-1 min-w-0">
          <p className="hidden md:block text-[10px] font-black text-cyan-400/70 uppercase tracking-widest mb-1">New to Clarix?</p>
          <h3 className="hidden md:block text-lg font-black text-white leading-tight mb-1">
            Complete Lesson 1 — earn <span className="text-cyan-400">20 XP</span> and <span className="text-amber-400">3 $PATH</span> tokens
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 md:gap-x-5 gap-y-1 mt-1">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <i className="fa-solid fa-bolt text-electric-violet text-[10px]"></i>
              <span><span className="font-bold text-white">20 XP</span> per lesson toward your rank</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <i className="fa-solid fa-coins text-amber-400 text-[10px]"></i>
              <span><span className="font-bold text-amber-400">3 $PATH</span> tokens</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <i className="fa-solid fa-certificate text-hyper-gold text-[10px]"></i>
              <span><span className="font-bold text-white">25 $PATH</span> per credential</span>
            </span>
            {displayCount && (
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <i className="fa-solid fa-users text-slate-600 text-[10px]"></i>
                <span><span className="font-semibold text-slate-300">{displayCount} learners</span> already earning</span>
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <button
            onClick={onStartLesson}
            className="relative w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #00D4FF, #00B8E0)',
              boxShadow: '0 0 20px rgba(0,212,255,0.35), 0 0 40px rgba(0,212,255,0.15)',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <i className="fa-solid fa-rocket text-[10px]"></i>
              Start Earning
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncentiveBanner;
