/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Cloud, CloudOff, LogIn, UserPlus, LogOut, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { useSync } from '../hooks/useSync';
import { Highlight, Note, Bookmark } from '../types';

interface SyncPanelProps {
  highlights: Highlight[];
  notes: Note[];
  bookmarks: Bookmark[];
  onSyncComplete: (data: { highlights: Highlight[]; notes: Note[]; bookmarks: Bookmark[] }) => void;
}

export default function SyncPanel({ highlights, notes, bookmarks, onSyncComplete }: SyncPanelProps) {
  const { user, isLoggedIn, isSyncing, lastSynced, login, register, logout, pushToCloud, pullFromCloud } = useSync();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const result = isLoginMode 
      ? await login(email, password)
      : await register(email, password);

    if (result.success) {
      setSuccess(isLoginMode ? 'Logged in!' : 'Account created!');
      setEmail('');
      setPassword('');
      setTimeout(() => setSuccess(null), 2000);
    } else {
      setError(result.error || 'Something went wrong');
    }
  };

  const handlePush = async () => {
    const success = await pushToCloud({ highlights, notes, bookmarks });
    if (success) {
      setSuccess('Synced to cloud!');
      setTimeout(() => setSuccess(null), 2000);
    } else {
      setError('Sync failed');
    }
  };

  const handlePull = async () => {
    const data = await pullFromCloud();
    if (data) {
      onSyncComplete(data);
      setSuccess('Data loaded from cloud!');
      setTimeout(() => setSuccess(null), 2000);
    } else {
      setError('Pull failed');
    }
  };

  const handleLogout = () => {
    logout();
    setEmail('');
    setPassword('');
  };

  // Logged in view
  if (isLoggedIn) {
    return (
      <div className="p-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 truncate max-w-[140px]">
              {user?.email}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-1 text-zinc-400 hover:text-rose-500 transition"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

        {lastSynced && (
          <div className="text-[9px] text-zinc-400 font-mono">
            Last synced: {new Date(lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handlePush}
            disabled={isSyncing}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold transition disabled:opacity-50"
          >
            <Cloud className="w-3 h-3" />
            Push
          </button>
          <button
            onClick={handlePull}
            disabled={isSyncing}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-lg text-[10px] font-bold transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            Pull
          </button>
        </div>

        {success && (
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
            <Check className="w-3 h-3" /> {success}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-1 text-[10px] text-rose-500">
            <AlertCircle className="w-3 h-3" /> {error}
          </div>
        )}
      </div>
    );
  }

  // Login/Register form
  return (
    <div className="p-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <CloudOff className="w-4 h-4 text-zinc-400" />
        <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">Sync across devices</span>
      </div>

      <div className="flex gap-1 mb-2">
        <button
          onClick={() => { setIsLoginMode(true); setError(null); }}
          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition ${
            isLoginMode ? 'bg-amber-500 text-zinc-900' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => { setIsLoginMode(false); setError(null); }}
          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition ${
            !isLoginMode ? 'bg-amber-500 text-zinc-900' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-1.5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-[10px] outline-none focus:border-amber-500 text-zinc-800 dark:text-zinc-200"
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-[10px] outline-none focus:border-amber-500 text-zinc-800 dark:text-zinc-200"
        />
        <button
          type="submit"
          disabled={isSyncing}
          className="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-lg text-[10px] font-bold transition disabled:opacity-50"
        >
          {isLoginMode ? <LogIn className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
          {isLoginMode ? 'Login' : 'Create Account'}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-1 text-[10px] text-rose-500">
          <AlertCircle className="w-3 h-3" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
          <Check className="w-3 h-3" /> {success}
        </div>
      )}
    </div>
  );
}
