import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CredentialDef } from '../constants';

interface CredentialCelebrationProps {
  isVisible: boolean;
  credentialDef: CredentialDef | null;
  username: string;
  walletAddress?: string;
  earnedAt: number;
  verificationHash: string;
  onDismiss: () => void;
}

const PARTICLE_COUNT = 80;

interface ParticleProps {
  index: number;
}

const Particle: React.FC<ParticleProps> = ({ index }) => {
  const shapes = ['rounded-sm', 'rounded-full', 'rounded-none rotate-45'];
  const colors = [
    'bg-cyber-lime', 'bg-electric-violet', 'bg-hyper-gold',
    'bg-blue-400', 'bg-rose-400', 'bg-cyan-400', 'bg-pink-400', 'bg-amber-400',
  ];
  const shape = shapes[index % shapes.length];
  const color = colors[index % colors.length];
  const left = `${(index / PARTICLE_COUNT) * 100 + (Math.sin(index) * 10)}%`;
  const delay = `${(index / PARTICLE_COUNT) * 2}s`;
  const dur = `${2 + (index % 3) * 0.8}s`;
  const sizes = ['w-1.5 h-1.5', 'w-2 h-2', 'w-3 h-3', 'w-1 h-4'];
  const size = sizes[index % sizes.length];

  return (
    <div
      className={`absolute ${color} ${shape} ${size} opacity-0`}
      style={{
        left,
        top: '-12px',
        animation: `confettiFall ${dur} ${delay} ease-in forwards`,
      }}
    />
  );
};

const Ring: React.FC<{ delay: number; size: number }> = ({ delay, size }) => (
  <motion.div
    initial={{ scale: 0.3, opacity: 0.8 }}
    animate={{ scale: size, opacity: 0 }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: 1.5, ease: 'easeOut' }}
    className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-white/30"
  />
);

const Sparkle: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => (
  <motion.div
    initial={{ scale: 0, opacity: 1, rotate: 0 }}
    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: 180 }}
    transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 2 + Math.random() * 2 }}
    className="absolute text-hyper-gold text-xs"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    ✦
  </motion.div>
);

const SPARKLE_POSITIONS = Array.from({ length: 16 }, (_, i) => ({
  x: 10 + (i * 5.2) % 80,
  y: 10 + (i * 7.3) % 80,
  delay: i * 0.3,
}));

const CredentialCelebration: React.FC<CredentialCelebrationProps> = ({
  isVisible,
  credentialDef,
  username,
  walletAddress,
  earnedAt,
  verificationHash,
  onDismiss,
}) => {
  const [countdown, setCountdown] = useState(8);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(8);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timerRef.current!);
          onDismiss();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isVisible]);

  if (!credentialDef) return null;

  const verifyUrl = walletAddress
    ? `${window.location.origin}/verify/${walletAddress.toLowerCase()}/${credentialDef.slug}`
    : null;

  const tweetText = encodeURIComponent(
    `I just earned my "${credentialDef.name}" credential on @ClarixProtocol! 🎓\n\n${credentialDef.description}\n\n${verifyUrl ? `Verify it: ${verifyUrl}` : '#ClarixProtocol #Web3 #DeFi'}`
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  const linkedInUrl = verifyUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verifyUrl)}`
    : null;

  const dateStr = new Date(earnedAt).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="credential-celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[300] flex items-center justify-center"
          onClick={onDismiss}
        >
          {/* Rich backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />

          {/* Colored ambient glow matching credential */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.25, scale: 2 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br ${credentialDef.bgClass} blur-[120px] pointer-events-none`}
          />

          {/* Confetti particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <Particle key={i} index={i} />
            ))}
          </div>

          {/* Sparkles scattered around */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {SPARKLE_POSITIONS.map((s, i) => (
              <Sparkle key={i} x={s.x} y={s.y} delay={s.delay} />
            ))}
          </div>

          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full">
              <Ring delay={0} size={4} />
              <Ring delay={0.8} size={6} />
              <Ring delay={1.6} size={8} />
            </div>
          </div>

          {/* Main card */}
          <motion.div
            initial={{ scale: 0.3, y: 80, opacity: 0, rotateX: 20 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 250, delay: 0.1 }}
            onClick={e => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg mx-4"
            style={{ perspective: '1000px' }}
          >
            {/* Outer glow wrapper */}
            <div
              className="rounded-[2.5rem] p-px"
              style={{ boxShadow: credentialDef.glowClass }}
            >
              <div className="rounded-[2.5rem] bg-surface overflow-hidden">

                {/* Certificate header — gradient matching credential */}
                <div className={`bg-gradient-to-br ${credentialDef.bgClass} p-8 relative overflow-hidden`}>
                  {/* Shine sweep */}
                  <motion.div
                    initial={{ x: '-150%', skewX: -20 }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/3 bg-white/20 blur-xl pointer-events-none"
                  />

                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.07] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="relative z-10 text-center">
                    {/* Badge emoji */}
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.3 }}
                      className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto mb-4 shadow-2xl"
                    >
                      <i className={`fa-solid ${credentialDef.icon} text-white text-4xl`}></i>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="text-white/70 text-[10px] font-black uppercase tracking-[0.4em] mb-1"
                    >
                      {credentialDef.subtitle}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="text-white text-3xl font-black tracking-tight"
                    >
                      {credentialDef.name}
                    </motion.h2>
                  </div>
                </div>

                {/* Certificate body */}
                <div className="p-6 text-center space-y-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-slate-400 text-sm leading-relaxed"
                  >
                    {credentialDef.description}
                  </motion.p>

                  {/* Awarded to row */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Awarded to</p>
                    <p className="text-white font-bold text-sm">{username}</p>
                    {walletAddress && (
                      <p className="text-slate-500 font-mono text-[10px] mt-0.5">
                        {walletAddress.slice(0, 10)}...{walletAddress.slice(-6)}
                      </p>
                    )}
                    <p className="text-slate-600 text-[9px] mt-1">{dateStr}</p>
                  </motion.div>

                  {/* Verification hash */}
                  {verificationHash && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-shield-check text-cyber-lime text-xs"></i>
                      <span className="font-mono text-[8px] text-slate-600">
                        {verificationHash.slice(0, 16)}...
                      </span>
                    </motion.div>
                  )}

                  {/* Share buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex gap-3"
                  >
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black border border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest transition-all"
                    >
                      <i className="fa-brands fa-x-twitter"></i>
                      Share
                    </a>
                    {linkedInUrl && (
                      <a
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0a66c2]/20 border border-[#0a66c2]/30 hover:bg-[#0a66c2]/30 text-[#60a5fa] font-bold text-xs uppercase tracking-widest transition-all"
                      >
                        <i className="fa-brands fa-linkedin"></i>
                        LinkedIn
                      </a>
                    )}
                    {verifyUrl && (
                      <button
                        onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(verifyUrl); }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest transition-all"
                        title="Copy verification URL"
                      >
                        <i className="fa-solid fa-copy"></i>
                        Copy Link
                      </button>
                    )}
                  </motion.div>

                  {/* Dismiss button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    onClick={onDismiss}
                    className={`w-full py-4 rounded-2xl bg-gradient-to-r ${credentialDef.bgClass} text-white font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg`}
                  >
                    Credential Earned!
                    <i className="fa-solid fa-check ml-2"></i>
                  </motion.button>

                  <p className="text-[9px] text-slate-600">Auto-continues in {countdown}s · tap anywhere to dismiss</p>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CredentialCelebration;
