import React from 'react';
import { useStore } from '../../store';
import { Jamaah } from '../../types';
import { X, Printer, Building2, QrCode, ShieldCheck } from 'lucide-react';

interface PrintJamaahCardModalProps {
  jamaah: Jamaah | null;
  onClose: () => void;
}

export const PrintJamaahCardModal: React.FC<PrintJamaahCardModalProps> = ({ jamaah, onClose }) => {
  const { mosqueProfile } = useStore();

  if (!jamaah) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-6 relative border border-slate-200">
        <div className="no-print flex items-center justify-between border-b pb-3">
          <h2 className="text-sm font-extrabold text-slate-800">Preview Kartu Anggota Jamaah</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Kartu</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div className="printable-area w-full bg-gradient-to-br from-emerald-50 via-white to-slate-50 text-slate-900 p-6 rounded-3xl shadow-lg relative overflow-hidden border border-emerald-300">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-300">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">{mosqueProfile.name}</h3>
                <span className="text-[9px] text-emerald-700 uppercase tracking-widest font-bold block">
                  KARTU TANDA JAMAAH RESMI
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              {jamaah.code}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <img
              src={jamaah.photo}
              alt={jamaah.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm shrink-0"
            />
            <div className="space-y-1 min-w-0">
              <h2 className="text-sm font-black text-slate-900 truncate">{jamaah.name}</h2>
              <p className="text-[10px] text-slate-600">NIK: {jamaah.nik}</p>
              <p className="text-[10px] text-slate-600 truncate">📍 {jamaah.address}</p>
              <span className="inline-block px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-600 text-white mt-1">
                {jamaah.categoryLabel}
              </span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600">
            <div>
              <p className="font-bold text-slate-800">Terdaftar Sejak: {jamaah.registeredDate}</p>
              <p className="text-[9px] text-slate-500">Sistem Manajemen MasjidOS Desktop</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center justify-center text-slate-900">
              <QrCode className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
