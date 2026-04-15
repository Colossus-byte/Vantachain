// components/WalletConnectModal.tsx
// Clarix — Wallet connection modal with MetaMask + WalletConnect + Coinbase + new-user guide

import React, { useState } from 'react';
import { connectMetaMask, connectWalletConnect, connectCoinbase, WalletState, WalletError } from '../services/walletService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConnected: (wallet: WalletState) => void;
  onGuestPreview?: () => void;
}

type Step = 'choose-path' | 'select' | 'connecting' | 'success' | 'error' | 'no-wallet' | 'crypto-guide';
type GuideStep = 1 | 2 | 3;

// Plain-English error map keyed by WalletError.code
const ERROR_MESSAGES: Record<string, { title: string; body: string }> = {
  USER_REJECTED:    { title: 'Connection cancelled',  body: 'Connection cancelled. Try again when ready.' },
  USER_CANCELLED:   { title: 'Connection cancelled',  body: 'Connection cancelled. Try again when ready.' },
  WRONG_NETWORK:    { title: 'Wrong network',          body: 'Please switch to Ethereum mainnet in your wallet app.' },
  NO_METAMASK:      { title: 'No wallet found',        body: "We couldn't find a wallet. Follow our setup guide above." },
  NO_ACCOUNTS:      { title: 'Wallet locked',          body: 'Please unlock your wallet and try again.' },
};

