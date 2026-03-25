
import React, { useState } from 'react';

const AuditLab: React.FC = () => {
  const [activeCode, setActiveCode] = useState(`function withdraw(uint _amount) public {
    require(balances[msg.sender] >= _amount);
    msg.sender.call{value: _amount}("");
    balances[msg.sender] -= _amount;
}`);
  const [discovered, setDiscovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setDiscovered(true);
    }, 1500);
  };

  return (
    <div className="mt-8 md:mt-24 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-[#0c0e14] border border-rose-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-rose-500/5 blur-[60px] md:blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-12">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <i className="fa-solid fa-shield-virus text-lg md:text-2xl"></i>
          </div>
          <div>
            <h3 className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.4em] text-rose-500 mb-0.5 md:mb-1">PRO MODULE: Security Audit Lab</h3>
            <p className="text-base md:text-2xl font-black text-white tracking-tighter uppercase italic">Vulnerability Stress-Test</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div className="space-y-4 md:space-y-6">
            <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-black/60 border border-white/5 font-mono text-[8px] md:text-sm">
              <div className="flex justify-between items-center mb-3 md:mb-4 text-[6px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest">
                <span>Solidity Source: WithdrawModule.sol</span>
                <span className="text-rose-500/50">UNTRUSTED INPUT</span>
              </div>
              <pre className="text-slate-400 whitespace-pre-wrap leading-relaxed overflow-x-auto no-scrollbar">
                {activeCode}
              </pre>
            </div>
            
            <button 
              onClick={handleScan}
              disabled={isScanning || discovered}
              className={`w-full py-4 md:py-6 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[8px] md:text-xs transition-all ${
                discovered ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white hover:scale-[1.02]'
              }`}
            >
              {isScanning ? 'RUNNING STATIC ANALYSIS...' : discovered ? 'VULNERABILITY IDENTIFIED: REENTRANCY' : 'SCAN FOR VULNERABILITIES'}
            </button>
          </div>

          <div className="flex flex-col justify-center space-y-4 md:space-y-8 p-1 md:p-4">
            <div className="flex gap-3 md:gap-4">
              <i className="fa-solid fa-bug text-rose-500 mt-1 text-[10px] md:text-base"></i>
              <p className="text-[9px] md:text-sm text-slate-400 leading-relaxed italic">
                Expert Insight: In the code to the left, the balance is updated <strong>after</strong> the external call. A malicious contract could re-enter the withdraw function before the balance decreases.
              </p>
            </div>
            {discovered && (
              <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl bg-emerald-500/5 border border-emerald-500/20 animate-in zoom-in-95 duration-500">
                <div className="text-[7px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 md:mb-3">Fix Protocol</div>
                <p className="text-[8px] md:text-xs font-bold text-white uppercase leading-relaxed">
                  Update balance BEFORE the call. Use OpenZeppelin's <span className="text-emerald-400">nonReentrant</span> modifier.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLab;
