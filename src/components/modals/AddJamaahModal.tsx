import React, { useState } from 'react';
import { useStore } from '../../store';
import { JamaahCategory } from '../../types';
import { X, Users, Check } from 'lucide-react';

interface AddJamaahModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddJamaahModal: React.FC<AddJamaahModalProps> = ({ isOpen, onClose }) => {
  const { addJamaah } = useStore();

  const [nik, setNik] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [category, setCategory] = useState<JamaahCategory>('JAMAAN_TETAP');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nik) {
      alert('Isi Nama Lengkap dan NIK Jamaah.');
      return;
    }

    const labels: Record<JamaahCategory, string> = {
      JAMAAN_TETAP: 'Jamaah Tetap',
      JAMAAN_HARIAN: 'Jamaah Harian',
      MUALLAF: 'Muallaf Binaan',
      RELAWAN: 'Relawan DKM',
      LANSIA: 'Jamaah Lansia'
    };

    addJamaah({
      nik,
      name,
      address,
      phone,
      gender,
      category,
      categoryLabel: labels[category],
      status: 'Aktif',
      totalDonation: 0,
      photo: gender === 'Laki-laki'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
    });

    onClose();
    setName('');
    setNik('');
    setAddress('');
    setPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Tambah Jamaah Baru</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">NIK (KTP)</label>
            <input
              type="text"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder="32710..."
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="H. Ahmad Subarjo"
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Kategori Jamaah</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="JAMAAN_TETAP">Jamaah Tetap</option>
                <option value="JAMAAN_HARIAN">Jamaah Harian</option>
                <option value="MUALLAF">Muallaf Binaan</option>
                <option value="RELAWAN">Relawan DKM</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Jenis Kelamin</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Alamat Domisili</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Jl. Kebon Jeruk No. 12..."
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">No. WhatsApp / HP</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0812-3456-7890"
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500">
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md"
            >
              Simpan Data Jamaah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
