import React, { useState } from 'react';
import { useStore } from '../../store';
import { EventItem, EventCategory } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Phone,
  User,
  CheckCircle2,
  CalendarDays,
  Tag
} from 'lucide-react';

interface JadwalViewProps {
  onOpenAddEventModal: () => void;
}

export const JadwalView: React.FC<JadwalViewProps> = ({ onOpenAddEventModal }) => {
  const { events, deleteEvent } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');

  const filteredEvents = events.filter((e) => {
    if (selectedCategory !== 'SEMUA' && e.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Calendar className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            <span>Jadwal Agenda & Kegiatan DKM</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Penjadwalan kajian rutin, rapat DKM, khitanan massal, kerja bakti, dan peringatan hari besar Islam (PHBI).
          </p>
        </div>

        <button
          onClick={onOpenAddEventModal}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Agenda Baru</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
        {['SEMUA', 'Kajian / Pengajian', 'Sosial / Santunan', 'PHBI / Hari Besar', 'Kerja Bakti', 'Rapat / Pertemuan'].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-xs">
            Tidak ada agenda kegiatan terdaftar dalam kategori ini.
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      evt.status === 'HARI INI'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 animate-pulse'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {evt.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {evt.isRoutine ? '🔄 Kegiatan Rutin' : '📅 Insidental'}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                  {evt.category}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">{evt.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {evt.description || 'Tidak ada deskripsi tambahan.'}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5 text-purple-500" />
                    <span>{evt.date} • {evt.timeStart} - {evt.timeEnd} WIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-emerald-500" />
                    <span>PIC: {evt.pic} {evt.picPhone ? `(${evt.picPhone})` : ''}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    if (confirm(`Hapus agenda "${evt.title}"?`)) {
                      deleteEvent(evt.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                  title="Hapus Agenda"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
