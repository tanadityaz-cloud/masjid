import React from 'react';
import { useStore, ActiveView } from '../store';
import {
  LayoutDashboard,
  Wallet,
  Users,
  Ambulance,
  Calendar,
  FileText,
  Settings,
  Plus,
  WifiOff,
  Info,
  Lock,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface SidebarProps {
  onOpenAddTxModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAddTxModal }) => {
  const {
    activeView,
    setActiveView,
    currentUser,
    users,
    setCurrentUser,
    totalSaldoKas,
    setAboutModalOpen,
    setPinModalOpen,
    mosqueProfile
  } = useStore();

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'keuangan', label: 'Keuangan Kas', icon: <Wallet className="w-5 h-5" /> },
    { id: 'jamaah', label: 'Database Jamaah', icon: <Users className="w-5 h-5" /> },
    { id: 'ambulans', label: 'Layanan Ambulans', icon: <Ambulance className="w-5 h-5" />, badge: 'Siaga' },
    { id: 'jadwal', label: 'Jadwal & Agenda', icon: <Calendar className="w-5 h-5" /> },
    { id: 'laporan', label: 'Laporan Center', icon: <FileText className="w-5 h-5" /> },
    { id: 'pengaturan', label: 'Pengaturan DKM', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-72 sidebar-gradient text-slate-800 dark:text-slate-100 flex flex-col justify-between shrink-0 shadow-xl relative z-20 border-r border-slate-200/80 dark:border-slate-800">
      {/* Top Header & Mosque Branding */}
      <div className="p-5 border-b border-slate-200/60 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="overflow-hidden">
            <h1 className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
              {mosqueProfile.name || 'MasjidOS'}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                OFFLINE v1.4
              </span>
            </div>
          </div>
        </div>

        {/* Current Active User Profile Box */}
        {currentUser && (
          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border border-emerald-500/40 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3 h-3 shrink-0" />
                  <span className="truncate">{currentUser.roleName}</span>
                </div>
              </div>
            </div>
            {/* Quick Switch User Dropdown */}
            <select
              value={currentUser.id}
              onChange={(e) => {
                const selected = users.find(u => u.id === e.target.value);
                if (selected) setCurrentUser(selected);
              }}
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[11px] font-semibold rounded-lg px-1.5 py-1 border border-slate-300 dark:border-slate-700 focus:outline-none cursor-pointer"
              title="Ganti Peran Pengguna"
            >
              {users.map(u => (
                <option key={u.id} value={u.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                  {u.roleName} ({u.name.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Saldo Kas Quick Card in Sidebar */}
      <div className="px-5 py-3">
        <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Saldo Kas Utama</span>
            <button
              onClick={onOpenAddTxModal}
              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm hover:scale-105 active:scale-95"
              title="Tambah Transaksi Kas Baru"
            >
              <Plus className="w-4 h-4 font-bold" />
            </button>
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight font-inter">
            Rp {totalSaldoKas.toLocaleString('id-ID')}
          </div>
          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            Update Kas Realtime
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-4 h-4 text-white" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Info & Quick System Tools */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2 bg-white dark:bg-slate-900/50">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center gap-1.5">
            <WifiOff className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Mode Standalone Offline</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setAboutModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-slate-700/60 font-bold"
            title="Info Sistem & Pengembang"
          >
            <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Tentang</span>
          </button>
          <button
            onClick={() => setPinModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 transition-colors border border-amber-200 dark:border-amber-800/50 font-bold"
            title="Kunci / Login PIN Pengurus"
          >
            <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Kunci PIN</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
