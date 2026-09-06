export type Role = 'KETUA_DKM' | 'BENDAHARA' | 'SEKRETARIS' | 'ADMIN' | 'OPERATOR_AMBULANS';

export interface User {
  id: string;
  name: string;
  email?: string;
  role: Role;
  roleName: string;
  avatar: string;
  phone: string;
  pin: string;
  status: 'Aktif' | 'Non-Aktif';
  lastLogin: string;
}

export type TransactionType = 'Pemasukan' | 'Pengeluaran';

export type IncomeCategory = 'Infaq Masjid' | 'Zakat Mal' | 'Zakat Fitrah' | 'Wakaf' | 'Donasi Sosial' | 'Infaq Jumat' | 'Sewa Ambulans' | 'Lainnya';
export type ExpenseCategory = 'Operasional' | 'Gaji/Honor' | 'Perawatan & Maintenance' | 'Listrik & Air' | 'Kajian & Dakwah' | 'BBM Ambulans' | 'Bantuan Sosial' | 'Lainnya';

export type TransactionCategory = IncomeCategory | ExpenseCategory;

export interface Transaction {
  id: string;
  date: string;
  time: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  amount: number;
  recipientOrDonor?: string;
  paymentMethod: 'Tunai' | 'Transfer' | 'QRIS' | 'Lainnya';
  proofUrl?: string;
  recordedBy: string;
}

export type JamaahCategory = 'JAMAAN_TETAP' | 'JAMAAN_HARIAN' | 'MUALLAF' | 'RELAWAN' | 'LANSIA';

export interface Jamaah {
  id: string;
  code: string; // e.g. MOS-2024-001
  nik: string;
  name: string;
  address: string;
  phone: string;
  gender: 'Laki-laki' | 'Perempuan';
  category: JamaahCategory;
  categoryLabel: string;
  status: 'Aktif' | 'Non-Aktif';
  familyRelation?: string;
  totalDonation: number;
  photo: string;
  registeredDate: string;
}

export type AmbulanceStatus = 'Tersedia' | 'Sedang Digunakan' | 'Servis';

export interface Ambulance {
  id: string;
  code: string; // AMB-001
  name: string;
  plateNumber: string;
  type: string; // e.g. Toyota HiAce, APV
  status: AmbulanceStatus;
  driverName: string;
  driverPhone: string;
  lastServiced: string;
  totalKm: number;
  fuelLevelPercentage: number;
  photoUrl: string;
}

export interface AmbulanceBooking {
  id: string;
  ambulanceId: string;
  ambulanceName: string;
  patientName: string;
  destination: string;
  pickupTime: string;
  returnTime?: string;
  purpose: string; // e.g. Antar Pasien Cuci Darah, Layanan Jenazah
  status: 'TERJADWAL' | 'DALAM PERJALANAN' | 'SELESAI' | 'DIBATALKAN';
  cost: number;
  driverName: string;
  date: string;
}

export type EventCategory = 'Kajian / Pengajian' | 'Rapat / Pertemuan' | 'Kerja Bakti' | 'PHBI / Hari Besar' | 'Sosial / Santunan';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  category: EventCategory;
  pic: string;
  picPhone?: string;
  description?: string;
  status: 'HARI INI' | 'MENDATANG' | 'SELESAI';
  isRoutine?: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  category: 'Keuangan' | 'Jamaah' | 'Ambulans' | 'Kegiatan';
  createdAt: string;
  createdBy: string;
  status: 'Selesai' | 'Diproses';
  fileFormat: 'PDF' | 'Excel';
  fileSize: string;
  downloadUrl?: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
}

export interface MosqueProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  leaderName: string;
  logoUrl?: string;
  capacity: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
}
