/**
 * Daily Verse — curated list of encouraging Bible verses that rotate weekly.
 * Displayed as a dismissible banner on the main reading view.
 */

import { Verse } from './types';

interface DailyVerseEntry {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

const DAILY_VERSES: DailyVerseEntry[] = [
  { bookId: 'JHN', bookName: 'John', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 23, verse: 1, text: 'The Lord is my shepherd; I shall not want.' },
  { bookId: 'ROM', bookName: 'Romans', chapter: 8, verse: 28, text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
  { bookId: 'PHP', bookName: 'Philippians', chapter: 4, verse: 13, text: 'I can do all things through Christ which strengtheneth me.' },
  { bookId: 'ISA', bookName: 'Isaiah', chapter: 40, verse: 31, text: 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
  { bookId: 'PRO', bookName: 'Proverbs', chapter: 3, verse: 5, text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding.' },
  { bookId: 'JER', bookName: 'Jeremiah', chapter: 29, verse: 11, text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 46, verse: 1, text: 'God is our refuge and strength, a very present help in trouble.' },
  { bookId: 'MAT', bookName: 'Matthew', chapter: 11, verse: 28, text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.' },
  { bookId: 'ROM', bookName: 'Romans', chapter: 12, verse: 2, text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 119, verse: 105, text: 'Thy word is a lamp unto my feet, and a light unto my path.' },
  { bookId: '2TI', bookName: '2 Timothy', chapter: 1, verse: 7, text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.' },
  { bookId: 'HEB', bookName: 'Hebrews', chapter: 11, verse: 1, text: 'Now faith is the substance of things hoped for, the evidence of things not seen.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 37, verse: 4, text: 'Delight thyself also in the Lord; and he shall give thee the desires of thine heart.' },
  { bookId: 'MAT', bookName: 'Matthew', chapter: 6, verse: 33, text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.' },
  { bookId: 'ISA', bookName: 'Isaiah', chapter: 41, verse: 10, text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.' },
  { bookId: 'GAL', bookName: 'Galatians', chapter: 5, verse: 22, text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 91, verse: 1, text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.' },
  { bookId: 'ROM', bookName: 'Romans', chapter: 8, verse: 38, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, shall be able to separate us from the love of God.' },
  { bookId: 'JOS', bookName: 'Joshua', chapter: 1, verse: 9, text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 121, verse: 1, text: 'I will lift up mine eyes unto the hills, from whence cometh my help.' },
  { bookId: '2CO', bookName: '2 Corinthians', chapter: 5, verse: 7, text: 'For we walk by faith, not by sight.' },
  { bookId: 'EPH', bookName: 'Ephesians', chapter: 2, verse: 8, text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.' },
  { bookId: 'MIC', bookName: 'Micah', chapter: 6, verse: 8, text: 'He hath shewed thee, O man, what is good; and what doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 34, verse: 18, text: 'The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.' },
  { bookId: 'COL', bookName: 'Colossians', chapter: 3, verse: 23, text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.' },
  { bookId: '1CO', bookName: '1 Corinthians', chapter: 13, verse: 4, text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 27, verse: 1, text: 'The Lord is my light and my salvation; whom shall I fear?' },
  { bookId: 'ROM', bookName: 'Romans', chapter: 15, verse: 13, text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.' },
  { bookId: 'DEU', bookName: 'Deuteronomy', chapter: 31, verse: 6, text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the Lord thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 55, verse: 22, text: 'Cast thy burden upon the Lord, and he shall sustain thee: he shall never suffer the righteous to be moved.' },
  { bookId: 'JHN', bookName: 'John', chapter: 14, verse: 27, text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.' },
  { bookId: 'PRO', bookName: 'Proverbs', chapter: 18, verse: 10, text: 'The name of the Lord is a strong tower: the righteous runneth into it, and is safe.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 139, verse: 14, text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works.' },
  { bookId: 'MAT', bookName: 'Matthew', chapter: 28, verse: 20, text: 'Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you always, even unto the end of the world.' },
  { bookId: 'ISA', bookName: 'Isaiah', chapter: 53, verse: 5, text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 56, verse: 3, text: 'What time I am afraid, I will trust in thee.' },
  { bookId: 'ROM', bookName: 'Romans', chapter: 5, verse: 8, text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.' },
  { bookId: 'PHP', bookName: 'Philippians', chapter: 4, verse: 6, text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 103, verse: 1, text: 'Bless the Lord, O my soul: and all that is within me, bless his holy name.' },
  { bookId: '1PE', bookName: '1 Peter', chapter: 5, verse: 7, text: 'Casting all your care upon him; for he careth for you.' },
  { bookId: 'JHN', bookName: 'John', chapter: 16, verse: 33, text: 'In the world ye shall have tribulation: but be of good cheer; I have overcome the world.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 138, verse: 3, text: 'In the day when I cried thou answeredst me, and strengthenedst me with strength in my soul.' },
  { bookId: 'HEB', bookName: 'Hebrews', chapter: 13, verse: 5, text: 'Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee.' },
  { bookId: 'ISA', bookName: 'Isaiah', chapter: 26, verse: 3, text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 32, verse: 8, text: 'I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.' },
  { bookId: '2CO', bookName: '2 Corinthians', chapter: 12, verse: 9, text: 'My grace is sufficient for thee: for my strength is made perfect in weakness.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 136, verse: 1, text: 'O give thanks unto the Lord; for he is good: for his mercy endureth for ever.' },
  { bookId: 'JAS', bookName: 'James', chapter: 1, verse: 5, text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 150, verse: 6, text: 'Let every thing that hath breath praise the Lord. Praise ye the Lord.' },
  { bookId: 'REV', bookName: 'Revelation', chapter: 21, verse: 4, text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.' },
  { bookId: 'PSA', bookName: 'Psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
];

/**
 * Returns the daily verse based on the current day of the year.
 * Rotates through all verses, so each year the same date gets the same verse.
 */
export function getDailyVerse(): DailyVerseEntry {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

export type { DailyVerseEntry };