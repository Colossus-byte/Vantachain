import React, { useState, useEffect } from 'react';
import { subscribeReferralStats, walletToRefCode, ReferralStats } from '../services/referralService';
import { trackEvent } from '../services/analyticsService';
import { useFirebase } from '../contexts/FirebaseContext';

interface ReferralCardProps {
  referralCode: string | undefined;
  walletAddress: string | undefined;
}

const BASE_URL = 'https://clarixprotocol.com';

const ReferralCard: React.FC<ReferralCardProps> = ({ referralCode, walletAddress: walletProp }) => {
  const { progress: fbProgress } = useFirebase();
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<ReferralStats | null>(null);

  // Resolve wallet address: prop first, then Firebase context (belt-and-suspenders)
  const walletAddress = walletProp ?? fbProgress?.walletAddress ?? undefined;

  // Short referral code: first 8 chars of wallet (e.g. "0xa1778c")
  // Falls back to legacy CLX code for Firebase-only users with no wallet
  const refCode: string | null = walletAddress
    ? walletToRefCode(walletAddress)
    : (referralCode ?? null);

  const referralLink = refCode ? `${BASE_URL}/?ref=${refCode}` : null;

  // Subscribe to real-time stats whenever the ref code is available
  useEffect(() => {
    if (!refCode) return;
    const unsub = subscribeReferralStats(refCode, setStats);
    return unsub;
  }, [refCode]);

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      trackEvent('referral_link_copied');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API blocked — select the input so user can copy manually
      const input = document.getElementById('referral-link-input') as HTMLInputElement | null;
      input?.select();
    }
  };

  const handleShare = async () => {
    if (!referralLink) return;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Join me on Clarix Protocol',
          text: "I'm earning $PATH tokens learning Web3 on Clarix. Join with my link and get a 5 $PATH welcome bonus!",
          url: referralLink,
        });
        trackEvent('referral_link_shared');
      } catch {
        // User cancelled — no-op
      }
    } else {
      // Desktop fallback: copy to clipboard
      handleCopy();
    }
  };

  // No wallet and no code → prompt to connect
  if (!walletAddress && !referralCode) {
    return (
      <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3 mb-3">
          <i className="fa-solid fa-share-nodes text-cyan-400 text-lg"></i>
          <h4 className="text-xs font-black text-white uppercase tracking-widest">Refer &amp; Earn</h4>
        </div>
        <p className="text-xs text-slate-500">
          Connect your wallet to generate your unique referral link.
          Earn <span className="text-cyan-400 font-bold">15 $PATH</span> for each friend who joins — they also get a <span className="text-amber-400 font-bold">5 $PATH</span> welcome bonus.
        </p>
      </div>
    );
  }

  return (
    <div data-tour="referral-card" className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-share-nodes text-cyan-400"></i>
        </div>
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest">Refer &amp; Earn</h4>
          <p className="text-[10px] text-slate-500 mt-0.5">
            You earn <span className="text-cyan-400 font-bold">15 $PATH</span> · friend gets <span className="text-amber-400 font-bold">5 $PATH</span> welcome bonus
          </p>
        </div>
      </div>

      {/* Referral link + action buttons — always visible when wallet/code is present */}
      <div>
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Your Referral Link</p>

        {/* Read-only input — click to select all */}
        <div className="flex items-center gap-2 mb-2">
          <input
            id="referral-link-input"
            readOnly
            value={referralLink ?? ''}
            onClick={(e) => (e.target as HTMLInputElement).select()}
            placeholder="Generating your link…"
            className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-slate-300 cursor-pointer focus:outline-none focus:border-cyan-500/30 truncate min-w-0"
            title={referralLink ?? ''}
          />
        </div>

        {/* Buttons — always rendered, disabled only if link isn't ready */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!referralLink}
            className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed ${
              copied
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20'
            }`}
          >
            <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-[10px]`}></i>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          <button
            onClick={handleShare}
            disabled={!referralLink}
            className="flex-1 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-share text-[10px]"></i>
            Share
          </button>
        </div>

        {/* Short display hint below */}
        {refCode && (
          <p className="text-[9px] text-slate-600 mt-1.5 font-mono">
            Your code: <span className="text-slate-400">{refCode}</span>
          </p>
        )}
      </div>

      {/* Real-time stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
          {stats === null ? (
            <i className="fa-solid fa-circle-notch fa-spin text-slate-600 text-xs"></i>
          ) : (
            <>
              <p className="text-xl font-black text-white">{stats.totalReferrals}</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Referrals</p>
            </>
          )}
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
          {stats === null ? (
            <i className="fa-solid fa-circle-notch fa-spin text-slate-600 text-xs"></i>
          ) : (
            <>
              <p className="text-xl font-black text-cyan-400">+{stats.tokensEarned}</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">$PATH Earned</p>
            </>
          )}
        </div>
      </div>

      {/* How it works */}
      <div className="pt-1 border-t border-white/[0.05] space-y-2">
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">How it works</p>
        {[
          { icon: 'fa-share-nodes', text: 'Share your link', color: 'text-cyan-400' },
          { icon: 'fa-wallet', text: 'Friend connects wallet via your link', color: 'text-indigo-400' },
          { icon: 'fa-coins', text: 'You get 15 $PATH · they get 5 $PATH', color: 'text-amber-400' },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <i className={`fa-solid ${step.icon} ${step.color} text-xs w-3 text-center shrink-0`}></i>
            <p className="text-[10px] text-slate-500">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralCard;
