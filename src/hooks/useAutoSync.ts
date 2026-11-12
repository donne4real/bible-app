/**
 * Auto-sync hook — automatically pushes changes to the cloud after a debounce
 * delay and pulls when the app becomes visible. Wraps useSync.
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { useSync } from './useSync';
import { Highlight, Note, Bookmark } from '../types';

const AUTO_PUSH_DELAY = 3000; // 3 seconds after last change
const AUTO_PULL_INTERVAL = 5 * 60 * 1000; // Pull every 5 minutes when app is focused

export type SyncStatus = 'idle' | 'syncing' | 'pending' | 'error' | 'offline';

interface SyncData {
  highlights: Highlight[];
  notes: Note[];
  bookmarks: Bookmark[];
}

interface UseAutoSyncReturn {
  status: SyncStatus;
  lastSynced: number | null;
  pushNow: () => Promise<boolean>;
  pullNow: () => Promise<SyncData | null>;
}

export function useAutoSync(
  highlights: Highlight[],
  notes: Note[],
  bookmarks: Bookmark[],
  onDataPulled?: (data: SyncData) => void,
): UseAutoSyncReturn {
  const { isLoggedIn, isSyncing, lastSynced: rawLastSynced, pushToCloud, pullFromCloud } = useSync();

  const [status, setStatus] = useState<SyncStatus>('idle');
  const [lastSynced, setLastSynced] = useState<number | null>(null);

  const pushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDataRef = useRef<string>('');
  const pullIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInitialMount = useRef(true);
  const dataRef = useRef({ highlights, notes, bookmarks });
  const isPullingRef = useRef(false); // Track if we're currently pulling to avoid push loop

  // Keep ref in sync with current data
  useEffect(() => {
    dataRef.current = { highlights, notes, bookmarks };
  }, [highlights, notes, bookmarks]);

  // Track rawLastSynced from useSync
  useEffect(() => {
    if (rawLastSynced) setLastSynced(rawLastSynced);
  }, [rawLastSynced]);

  // Serialize data for change detection
  const getDataKey = useCallback(() => {
    return JSON.stringify({
      h: highlights.length,
      n: notes.length,
      b: bookmarks.length,
      // Include timestamps/IDs for change detection
      hIds: highlights.map(h => h.id + h.createdAt).sort().join(','),
      nIds: notes.map(n => n.id + n.createdAt).sort().join(','),
      bIds: bookmarks.map(b => b.id + b.createdAt).sort().join(','),
    });
  }, [highlights, notes, bookmarks]);

  // Auto-push on data changes (debounced)
  useEffect(() => {
    if (!isLoggedIn) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevDataRef.current = getDataKey();
      return;
    }

    // Skip auto-push if data change came from a pull (avoid sync loop)
    if (isPullingRef.current) {
      prevDataRef.current = getDataKey();
      return;
    }

    const currentKey = getDataKey();
    if (currentKey === prevDataRef.current) return;
    prevDataRef.current = currentKey;

    // Clear any pending push
    if (pushTimerRef.current) clearTimeout(pushTimerRef.current);

    setStatus('pending');

    pushTimerRef.current = setTimeout(async () => {
      setStatus('syncing');
      const { highlights: h, notes: n, bookmarks: b } = dataRef.current;
      const success = await pushToCloud({ highlights: h, notes: n, bookmarks: b });
      if (success) {
        setStatus('idle');
        setLastSynced(Date.now());
      } else {
        setStatus('error');
        // Retry once after 10 seconds
        setTimeout(async () => {
          setStatus('pending');
          pushTimerRef.current = setTimeout(async () => {
            setStatus('syncing');
            const { highlights: h2, notes: n2, bookmarks: b2 } = dataRef.current;
            const retrySuccess = await pushToCloud({ highlights: h2, notes: n2, bookmarks: b2 });
            setStatus(retrySuccess ? 'idle' : 'error');
            if (retrySuccess) setLastSynced(Date.now());
          }, AUTO_PUSH_DELAY);
        }, 10000);
      }
    }, AUTO_PUSH_DELAY);

    return () => {
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
    };
  }, [isLoggedIn, highlights, notes, bookmarks, getDataKey, pushToCloud]);

  // Auto-pull on visibility change (when user comes back to the tab/app)
  useEffect(() => {
    if (!isLoggedIn) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        isPullingRef.current = true;
        setStatus('syncing');
        pullFromCloud().then((data) => {
          if (data && onDataPulled) {
            onDataPulled(data);
          }
          setLastSynced(Date.now());
          setStatus('idle');
          // Reset flag after state updates settle (longer for large datasets)
          setTimeout(() => { isPullingRef.current = false; }, 1000);
        }).catch(() => {
          setStatus('error');
          isPullingRef.current = false;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isLoggedIn, pullFromCloud, onDataPulled]);

  // Periodic auto-pull while app is focused
  useEffect(() => {
    if (!isLoggedIn) return;

    pullIntervalRef.current = setInterval(async () => {
      if (document.visibilityState === 'visible') {
        isPullingRef.current = true;
        setStatus('syncing');
        try {
          const data = await pullFromCloud();
          if (data && onDataPulled) {
            onDataPulled(data);
          }
          setLastSynced(Date.now());
          setStatus('idle');
        } catch {
          setStatus('error');
        }
        setTimeout(() => { isPullingRef.current = false; }, 1000);
      }
    }, AUTO_PULL_INTERVAL);

    return () => {
      if (pullIntervalRef.current) clearInterval(pullIntervalRef.current);
    };
  }, [isLoggedIn, pullFromCloud, onDataPulled]);

  // Manual push/pull
  const pushNow = useCallback(async () => {
    if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
    setStatus('syncing');
    const { highlights: h, notes: n, bookmarks: b } = dataRef.current;
    const success = await pushToCloud({ highlights: h, notes: n, bookmarks: b });
    setStatus(success ? 'idle' : 'error');
    if (success) setLastSynced(Date.now());
    return success;
  }, [pushToCloud]);

  const pullNow = useCallback(async () => {
    setStatus('syncing');
    isPullingRef.current = true;
    try {
      console.log('[AutoSync] Pulling from cloud...');
      const data = await pullFromCloud();
      console.log('[AutoSync] Pull result:', data ? `${data.highlights.length} highlights, ${data.notes.length} notes, ${data.bookmarks.length} bookmarks` : 'null');
      if (data && onDataPulled) {
        console.log('[AutoSync] Calling onDataPulled with data');
        onDataPulled(data);
      }
      setStatus('idle');
      setLastSynced(Date.now());
      setTimeout(() => { isPullingRef.current = false; }, 1000);
      return data;
    } catch (err) {
      console.error('[AutoSync] Pull error:', err);
      setStatus('error');
      isPullingRef.current = false;
      return null;
    }
  }, [pullFromCloud, onDataPulled]);

  // Update status when useSync reports syncing
  useEffect(() => {
    if (isSyncing && status !== 'syncing') {
      setStatus('syncing');
    }
  }, [isSyncing, status]);

  return { status, lastSynced, pushNow, pullNow };
}
