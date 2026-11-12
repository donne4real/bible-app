import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Clock, Calendar, X, Check } from 'lucide-react';
import {
  NotificationSettings,
  loadNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermission,
  getNotificationPermission,
} from '../utils/notifications';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSettingsPanel({ isOpen, onClose }: NotificationSettingsPanelProps) {
  const [settings, setSettings] = useState<NotificationSettings>(loadNotificationSettings());
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(getNotificationPermission());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(loadNotificationSettings());
      setPermission(getNotificationPermission());
    }
  }, [isOpen]);

  const handleToggleEnabled = async () => {
    if (!settings.enabled) {
      const granted = await requestNotificationPermission();
      setPermission(getNotificationPermission());
      if (!granted) {
        alert('Notification permission denied. Please enable notifications in your browser settings.');
        return;
      }
    }
    const updated = { ...settings, enabled: !settings.enabled };
    setSettings(updated);
    saveNotificationSettings(updated);
    showSaved();
  };

  const handleToggleDailyVerse = () => {
    const updated = { ...settings, dailyVerseEnabled: !settings.dailyVerseEnabled };
    setSettings(updated);
    saveNotificationSettings(updated);
    showSaved();
  };

  const handleToggleStreakReminder = () => {
    const updated = { ...settings, streakReminderEnabled: !settings.streakReminderEnabled };
    setSettings(updated);
    saveNotificationSettings(updated);
    showSaved();
  };

  const handleDailyVerseTimeChange = (time: string) => {
    const updated = { ...settings, dailyVerseTime: time };
    setSettings(updated);
    saveNotificationSettings(updated);
    showSaved();
  };

  const handleStreakReminderTimeChange = (time: string) => {
    const updated = { ...settings, streakReminderTime: time };
    setSettings(updated);
    saveNotificationSettings(updated);
    showSaved();
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-serif font-bold flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Permission Status */}
            {permission === 'unsupported' && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-700 dark:text-red-300">
                  Notifications are not supported in this browser.
                </p>
              </div>
            )}

            {permission === 'denied' && (
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Notifications are blocked. Please enable them in your browser settings.
                </p>
              </div>
            )}

            {/* Master Toggle */}
            <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                {settings.enabled ? (
                  <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <BellOff className="w-5 h-5 text-zinc-400" />
                )}
                <div>
                  <div className="text-sm font-bold">Enable Notifications</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Receive daily verse and streak reminders
                  </div>
                </div>
              </div>
              <button
                onClick={handleToggleEnabled}
                disabled={permission === 'unsupported' || permission === 'denied'}
                className={`w-12 h-6 rounded-full transition ${
                  settings.enabled ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Daily Verse Notification */}
            {settings.enabled && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-sm font-bold">Daily Verse</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Receive a verse every day
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleDailyVerse}
                    className={`w-12 h-6 rounded-full transition ${
                      settings.dailyVerseEnabled ? 'bg-blue-500' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        settings.dailyVerseEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {settings.dailyVerseEnabled && (
                  <div className="flex items-center gap-3 pl-11">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <input
                      type="time"
                      value={settings.dailyVerseTime}
                      onChange={(e) => handleDailyVerseTimeChange(e.target.value)}
                      className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm"
                    />
                  </div>
                )}

                {/* Streak Reminder */}
                <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔥</span>
                    <div>
                      <div className="text-sm font-bold">Streak Reminder</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Reminder to keep your streak alive
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleStreakReminder}
                    className={`w-12 h-6 rounded-full transition ${
                      settings.streakReminderEnabled ? 'bg-orange-500' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        settings.streakReminderEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {settings.streakReminderEnabled && (
                  <div className="flex items-center gap-3 pl-11">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <input
                      type="time"
                      value={settings.streakReminderTime}
                      onChange={(e) => handleStreakReminderTimeChange(e.target.value)}
                      className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Saved Indicator */}
            {saved && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Check className="w-4 h-4" />
                Settings saved
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
