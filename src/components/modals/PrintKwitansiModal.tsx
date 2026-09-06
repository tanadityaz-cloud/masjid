import React from 'react';
import { useStore } from '../../store';
import { Transaction } from '../../types';
import { X, Printer, Building2, CheckCircle2 } from 'lucide-react';

interface PrintKwitansiModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const PrintKwitansiModal: React.FC<PrintKwitansiModalProps> = ({ transaction, onClose }) => {
  const { mosqueProfile } = useStore();

  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl w-full max-w-xl p-8 shadow-2xl space-y-6 relative border border-slate-200">
        <div className="no-print flex items-center justify-between border-b pb-4">
          <h2 className="text-sm font-extrabold text-slate-800">Preview Kwitansi Resi Transaksi</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="printable-area p-6 border-2 border-dashed border-emerald-600/40 rounded-2xl bg-emerald-50/20 space-y-6">
          {/* Header Kop */}
          <div className="flex items-center justify-between border-b-2 border-emerald-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-emerald-900 uppercase">
                  {mosqueProfile.name}
                </h1>
                <p className="text-[10px] text-slate-600">{mosqueProfile.address}</p>
                <p className="text-[10px] font-bold text-emerald-800">DKM Telp: {mosqueProfile.phone}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-800 text-white uppercase tracking-wider">
                KWITANSI RESMI
              </span>
              <p className="text-[10px] font-mono text-slate-500 mt-1">No: {transaction.id}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-3 gap-2 py-1">
              <span className="font-bold text-slate-500">Telah Diterima Dari / Kepada:</span>
              <span className="col-span-2 font-extrabold text-slate-900 border-b border-slate-300 pb-0.5">
                {transaction.recipientOrDonor || 'Hamba Allah / Kas Masjid'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1">
              <span className="font-bold text-slate-500">Jumlah Nominal:</span>
              <span className="col-span-2 text-base font-black text-emerald-800 font-inter bg-emerald-100/60 p-2 rounded-xl border border-emerald-300">
                Rp {transaction.amount.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1">
              <span className="font-bold text-slate-500">Kategori & Tipe:</span>
              <span className="col-span-2 font-bold text-slate-800">
                {transaction.type} — {transaction.category}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1">
              <span className="font-bold text-slate-500">Untuk Pembayaran / Peruntukan:</span>
              <span className="col-span-2 font-semibold text-slate-800 border-b border-slate-300 pb-0.5">
                {transaction.description}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1">
              <span className="font-bold text-slate-500">Waktu & Metode:</span>
              <span className="col-span-2 font-bold text-slate-700">
                {transaction.date} ({transaction.time}) • {transaction.paymentMethod}
              </span>
            </div>
          </div>

          {/* Signature & Stamp */}
          <div className="pt-6 flex justify-between items-end text-xs">
            <div className="text-[10px] text-slate-500">
              <p className="flex items-center gap-1 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Validasi Otomatis MasjidOS Offline
              </p>
              <p>Dicatat oleh: {transaction.recordedBy}</p>
            </div>

            <div className="text-center">
              <p className="text-[11px] font-semibold text-slate-600 mb-12">Bendahara DKM Masjid,</p>
              <p className="font-extrabold underline text-slate-900">( Budi Santoso )</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
