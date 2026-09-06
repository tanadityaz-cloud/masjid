import React, { useState } from 'react';
import { useStore } from '../../store';
import { User, Role } from '../../types';
import {
  Settings,
  Building,
  ShieldCheck,
  Database,
  RefreshCw,
  Download,
  Upload,
  Lock,
  Eye,
  EyeOff,
  History,
  CheckCircle,
  Smartphone
} from 'lucide-react';

export const PengaturanView: React.FC = () => {
  const {
    mosqueProfile,
    updateMosqueProfile,
    users,
    currentUser,
    setPinModalOpen,
    exportDatabase,
    importDatabase,
    resetToDefault,
    auditLogs
  } = useStore();

  const [profileForm, setProfileForm] = useState(mosqueProfile);
  const [activeTab, setActiveTab] = useState<'PROFIL' | 'PENGGUNA' | 'DATABASE' | 'AUDIT'>('PROFIL');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMosqueProfile(profileForm);
    alert('Profil masjid berhasil diperbarui.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = importDatabase(text);
          if (success) {
            alert('Database berhasil di-restore dari file backup.');
          } else {
            alert('Format file backup tidak valid.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          <span>Pengaturan DKM & Sistem Offline</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Konfigurasi identitas masjid, hak akses pengguna & PIN, backup/restore database, serta audit trail.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'PROFIL', label: 'Profil Masjid', icon: <Building className="w-4 h-4" /> },
          { id: 'PENGGUNA', label: 'Hak Akses & PIN', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'DATABASE', label: 'Backup & Restore', icon: <Database className="w-4 h-4" /> },
          { id: 'AUDIT', label: 'Audit Trail Logs', icon: <History className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Profil Masjid Form */}
      {activeTab === 'PROFIL' && (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4 max-w-3xl">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Identitas Resmi Masjid</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Nama Masjid</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Nama Ketua DKM</label>
              <input
                type="text"
                value={profileForm.leaderName}
                onChange={(e) => setProfileForm({ ...profileForm, leaderName: e.target.value })}
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Alamat Lengkap</label>
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">No. Telepon DKM</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Kapasitas Jamaah (Jiwa)</label>
              <input
                type="number"
                value={profileForm.capacity}
                onChange={(e) => setProfileForm({ ...profileForm, capacity: Number(e.target.value) })}
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-transform active:scale-95"
            >
              Simpan Perubahan Profil
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: User Access & PIN */}
      {activeTab === 'PENGGUNA' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Daftar Pengurus DKM & Hak Akses PIN</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Otentikasi PIN berlaku untuk Kepala DKM, Bendahara, Sekretaris, Administrator, dan Driver Ambulans.
              </p>
            </div>
            <button
              onClick={() => setPinModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Lock className="w-4 h-4" />
              <span>Buka Modal Login PIN</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Pengurus</th>
                  <th className="py-3 px-3">Peran / Jabatan</th>
                  <th className="py-3 px-3">No. HP</th>
                  <th className="py-3 px-3">PIN Keamanan</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aksi PIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border" />
                      <span>{u.name}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {u.roleName}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{u.phone}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                      <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        •••• ({u.pin})
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setPinModalOpen(true)}
                        className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px] border border-emerald-300/50"
                      >
                        Uji Login
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Backup & Restore */}
      {activeTab === 'DATABASE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-600" />
              <span>Export Backup Database Offline</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Unduh salinan cadangan lengkap seluruh data keuangan, jamaah, ambulans, dan agenda ke dalam file .db.json untuk disimpan aman di flashdisk atau harddisk eksternal.
            </p>
            <button
              onClick={exportDatabase}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              Unduh Backup Database (.DB)
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              <span>Restore Database Dari File</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pulihkan database MasjidOS dari file backup eksternal. Data lama akan diperbarui secara aman.
            </p>
            <label className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 text-center block cursor-pointer">
              <span>Pilih File Backup (.json / .db)</span>
              <input type="file" accept=".json,.db" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="col-span-full bg-rose-50 dark:bg-rose-950/20 rounded-3xl border border-rose-200 dark:border-rose-900/50 p-6 space-y-2">
            <h3 className="text-xs font-black text-rose-800 dark:text-rose-300 uppercase">Reset Data Pabrik</h3>
            <p className="text-xs text-rose-700 dark:text-rose-400">
              Perhatian: Tindakan ini akan menghapus data yang telah ditambahkan dan mengembalikan database ke kondisi awal demo.
            </p>
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin mereset seluruh database ke kondisi awal?')) {
                  resetToDefault();
                  alert('Database telah direset ke kondisi standar.');
                }
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Reset Seluruh Database
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'AUDIT' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Riwayat Aktivitas & Log Sistem</h2>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white">{log.action}</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{log.details}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{log.userName} ({log.userRole})</span>
                  <p className="text-[10px] text-slate-400">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
