import React, { useState } from 'react';
import { useStore } from '../../store';
import { Jamaah, JamaahCategory } from '../../types';
import {
  Users,
  Search,
  Plus,
  UserCheck,
  QrCode,
  Printer,
  Trash2,
  Edit,
  Building,
  Heart,
  Phone,
  CreditCard,
  X,
  FileSpreadsheet
} from 'lucide-react';

interface JamaahViewProps {
  onOpenAddJamaahModal: () => void;
  onPrintJamaahCard: (jamaah: Jamaah) => void;
}

export const JamaahView: React.FC<JamaahViewProps> = ({
  onOpenAddJamaahModal,
  onPrintJamaahCard
}) => {
  const { jamaahList, deleteJamaah } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('SEMUA');

  const filteredJamaah = jamaahList.filter((j) => {
    if (categoryFilter !== 'SEMUA' && j.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        j.name.toLowerCase().includes(q) ||
        j.nik.includes(q) ||
        j.code.toLowerCase().includes(q) ||
        j.address.toLowerCase().includes(q) ||
        j.phone.includes(q)
      );
    }
    return true;
  });

  const categoryStats = {
    tetap: jamaahList.filter((j) => j.category === 'JAMAAN_TETAP').length,
    muallaf: jamaahList.filter((j) => j.category === 'MUALLAF').length,
    relawan: jamaahList.filter((j) => j.category === 'RELAWAN').length,
    harian: jamaahList.filter((j) => j.category === 'JAMAAN_HARIAN').length,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* View Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Users className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>Database Jamaah Masjid</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pengelolaan data jamaah tetap, muallaf, relawan DKM, cetak kartu anggota & riwayat partisipasi.
          </p>
        </div>

        <button
          onClick={onOpenAddJamaahModal}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Jamaah Baru</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jamaah Tetap</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{categoryStats.tetap} <span className="text-xs font-normal text-slate-400">Jiwa</span></div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Muallaf Binaan</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{categoryStats.muallaf} <span className="text-xs font-normal text-slate-400">Jiwa</span></div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Relawan DKM</span>
          <div className="text-xl font-black text-teal-600 dark:text-teal-400 mt-1">{categoryStats.relawan} <span className="text-xs font-normal text-slate-400">Orang</span></div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jamaah Harian</span>
          <div className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">{categoryStats.harian} <span className="text-xs font-normal text-slate-400">Jiwa</span></div>
        </div>
      </div>

      {/* Search & Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Nama, NIK, No. Anggota, Telepon..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="SEMUA">Semua Kategori</option>
              <option value="JAMAAN_TETAP">Jamaah Tetap</option>
              <option value="JAMAAN_HARIAN">Jamaah Harian</option>
              <option value="MUALLAF">Muallaf Binaan</option>
              <option value="RELAWAN">Relawan DKM</option>
            </select>
          </div>
        </div>

        {/* Jamaah List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJamaah.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs">
              Tidak ada data jamaah yang ditemukan.
            </div>
          ) : (
            filteredJamaah.map((jamaah) => (
              <div
                key={jamaah.id}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 bg-slate-50/50 dark:bg-slate-800/40 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={jamaah.photo}
                    alt={jamaah.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                        {jamaah.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {jamaah.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white truncate mt-0.5">
                      {jamaah.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate">NIK: {jamaah.nik}</p>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  <p className="truncate">📍 {jamaah.address}</p>
                  <p>📞 {jamaah.phone}</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 font-inter">
                    💚 Total Infaq: Rp {jamaah.totalDonation.toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onPrintJamaahCard(jamaah)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Cetak Kartu</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Hapus data jamaah ${jamaah.name}?`)) {
                        deleteJamaah(jamaah.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
