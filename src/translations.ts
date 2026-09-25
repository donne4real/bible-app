/**
 * Translation definitions
 * Centralizes the list of available Bible translations
 */

export interface Translation {
  id: string;
  name: string;
  short: string;
  ntOnly: boolean;
  remote?: boolean;
  dir?: 'rtl';
}

export const TRANSLATIONS: Translation[] = [
  { id: 'web', name: 'World English Bible (WEB)',        short: 'WEB', ntOnly: false },
  { id: 'kjv', name: 'King James Version (KJV)',          short: 'KJV', ntOnly: false },
  { id: 'lsg', name: 'Louis Segond 1910 (French)',        short: 'FRE', ntOnly: false },
  { id: 'yor', name: 'Bibeli Mimo (Yoruba)',               short: 'YOR', ntOnly: false },
  { id: 'ibo', name: 'Biblia Nso (Igbo)',                  short: 'IGB', ntOnly: false },
  { id: 'hau', name: 'Littafi Mai Tsarki (Hausa)',        short: 'HAU', ntOnly: false },
  { id: 'twi', name: 'Twi Asante Bible',                   short: 'TWI', ntOnly: false },
  { id: 'pcm', name: 'Nigerian Pidgin Bible',              short: 'PID', ntOnly: false },
  { id: 'afr', name: 'Afrikaans Ou Vertaling',             short: 'AFR', ntOnly: false },
  { id: 'nde', name: 'Ndebele Bible',                      short: 'NDE', ntOnly: false },
  { id: 'amh', name: 'Amharic Bible',                     short: 'AMH', ntOnly: false },
  { id: 'swa', name: 'Swahili Bible',                     short: 'SWA', ntOnly: false },
  { id: 'sna', name: 'Shona Bible',                       short: 'SHO', ntOnly: true  },
  { id: 'ewe', name: 'Bibla (Ewe)',                        short: 'EWE', ntOnly: false },
  { id: 'htc', name: 'Bib La (Kreyòl Ayisyen)',           short: 'HTC', ntOnly: false },
  { id: 'asv', name: 'American Standard Version (ASV)',   short: 'ASV', ntOnly: false },
  { id: 'bbe', name: 'Bible in Basic English (BBE)',      short: 'BBE', ntOnly: false },
  { id: 'ylt', name: "Young's Literal Translation (YLT)", short: 'YLT', ntOnly: false },
  { id: 'arb', name: 'Arabic Bible — Van Dyck (ARB)',     short: 'ARB', ntOnly: false, dir: 'rtl' },
  { id: 'nlt', name: 'New Living Translation (NLT)',      short: 'NLT', ntOnly: false, remote: true },
  { id: 'amp', name: 'Amplified Bible (AMP)',              short: 'AMP', ntOnly: false, remote: true },
  { id: 'niv', name: 'New International Version (NIV)',   short: 'NIV', ntOnly: false, remote: true },
];
