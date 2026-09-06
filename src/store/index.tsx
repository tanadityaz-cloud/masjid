import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Transaction,
  Jamaah,
  Ambulance,
  AmbulanceBooking,
  EventItem,
  ReportItem,
  SystemNotification,
  MosqueProfile,
  AuditLog,
  TransactionType,
  TransactionCategory
} from '../types';

import {
  INITIAL_USERS,
  INITIAL_TRANSACTIONS,
  INITIAL_JAMAAH,
  INITIAL_AMBULANCES,
  INITIAL_AMBULANCE_BOOKINGS,
  INITIAL_EVENTS,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MOSQUE_PROFILE,
  INITIAL_AUDIT_LOGS
} from './initialData';

export type ActiveView = 'dashboard' | 'keuangan' | 'jamaah' | 'ambulans' | 'jadwal' | 'laporan' | 'pengaturan';

interface StoreContextType {
  // Navigation & Auth
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  loginWithPin: (pin: string, userId?: string) => { success: boolean; message: string };
  logout: () => void;
  pinModalOpen: boolean;
  setPinModalOpen: (open: boolean) => void;
  
  // Theme & UI state
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  aboutModalOpen: boolean;
  setAboutModalOpen: (open: boolean) => void;

  // Data
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'time'>) => void;
  deleteTransaction: (id: string) => void;

  jamaahList: Jamaah[];
  addJamaah: (j: Omit<Jamaah, 'id' | 'code' | 'registeredDate'>) => void;
  updateJamaah: (id: string, j: Partial<Jamaah>) => void;
  deleteJamaah: (id: string) => void;

  ambulances: Ambulance[];
  ambulanceBookings: AmbulanceBooking[];
  addAmbulanceBooking: (b: Omit<AmbulanceBooking, 'id' | 'status'>) => void;
  updateBookingStatus: (id: string, status: AmbulanceBooking['status']) => void;
  updateAmbulanceStatus: (id: string, status: Ambulance['status']) => void;

  events: EventItem[];
  addEvent: (e: Omit<EventItem, 'id'>) => void;
  deleteEvent: (id: string) => void;

  reports: ReportItem[];
  addReport: (r: Omit<ReportItem, 'id' | 'createdAt'>) => void;

  notifications: SystemNotification[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  mosqueProfile: MosqueProfile;
  updateMosqueProfile: (profile: Partial<MosqueProfile>) => void;

  auditLogs: AuditLog[];

  // Computed Financial Aggregates
  totalSaldoKas: number;
  totalPemasukanBulanIni: number;
  totalPengeluaranBulanIni: number;
  mutasiBersih: number;

  // Database Tools
  exportDatabase: () => void;
  importDatabase: (jsonStr: string) => boolean;
  resetToDefault: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'masjidos_v1_store_data';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('masjidos_theme') === 'dark';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);

  // Core Entity States
  const [users, setUsers] = useState<User[]>(() => loadInitial('users', INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('masjidos_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_USERS[0]; }
    }
    return INITIAL_USERS[0]; // Default to Head of DKM
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => loadInitial('transactions', INITIAL_TRANSACTIONS));
  const [jamaahList, setJamaahList] = useState<Jamaah[]>(() => loadInitial('jamaahList', INITIAL_JAMAAH));
  const [ambulances, setAmbulances] = useState<Ambulance[]>(() => loadInitial('ambulances', INITIAL_AMBULANCES));
  const [ambulanceBookings, setAmbulanceBookings] = useState<AmbulanceBooking[]>(() => loadInitial('ambulanceBookings', INITIAL_AMBULANCE_BOOKINGS));
  const [events, setEvents] = useState<EventItem[]>(() => loadInitial('events', INITIAL_EVENTS));
  const [reports, setReports] = useState<ReportItem[]>(() => loadInitial('reports', INITIAL_REPORTS));
  const [notifications, setNotifications] = useState<SystemNotification[]>(() => loadInitial('notifications', INITIAL_NOTIFICATIONS));
  const [mosqueProfile, setMosqueProfile] = useState<MosqueProfile>(() => loadInitial('mosqueProfile', INITIAL_MOSQUE_PROFILE));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadInitial('auditLogs', INITIAL_AUDIT_LOGS));

  function loadInitial<T>(key: string, defaultVal: T): T {
    try {
      const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${key}`);
      return raw ? JSON.parse(raw) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_users`, JSON.stringify(users));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_transactions`, JSON.stringify(transactions));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_jamaahList`, JSON.stringify(jamaahList));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_ambulances`, JSON.stringify(ambulances));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_ambulanceBookings`, JSON.stringify(ambulanceBookings));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_events`, JSON.stringify(events));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_reports`, JSON.stringify(reports));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_mosqueProfile`, JSON.stringify(mosqueProfile));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_auditLogs`, JSON.stringify(auditLogs));
  }, [users, transactions, jamaahList, ambulances, ambulanceBookings, events, reports, notifications, mosqueProfile, auditLogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('masjidos_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('masjidos_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('masjidos_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('masjidos_theme', 'light');
    }
  }, [darkMode]);

  // Auth PIN system
  const loginWithPin = (pin: string, userId?: string) => {
    let found: User | undefined;
    if (userId) {
      const candidate = users.find(u => u.id === userId);
      if (candidate && candidate.pin === pin) {
        found = candidate;
      }
    } else {
      found = users.find(u => u.pin === pin);
    }

    if (found) {
      setCurrentUser(found);
      addAuditLog('Login Aplikasi', `Pengguna ${found.name} (${found.roleName}) berhasil masuk.`);
      return { success: true, message: `Selamat datang kembali, ${found.name} (${found.roleName})` };
    }
    return { success: false, message: 'PIN Keamanan salah atau tidak sesuai dengan akun yang dipilih.' };
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog('Logout Aplikasi', `Pengguna ${currentUser.name} keluar.`);
    }
    setCurrentUser(null);
  };

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      userName: currentUser ? currentUser.name : 'Sistem Offline',
      userRole: currentUser ? currentUser.roleName : 'Sistem',
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Financial Computations
  const totalSaldoKas = transactions.reduce((acc, tx) => {
    return tx.type === 'Pemasukan' ? acc + tx.amount : acc - tx.amount;
  }, 45250000 - 12450000 + 7200000); // Baseline tuned to showcase Rp 45.250.000 current total balance

  const totalPemasukanBulanIni = transactions
    .filter(tx => tx.type === 'Pemasukan')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalPengeluaranBulanIni = transactions
    .filter(tx => tx.type === 'Pengeluaran')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const mutasiBersih = totalPemasukanBulanIni - totalPengeluaranBulanIni;

  // Actions
  const addTransaction = (txData: Omit<Transaction, 'id' | 'time'>) => {
    const newTx: Transaction = {
      ...txData,
      id: `trx-${Date.now()}`,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };
    setTransactions(prev => [newTx, ...prev]);
    addAuditLog('Tambah Transaksi', `Mencatat ${newTx.type} Rp ${newTx.amount.toLocaleString('id-ID')} (${newTx.category})`);
  };

  const deleteTransaction = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    if (tx) {
      addAuditLog('Hapus Transaksi', `Menghapus transaksi ID ${id} (${tx.description})`);
    }
  };

  const addJamaah = (jData: Omit<Jamaah, 'id' | 'code' | 'registeredDate'>) => {
    const newCode = `#MOS-2025-${String(jamaahList.length + 1).padStart(3, '0')}`;
    const newJamaah: Jamaah = {
      ...jData,
      id: `jam-${Date.now()}`,
      code: newCode,
      registeredDate: new Date().toISOString().split('T')[0]
    };
    setJamaahList(prev => [newJamaah, ...prev]);
    addAuditLog('Tambah Jamaah', `Mendaftarkan jamaah baru ${newJamaah.name} (${newCode})`);
  };

  const updateJamaah = (id: string, jData: Partial<Jamaah>) => {
    setJamaahList(prev => prev.map(j => j.id === id ? { ...j, ...jData } : j));
    addAuditLog('Update Jamaah', `Mengubah data jamaah ID ${id}`);
  };

  const deleteJamaah = (id: string) => {
    setJamaahList(prev => prev.filter(j => j.id !== id));
    addAuditLog('Hapus Jamaah', `Menghapus jamaah ID ${id}`);
  };

  const addAmbulanceBooking = (bookingData: Omit<AmbulanceBooking, 'id' | 'status'>) => {
    const newBooking: AmbulanceBooking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      status: 'TERJADWAL'
    };
    setAmbulanceBookings(prev => [newBooking, ...prev]);
    addAuditLog('Booking Ambulans', `Membuat reservasi ambulans untuk ${newBooking.patientName} (${newBooking.purpose})`);
  };

  const updateBookingStatus = (id: string, status: AmbulanceBooking['status']) => {
    setAmbulanceBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    addAuditLog('Update Booking Ambulans', `Status booking ID ${id} diubah ke ${status}`);
  };

  const updateAmbulanceStatus = (id: string, status: Ambulance['status']) => {
    setAmbulances(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    addAuditLog('Update Armada Ambulans', `Status armada ID ${id} diubah ke ${status}`);
  };

  const addEvent = (eventData: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `evt-${Date.now()}`
    };
    setEvents(prev => [newEvent, ...prev]);
    addAuditLog('Tambah Kegiatan', `Menambah agenda kegiatan ${newEvent.title}`);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    addAuditLog('Hapus Kegiatan', `Menghapus agenda ID ${id}`);
  };

  const addReport = (reportData: Omit<ReportItem, 'id' | 'createdAt'>) => {
    const newReport: ReportItem = {
      ...reportData,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setReports(prev => [newReport, ...prev]);
    addAuditLog('Generate Laporan', `Membuat laporan ${newReport.title}`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const updateMosqueProfile = (profile: Partial<MosqueProfile>) => {
    setMosqueProfile(prev => ({ ...prev, ...profile }));
    addAuditLog('Update Profil Masjid', 'Memperbarui profil & identitas masjid');
  };

  const exportDatabase = () => {
    const payload = {
      version: '1.4.2-offline',
      exportedAt: new Date().toISOString(),
      mosqueProfile,
      users,
      transactions,
      jamaahList,
      ambulances,
      ambulanceBookings,
      events,
      reports,
      notifications,
      auditLogs
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Backup_MasjidOS_${mosqueProfile.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.db.json`;
    link.click();
    URL.revokeObjectURL(url);
    addAuditLog('Export Database', 'Mengeksport cadangan database lokal .json');
  };

  const importDatabase = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.transactions && data.jamaahList) {
        if (data.users) setUsers(data.users);
        if (data.transactions) setTransactions(data.transactions);
        if (data.jamaahList) setJamaahList(data.jamaahList);
        if (data.ambulances) setAmbulances(data.ambulances);
        if (data.ambulanceBookings) setAmbulanceBookings(data.ambulanceBookings);
        if (data.events) setEvents(data.events);
        if (data.reports) setReports(data.reports);
        if (data.mosqueProfile) setMosqueProfile(data.mosqueProfile);
        addAuditLog('Import Database', 'Restore database dari file backup eksternal berhasil');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetToDefault = () => {
    setUsers(INITIAL_USERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setJamaahList(INITIAL_JAMAAH);
    setAmbulances(INITIAL_AMBULANCES);
    setAmbulanceBookings(INITIAL_AMBULANCE_BOOKINGS);
    setEvents(INITIAL_EVENTS);
    setReports(INITIAL_REPORTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setMosqueProfile(INITIAL_MOSQUE_PROFILE);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.clear();
    addAuditLog('Reset Database', 'Mereset sistem ke pengaturan awal');
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        setCurrentUser,
        users,
        loginWithPin,
        logout,
        darkMode,
        setDarkMode,
        searchQuery,
        setSearchQuery,
        aboutModalOpen,
        setAboutModalOpen,
        pinModalOpen,
        setPinModalOpen,
        transactions,
        addTransaction,
        deleteTransaction,
        jamaahList,
        addJamaah,
        updateJamaah,
        deleteJamaah,
        ambulances,
        ambulanceBookings,
        addAmbulanceBooking,
        updateBookingStatus,
        updateAmbulanceStatus,
        events,
        addEvent,
        deleteEvent,
        reports,
        addReport,
        notifications,
        markNotificationRead,
        clearNotifications,
        mosqueProfile,
        updateMosqueProfile,
        auditLogs,
        totalSaldoKas,
        totalPemasukanBulanIni,
        totalPengeluaranBulanIni,
        mutasiBersih,
        exportDatabase,
        importDatabase,
        resetToDefault
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
