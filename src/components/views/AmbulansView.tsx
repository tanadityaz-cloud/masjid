import React from 'react';
import { useStore } from '../../store';
import { Ambulance, AmbulanceBooking } from '../../types';
import {
  Ambulance as AmbulanceIcon,
  Phone,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Navigation,
  MapPin,
  Calendar
} from 'lucide-react';

interface AmbulansViewProps {
  onOpenBookingModal: () => void;
}

export const AmbulansView: React.FC<AmbulansViewProps> = ({ onOpenBookingModal }) => {
  const {
    ambulances,
    ambulanceBookings,
    updateBookingStatus,
    updateAmbulanceStatus
  } = useStore();

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <AmbulanceIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>Layanan Ambulans Gratis & Social Care</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pengelolaan 4 armada ambulans, driver siaga 24/7, booking antar pasien & layanan jenazah.
          </p>
        </div>

        <button
          onClick={onOpenBookingModal}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Reservasi Ambulans</span>
        </button>
      </div>

      {/* Driver Siaga Card */}
      <div className="p-5 rounded-3xl bg-emerald-50/90 dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-800/60 text-slate-900 dark:text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
            alt="Driver Siaga"
            className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
          />
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              DRIVER SIAGA HARI INI (24/7)
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">Pak Bambang (+62 812-3456-7890)</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">Panggilan Darurat & Penjemputan Pasien / Jenazah</p>
          </div>
        </div>

        <a
          href="tel:081234567890"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <Phone className="w-4 h-4" />
          <span>Hubungi Langsung</span>
        </a>
      </div>

      {/* Armada Fleet Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
          Daftar Armada Ambulans Masjid (4 Unit)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ambulances.map((amb) => (
            <div
              key={amb.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden h-36 mb-3 bg-slate-100">
                  <img src={amb.photoUrl} alt={amb.name} className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-md ${
                      amb.status === 'Tersedia'
                        ? 'bg-emerald-500 text-white'
                        : amb.status === 'Sedang Digunakan'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {amb.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">{amb.code}</span>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {amb.plateNumber}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">{amb.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{amb.type}</p>

                <div className="mt-3 space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  <p>👤 Driver: <span className="font-bold">{amb.driverName}</span></p>
                  <p>⛽ Bahan Bakar: <span className="font-bold">{amb.fuelLevelPercentage}%</span></p>
                  <p>🔧 Servis Terakhir: {amb.lastServiced}</p>
                </div>
              </div>

              {/* Status Selector */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Ubah Status Armada:</label>
                <select
                  value={amb.status}
                  onChange={(e) => updateAmbulanceStatus(amb.id, e.target.value as Ambulance['status'])}
                  className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 py-1.5 px-2 border border-slate-200 dark:border-slate-700"
                >
                  <option value="Tersedia">Tersedia (Siaga)</option>
                  <option value="Sedang Digunakan">Sedang Digunakan</option>
                  <option value="Servis">Servis / Perbaikan</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jadwal Reservasi Ambulans Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>Jadwal Reservasi & Penggunaan Ambulans</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">{ambulanceBookings.length} Total Reservasi</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Tanggal & Jam</th>
                <th className="py-3 px-3">Pasien / Pemohon</th>
                <th className="py-3 px-3">Tujuan</th>
                <th className="py-3 px-3">Armada & Driver</th>
                <th className="py-3 px-3">Keperluan</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-center">Aksi Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {ambulanceBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    <div>{b.date}</div>
                    <div className="text-[10px] text-slate-400">{b.pickupTime}</div>
                  </td>
                  <td className="py-3 px-3 font-extrabold text-slate-900 dark:text-white">{b.patientName}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{b.destination}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <p className="font-bold">{b.ambulanceName}</p>
                    <p className="text-[10px] text-slate-400">{b.driverName}</p>
                  </td>
                  <td className="py-3 px-3">{b.purpose}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'SELESAI'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : b.status === 'DALAM PERJALANAN'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as AmbulanceBooking['status'])}
                      className="text-[11px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700"
                    >
                      <option value="TERJADWAL">Terjadwal</option>
                      <option value="DALAM PERJALANAN">Dalam Perjalanan</option>
                      <option value="SELESAI">Selesai</option>
                      <option value="DIBATALKAN">Dibatalkan</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
