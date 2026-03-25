
import React from 'react';
import { Proposal, UserProgress } from '../types';
import { PROPOSALS } from '../constants';

interface GovernanceForumProps {
  progress: UserProgress;
  onVote: (proposalId: string, support: boolean) => void;
}

const GovernanceForum: React.FC<GovernanceForumProps> = ({ progress, onVote }) => {
  return (
    <div className="mt-12 md:mt-24 page-transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-amber-500 flex items-center justify-center text-black shadow-xl shadow-amber-500/20">
            <i className="fa-solid fa-landmark-dome text-xl md:text-2xl"></i>
          </div>
          <div>
            <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-1">Path-Chain Governance v1.0</h3>
            <p className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic">Protocol Proposals</p>
          </div>
        </div>
        <div className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 md:gap-4 self-start md:self-auto">
           <div className="text-left md:text-right">
              <p className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest">Voting Power</p>
              <p className="text-[10px] md:text-xs font-bold text-white tracking-widest">{progress.tokenBalance.toLocaleString()} $PATH</p>
           </div>
           <i className="fa-solid fa-bolt text-amber-500 text-sm md:text-base"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {PROPOSALS.map(prop => {
          const hasVoted = progress.votedProposalIds.includes(prop.id);
          const totalVotes = prop.votesFor + prop.votesAgainst;
          const forPercent = (prop.votesFor / totalVotes) * 100;

          return (
            <div key={prop.id} className="p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 relative group">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 md:gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-md text-[7px] md:text-[8px] font-black uppercase tracking-widest ${prop.status === 'active' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-slate-500/20 text-slate-500 border border-white/10'}`}>
                      {prop.status}
                    </span>
                    <span className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest">PROP-{prop.id}</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white mb-2 md:mb-3 uppercase tracking-tight">{prop.title}</h4>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed max-w-2xl mb-6 md:mb-8">{prop.description}</p>
                  
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                       <span className="text-emerald-500">For: {prop.votesFor.toLocaleString()}</span>
                       <span className="text-rose-500">Against: {prop.votesAgainst.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden flex">
                       <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${forPercent}%` }}></div>
                       <div className="h-full bg-rose-500 shadow-[0_0_10px_#f43f5e]" style={{ width: `${100 - forPercent}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-64 space-y-3 md:space-y-4">
                   {hasVoted ? (
                     <div className="py-4 md:py-6 px-6 md:px-8 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-center">
                        <i className="fa-solid fa-check-circle text-emerald-500 text-xl md:text-2xl mb-3 md:mb-4"></i>
                        <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Vote Registered</p>
                     </div>
                   ) : prop.status === 'passed' ? (
                     <div className="py-4 md:py-6 px-6 md:px-8 rounded-xl md:rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <p className="text-[8px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest">Consensus Finalized</p>
                     </div>
                   ) : (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                        <button 
                          onClick={() => onVote(prop.id, true)}
                          disabled={progress.tokenBalance < prop.pathCost}
                          className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl bg-emerald-500 text-black font-black uppercase tracking-widest text-[8px] md:text-[10px] shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                           Vote For ({prop.pathCost} $PATH)
                        </button>
                        <button 
                          onClick={() => onVote(prop.id, false)}
                          disabled={progress.tokenBalance < prop.pathCost}
                          className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[8px] md:text-[10px] hover:bg-white/10 transition-all disabled:opacity-50"
                        >
                           Vote Against
                        </button>
                     </div>
                   )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GovernanceForum;
