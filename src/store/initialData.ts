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
  AuditLog
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'H. Ahmad Sulaiman',
    email: 'ahmad@masjidos.id',
    role: 'KETUA_DKM',
    roleName: 'Kepala DKM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '0812-3456-7890',
    pin: '1234',
    status: 'Aktif',
    lastLogin: 'Sekarang'
  },
  {
    id: 'usr-2',
    name: 'Budi Santoso',
    email: 'budi@masjidos.id',
    role: 'BENDAHARA',
    roleName: 'Bendahara',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '0812-9876-5432',
    pin: '2222',
    status: 'Aktif',
    lastLogin: '2 jam yang lalu'
  },
  {
    id: 'usr-3',
    name: 'Fatimah Zahra',
    email: 'fatimah@masjidos.id',
    role: 'SEKRETARIS',
    roleName: 'Sekretaris',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '0813-1122-3344',
    pin: '3333',
    status: 'Aktif',
    lastLogin: 'Yesterday'
  },
  {
    id: 'usr-4',
    name: 'Admin Utama',
    email: 'admin@masjidos.id',
    role: 'ADMIN',
    roleName: 'Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '0811-2233-4455',
    pin: '0000',
    status: 'Aktif',
    lastLogin: 'Sekarang'
  },
  {
    id: 'usr-5',
    name: 'Pak Bambang',
    email: 'bambang@masjidos.id',
    role: 'OPERATOR_AMBULANS',
    roleName: 'Driver Ambulans',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    phone: '+62 812-3456-7890',
    pin: '5555',
    status: 'Aktif',
    lastLogin: '1 jam yang lalu'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-101',
    date: '2025-05-29',
    time: '10:45 WIB',
    type: 'Pemasukan',
    category: 'Infaq Jumat',
    description: 'Infaq Jumat Minggu ke-4 Bulan Mei',
    amount: 1250000,
    recipientOrDonor: 'Kotak Infaq Utama',
    paymentMethod: 'Tunai',
    recordedBy: 'Budi Santoso'
  },
  {
    id: 'trx-102',
    date: '2025-05-28',
    time: '14:10 WIB',
    type: 'Pengeluaran',
    category: 'Listrik & Air',
    description: 'Tagihan Listrik PLN & Air PAM Mei 2025',
    amount: 850000,
    recipientOrDonor: 'PT PLN (Persero)',
    paymentMethod: 'Transfer',
    recordedBy: 'Budi Santoso'
  },
  {
    id: 'trx-103',
    date: '2025-05-28',
    time: '09:00 WIB',
    type: 'Pemasukan',
    category: 'Zakat Mal',
    description: 'Zakat Mal tahunan dari H. Ahmad Subarjo',
    amount: 5000000,
    recipientOrDonor: 'H. Ahmad Subarjo',
    paymentMethod: 'Transfer',
    recordedBy: 'Budi Santoso'
  },
  {
    id: 'trx-104',
    date: '2025-05-25',
    time: '16:30 WIB',
    type: 'Pemasukan',
    category: 'Donasi Sosial',
    description: 'Donasi Khitanan Massal Jamaah RT 04',
    amount: 3100000,
    recipientOrDonor: 'Jamaah Masjid',
    paymentMethod: 'Tunai',
    recordedBy: 'Budi Santoso'
  },
  {
    id: 'trx-105',
    date: '2025-05-24',
    time: '11:00 WIB',
    type: 'Pengeluaran',
    category: 'Gaji/Honor',
    description: 'Honor Guru Ngaji & Marbot Masjid Mei',
    amount: 2800000,
    recipientOrDonor: 'Ustadz & Marbot',
    paymentMethod: 'Tunai',
    recordedBy: 'Budi Santoso'
  },
  {
    id: 'trx-106',
    date: '2025-05-22',
    time: '13:15 WIB',
    type: 'Pengeluaran',
    category: 'BBM Ambulans',
    description: 'Pengisian Bahan Bakar Ambulans HiAce',
    amount: 350000,
    recipientOrDonor: 'SPBU Pertamina',
    paymentMethod: 'Tunai',
    recordedBy: 'Pak Bambang'
  },
  {
    id: 'trx-107',
    date: '2025-05-20',
    time: '08:00 WIB',
    type: 'Pemasukan',
    category: 'Wakaf',
    description: 'Wakaf Pengembangan Sound System Masjid',
    amount: 3100000,
    recipientOrDonor: 'Hj. Siti Aminah',
    paymentMethod: 'Transfer',
    recordedBy: 'Budi Santoso'
  },
  {
    id: 'trx-108',
    date: '2025-05-18',
    time: '15:20 WIB',
    type: 'Pengeluaran',
    category: 'Perawatan & Maintenance',
    description: 'Service Rutin AC Ruang Utama Masjid',
    amount: 1200000,
    recipientOrDonor: 'Karya Cool Teknik',
    paymentMethod: 'Tunai',
    recordedBy: 'Budi Santoso'
  }
];