const WalletConnectModal: React.FC<Props> = ({ isOpen, onClose, onConnected, onGuestPreview }) => {
  const [step, setStep] = useState<Step>('choose-path');
  const [error, setError] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');
  const [connectedWallet, setConnectedWallet] = useState<WalletState | null>(null);
  const [connectingProvider, setConnectingProvider] = useState<string>('');
  const [guideStep, setGuideStep] = useState<GuideStep>(1);

  if (!isOpen) return null;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const hasInjectedWallet = typeof window.ethereum !== 'undefined';
  const dappHost = window.location.host || 'clarixprotocol.com';
  const dappUrl  = encodeURIComponent(window.location.href);
  const metamaskDeepLink = `https://metamask.app.link/dapp/${dappHost}`;
  const coinbaseDeepLink = `https://go.cb-wallet.io/dapp?cbweb=${dappUrl}`;

  // ── Connection handlers ────────────────────────────────────────────────────

  const handleMetaMask = async () => {
    if (!hasInjectedWallet) {
      setStep('no-wallet');
      return;
    }
    setConnectingProvider('MetaMask');
    setStep('connecting');
    try {
      const wallet = await connectMetaMask();
      setConnectedWallet(wallet);
      setStep('success');
      setTimeout(() => { onConnected(wallet); onClose(); setStep('choose-path'); }, 1500);
    } catch (err: any) {
      const walletErr = err as WalletError;
      setError(walletErr.userMessage || 'Connection failed. Please try again.');
      setErrorCode(walletErr.code || 'CONNECTION_FAILED');
      setStep('error');
    }
  };

  const handleWalletConnect = async () => {
    setConnectingProvider('WalletConnect');
    setStep('connecting');
    try {
      const wallet = await connectWalletConnect();
      setConnectedWallet(wallet);
      setStep('success');
      setTimeout(() => { onConnected(wallet); onClose(); setStep('choose-path'); }, 1500);
    } catch (err: any) {
      const walletErr = err as WalletError;
      setError(walletErr.userMessage || 'Connection failed. Please try again.');
      setErrorCode(walletErr.code || 'CONNECTION_FAILED');
      setStep('error');
    }
  };

  const handleCoinbase = async () => {
    setConnectingProvider('Coinbase Wallet');
    setStep('connecting');
    try {
      const wallet = await connectCoinbase();
      setConnectedWallet(wallet);
      setStep('success');
      setTimeout(() => { onConnected(wallet); onClose(); setStep('choose-path'); }, 1500);
    } catch (err: any) {
      const walletErr = err as WalletError;
      setError(walletErr.userMessage || 'Connection failed. Please try again.');
      setErrorCode(walletErr.code || 'CONNECTION_FAILED');
      setStep('error');
    }
  };

  const reset = () => {
    setStep('choose-path');
    setError('');
    setErrorCode('');
    setConnectedWallet(null);
    setGuideStep(1);
  };

  const errorDisplay = ERROR_MESSAGES[errorCode] ?? {
    title: 'Connection failed',
    body: error || 'Something went wrong. Please try again.',
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  const headerTitle: Record<Step, string> = {
    'choose-path':  'Connect to Clarix',
    select:         'Choose Your Wallet',
    connecting:     'Connecting…',
    success:        'Connected!',
    error:          'Connection Failed',
    'no-wallet':    'No Wallet Found',
    'crypto-guide': 'Wallet Setup Guide',
  };

  const headerSub: Record<Step, string> = {
    'choose-path':  "Tell us where you're starting from",
    select:         'Select a wallet to connect',
    connecting:     `Waiting for ${connectingProvider}…`,
    success:        'Wallet linked successfully',
    error:          'Something went wrong',
    'no-wallet':    'Set up a wallet to continue',
    'crypto-guide': `Step ${guideStep} of 3`,
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { onClose(); reset(); }} />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-[#0d0d14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <h2 className="text-white font-bold text-base tracking-tight">{headerTitle[step]}</h2>
            <p className="text-slate-500 text-xs mt-0.5">{headerSub[step]}</p>
          </div>
          <button
            onClick={() => { onClose(); reset(); }}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <i className="fa-solid fa-xmark text-slate-400 text-sm"></i>
          </button>
        </div>

        <div className="px-6 py-6">

          {/* ── CHOOSE PATH ─────────────────────────────────────────────────── */}
          {step === 'choose-path' && (
            <div className="space-y-3">
              {/* Path A — I have a wallet */}
              <button
                onClick={() => setStep('select')}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-electric-violet/5 hover:border-electric-violet/30 transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-electric-violet/10 border border-electric-violet/20 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-wallet text-electric-violet text-lg"></i>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">I have a wallet</p>
                  <p className="text-slate-500 text-xs">MetaMask, Coinbase, WalletConnect & more</p>
                </div>
                <i className="fa-solid fa-arrow-right text-slate-600 text-xs group-hover:text-electric-violet transition-colors"></i>
              </button>

              {/* Path B — I'm new */}
              <button
                onClick={() => { setGuideStep(1); setStep('crypto-guide'); }}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-cyan-500/[0.07] border border-cyan-500/25 hover:bg-cyan-500/[0.12] transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-compass text-cyan-400 text-lg"></i>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">I'm new — help me set up</p>
                  <p className="text-slate-500 text-xs">3-step guide · takes 2 minutes · free</p>
                </div>
                <i className="fa-solid fa-arrow-right text-slate-600 text-xs group-hover:text-cyan-400 transition-colors"></i>
              </button>

              {/* Guest preview — visible button */}
              {onGuestPreview && (
                <button
                  onClick={() => { onClose(); reset(); onGuestPreview(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] transition-all group"
                >
                  <i className="fa-solid fa-eye text-slate-500 text-xs group-hover:text-slate-300 transition-colors"></i>
                  <span className="text-slate-500 text-xs group-hover:text-slate-300 transition-colors">Preview lessons without connecting</span>
                </button>
              )}
            </div>
          )}

          {/* ── SELECT (wallet options) ──────────────────────────────────────── */}
          {step === 'select' && (
            <div className="space-y-3">
              {/* On mobile with no injected wallet: lead with deep links */}
              {isMobile && !hasInjectedWallet ? (
                <>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-center pb-1">
                    Open directly in your wallet app
                  </p>
                  <a
                    href={metamaskDeepLink}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-orange-500/8 border border-orange-500/20 hover:bg-orange-500/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xl">🦊</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-bold text-sm">Open in MetaMask</p>
                      <p className="text-slate-500 text-xs">Connect inside the MetaMask browser</p>
                    </div>
                    <i className="fa-solid fa-arrow-up-right-from-square text-slate-600 text-xs group-hover:text-orange-400 transition-colors"></i>
                  </a>
                  <a
                    href={coinbaseDeepLink}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-blue-500/8 border border-blue-500/20 hover:bg-blue-500/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-circle-dot text-blue-400 text-lg"></i>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-bold text-sm">Open in Coinbase Wallet</p>
                      <p className="text-slate-500 text-xs">Connect inside the Coinbase browser</p>
                    </div>
                    <i className="fa-solid fa-arrow-up-right-from-square text-slate-600 text-xs group-hover:text-blue-400 transition-colors"></i>
                  </a>
                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[10px] text-slate-600">or scan with QR</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <button
                    onClick={handleWalletConnect}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/5 hover:border-blue-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-qrcode text-blue-400 text-lg"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm">WalletConnect</p>
                      <p className="text-slate-500 text-xs">Scan QR with any mobile wallet</p>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-600 text-xs ml-auto group-hover:text-blue-400 transition-colors"></i>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleMetaMask}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500/5 hover:border-orange-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xl">🦊</span>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm">MetaMask</p>
                      <p className="text-slate-500 text-xs">Browser extension wallet</p>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-600 text-xs ml-auto group-hover:text-orange-400 transition-colors"></i>
                  </button>

                  <button
                    onClick={handleCoinbase}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/5 hover:border-blue-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-circle-dot text-blue-400 text-lg"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm">Coinbase Wallet</p>
                      <p className="text-slate-500 text-xs">Browser extension or smart wallet</p>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-600 text-xs ml-auto group-hover:text-blue-400 transition-colors"></i>
                  </button>

                  <button
                    onClick={handleWalletConnect}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/5 hover:border-blue-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-qrcode text-blue-400 text-lg"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm">WalletConnect</p>
                      <p className="text-slate-500 text-xs">Scan QR with any mobile wallet</p>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-600 text-xs ml-auto group-hover:text-blue-400 transition-colors"></i>
                  </button>
                </>
              )}

              <div className="pt-1">
                <button onClick={() => setStep('choose-path')} className="text-slate-600 text-xs hover:text-slate-400 transition-colors">
                  <i className="fa-solid fa-arrow-left text-[10px] mr-1"></i>Back
                </button>
              </div>
            </div>
          )}

          {/* ── CRYPTO GUIDE ────────────────────────────────────────────────── */}
          {step === 'crypto-guide' && (
            <div>
              {/* Step dots */}
              <div className="flex items-center gap-2 mb-5">
                {([1, 2, 3] as GuideStep[]).map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      s === guideStep ? 'bg-cyan-500 text-black' :
                      s < guideStep  ? 'bg-cyan-500/30 text-cyan-400' :
                      'bg-white/10 text-slate-500'
                    }`}>
                      {s < guideStep
                        ? <i className="fa-solid fa-check text-[8px]"></i>
                        : s}
                    </div>
                    {i < 2 && <div className={`h-px flex-1 ${s < guideStep ? 'bg-cyan-500/40' : 'bg-white/10'}`} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1 — Install */}
              {guideStep === 1 && (
                <div className="p-4 rounded-xl bg-blue-500/[0.07] border border-blue-500/20 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-download text-blue-400 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Install Coinbase Wallet</p>
                      <p className="text-slate-500 text-[11px]">The easiest wallet for beginners — free</p>
                    </div>
                  </div>
                  <a
                    href="https://www.coinbase.com/wallet/downloads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-all"
                  >
                    <i className="fa-solid fa-desktop text-slate-400 text-base w-5 text-center"></i>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">Chrome Extension</p>
                      <p className="text-slate-500 text-[11px]">For desktop browsers</p>
                    </div>
                    <i className="fa-solid fa-arrow-up-right-from-square text-slate-600 text-[10px]"></i>
                  </a>
                  <a
                    href="https://www.coinbase.com/wallet/downloads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-all"
                  >
                    <i className="fa-solid fa-mobile-screen text-slate-400 text-base w-5 text-center"></i>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">iOS & Android App</p>
                      <p className="text-slate-500 text-[11px]">For phone or tablet</p>
                    </div>
                    <i className="fa-solid fa-arrow-up-right-from-square text-slate-600 text-[10px]"></i>
                  </a>
                </div>
              )}

              {/* Step 2 — Create wallet */}
              {guideStep === 2 && (
                <div className="p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-key text-emerald-400 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Create your wallet</p>
                      <p className="text-slate-500 text-[11px]">Takes about 2 minutes. No ID required.</p>
                    </div>
                  </div>
                  <ol className="space-y-3">
                    {[
                      'Open Coinbase Wallet and tap "Create a new wallet"',
                      'Write down your 12-word recovery phrase — store it somewhere safe offline',
                      'Set a strong password for the app',
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-slate-400 text-xs leading-relaxed">{text}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <i className="fa-solid fa-triangle-exclamation text-amber-400 text-sm shrink-0 mt-0.5"></i>
                    <p className="text-amber-400/90 text-xs leading-relaxed">
                      Never share your recovery phrase with anyone — not even Clarix.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3 — Connect */}
              {guideStep === 3 && (
                <div className="p-4 rounded-xl bg-cyan-500/[0.07] border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-plug text-cyan-400 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Come back and connect</p>
                      <p className="text-slate-500 text-[11px]">Your wallet is ready — link it to Clarix</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Open Coinbase Wallet, find the built-in browser, navigate to{' '}
                    <span className="font-mono text-cyan-400">clarixprotocol.com</span>, then tap{' '}
                    <strong className="text-white">Connect Wallet</strong>. Or tap below to connect now:
                  </p>
                  <button
                    onClick={handleCoinbase}
                    className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-all"
                  >
                    Connect Coinbase Wallet
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-5">
                <button
                  onClick={() => guideStep > 1 ? setGuideStep((guideStep - 1) as GuideStep) : setStep('choose-path')}
                  className="text-slate-500 text-xs hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-arrow-left text-[10px] mr-1"></i>
                  {guideStep === 1 ? 'Back to options' : 'Previous'}
                </button>
                {guideStep < 3 && (
                  <button
                    onClick={() => setGuideStep((guideStep + 1) as GuideStep)}
                    className="px-5 py-2 bg-cyan-500 text-black font-bold text-xs rounded-lg hover:bg-cyan-400 transition-all"
                  >
                    Next <i className="fa-solid fa-arrow-right text-[10px] ml-1"></i>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── CONNECTING ──────────────────────────────────────────────────── */}
          {step === 'connecting' && (
            <div className="py-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-electric-violet/10 border border-electric-violet/20 flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-electric-violet border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm">Connecting to {connectingProvider}</p>
                <p className="text-slate-500 text-xs mt-1">
                  {connectingProvider === 'MetaMask'
                    ? 'Check your MetaMask extension for a popup…'
                    : connectingProvider === 'Coinbase Wallet'
                    ? 'Check your Coinbase Wallet for a popup…'
                    : 'Scan the QR code with your mobile wallet…'}
                </p>
              </div>
            </div>
          )}

          {/* ── SUCCESS ─────────────────────────────────────────────────────── */}
          {step === 'success' && connectedWallet && (
            <div className="py-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-cyber-lime/10 border border-cyber-lime/20 flex items-center justify-center">
                <i className="fa-solid fa-check text-cyber-lime text-2xl"></i>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm">Wallet Connected!</p>
                <p className="text-slate-400 text-xs mt-1 font-mono">
                  {connectedWallet.address.slice(0, 8)}…{connectedWallet.address.slice(-6)}
                </p>
                <p className="text-cyber-lime text-xs mt-1">{connectedWallet.chainName}</p>
              </div>
            </div>
          )}

          {/* ── ERROR ───────────────────────────────────────────────────────── */}
          {step === 'error' && (
            <div className="py-4 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-red-400/10 border border-red-400/20 flex items-center justify-center">
                <i className="fa-solid fa-triangle-exclamation text-red-400 text-2xl"></i>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm">{errorDisplay.title}</p>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{errorDisplay.body}</p>
                <button
                  onClick={() => { setGuideStep(1); setStep('crypto-guide'); }}
                  className="mt-2 text-[11px] text-cyan-400 hover:underline"
                >
                  Need help? View wallet setup guide →
                </button>
              </div>
              <button
                onClick={() => setStep('select')}
                className="w-full py-3 rounded-xl bg-electric-violet text-white font-bold text-sm hover:bg-violet-500 transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ── NO WALLET ───────────────────────────────────────────────────── */}
          {step === 'no-wallet' && (
            <div className="py-2 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-500/10 border border-slate-500/20 flex items-center justify-center">
                  <i className="fa-solid fa-wallet text-slate-400 text-2xl"></i>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">No wallet detected</p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    We couldn't find a wallet.{' '}
                    {isMobile
                      ? 'Open this page inside your wallet app to connect.'
                      : 'Follow our setup guide or try WalletConnect for mobile.'}
                  </p>
                </div>
              </div>

              {isMobile ? (
                <div className="space-y-2">
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-center">Open directly in your wallet app</p>
                  <a
                    href={metamaskDeepLink}
                    className="w-full py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-sm hover:bg-orange-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>🦊</span> Open in MetaMask
                  </a>
                  <a
                    href={coinbaseDeepLink}
                    className="w-full py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-circle-dot text-sm"></i> Open in Coinbase Wallet
                  </a>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => { setGuideStep(1); setStep('crypto-guide'); }}
                    className="w-full py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-sm hover:bg-cyan-500/20 transition-all"
                  >
                    <i className="fa-solid fa-book text-xs mr-2"></i>Follow our setup guide
                  </button>
                  <button
                    onClick={handleWalletConnect}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/10 transition-all"
                  >
                    Use WalletConnect Instead
                  </button>
                </div>
              )}

              <button onClick={() => setStep('select')} className="text-slate-600 text-xs hover:text-slate-400 transition-colors text-center">
                ← Go back
              </button>
            </div>
          )}

        </div>

        {/* Security note */}
        {(step === 'choose-path' || step === 'select' || step === 'crypto-guide') && (
          <div className="px-6 pb-5">
            <div className="flex items-center gap-2 text-slate-600 text-[10px]">
              <i className="fa-solid fa-shield-check text-cyber-lime/40"></i>
              <span>Clarix never stores your private keys or seed phrase</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnectModal;
