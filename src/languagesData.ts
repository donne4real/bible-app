/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LanguageInfo {
  id: string;
  short: string;
  name: string;
  nativeName: string;
  translationName: string;
  abbreviationExplanation: string;
  description: string;
  speakers: string;
  family: string;
  region: string;
  classification: string;
  majorCountries: string;
}

export const LANGUAGES_REGISTRY: LanguageInfo[] = [
  {
    id: 'web',
    short: 'WEB',
    name: 'World English Bible',
    nativeName: 'World English Bible',
    translationName: 'World English Bible (WEB)',
    abbreviationExplanation: 'World English Bible — Modern Public Domain Revision',
    description: 'A modern, accurate revision of the American Standard Version of 1901. Entirely free of copyright restrictions and written in clear contemporary English.',
    speakers: '1.5 Billion (English)',
    family: 'Indo-European (Germanic)',
    region: 'Global standard',
    classification: 'Global Lingua Franca',
    majorCountries: 'United States, United Kingdom, Canada, Australia, Nigeria, South Africa'
  },
  {
    id: 'kjv',
    short: 'KJV',
    name: 'King James Version',
    nativeName: 'King James Version',
    translationName: 'King James Version (KJV)',
    abbreviationExplanation: 'King James Version — Authorized Version of 1611',
    description: 'First published in 1611 under King James I of England. Renowned for its poetic symmetry, majestic early modern prose, and historic literary prominence.',
    speakers: '1.5 Billion (English)',
    family: 'Indo-European (Germanic)',
    region: 'Global standard',
    classification: 'Historic Classic Standard',
    majorCountries: 'United Kingdom, United States, Worldwide'
  },
  {
    id: 'lsg',
    short: 'LSG',
    name: 'Louis Segond (French)',
    nativeName: 'Bible Louis Segond',
    translationName: 'Louis Segond 1910 (LSG)',
    abbreviationExplanation: 'LSG — Louis Segond 1910 French Protestant Translation',
    description: 'Translated by Swiss theologian Louis Segond and published in 1910. The standard Protestant French Bible for over a century, widely used across Francophone Africa and France.',
    speakers: '320+ Million (French)',
    family: 'Indo-European (Romance)',
    region: 'Global / Francophone Africa',
    classification: 'Standard Francophone Bible',
    majorCountries: 'France, DR Congo, Cameroon, Côte d\'Ivoire, Senegal, Madagascar'
  },
  {
    id: 'yor',
    short: 'YOR',
    name: 'Yoruba',
    nativeName: 'Bibeli Mimo',
    translationName: 'Bibeli Mimo (Yoruba)',
    abbreviationExplanation: 'YOR — Yoruba Southwestern Nigerian Standard',
    description: 'Yoruba is a major language of Nigeria and Benin. Bibeli Mimo is the central literary focal point for southwestern Nigeria, famous for its rich tonal diacritics and expressive idioms.',
    speakers: '45+ Million',
    family: 'Niger-Congo (Yoruboid)',
    region: 'West Africa',
    classification: 'Regional Official Language',
    majorCountries: 'Nigeria, Benin, Togo'
  },
  {
    id: 'ibo',
    short: 'IBO',
    name: 'Igbo',
    nativeName: 'Biblia Nso',
    translationName: 'Biblia Nso (Igbo)',
    abbreviationExplanation: 'IBO — Igbo Southeastern Nigerian Standard',
    description: 'The Igbo Bible for southeastern Nigeria. Highly tonal and expressive, incorporating proverb structures and standard modern Igbo orthography.',
    speakers: '30+ Million',
    family: 'Niger-Congo (Volta-Niger)',
    region: 'West Africa',
    classification: 'Regional Official Language',
    majorCountries: 'Nigeria, Equatorial Guinea'
  },
  {
    id: 'hau',
    short: 'HAU',
    name: 'Hausa',
    nativeName: 'Littafi Mai Tsarki',
    translationName: 'Littafi Mai Tsarki (Hausa)',
    abbreviationExplanation: 'HAU — Hausa West African Sahel Lingua Franca',
    description: 'Hausa is the most widely spoken native tongue in West Africa, used across commerce, radio, and regional communities spanning the Sahel. Littafi Mai Tsarki delivers the scriptures to millions.',
    speakers: '80+ Million',
    family: 'Afroasiatic (Chadic)',
    region: 'West Africa / Sahel',
    classification: 'Transnational Lingua Franca',
    majorCountries: 'Nigeria, Niger, northern Ghana, Cameroon, Chad, Sudan'
  },
  {
    id: 'twi',
    short: 'TWI',
    name: 'Twi (Akan Asante)',
    nativeName: 'Twere Kronkron',
    translationName: 'Twi Asante Bible (TWI)',
    abbreviationExplanation: 'TWI — Akan Twi Asante Dialect of Ghana',
    description: 'The principal dialect cluster of the Akan language group. Highly proverbs-focused and spoken extensively in Ghana. The Twere Kronkron is a central cultural and spiritual text.',
    speakers: '18 Million',
    family: 'Niger-Congo (Kwa / Akan)',
    region: 'West Africa',
    classification: 'De Facto National Lingua Franca',
    majorCountries: "Ghana, southern Côte d'Ivoire"
  },
  {
    id: 'pcm',
    short: 'PCM',
    name: 'Nigerian Pidgin',
    nativeName: 'Naija Pidgin Baibul',
    translationName: 'Nigerian Pidgin Bible (PCM)',
    abbreviationExplanation: 'PCM — Pidgin Creole Medium West African Lingua Franca',
    description: 'An expressive Creole that serves as the bonding language across Nigeria\'s 250+ ethnic groups. The Nigerian Pidgin Bible delivers an authentic, vibrant, and accessible reading experience.',
    speakers: '120+ Million (including second-language users)',
    family: 'English-based Creole (Naija)',
    region: 'West Africa',
    classification: 'Transnational De Facto Lingua Franca',
    majorCountries: 'Nigeria, parts of West African coast'
  },
];
