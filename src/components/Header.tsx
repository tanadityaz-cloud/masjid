import React, { useState } from 'react';
import { useStore } from '../store';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Database,
  CalendarDays,
  X,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  onOpenAddTxModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAddTxModal }) => {
  const {
    searchQuery,
    setSearchQuery,
    darkMode,
    setDarkMode,
    notifications,
    markNotificationRead,
    clearNotifications,
    currentUser,
    setPinModalOpen
  } = useStore();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const todayStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="h-16 border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm/50">
      {/* Search Input Bar */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari transaksi, jamaah, ambulans, atau agenda..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Header Status Controls & Actions */}
      <div className="flex items-center gap-4">
        {/* Date & Hijri Display */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300 text-xs font-semibold">
          <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{todayStr}</span>
          <span className="text-emerald-400 dark:text-emerald-600">•</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">1 Dzulhijjah 1446 H</span>
        </div>

        {/* Database Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <Database className="w-3.5 h-3.5 text-emerald-500" />
          <span>Database Local .DB</span>
        </div>

        {/* Kunci PIN / Login Button */}
        <button
          onClick={() => setPinModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-extrabold text-xs border border-amber-300 dark:border-amber-800/50 transition-all active:scale-95"
          title="Akses Login & Kunci PIN Pengurus"
        >
          <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Kunci PIN</span>
        </button>

        {/* Current Active User Chip */}
        {currentUser && (
          <button
            onClick={() => setPinModalOpen(true)}
            className="hidden xl:flex items-center gap-2 p-1 pr-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs transition-colors"
            title="Klik untuk Ganti Akun / Login PIN"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-lg object-cover border border-emerald-500"
            />
            <div className="text-left leading-tight">
              <span className="font-extrabold text-slate-800 dark:text-slate-100 block text-[11px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                {currentUser.roleName}
              </span>
            </div>
          </button>
        )}

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
          title={darkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 relative"
            title="Notifikasi Sistem"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Popover Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Notifikasi Sistem ({notifications.length})
                  </h3>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Bersihkan
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 custom-scrollbar">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">Tidak ada notifikasi baru.</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                        notif.read
                          ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800/80 text-slate-500'
                          : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Add Action Button */}
        <button
          onClick={onOpenAddTxModal}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <span>+ Catat Transaksi</span>
        </button>
      </div>
    </header>
  );
};
