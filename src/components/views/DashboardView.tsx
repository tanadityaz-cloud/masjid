import React from 'react';
import { useStore } from '../../store';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  Wallet,
  Users,
  Ambulance,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Phone,
  FileSpreadsheet,
  Building2,
  ChevronRight,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface DashboardViewProps {
  onOpenAddTxModal: () => void;
  onOpenBookingModal: () => void;
  onOpenAddJamaahModal: () => void;
}

const CHART_DATA = [
  { bulan: 'Des', Pemasukan: 22500000, Pengeluaran: 14200000 },
  { bulan: 'Jan', Pemasukan: 18400000, Pengeluaran: 12100000 },
  { bulan: 'Feb', Pemasukan: 21000000, Pengeluaran: 15300000 },
  { bulan: 'Mar', Pemasukan: 32000000, Pengeluaran: 18000000 },
  { bulan: 'Apr', Pemasukan: 28500000, Pengeluaran: 16200000 },
  { bulan: 'Mei', Pemasukan: 12450000, Pengeluaran: 7200000 },
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenAddTxModal,
  onOpenBookingModal,
  onOpenAddJamaahModal
}) => {
  const {
    currentUser,
    totalSaldoKas,
    totalPemasukanBulanIni,
    totalPengeluaranBulanIni,
    mutasiBersih,
    jamaahList,
    ambulances,
    ambulanceBookings,
    events,
    transactions,
    setActiveView,
    mosqueProfile
  } = useStore();

  const recentTxs = transactions.slice(0, 5);
  const todayEvents = events.filter(e => e.status === 'HARI INI');
  const activeBookings = ambulanceBookings.filter(b => b.status !== 'SELESAI' && b.status !== 'DIBATALKAN');

  return (
    <div className="space-y-6 pb-12">
      {/* Assalamu'alaikum Greeting Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50/90 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 text-slate-900 dark:text-white shadow-sm relative overflow-hidden border border-emerald-200/80 dark:border-emerald-800/50">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2 border border-emerald-200/80 dark:border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>MasjidOS Desktop v1.4.2 Standalone</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Assalamu'alaikum, {currentUser?.name || 'Pengurus DKM'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Sistem operasional & keuangan {mosqueProfile.name} berjalan lancar. Semua data tersimpan aman secara offline di perangkat lokal Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onOpenAddTxModal}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              <span>+ Catat Kas</span>
            </button>
            <button
              onClick={onOpenBookingModal}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-2 shadow-xs"
            >
              <Ambulance className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Pesan Ambulans</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Bento KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Saldo Kas */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Saldo Kas
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-inter tracking-tight">
            Rp {totalSaldoKas.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+Rp {mutasiBersih.toLocaleString('id-ID')} Mei 2025</span>
          </div>
        </div>

        {/* Card 2: Total Jamaah */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Jamaah Terdaftar
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-inter tracking-tight">
            {jamaahList.length} <span className="text-sm font-semibold text-slate-400">Jamaah</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Tetap: {jamaahList.filter(j => j.category === 'JAMAAN_TETAP').length}</span>
            <button
              onClick={onOpenAddJamaahModal}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              + Tambah
            </button>
          </div>
        </div>

        {/* Card 3: Layanan Ambulans */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Armada Ambulans
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Ambulance className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-inter tracking-tight">
            {ambulances.filter(a => a.status === 'Tersedia').length} / {ambulances.length} <span className="text-sm font-semibold text-slate-400">Siaga</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{activeBookings.length} Tugas Jalan Hari Ini</span>
          </div>
        </div>

        {/* Card 4: Agenda Hari Ini */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Agenda Hari Ini
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-inter tracking-tight">
            {todayEvents.length} <span className="text-sm font-semibold text-slate-400">Kegiatan</span>
          </div>
          <button
            onClick={() => setActiveView('jadwal')}
            className="flex items-center gap-1 mt-2 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            <span>Lihat Jadwal Lengkap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Row: Chart & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Chart (2 Columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Grafik Arus Kas (Pemasukan vs Pengeluaran)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Evaluasi performa keuangan kas 6 bulan terakhir
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-3 h-3 rounded-md bg-emerald-500"></span> Pemasukan
              </span>
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className="w-3 h-3 rounded-md bg-rose-500"></span> Pengeluaran
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `Rp ${(v / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  formatter={(val: any) => [`Rp ${Number(val).toLocaleString('id-ID')}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="Pemasukan" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Pengeluaran" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Widget: Layanan Ambulans Siaga Hari Ini */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Ambulance className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Status Layanan Ambulans</span>
              </h3>
              <button
                onClick={() => setActiveView('ambulans')}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Kelola Armada
              </button>
            </div>

            {/* Active Duty Driver */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80"
                  alt="Pak Bambang"
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Driver Siaga Utama</span>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">Pak Bambang</p>
                </div>
              </div>
              <a
                href="tel:081234567890"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-transform active:scale-90"
                title="Hubungi Driver"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Ongoing Bookings */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Jadwal Tugas Hari Ini</span>
              {activeBookings.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">Semua armada dalam posisi siaga di masjid.</p>
              ) : (
                activeBookings.map((b) => (
                  <div key={b.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-slate-100">{b.patientName}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{b.purpose} • {b.pickupTime}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      {b.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={onOpenBookingModal}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Ambulance className="w-4 h-4" />
            <span>Pesan Ambulans Sekarang</span>
          </button>
        </div>
      </div>

      {/* Bottom Grid: Mutasi Terbaru & Agenda Hari Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mutasi Kas Terbaru (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Mutasi Transaksi Terbaru</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">5 catatan transaksi kas terakhir</p>
            </div>
            <button
              onClick={() => setActiveView('keuangan')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Lihat Semua Transaksi
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-2">Tanggal</th>
                  <th className="py-3 px-2">Kategori</th>
                  <th className="py-3 px-2">Keterangan</th>
                  <th className="py-3 px-2 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {recentTxs.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-2 font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                      {tx.description}
                    </td>
                    <td className="py-3 px-2 text-right font-bold whitespace-nowrap font-inter">
                      <span className={tx.type === 'Pemasukan' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}>
                        {tx.type === 'Pemasukan' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agenda Hari Ini Box (1 Col) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Kegiatan Hari Ini</span>
              </h3>
              <button
                onClick={() => setActiveView('jadwal')}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
              >
                + Tambah
              </button>
            </div>

            <div className="space-y-3">
              {todayEvents.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">Tidak ada agenda khusus hari ini.</p>
              ) : (
                todayEvents.map((evt) => (
                  <div key={evt.id} className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                        {evt.category}
                      </span>
                      <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
                        {evt.timeStart} - {evt.timeEnd} WIB
                      </span>
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mt-1.5">{evt.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{evt.location} • PIC: {evt.pic}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> System Backup Ready
            </span>
            <span>Versi Standalone</span>
          </div>
        </div>
      </div>
    </div>
  );
};
