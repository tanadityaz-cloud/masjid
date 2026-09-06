import React, { useState } from 'react';
import { useStore } from '../../store';
import { EventCategory } from '../../types';
import { X, Calendar, Check } from 'lucide-react';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose }) => {
  const { addEvent } = useStore();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeStart, setTimeStart] = useState('08:00');
  const [timeEnd, setTimeEnd] = useState('11:00');
  const [location, setLocation] = useState('Aula Utama Masjid');
  const [category, setCategory] = useState<EventCategory>('Kajian / Pengajian');
  const [pic, setPic] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !pic) {
      alert('Isi Judul Agenda dan Nama Penanggung Jawab (PIC).');
      return;
    }

    addEvent({
      title,
      date,
      timeStart,
      timeEnd,
      location,
      category,
      pic,
      description,
      status: date === new Date().toISOString().split('T')[0] ? 'HARI INI' : 'MENDATANG',
      isRoutine: false
    });

    onClose();
    setTitle('');
    setPic('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Tambah Agenda / Kegiatan DKM</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Judul Acara / Kegiatan</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Khitanan Massal 2025"
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Kategori Agenda</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Kajian / Pengajian">Kajian / Pengajian</option>
                <option value="Sosial / Santunan">Sosial / Santunan</option>
                <option value="PHBI / Hari Besar">PHBI / Hari Besar</option>
                <option value="Kerja Bakti">Kerja Bakti</option>
                <option value="Rapat / Pertemuan">Rapat / Pertemuan</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Tanggal Pelaksanaan</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Jam Mulai</label>
              <input
                type="text"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                placeholder="08:00"
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Jam Selesai</label>
              <input
                type="text"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                placeholder="11:00"
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Lokasi Tempat</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Aula Utama Masjid"
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Penanggung Jawab (PIC)</label>
              <input
                type="text"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                placeholder="H. Abdul Karim"
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Deskripsi Tambahan</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Penjelasan ringkas acara..."
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 focus:outline-none h-20"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500">
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 text-white font-extrabold text-xs shadow-md"
            >
              Simpan Agenda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
