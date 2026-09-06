import React, { useState } from 'react';
import { useStore } from '../../store';
import { Transaction, TransactionType, TransactionCategory } from '../../types';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  Printer,
  Trash2,
  FileSpreadsheet,
  PieChart as PieChartIcon,
  Download,
  Calendar,
  CreditCard,
  CheckCircle,
  Tag
} from 'lucide-react';

interface KeuanganViewProps {
  onOpenAddTxModal: () => void;
  onPrintTx: (tx: Transaction) => void;
}

export const KeuanganView: React.FC<KeuanganViewProps> = ({ onOpenAddTxModal, onPrintTx }) => {
  const {
    transactions,
    deleteTransaction,
    totalSaldoKas,
    totalPemasukanBulanIni,
    totalPengeluaranBulanIni,
    mutasiBersih
  } = useStore();

  const [activeTab, setActiveTab] = useState<'SEMUA' | 'Pemasukan' | 'Pengeluaran'>('SEMUA');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');
  const [searchTx, setSearchTx] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('SEMUA');

  // Filter transactions
  const filteredTxs = transactions.filter((tx) => {
    if (activeTab !== 'SEMUA' && tx.type !== activeTab) return false;
    if (selectedCategory !== 'SEMUA' && tx.category !== selectedCategory) return false;
    if (selectedMethod !== 'SEMUA' && tx.paymentMethod !== selectedMethod) return false;
    if (searchTx) {
      const q = searchTx.toLowerCase();
      return (
        tx.description.toLowerCase().includes(q) ||
        tx.category.toLowerCase().includes(q) ||
        (tx.recipientOrDonor && tx.recipientOrDonor.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = ['ID,Tanggal,Jam,Tipe,Kategori,Keterangan,Pemberi/Penerima,Metode,Jumlah (Rp),Pencatat'];
    const rows = filteredTxs.map(
      (t) =>
        `"${t.id}","${t.date}","${t.time}","${t.type}","${t.category}","${t.description.replace(/"/g, '""')}","${t.recipientOrDonor || '-'}","${t.paymentMethod}",${t.amount},"${t.recordedBy}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Kas_MasjidOS_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* View Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Wallet className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>Pengelolaan Kas & Keuangan</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pencatatan arus kas, infaq, zakat, wakaf, operasional, dan cetak bukti kwitansi resmi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export Excel/CSV</span>
          </button>
          <button
            onClick={onOpenAddTxModal}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Catat Transaksi Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#003926] to-[#0d5239] text-white shadow-md">
          <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">Saldo Kas Utama</span>
          <div className="text-2xl font-black mt-1 font-inter">Rp {totalSaldoKas.toLocaleString('id-ID')}</div>
          <span className="text-[10px] text-emerald-300 mt-2 block">Status Kas Seimbang & Akurat</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Total Pemasukan Mei</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-inter">
            Rp {totalPemasukanBulanIni.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Infaq, Zakat, Wakaf, Donasi</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Total Pengeluaran Mei</span>
            <ArrowDownRight className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1 font-inter">
            Rp {totalPengeluaranBulanIni.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Operasional & Pemeliharaan</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Mutasi Bersih Mei</span>
            <Wallet className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-inter">
            Rp {mutasiBersih.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Surplus Arus Kas Bulanan</span>
        </div>
      </div>

      {/* Main Table & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
        {/* Tab & Search Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          {/* Type Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit">
            <button
              onClick={() => setActiveTab('SEMUA')}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                activeTab === 'SEMUA'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Semua Mutasi
            </button>
            <button
              onClick={() => setActiveTab('Pemasukan')}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                activeTab === 'Pemasukan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              Pemasukan
            </button>
            <button
              onClick={() => setActiveTab('Pengeluaran')}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                activeTab === 'Pengeluaran'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-rose-600'
              }`}
            >
              Pengeluaran
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                placeholder="Cari transaksi..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="SEMUA">Semua Kategori</option>
              <option value="Infaq Jumat">Infaq Jumat</option>
              <option value="Zakat Mal">Zakat Mal</option>
              <option value="Wakaf">Wakaf</option>
              <option value="Donasi Sosial">Donasi Sosial</option>
              <option value="Listrik & Air">Listrik & Air</option>
              <option value="Gaji/Honor">Gaji/Honor</option>
              <option value="Perawatan & Maintenance">Perawatan</option>
              <option value="BBM Ambulans">BBM Ambulans</option>
            </select>

            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="SEMUA">Semua Metode</option>
              <option value="Tunai">Tunai</option>
              <option value="Transfer">Transfer Bank</option>
              <option value="QRIS">QRIS / Digital</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Waktu</th>
                <th className="py-3 px-3">Tipe & Kategori</th>
                <th className="py-3 px-3">Keterangan Transaksi</th>
                <th className="py-3 px-3">Pihak / Donatur</th>
                <th className="py-3 px-3">Metode</th>
                <th className="py-3 px-3 text-right">Jumlah</th>
                <th className="py-3 px-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredTxs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    Tidak ditemukan data transaksi yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredTxs.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-3 font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      <div>{tx.date}</div>
                      <div className="text-[10px] text-slate-400">{tx.time}</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.type === 'Pemasukan'
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                      }`}>
                        {tx.type === 'Pemasukan' ? '+' : '-'} {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white max-w-xs">
                      {tx.description}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                      {tx.recipientOrDonor || '-'}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                        {tx.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-black font-inter whitespace-nowrap">
                      <span className={tx.type === 'Pemasukan' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                        Rp {tx.amount.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onPrintTx(tx)}
                          className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 transition-colors"
                          title="Cetak Kwitansi Bukti Transaksi"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus transaksi ID ${tx.id}?`)) {
                              deleteTransaction(tx.id);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 dark:hover:bg-rose-950 transition-colors"
                          title="Hapus Transaksi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
