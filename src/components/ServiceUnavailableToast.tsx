import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ServiceUnavailableToastProps {
  onClose: () => void;
}

export const ServiceUnavailableToast = ({ onClose }: ServiceUnavailableToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.96 }}
      role="alert"
      aria-live="assertive"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
    >
      <div className="flex items-start gap-4 p-6 bg-[#1a0d10] border border-red-500/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="shrink-0 w-11 h-11 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-400">
          <AlertTriangle size={22} />
        </div>

        <div className="flex-1 space-y-1.5 pt-0.5">
          <h3 className="text-white font-black text-base tracking-tight">
            Audit se nepodařilo spustit
          </h3>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Nepodařilo se navázat spojení s AI enginem. Diagnostika je dočasně
            nedostupná, zkuste to prosím později.
          </p>
          <div className="pt-1 text-[10px] font-black text-red-400/70 uppercase tracking-[0.2em]">
            Err_ai_service_unavailable
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Zavřít"
          className="shrink-0 p-2 text-slate-500 hover:text-white transition-colors rounded-full hover:bg-white/5"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};
