/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LanguageInfo {
  id: string;                      // translation ID (e.g. 'yor', 'swa')
  short: string;                   // abbreviation code (e.g. 'YOR', 'SWA')
  name: string;                    // English name of language
  nativeName: string;              // Native translation name or bible version name
  translationName: string;         // e.g. "Bibeli Mimọ", "Biblia Takatifu"
  abbreviationExplanation: string; // Meaning of abbreviation/shortcode
  description: string;             // Broad description of language state & scriptural role
  speakers: string;                // Approximate number of speakers globally
  family: string;                  // Linguistic family
  region: string;                  // Continental subregion
  classification: string;          // Lingua Franca, National Official, Dialect, etc.
  majorCountries: string;          // Key countries where spoken
}

export const LANGUAGES_REGISTRY: LanguageInfo[] = [
  // English translations first
  {
    id: 'web',
    short: 'WEB',
    name: 'World English Bible',
    nativeName: 'World English Bible',
    translationName: 'World English Bible (WEB)',
    abbreviationExplanation: 'World English Bible (Standard Modern Public Domain Revision)',
    description: 'A modern, highly accurate revision of the American Standard Version of 1901. It is entirely free of copyright restrictions and written in modern, clear English.',
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
    abbreviationExplanation: 'King James Version (Traditional Authorized Version of 1611)',
    description: 'First published in 1611 under King James I of England. Renowned for its poetic symmetry, majestic early modern prose, and historic literary prominence.',
    speakers: '1.5 Billion (English)',
    family: 'Indo-European (Germanic)',
    region: 'Global standard',
    classification: 'Historic Classic Standard',
    majorCountries: 'United Kingdom, United States, Worldwide'
  },
  {
    id: 'asv',
    short: 'ASV',
    name: 'American Standard Version',
    nativeName: 'American Standard Version',
    translationName: 'American Standard Version (ASV)',
    abbreviationExplanation: 'American Standard Version (Published in 1901)',
    description: 'A highly literal English translation published in 1901. It is esteemed by scholars for its direct literal translation of Hebrew and Greek idioms.',
    speakers: '1.5 Billion (English)',
    family: 'Indo-European (Germanic)',
    region: 'Global standard',
    classification: 'Academic Literal Standard',
    majorCountries: 'United States, United Kingdom'
  },
  {
    id: 'bbe',
    short: 'BBE',
    name: 'Bible in Basic English',
    nativeName: 'Bible in Basic English',
    translationName: 'Bible in Basic English (BBE)',
    abbreviationExplanation: 'Bible in Basic English (Simplified 1000-Word Vocabulary)',
    description: 'An English translation simplified by Professor Samuel Henry Hooke. It uses only the standard 850 basic English words plus 150 special biblical terms, serving second-language learners.',
    speakers: 'Simplified English Learners',
    family: 'Simplified Pidgin/English',
    region: 'Global Learners',
    classification: 'Educational Outreach Version',
    majorCountries: 'International usage, Literacy missions'
  },
  {
    id: 'ylt',
    short: 'YLT',
    name: "Young's Literal Translation",
    nativeName: "Young's Literal Translation",
    translationName: "Young's Literal Translation (YLT)",
    abbreviationExplanation: "Young's Literal Translation (Extreme Grammatical Precision)",
    description: "Published in 1862 by Robert Young, this translation strictly respects original Hebrew and Greek tenses and sentence structures, making it highly valuable for deep analytical scripture studies.",
    speakers: 'Academic Scholars',
    family: 'Indo-European (Germanic)',
    region: 'Global standard',
    classification: 'Analytical Reference',
    majorCountries: 'Worldwide study'
  },
  {
    id: 'darby',
    short: 'DBY',
    name: 'Darby Translation',
    nativeName: 'Darby Translation',
    translationName: 'Darby Translation (DBY)',
    abbreviationExplanation: 'Darby Bible (Translated by John Nelson Darby)',
    description: 'A highly literal, scholarly translation of original texts by Plymouth Brethren leader John Nelson Darby, aiming to present the word precisely as written in its archaic beauty.',
    speakers: 'Literal Study Groups',
    family: 'Indo-European (Germanic)',
    region: 'Global standard',
    classification: 'Literal Reference',
    majorCountries: 'United Kingdom, Worldwide'
  },
  {
    id: 'oeb-us',
    short: 'OEB',
    name: 'Open English Bible',
    nativeName: 'Open English Bible',
    translationName: 'Open English Bible (OEB-US)',
    abbreviationExplanation: 'Open English Bible (US Spelling Version)',
    description: 'A modern, copyleft-free translation created by a global collective. It uses current accessible English syntax and respects the fluid, open translation paradigms.',
    speakers: '1.5 Billion (English)',
    family: 'Indo-European (Germanic)',
    region: 'Global standard',
    classification: 'Modern Open-source',
    majorCountries: 'United States, Online Communities'
  },
  {
    id: 'cherokee',
    short: 'CHER',
    name: 'Cherokee New Testament',
    nativeName: 'ᏣᎳᎩ ᏗᏓᏁᏤᎢ ᎢᏤ',
    translationName: 'Cherokee New Testament (CHER)',
    abbreviationExplanation: 'Cherokee Syllabary Native American Translation',
    description: 'The scriptures translated into the iconic Cherokee script, developed by Sequoyah. It stands as a vital preservation of cultural heritage and Native American scriptural tradition.',
    speakers: 'Ok. 300,000 national descendants',
    family: 'Iroquoian',
    region: 'North America',
    classification: 'Indigenous Preservation Version',
    majorCountries: 'United States (Cherokee Nation)'
  },
  // African languages follow
  {
    id: 'yor',
    short: 'YOR',
    name: 'Yoruba',
    nativeName: 'Bibeli Mimọ',
    translationName: 'Bibeli Mimọ (Yoruba)',
    abbreviationExplanation: 'YOR (Yoruba - Southwestern Nigerian Standard)',
    description: 'Yoruba is a major language of Nigeria and Benin. The translation, Bibeli Mimọ, is a central literary focal point for southwestern Nigeria, famous for its rich tonal diacritics and evocative idioms.',
    speakers: '45+ Million',
    family: 'Niger-Congo (Yoruboid)',
    region: 'West Africa',
    classification: 'Regional Official Language',
    majorCountries: 'Nigeria, Benin, Togo'
  },
  {
    id: 'ibo',
    short: 'IGB',
    name: 'Igbo',
    nativeName: 'Biblia Nso',
    translationName: 'Biblia Nso (Igbo)',
    abbreviationExplanation: 'IGB (Igbo - Southeastern Nigerian Standard)',
    description: 'The standard Biblia Nso translation caters to the Igbo people of southeastern Nigeria. Highly tonal and expressive, it incorporates proverb structures and standard modern Igbo orthography.',
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
    abbreviationExplanation: 'HAU (Hausa - West African Islamic & Chadic Lingua Franca)',
    description: 'Littafi Mai Tsarki translates the holy word for Hausa speakers. Hausa is the most widely spoken native tongue in West Africa, used across commerce, radio, and regional communities spanning the Sahel.',
    speakers: '80+ Million',
    family: 'Afroasiatic (Chadic)',
    region: 'West Africa / Sahel',
    classification: 'Transnational Lingua Franca',
    majorCountries: 'Nigeria, Niger, northern Ghana, Cameroon, Chad, Sudan'
  },
  {
    id: 'pcm',
    short: 'PCM',
    name: 'Nigerian Pidgin',
    nativeName: 'Naija Pidgin Baibul',
    translationName: 'Nigerian Pidgin Bible (PCM)',
    abbreviationExplanation: 'PCM (Pidgin Creole Medium - West African Lingua Franca)',
    description: 'An incredibly expressive Creole that serves as the ultimate bonding language across Nigeria’s 250+ ethnic groups. The Nigerian Pidgin Bible delivers an authentic, direct, and vibrant reading experience.',
    speakers: '120+ Million (including second-language users)',
    family: 'English-based Creole (Naija)',
    region: 'West Africa',
    classification: 'Transnational De Facto Lingua Franca',
    majorCountries: 'Nigeria, parts of West African coast (Benin, Ghana)'
  },
  {
    id: 'ewe',
    short: 'EWE',
    name: 'Ewe',
    nativeName: 'Biblia',
    translationName: 'Biblia (Ewe)',
    abbreviationExplanation: 'EWE (Ewe - Southeastern Ghana / southern Togo Standard)',
    description: 'Translated for Ewe communities, a cluster within the Gbe family. The Ewe Biblia preserves the precise clicking tonal scales and expressive grammar structure of southwestern Ghana and Togo.',
    speakers: '7 Million',
    family: 'Niger-Congo (Gbe)',
    region: 'West Africa',
    classification: 'National Literacy Language',
    majorCountries: 'Ghana, Togo, Benin'
  },
  {
    id: 'twi',
    short: 'TWI',
    name: 'Twi',
    nativeName: 'Twere Kronkron',
    translationName: 'Nsempa (Twi)',
    abbreviationExplanation: 'TWI (Akan Twi - Asante & Akuapem Dialects of Ghana)',
    description: 'The Twere Kronkron and Nsempa formats translate scripture into Twi, the principal dialect cluster of the Akan language group. Highly proverbs-focused and spoken extensively in Ghana.',
    speakers: '18 Million',
    family: 'Niger-Congo (Kwa / Akan)',
    region: 'West Africa',
    classification: 'De Facto National Lingua Franca',
    majorCountries: 'Ghana, southern Côte d\'Ivoire'
  },
  {
    id: 'swa',
    short: 'SWA',
    name: 'Swahili / Kiswahili',
    nativeName: 'Biblia Takatifu',
    translationName: 'Biblia (Swahili)',
    abbreviationExplanation: 'SWA (Swahili / Kiswahili - East African Inter-Bantu Medium)',
    description: 'Swahili is the ultimate Bantu-rooted lingua franca of East Africa. The Biblia Takatifu is foundational to the religious community, ensuring uniform fellowship from the Indian Ocean coast to Central Africa.',
    speakers: '200+ Million (15M native, 185M secondary)',
    family: 'Niger-Congo (Bantu / Sabaki)',
    region: 'East & Central Africa',
    classification: 'Official Regional Lingua Franca (AU & EAC)',
    majorCountries: 'Tanzania, Kenya, Democratic Republic of Congo, Uganda, Rwanda, Burundi, Mozambique, South Sudan'
  },
  {
    id: 'zul',
    short: 'ZUL',
    name: 'Zulu / isiZulu',
    nativeName: 'IBhayibheli Elingcwele',
    translationName: 'IBhayibheli (Zulu)',
    abbreviationExplanation: 'ZUL (isiZulu - Southern African Nguni Language)',
    description: 'isiZulu is the most spoken home language in South Africa. Highly melodic and distinguished by historic lateral clicks, IBhayibheli Elingcwele is praised for its poetic Bantu structural loyalty.',
    speakers: '28 Million (with second-language speakers)',
    family: 'Niger-Congo (Bantu / Nguni)',
    region: 'Southern Africa',
    classification: 'National Official Language',
    majorCountries: 'South Africa, Lesotho, Eswatini, Zimbabwe'
  },
  {
    id: 'xho',
    short: 'XHOSA / isiXhosa',
    name: 'Xhosa',
    nativeName: 'IBhayibhile Ezincwele',
    translationName: 'IBhayibhile (Xhosa)',
    abbreviationExplanation: 'XHO (isiXhosa - South African Click Bantu Tongue)',
    description: 'Translated for the Xhosa people, featuring rich dental, lateral, and postalveolar click consonants. Spoken natively by Nelson Mandela, its scriptural translation carries superb verbal rhythms.',
    speakers: '20 Million',
    family: 'Niger-Congo (Bantu / Nguni)',
    region: 'Southern Africa',
    classification: 'National Official Language',
    majorCountries: 'South Africa, Lesotho'
  },
  {
    id: 'sna',
    short: 'SNA',
    name: 'Shona',
    nativeName: 'Bhaibheri',
    translationName: 'Bhaibheri (Shona)',
    abbreviationExplanation: 'SNA (chiShona - Zimbabwe Bantu Standard)',
    description: 'Shona is a major language of southern Africa. Bhaibheri delivers standard ChiShona translations reflecting deep national proverbs and Bantu sentence symmetry utilized throughout Zimbabwe.',
    speakers: '15 Million',
    family: 'Niger-Congo (Bantu)',
    region: 'Southern Africa',
    classification: 'National Official Language',
    majorCountries: 'Zimbabwe, Mozambique, Zambia'
  },
  {
    id: 'amh',
    short: 'AMH',
    name: 'Amharic',
    nativeName: 'መጽሐፍ ቅዱስ',
    translationName: 'መጽሐፍ ቅዱስ (Amharic)',
    abbreviationExplanation: 'AMH (Amharic - Ge\'ez Script Semitic Tongue of Ethiopia)',
    description: 'Amharic is written in the ancient unique Ge\'ez script (Fidel). As a Semitic language closely linked to ancient Ethiopic Bible versions, its translation መጽሐፍ ቅዱስ possesses profound historical significance.',
    speakers: '32 Million (and 25M second-language)',
    family: 'Afroasiatic (Semitic / Ethio-Semitic)',
    region: 'Horn of Africa',
    classification: 'National Federal Working Language',
    majorCountries: 'Ethiopia, Eritrea'
  }
];
