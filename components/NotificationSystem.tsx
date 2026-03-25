
import React, { useEffect } from 'react';
import { ProtocolNotification } from '../types';

interface NotificationSystemProps {
  notifications: ProtocolNotification[];
  onDismiss: (id: string) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-4 md:top-8 right-4 md:right-8 left-4 md:left-auto z-[1000] flex flex-col gap-3 md:gap-4 w-auto md:w-96 pointer-events-none">
      {notifications.map((n) => (
        <div 
          key={n.id}
          className="pointer-events-auto cyber-panel rounded-xl md:rounded-2xl p-4 md:p-6 border-white/10 shadow-2xl animate-in slide-in-from-right-8 fade-in duration-500 relative overflow-hidden group"
        >
          <div className="flex gap-3 md:gap-4 items-start">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center text-[10px] md:text-sm shrink-0 ${
              n.type === 'success' ? 'bg-[#ccff00]/10 text-[#ccff00]' : 
              n.type === 'signal' ? 'bg-[#8b5cf6]/10 text-[#8b5cf6]' : 'bg-white/5 text-slate-400'
            }`}>
              <i className={`fa-solid ${
                n.type === 'success' ? 'fa-circle-check' : 
                n.type === 'signal' ? 'fa-satellite-dish' : 'fa-info-circle'
              }`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5 md:mb-1 truncate">{n.title}</h5>
              <p className="text-white text-[11px] md:text-sm font-bold tracking-tight leading-tight">{n.message}</p>
            </div>
            <button 
              onClick={() => onDismiss(n.id)}
              className="text-slate-600 hover:text-white transition-colors p-1 shrink-0"
            >
              <i className="fa-solid fa-xmark text-[9px] md:text-xs"></i>
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 h-0.5 md:h-1 bg-white/5 w-full">
            <div className="h-full bg-white/20 animate-[progress_5s_linear_forwards]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