export const INITIAL_JAMAAH: Jamaah[] = [
  {
    id: 'jam-1',
    code: '#MOS-2024-001',
    nik: '3271041205650001',
    name: 'H. Ahmad Subarjo',
    address: 'Jl. Kebon Jeruk No. 12, RT 02/04, Jakarta Pusat',
    phone: '0812-4455-6677',
    gender: 'Laki-laki',
    category: 'JAMAAN_TETAP',
    categoryLabel: 'Jamaah Tetap',
    status: 'Aktif',
    totalDonation: 12500000,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    registeredDate: '2024-01-15'
  },
  {
    id: 'jam-2',
    code: '#MOS-2024-042',
    nik: '3271054408980003',
    name: 'Siti Rahayu',
    address: 'Jl. Budi Mulia No. 45, Jakarta Pusat',
    phone: '0857-1122-3344',
    gender: 'Perempuan',
    category: 'RELAWAN',
    categoryLabel: 'Relawan',
    status: 'Aktif',
    totalDonation: 3500000,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    registeredDate: '2024-02-10'
  },
  {
    id: 'jam-3',
    code: '#MOS-2024-015',
    nik: '3271032101900005',
    name: 'Dedi Kurniawan',
    address: 'Jl. Cempaka Putih No. 8, Jakarta Pusat',
    phone: '0878-9900-1122',
    gender: 'Laki-laki',
    category: 'JAMAAN_HARIAN',
    categoryLabel: 'Jamaah Harian',
    status: 'Non-Aktif',
    totalDonation: 750000,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    registeredDate: '2024-03-01'
  },
  {
    id: 'jam-4',
    code: '#MOS-2024-009',
    nik: '3271011512780002',
    name: 'Ustadz M. Ilyas',
    address: 'Komplek Masjid Al-Ikhlas No. 1, Jakarta Pusat',
    phone: '0821-2233-4455',
    gender: 'Laki-laki',
    category: 'JAMAAN_TETAP',
    categoryLabel: 'Jamaah Tetap',
    status: 'Aktif',
    totalDonation: 4200000,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    registeredDate: '2024-01-01'
  },
  {
    id: 'jam-5',
    code: '#MOS-2024-088',
    nik: '3271081903950007',
    name: 'Rian Hidayat',
    address: 'Jl. Tanah Abang No. 99, Jakarta Pusat',
    phone: '0819-3344-5566',
    gender: 'Laki-laki',
    category: 'MUALLAF',
    categoryLabel: 'Muallaf',
    status: 'Aktif',
    totalDonation: 1500000,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    registeredDate: '2024-04-12'
  }
];

