import React, { useState, useEffect } from 'react';

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch initial count
    fetch('/api/waitlist/count')
      .then(res => res.json())
      .then(data => {
        if (data.count !== undefined) {
          // Add a base number to make it look active if it's 0, or just use the real count
          setCount(data.count > 0 ? data.count : 142); 
        }
      })
      .catch(err => console.error('Failed to fetch count', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setStatus('error');
        setErrorMessage("You're already on the list!");
        return;
      }

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Something went wrong');
      }

      setStatus('success');
      if (count !== null) setCount(count + 1);
      
      setTimeout(() => {
        window.history.pushState({}, '', `/signup?email=${encodeURIComponent(email)}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 2000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to join waitlist. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4" id="waitlist">
      {status === 'success' ? (
        <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">You're in!</h3>
          <p className="text-slate-400">Setting up your account...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative flex flex-col sm:block items-center gap-3 sm:gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === 'loading'}
              className="w-full px-6 sm:pl-6 sm:pr-[140px] py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50 text-center sm:text-left"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="w-full sm:w-auto sm:absolute sm:right-2 sm:top-2 sm:bottom-2 mt-2 sm:mt-0 px-6 py-4 sm:py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:hover:bg-blue-500 flex items-center justify-center min-w-[120px]"
            >
              {status === 'loading' ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                'Join Waitlist'
              )}
            </button>
          </div>
          
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center animate-in slide-in-from-top-2">{errorMessage}</p>
          )}
          
          <div className="text-center mt-2 flex flex-col gap-2">
            <p className="text-sm text-slate-500">
              {count !== null ? (
                <>Join <span className="text-hyper-gold font-semibold">{count.toLocaleString()}</span> others on the waitlist</>
              ) : (
                <span className="opacity-0">Loading count...</span>
              )}
            </p>
            <button 
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/signup');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              Skip waitlist and launch app
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default WaitlistForm;
