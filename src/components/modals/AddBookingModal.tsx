import React, { useState } from 'react';
import { useStore } from '../../store';
import { X, Ambulance, Check } from 'lucide-react';

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({ isOpen, onClose }) => {
  const { addAmbulanceBooking, ambulances } = useStore();

  const [ambulanceId, setAmbulanceId] = useState(ambulances[0]?.id || 'amb-1');
  const [patientName, setPatientName] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupTime, setPickupTime] = useState('14:00 WIB');
  const [purpose, setPurpose] = useState('Antar Pasien Cuci Darah');
  const [cost, setCost] = useState('0');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAmb = ambulances.find(a => a.id === ambulanceId) || ambulances[0];

    addAmbulanceBooking({
      ambulanceId: selectedAmb.id,
      ambulanceName: selectedAmb.name,
      patientName,
      destination,
      pickupTime,
      purpose,
      cost: Number(cost),
      driverName: selectedAmb.driverName,
      date: new Date().toISOString().split('T')[0]
    });

    onClose();
    setPatientName('');
    setDestination('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Ambulance className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Pesan / Reservasi Ambulans</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Pilih Armada Ambulans</label>
            <select
              value={ambulanceId}
              onChange={(e) => setAmbulanceId(e.target.value)}
              className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              {ambulances.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.plateNumber}) - Status: {a.status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Nama Pasien / Pemohon</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Contoh: Bpk. Ahmad Suheri"
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Alamat Tujuan Penjemputan / Antar</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="RS Cengkareng / TPU Karet Bivak..."
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Keperluan Layanan</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Antar Pasien Cuci Darah">Antar Pasien Cuci Darah</option>
                <option value="Layanan Jenazah">Layanan Jenazah</option>
                <option value="Kontrol Rutin RS">Kontrol Rutin RS</option>
                <option value="Tanggap Darurat Emergency">Tanggap Darurat Emergency</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Jam Penjemputan</label>
              <input
                type="text"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                placeholder="14:00 WIB"
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Biaya Operasional (Rp) - Set 0 Jika Gratis / Infaq DKM
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="0"
              className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500">
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md"
            >
              Konfirmasi Reservasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
