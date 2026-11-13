/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { Highlight, Note, Bookmark } from '../types';

const SYNC_API = '/api/sync';
const TOKEN_KEY = 'bible_sync_token';
const USER_KEY = 'bible_sync_user';
const SYNC_AUTH_EVENT = 'bible-sync-auth-change';

interface SyncUser {
  userId: string;
  email: string;
}

interface SyncData {
  highlights: Highlight[];
  notes: Note[];
  bookmarks: Bookmark[];
}

interface UseSyncReturn {
  user: SyncUser | null;
  isLoggedIn: boolean;
  isSyncing: boolean;
  lastSynced: number | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  pushToCloud: (data: SyncData) => Promise<boolean>;
  pullFromCloud: () => Promise<SyncData | null>;
  deleteFromCloud: (type: 'highlight' | 'note' | 'bookmark', id: string) => Promise<boolean>;
}

function readStoredUser(): SyncUser | null {
  const storedUser = localStorage.getItem(USER_KEY);
  const token = localStorage.getItem(TOKEN_KEY);
  if (storedUser && token) {
    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }
  return null;
}

function notifyAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SYNC_AUTH_EVENT));
  }
}

export function useSync(): UseSyncReturn {
  const [user, setUser] = useState<SyncUser | null>(() => readStoredUser());
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<number | null>(null);

  // Keep all mounted useSync() instances in sync when auth state changes
  useEffect(() => {
    const syncUserFromStorage = () => {
      const nextUser = readStoredUser();
      setUser(nextUser);
      if (!nextUser) setLastSynced(null);
    };
    window.addEventListener(SYNC_AUTH_EVENT, syncUserFromStorage);
    window.addEventListener('storage', syncUserFromStorage);
    return () => {
      window.removeEventListener(SYNC_AUTH_EVENT, syncUserFromStorage);
      window.removeEventListener('storage', syncUserFromStorage);
    };
  }, []);

  const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${SYNC_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify({ userId: data.userId, email: data.email }));
      setUser({ userId: data.userId, email: data.email });
      notifyAuthChange();

      return { success: true };
    } catch {
      return { success: false, error: 'Network error' };
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${SYNC_API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify({ userId: data.userId, email: data.email }));
      setUser({ userId: data.userId, email: data.email });
      notifyAuthChange();

      return { success: true };
    } catch {
      return { success: false, error: 'Network error' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setLastSynced(null);
    notifyAuthChange();
  }, []);

  const pushToCloud = useCallback(async (data: SyncData) => {
    const token = getToken();
    if (!token) return false;

    setIsSyncing(true);
    try {
      const res = await fetch(`${SYNC_API}/push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setLastSynced(Date.now());
        return true;
      }

      // If token expired, log out
      if (res.status === 401) {
        logout();
      }

      return false;
    } catch {
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [logout]);

  const pullFromCloud = useCallback(async () => {
    const token = getToken();
    if (!token) return null;

    setIsSyncing(true);
    try {
      const res = await fetch(SYNC_API, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setLastSynced(Date.now());
        return {
          highlights: (data.highlights || []).map((h: any) => ({
            ...h,
            createdAt: h.createdAt ?? h.created_at ?? Date.now(),
          })),
          notes: (data.notes || []).map((n: any) => ({
            ...n,
            createdAt: n.createdAt ?? n.created_at ?? Date.now(),
          })),
          bookmarks: (data.bookmarks || []).map((b: any) => ({
            ...b,
            createdAt: b.createdAt ?? b.created_at ?? Date.now(),
          })),
        };
      }

      if (res.status === 401) {
        logout();
      }

      return null;
    } catch {
      return null;
    } finally {
      setIsSyncing(false);
    }
  }, [logout]);

  const deleteFromCloud = useCallback(async (type: 'highlight' | 'note' | 'bookmark', id: string) => {
    const token = getToken();
    if (!token) return false;

    try {
      const res = await fetch(`${SYNC_API}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ type, id }),
      });

      if (res.status === 401) {
        logout();
      }

      return res.ok;
    } catch {
      return false;
    }
  }, [logout]);

  return {
    user,
    isLoggedIn: !!user,
    isSyncing,
    lastSynced,
    login,
    register,
    logout,
    pushToCloud,
    pullFromCloud,
    deleteFromCloud,
  };
}
