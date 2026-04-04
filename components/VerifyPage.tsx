import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CREDENTIAL_DEFS } from '../constants';

interface VerifyPageProps {
  walletAddress: string;
  credentialSlug: string;
}

interface PublicCredential {
  credentialName: string;
  username: string;
  walletAddress: string;
  earnedAt: number;
  verificationHash: string;
  uid?: string;
}

const VerifyPage: React.FC<VerifyPageProps> = ({ walletAddress, credentialSlug }) => {
  const [credential, setCredential] = useState<PublicCredential | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const docId = `${walletAddress.toLowerCase()}_${credentialSlug}`;
        const snap = await getDoc(doc(db, 'public_credentials', docId));
        if (snap.exists()) {
          setCredential(snap.data() as PublicCredential);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [walletAddress, credentialSlug]);

  const def = CREDENTIAL_DEFS.find(c => c.slug === credentialSlug);
  const dateStr = credential
    ? new Date(credential.earnedAt).toLocaleDateString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '';

  const goToApp = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      {def && (
        <div
          className={`absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br ${def.bgClass} opacity-10 blur-[140px] pointer-events-none`}
        />
      )}

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Clarix branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
            <div className="w-5 h-5 rounded-md bg-blue-500 flex items-center justify-center">
              <i className="fa-solid fa-atom text-white text-[8px]"></i>
            </div>
            <span className="text-xs font-black text-white uppercase tracking-widest">Clarix Protocol</span>
          </div>
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Credential Verification</p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 text-sm">Verifying credential on-chain...</p>
          </div>
        )}

        {notFound && !loading && (
          <div className="text-center py-16 px-8 rounded-3xl bg-surface border border-white/10">
            <i className="fa-solid fa-circle-xmark text-rose-500 text-4xl mb-4"></i>
            <h2 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Not Found</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              No credential found for this wallet address and credential type. It may not have been earned yet or the wallet is not connected.
            </p>
            <button
              onClick={goToApp}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>Back to Clarix
            </button>
          </div>
        )}

        {credential && def && !loading && (
          <>
            {/* Certificate card */}
            <div
              className="rounded-3xl overflow-hidden shadow-2xl mb-6"
              style={{ boxShadow: def.glowClass }}
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${def.bgClass} p-8 relative overflow-hidden`}>
                <div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-lg" />

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <i className={`fa-solid ${def.icon} text-white text-3xl`}></i>
                  </div>
                  <p className="text-white/70 text-[9px] font-black uppercase tracking-[0.4em] mb-1">{def.subtitle}</p>
                  <h1 className="text-white text-2xl font-black tracking-tight">{def.name}</h1>
                </div>
              </div>

              {/* Body */}
              <div className="bg-surface p-6 space-y-4">
                <p className="text-slate-400 text-sm leading-relaxed text-center">{def.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">Awarded To</p>
                    <p className="text-white font-bold text-sm truncate">{credential.username}</p>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">Date Earned</p>
                    <p className="text-white font-bold text-xs">{dateStr}</p>
                  </div>
                </div>

                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">Wallet Address</p>
                  <p className="text-slate-300 font-mono text-xs break-all">{credential.walletAddress}</p>
                </div>

                {/* Verified stamp */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <i className="fa-solid fa-shield-check text-emerald-400 text-lg"></i>
                  <div>
                    <p className="text-emerald-400 font-black text-xs uppercase tracking-widest">Verified Authentic</p>
                    <p className="text-emerald-600 font-mono text-[9px] mt-0.5">
                      Hash: {credential.verificationHash.slice(0, 20)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={goToApp}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>App
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I verified @ClarixProtocol credential: "${def.name}" earned by ${credential.username}. Verify at: ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-black border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all text-center"
              >
                <i className="fa-brands fa-x-twitter mr-2"></i>Share
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                <i className="fa-solid fa-copy mr-2"></i>Copy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
