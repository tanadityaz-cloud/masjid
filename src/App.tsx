import React, { useState } from 'react';
import { StoreProvider, useStore } from './store';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

import { DashboardView } from './components/views/DashboardView';
import { KeuanganView } from './components/views/KeuanganView';
import { JamaahView } from './components/views/JamaahView';
import { AmbulansView } from './components/views/AmbulansView';
import { JadwalView } from './components/views/JadwalView';
import { LaporanView } from './components/views/LaporanView';
import { PengaturanView } from './components/views/PengaturanView';

import { AddTransactionModal } from './components/modals/AddTransactionModal';
import { AddJamaahModal } from './components/modals/AddJamaahModal';
import { AddBookingModal } from './components/modals/AddBookingModal';
import { AddEventModal } from './components/modals/AddEventModal';
import { PrintKwitansiModal } from './components/modals/PrintKwitansiModal';
import { PrintJamaahCardModal } from './components/modals/PrintJamaahCardModal';
import { PinLoginModal } from './components/modals/PinLoginModal';
import { AboutModal } from './components/AboutModal';

import { Transaction, Jamaah } from './types';

function MainAppContent() {
  const { activeView, aboutModalOpen, setAboutModalOpen, pinModalOpen, setPinModalOpen } = useStore();

  // Modals state
  const [addTxOpen, setAddTxOpen] = useState(false);
  const [addJamaahOpen, setAddJamaahOpen] = useState(false);
  const [addBookingOpen, setAddBookingOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);

  // Print modals state
  const [printTx, setPrintTx] = useState<Transaction | null>(null);
  const [printJamaah, setPrintJamaah] = useState<Jamaah | null>(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#0f1113] text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Left Navigation Sidebar */}
      <Sidebar onOpenAddTxModal={() => setAddTxOpen(true)} />

      {/* Main Right Screen Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative bg-white dark:bg-slate-950">
        <Header onOpenAddTxModal={() => setAddTxOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white dark:bg-slate-900/40 transition-all border-l border-slate-100 dark:border-slate-800/60">
          {activeView === 'dashboard' && (
            <DashboardView
              onOpenAddTxModal={() => setAddTxOpen(true)}
              onOpenBookingModal={() => setAddBookingOpen(true)}
              onOpenAddJamaahModal={() => setAddJamaahOpen(true)}
            />
          )}

          {activeView === 'keuangan' && (
            <KeuanganView
              onOpenAddTxModal={() => setAddTxOpen(true)}
              onPrintTx={(tx) => setPrintTx(tx)}
            />
          )}

          {activeView === 'jamaah' && (
            <JamaahView
              onOpenAddJamaahModal={() => setAddJamaahOpen(true)}
              onPrintJamaahCard={(jamaah) => setPrintJamaah(jamaah)}
            />
          )}

          {activeView === 'ambulans' && (
            <AmbulansView onOpenBookingModal={() => setAddBookingOpen(true)} />
          )}

          {activeView === 'jadwal' && (
            <JadwalView onOpenAddEventModal={() => setAddEventOpen(true)} />
          )}

          {activeView === 'laporan' && <LaporanView />}

          {activeView === 'pengaturan' && <PengaturanView />}
        </main>
      </div>

      {/* Interactive Modals */}
      <AddTransactionModal isOpen={addTxOpen} onClose={() => setAddTxOpen(false)} />
      <AddJamaahModal isOpen={addJamaahOpen} onClose={() => setAddJamaahOpen(false)} />
      <AddBookingModal isOpen={addBookingOpen} onClose={() => setAddBookingOpen(false)} />
      <AddEventModal isOpen={addEventOpen} onClose={() => setAddEventOpen(false)} />

      {/* Print Modals */}
      <PrintKwitansiModal transaction={printTx} onClose={() => setPrintTx(null)} />
      <PrintJamaahCardModal jamaah={printJamaah} onClose={() => setPrintJamaah(null)} />

      {/* About App Modal */}
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />

      {/* PIN Security Login Modal */}
      <PinLoginModal isOpen={pinModalOpen} onClose={() => setPinModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
