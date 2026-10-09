/**
 * Export/import study data (highlights, notes, bookmarks) as JSON files.
 * Allows users to back up and restore their study data without cloud sync.
 */

import { Highlight, Note, Bookmark } from './types';

interface StudyDataExport {
  version: 1;
  exportedAt: string;
  highlights: Highlight[];
  notes: Note[];
  bookmarks: Bookmark[];
}

/**
 * Exports all study data as a downloadable JSON file.
 */
export function exportStudyData(
  highlights: Highlight[],
  notes: Note[],
  bookmarks: Bookmark[]
): void {
  const data: StudyDataExport = {
    version: 1,
    exportedAt: new Date().toISOString(),
    highlights,
    notes,
    bookmarks,
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `bible-study-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Imports study data from a JSON file.
 * Returns the parsed data or throws on invalid file.
 */
export function importStudyData(file: File): Promise<StudyDataExport> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (!data.version || !Array.isArray(data.highlights) || !Array.isArray(data.notes) || !Array.isArray(data.bookmarks)) {
          reject(new Error('Invalid backup file format'));
          return;
        }
        resolve(data as StudyDataExport);
      } catch {
        reject(new Error('Could not parse backup file'));
      }
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsText(file);
  });
}

/**
 * Merges imported data with existing data.
 * Deduplicates by ID — imported items win on conflict.
 */
export function mergeStudyData(
  existing: { highlights: Highlight[]; notes: Note[]; bookmarks: Bookmark[] },
  imported: { highlights: Highlight[]; notes: Note[]; bookmarks: Bookmark[] }
): { highlights: Highlight[]; notes: Note[]; bookmarks: Bookmark[] } {
  const mergeById = <T extends { id: string }>(a: T[], b: T[]): T[] => {
    const map = new Map<string, T>();
    for (const item of a) map.set(item.id, item);
    for (const item of b) map.set(item.id, item); // imported wins
    return Array.from(map.values());
  };

  return {
    highlights: mergeById(existing.highlights, imported.highlights),
    notes: mergeById(existing.notes, imported.notes),
    bookmarks: mergeById(existing.bookmarks, imported.bookmarks),
  };
}