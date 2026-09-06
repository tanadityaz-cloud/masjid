import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { Role, User } from '../../types';
import {
  Lock,
  X,
  ShieldCheck,
  UserCheck,
  KeyRound,
  Delete,
  Building2,
  Wallet,
  FileText,
  Ambulance,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PinLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PinLoginModal: React.FC<PinLoginModalProps> = ({ isOpen, onClose }) => {
  const { users, currentUser, loginWithPin, setPinModalOpen } = useStore();

  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || 'usr-1');
  const [pin, setPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPin('');
      setErrorMessage('');
      setSuccessMessage('');
      if (currentUser) {
        setSelectedUserId(currentUser.id);
      } else if (users.length > 0) {
        setSelectedUserId(users[0].id);
      }
    }
  }, [isOpen, currentUser, users]);

  if (!isOpen) return null;

  const selectedUser = users.find((u) => u.id === selectedUserId) || users[0];

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMessage('');
      if (newPin.length === 4) {
        verifyPin(newPin, selectedUserId);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage('');
  };

  const handleClear = () => {
    setPin('');
    setErrorMessage('');
  };

  const verifyPin = (pinToTest: string, userId?: string) => {
    const res = loginWithPin(pinToTest, userId);
    if (res.success) {
      setSuccessMessage(res.message);
      setErrorMessage('');
      setTimeout(() => {
        onClose();
        setPin('');
        setSuccessMessage('');
      }, 600);
    } else {
      setErrorMessage(res.message);
      setPin('');
    }
  };

  const handleQuickLogin = (user: User) => {
    setSelectedUserId(user.id);
    setPin(user.pin);
    verifyPin(user.pin, user.id);
  };

  const roleIcons: Record<Role, React.ReactNode> = {
    KETUA_DKM: <Building2 className="w-4 h-4 text-emerald-500" />,
    BENDAHARA: <Wallet className="w-4 h-4 text-emerald-500" />,
    SEKRETARIS: <FileText className="w-4 h-4 text-teal-500" />,
    ADMIN: <Sliders className="w-4 h-4 text-purple-500" />,
    OPERATOR_AMBULANS: <Ambulance className="w-4 h-4 text-amber-500" />
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-xl p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-300/40">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Akses Login & Kunci PIN DKM
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pilih peran pengurus dan masukkan PIN keamanan untuk masuk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selection Tabs / Cards */}
        <div>
          <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-2 uppercase tracking-wider">
            1. Pilih Akun Pengurus DKM:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {users.map((user) => {
              const isSelected = selectedUserId === user.id;
              const isCurrent = currentUser?.id === user.id;
              return (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setPin('');
                    setErrorMessage('');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex items-center gap-3 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                        {user.name}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                      {roleIcons[user.role]}
                      <span className="truncate">{user.roleName}</span>
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      PIN: {user.pin}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                  {isCurrent && !isSelected && (
                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                      Aktif
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Profile Banner & PIN Display */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Otentikasi PIN: <strong className="text-emerald-600 dark:text-emerald-400">{selectedUser.name}</strong> ({selectedUser.roleName})
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
              PIN Default: {selectedUser.pin}
            </span>
          </div>

          {/* Masked PIN Indicator */}
          <div className="flex items-center justify-center gap-3 py-2">
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pin.length > index;
              return (
                <div
                  key={index}
                  className={`w-11 h-12 rounded-xl flex items-center justify-center font-black text-xl border transition-all ${
                    isFilled
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md scale-105'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-700'
                  }`}
                >
                  {isFilled ? '•' : ''}
                </div>
              );
            })}
          </div>

          {/* Alerts */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2 justify-center animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-2 justify-center">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Numeric Keypad Grid */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num)}
              className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 font-black text-lg text-slate-800 dark:text-slate-100 transition-all active:scale-95 border border-slate-200 dark:border-slate-700/80 shadow-sm"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-xs font-bold text-slate-500 dark:text-slate-400 transition-colors border border-slate-200 dark:border-slate-700/80"
          >
            Hapus
          </button>
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 font-black text-lg text-slate-800 dark:text-slate-100 transition-all active:scale-95 border border-slate-200 dark:border-slate-700/80 shadow-sm"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700/80"
            title="Hapus Satu Karakter"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Test Login Buttons for Demo Convenience */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2 text-center">
            ⚡ Akses Cepat Login 1-Klik (Demo Testing):
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {users.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickLogin(u)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-[11px] font-extrabold text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-1"
              >
                <span>{u.roleName}</span>
                <span className="text-[9px] opacity-75 font-mono">({u.pin})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
