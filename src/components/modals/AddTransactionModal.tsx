import React, { useState } from 'react';
import { useStore } from '../../store';
import { TransactionType, IncomeCategory, ExpenseCategory } from '../../types';
import { X, Wallet, ArrowUpRight, ArrowDownRight, Check } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction, currentUser } = useStore();

  const [type, setType] = useState<TransactionType>('Pemasukan');
  const [category, setCategory] = useState<string>('Infaq Jumat');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [recipientOrDonor, setRecipientOrDonor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Tunai' | 'Transfer' | 'QRIS'>('Tunai');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert('Masukkan jumlah nominal transaksi yang valid.');
      return;
    }

    addTransaction({
      date: new Date().toISOString().split('T')[0],
      type,
      category: category as any,
      description: description || `${type} ${category}`,
      amount: Number(amount),
      recipientOrDonor,
      paymentMethod,
      recordedBy: currentUser ? currentUser.name : 'Pengurus DKM'
    });

    onClose();
    // Reset form
    setDescription('');
    setAmount('');
    setRecipientOrDonor('');
  };

  const incomeCategories: IncomeCategory[] = [
    'Infaq Jumat',
    'Zakat Mal',
    'Zakat Fitrah',
    'Wakaf',
    'Donasi Sosial',
    'Infaq Masjid',
    'Sewa Ambulans',
    'Lainnya'
  ];

  const expenseCategories: ExpenseCategory[] = [
    'Operasional',
    'Gaji/Honor',
    'Perawatan & Maintenance',
    'Listrik & Air',
    'Kajian & Dakwah',
    'BBM Ambulans',
    'Bantuan Sosial',
    'Lainnya'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 shadow-2xl space-y-5 relative">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Catat Transaksi Kas Baru</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => {
                setType('Pemasukan');
                setCategory('Infaq Jumat');
              }}
              className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                type === 'Pemasukan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Pemasukan (+)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType('Pengeluaran');
                setCategory('Operasional');
              }}
              className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                type === 'Pengeluaran'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>Pengeluaran (-)</span>
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Kategori Transaksi
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              {(type === 'Pemasukan' ? incomeCategories : expenseCategories).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Nominal Transaksi (Rp)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Contoh: 500000"
              className="w-full text-sm font-black font-inter rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none text-emerald-600 dark:text-emerald-400"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Keterangan / Rincian
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Infaq Jumat Kotak Masjid Utama..."
              className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {type === 'Pemasukan' ? 'Donatur / Sumber' : 'Penerima / Vendor'}
              </label>
              <input
                type="text"
                value={recipientOrDonor}
                onChange={(e) => setRecipientOrDonor(e.target.value)}
                placeholder="Nama Hamba Allah / PT..."
                className="w-full text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Metode Pembayaran
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Tunai">Tunai / Cash</option>
                <option value="Transfer">Transfer Bank</option>
                <option value="QRIS">QRIS / E-Wallet</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
