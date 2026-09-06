import React, { useState } from 'react';
import { useStore } from '../../store';
import { ReportItem } from '../../types';
import {
  FileText,
  Download,
  Printer,
  CheckCircle,
  FileSpreadsheet,
  FileCheck,
  Calendar,
  Sparkles,
  Layers,
  Filter
} from 'lucide-react';

export const LaporanView: React.FC = () => {
  const {
    reports,
    addReport,
    totalSaldoKas,
    totalPemasukanBulanIni,
    totalPengeluaranBulanIni,
    jamaahList,
    ambulances,
    events,
    mosqueProfile
  } = useStore();

  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'Excel'>('PDF');
  const [reportType, setReportType] = useState<'Keuangan' | 'Jamaah' | 'Ambulans' | 'Kegiatan'>('Keuangan');

  const handleGenerateReport = () => {
    const title = `Laporan_${reportType}_${new Date().toLocaleString('id-ID', { month: 'short' })}_2025.${selectedFormat === 'PDF' ? 'pdf' : 'xlsx'}`.replace(/\s+/g, '_');
    addReport({
      title,
      category: reportType,
      createdBy: 'Haji Sulaiman',
      status: 'Selesai',
      fileFormat: selectedFormat,
      fileSize: '1.2 MB'
    });
    alert(`Laporan ${reportType} (${selectedFormat}) berhasil dibuat dan tersimpan di memori lokal.`);
  };

  const handlePrintFullReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>Laporan & Statistik Masjid</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pusat pembuatan & pengunduhan laporan keuangan, rekapitulasi jamaah, operasional ambulans, dan arsip LPJ.
          </p>
        </div>

        <button
          onClick={handlePrintFullReport}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Ringkasan Laporan</span>
        </button>
      </div>

      {/* Generator Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Buat Laporan Baru OOTB (PDF / Excel)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              Jenis Laporan
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="Keuangan">Laporan Laporan Kas & Keuangan</option>
              <option value="Jamaah">Laporan Database Jamaah</option>
              <option value="Ambulans">Laporan Operasional Ambulans</option>
              <option value="Kegiatan">Laporan Program & Agenda DKM</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              Format Output
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat('PDF')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                  selectedFormat === 'PDF'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                📄 PDF
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('Excel')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                  selectedFormat === 'Excel'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                📊 Excel (.xlsx)
              </button>
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateReport}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all active:scale-95"
            >
              Generate File Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Printable Area Summary Sheet */}
      <div className="printable-area bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-6">
        <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {mosqueProfile.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{mosqueProfile.address}</p>
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            LAPORAN EKSEKUTIF UTAMA PERIODE MEI 2025
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Saldo Kas Akhir</span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-inter mt-1">
              Rp {totalSaldoKas.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Jamaah</span>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
              {jamaahList.length} Jiwa
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Armada Ambulans</span>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 mt-1">
              {ambulances.length} Unit Siaga
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Agenda Bulan Ini</span>
            <div className="text-lg font-black text-purple-600 dark:text-purple-400 mt-1">
              {events.length} Program
            </div>
          </div>
        </div>
      </div>

      {/* Riwayat Files List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Arsip Berkas Laporan Terkini</h3>

        <div className="space-y-2">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className={`p-2 rounded-xl text-xs font-black ${
                  rep.fileFormat === 'PDF' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {rep.fileFormat}
                </span>
                <div>
                  <p className="font-extrabold text-slate-900 dark:text-white">{rep.title}</p>
                  <p className="text-[10px] text-slate-400">Dibuat oleh: {rep.createdBy} • {rep.createdAt}</p>
                </div>
              </div>

              <button
                onClick={() => alert(`Mengunduh berkas ${rep.title}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh ({rep.fileSize})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
