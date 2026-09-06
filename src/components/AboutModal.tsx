import React from 'react';
import { X, Building2, ShieldCheck, Database, Cpu, WifiOff, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 shadow-2xl space-y-5 relative">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-extrabold">Tentang MasjidOS</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#003926] to-[#0d5239] text-emerald-300 flex items-center justify-center shadow-lg border border-emerald-400/30">
            <Building2 className="w-9 h-9" />
          </div>
          <h3 className="text-lg font-black tracking-tight">MasjidOS Desktop v1.4.2</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Smart Mosque Management System (Aplikasi Offline Pengelolaan Masjid)
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5 text-emerald-500" /> Mode Operasi
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">100% Offline Standalone</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-500" /> Storage Engine
            </span>
            <span className="font-bold">Local SQLite / IndexedDB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Keamanan & PIN
            </span>
            <span className="font-bold">AES Encrypted Local Vault</span>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-400 space-y-1">
          <p>© 2025 RotaLogic / DKM Software Team.</p>
          <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1">
            <span>Dibuat untuk Kemakmuran Masjid & Ummat</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs"
          >
            Tutup Informasi
          </button>
        </div>
      </div>
    </div>
  );
};