export const INITIAL_AMBULANCES: Ambulance[] = [
  {
    id: 'amb-1',
    code: 'AMB-001',
    name: 'Ambulans Jenazah A1',
    plateNumber: 'B 1234 MOS',
    type: 'Toyota HiAce VIP',
    status: 'Tersedia',
    driverName: 'Pak Bambang',
    driverPhone: '+62 812-3456-7890',
    lastServiced: '2025-05-15',
    totalKm: 12402,
    fuelLevelPercentage: 85,
    photoUrl: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'amb-2',
    code: 'AMB-002',
    name: 'Ambulans Medis B1',
    plateNumber: 'B 5678 MOS',
    type: 'Suzuki APV Emergency',
    status: 'Sedang Digunakan',
    driverName: 'Pak Herman',
    driverPhone: '+62 813-8899-0011',
    lastServiced: '2025-05-10',
    totalKm: 18950,
    fuelLevelPercentage: 60,
    photoUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'amb-3',
    code: 'AMB-003',
    name: 'Ambulans Siaga C1',
    plateNumber: 'B 2468 MOS',
    type: 'Wuling Confero',
    status: 'Tersedia',
    driverName: 'Pak Mulyadi',
    driverPhone: '+62 856-7788-9900',
    lastServiced: '2025-04-28',
    totalKm: 9800,
    fuelLevelPercentage: 90,
    photoUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'amb-4',
    code: 'AMB-004',
    name: 'Ambulans Tanggap D1',
    plateNumber: 'B 9900 MOS',
    type: 'Hyundai Staria VIP',
    status: 'Servis',
    driverName: 'Pak Bambang',
    driverPhone: '+62 812-3456-7890',
    lastServiced: '2025-05-27',
    totalKm: 24100,
    fuelLevelPercentage: 40,
    photoUrl: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=500&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_AMBULANCE_BOOKINGS: AmbulanceBooking[] = [
  {
    id: 'book-1',
    ambulanceId: 'amb-2',
    ambulanceName: 'Ambulans Medis B1',
    patientName: 'Bpk. Ahmad Suheri',
    destination: 'RS Cengkareng / Klinik Medika',
    pickupTime: '14:00 WIB',
    returnTime: '18:00 WIB',
    purpose: 'Antar Pasien Cuci Darah',
    status: 'DALAM PERJALANAN',
    cost: 150000,
    driverName: 'Pak Herman',
    date: '2025-05-29'
  },
  {
    id: 'book-2',
    ambulanceId: 'amb-1',
    ambulanceName: 'Ambulans Jenazah A1',
    patientName: 'Ibu Kartini',
    destination: 'RS Hermina - Kebon Jeruk',
    pickupTime: '16:30 WIB',
    purpose: 'Kontrol Rutin Pasien',
    status: 'TERJADWAL',
    cost: 100000,
    driverName: 'Pak Bambang',
    date: '2025-05-29'
  },
  {
    id: 'book-3',
    ambulanceId: 'amb-1',
    ambulanceName: 'Ambulans Jenazah A1',
    patientName: 'Alm. Hj. Siti Aminah',
    destination: 'TPU Karet Bivak',
    pickupTime: '08:30 WIB',
    returnTime: '10:15 WIB',
    purpose: 'Layanan Jenazah',
    status: 'SELESAI',
    cost: 0,
    driverName: 'Pak Bambang',
    date: '2025-05-24'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Khitanan Massal',
    date: '2025-05-29',
    timeStart: '08:00',
    timeEnd: '12:00',
    location: 'Aula Masjid Al-Ikhlas',
    category: 'Sosial / Santunan',
    pic: 'H. Abdul Karim',
    picPhone: '0812-3333-4444',
    description: 'Program khitanan gratis bagi 50 anak yatim dan dhuafa sekitar masjid.',
    status: 'HARI INI',
    isRoutine: false
  },
  {
    id: 'evt-2',
    title: 'Santunan Yatim & Dhuafa',
    date: '2025-05-29',
    timeStart: '13:00',
    timeEnd: '15:00',
    location: 'Aula Utama',
    category: 'Sosial / Santunan',
    pic: 'Fatimah Zahra',
    picPhone: '0813-1122-3344',
    description: 'Penyerahan santunan tunai & paket sembako bulanan.',
    status: 'HARI INI',
    isRoutine: false
  },
  {
    id: 'evt-3',
    title: 'Kajian Malam Sabtu: Fiqih Muamalah',
    date: '2025-05-29',
    timeStart: '19:30',
    timeEnd: '21:00',
    location: 'Masjid Utama',
    category: 'Kajian / Pengajian',
    pic: 'Ustadz M. Ilyas',
    picPhone: '0821-2233-4455',
    description: 'Pembahasan kitab Fiqih Sunnah bab Jual Beli dan Riba.',
    status: 'HARI INI',
    isRoutine: true
  },
  {
    id: 'evt-4',
    title: 'Kerja Bakti Lingkungan',
    date: '2025-05-31',
    timeStart: '07:00',
    timeEnd: '10:00',
    location: 'Halaman & Sekitar Masjid',
    category: 'Kerja Bakti',
    pic: 'Rian Hidayat',
    picPhone: '0819-3344-5566',
    description: 'Pembersihan saluran air dan tempat wudhu menyambut bulan Dzulhijjah.',
    status: 'MENDATANG',
    isRoutine: false
  },
  {
    id: 'evt-5',
    title: 'Sholat Ied & Qurban DKM',
    date: '2025-06-06',
    timeStart: '06:00',
    timeEnd: '12:00',
    location: 'Lapangan Utama Masjid',
    category: 'PHBI / Hari Besar',
    pic: 'H. Ahmad Subarjo',
    picPhone: '0812-4455-6677',
    description: 'Pelaksanaan Sholat Idul Adha 1446 H & Penyembelihan Hewan Qurban.',
    status: 'MENDATANG',
    isRoutine: false
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    title: 'Lap_Keuangan_Mei_2025.pdf',
    category: 'Keuangan',
    createdAt: '24 Mei 2025, 14:20',
    createdBy: 'Haji Sulaiman',
    status: 'Selesai',
    fileFormat: 'PDF',
    fileSize: '1.4 MB'
  },
  {
    id: 'rep-2',
    title: 'Data_Jamaah_Aktif_v2.xlsx',
    category: 'Jamaah',
    createdAt: '22 Mei 2025, 09:15',
    createdBy: 'Admin Utama',
    status: 'Selesai',
    fileFormat: 'Excel',
    fileSize: '820 KB'
  },
  {
    id: 'rep-3',
    title: 'Operasional_Ambulans_Q1.pdf',
    category: 'Ambulans',
    createdAt: '20 Mei 2025, 16:45',
    createdBy: 'Haji Sulaiman',
    status: 'Diproses',
    fileFormat: 'PDF',
    fileSize: '2.1 MB'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'Backup Data Berhasil',
    message: 'Sistem telah mencadangkan 1.428 database jamaah & keuangan ke file lokal tersimpan secara aman.',
    time: '10 MENIT LALU',
    type: 'success',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Laporan Stok Sembako Rendah',
    message: 'Stok paket santunan tinggal 5 paket. Perlu restok sebelum tanggal 1 Dzulhijjah.',
    time: '2 JAM LALU',
    type: 'warning',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Ambulans AMB-002 Berangkat',
    message: 'Ambulans Medis B1 sedang digunakan oleh Bpk. Ahmad Suheri menuju RS Cengkareng.',
    time: '3 JAM LALU',
    type: 'info',
    read: true
  }
];

export const INITIAL_MOSQUE_PROFILE: MosqueProfile = {
  name: 'Masjid Al-Ikhlas',
  address: 'Jl. Kebon Jeruk No. 12, Kec. Gambir, Jakarta Pusat, 10110',
  phone: '0812-3456-7890',
  email: 'info@masjidalikhlas.or.id',
  website: 'www.masjidalikhlas.or.id',
  leaderName: 'H. Ahmad Sulaiman',
  capacity: 1500
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2025-05-29 10:45:12',
    userName: 'Budi Santoso',
    userRole: 'Bendahara',
    action: 'Tambah Pemasukan',
    details: 'Mencatat Infaq Jumat Rp 1.250.000'
  },
  {
    id: 'log-2',
    timestamp: '2025-05-28 14:10:05',
    userName: 'Budi Santoso',
    userRole: 'Bendahara',
    action: 'Tambah Pengeluaran',
    details: 'Mencatat Tagihan Listrik PLN Rp 850.000'
  },
  {
    id: 'log-3',
    timestamp: '2025-05-28 09:00:22',
    userName: 'Admin Utama',
    userRole: 'Administrator',
    action: 'Backup Database',
    details: 'Export otomatis database SQLite lokal'
  }
];
