/**
 * Push Notification Service
 * Handles notification permissions, scheduling, and display
 */

const NOTIFICATION_SETTINGS_KEY = 'bible_notification_settings';

export interface NotificationSettings {
  enabled: boolean;
  dailyVerseTime: string; // HH:MM format
  dailyVerseEnabled: boolean;
  streakReminderEnabled: boolean;
  streakReminderTime: string; // HH:MM format
  lastNotificationDate?: string;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  dailyVerseTime: '08:00',
  dailyVerseEnabled: true,
  streakReminderEnabled: true,
  streakReminderTime: '20:00',
};

export function loadNotificationSettings(): NotificationSettings {
  try {
    const raw = localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function saveNotificationSettings(settings: NotificationSettings) {
  try {
    localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
  } catch {}
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

export function showDailyVerseNotification(verseText: string, reference: string) {
  if (Notification.permission !== 'granted') return;

  const notification = new Notification(`📖 ${reference}`, {
    body: verseText.substring(0, 100) + (verseText.length > 100 ? '...' : ''),
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'daily-verse',
    requireInteraction: false,
    data: { type: 'daily-verse' },
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}

export function showStreakReminderNotification(currentStreak: number) {
  if (Notification.permission !== 'granted') return;

  const notification = new Notification('🔥 Keep your streak alive!', {
    body: `You have a ${currentStreak}-day reading streak. Read today to keep it going!`,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'streak-reminder',
    requireInteraction: false,
    data: { type: 'streak-reminder' },
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}

// Simple scheduler using setInterval (checks every minute)
let schedulerInterval: ReturnType<typeof setInterval> | null = null;

export function startNotificationScheduler(
  getSettings: () => NotificationSettings,
  onDailyVerse: () => void,
  onStreakReminder: () => void
) {
  if (schedulerInterval) return;

  schedulerInterval = setInterval(() => {
    const settings = getSettings();
    if (!settings.enabled) return;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const today = now.toISOString().split('T')[0];

    // Daily verse notification
    if (settings.dailyVerseEnabled && currentTime === settings.dailyVerseTime && settings.lastNotificationDate !== today) {
      onDailyVerse();
      saveNotificationSettings({ ...settings, lastNotificationDate: today });
    }

    // Streak reminder notification
    if (settings.streakReminderEnabled && currentTime === settings.streakReminderTime) {
      onStreakReminder();
    }
  }, 60000); // Check every minute
}

export function stopNotificationScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
}
