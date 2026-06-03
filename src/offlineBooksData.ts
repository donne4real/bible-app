import { Verse } from './types';

export const OFFLINE_VERSES_DB: { 
  [translation: string]: { 
    [bookId: string]: { 
      [chapter: number]: Verse[] 
    } 
  } 
} = {
  web: {
    PSA: {
      1: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 1, text: 'Blessed is the man who doesn’t walk in the counsel of the wicked, nor stand in the way of sinners, nor sit in the seat of scoffers.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 2, text: 'But his delight is in Yahweh’s law. On his law he meditates day and night.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 3, text: 'He will be like a tree planted by the streams of water, that produces its fruit in its season, whose leaf also doesn’t wither. Whatever he does shall prosper.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 4, text: 'The wicked are not so, but are like the chaff which the wind drives away.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 5, text: 'Therefore the wicked shall not stand in the judgment, nor sinners in the congregation of the righteous.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 6, text: 'For Yahweh knows the way of the righteous, but the way of the wicked shall perish.' }
      ],
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Yahweh is my shepherd. I shall not lack.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'He makes me lie down in green pastures. He leads me beside still waters.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'He restores my soul. He guides me in the paths of righteousness for his name’s sake.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'You prepare a table before me in the presence of my enemies. You have anointed my head with oil. My cup runs over.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh’s house forever.' }
      ],
      91: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 1, text: 'He who dwells in the secret place of the Most High will rest in the shadow of the Almighty.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 2, text: 'I will say of Yahweh, “He is my refuge and my fortress; my God, in whom I trust.”' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 3, text: 'For he will deliver you from the snare of the fowler, and from the deadly pestilence.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 4, text: 'He will cover you with his feathers. Under his wings you will take refuge. His faithfulness is your shield and rampart.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 5, text: 'You shall not be afraid of the terror by night, nor of the arrow that flies by day;' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 6, text: 'nor of the pestilence that walks in darkness, nor of the destruction that wastes at noonday.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 14, text: '“Because he has set his love on me, therefore I will deliver him. I will set him on high, because he has known my name.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 15, text: 'He will call on me, and I will answer him. I will be with him in trouble. I will deliver him, and honor him.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 16, text: 'I will satisfy him with long life, and show him my salvation.”' }
      ],
      121: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 121, verse: 1, text: 'I will lift up my eyes to the hills. Where does my help come from?' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 121, verse: 2, text: 'My help comes from Yahweh, who made heaven and earth.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 121, verse: 3, text: 'He will not allow your foot to be moved. He who keeps you will not slumber.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 121, verse: 4, text: 'Behold, he who keeps Israel will neither slumber nor sleep.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 121, verse: 5, text: 'Yahweh is your keeper. Yahweh is your shade on your right hand.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 121, verse: 6, text: 'The sun will not strike you by day, nor the moon by night.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 121, verse: 7, text: 'Yahweh will keep you from all evil. He will keep your soul.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 121, verse: 8, text: 'Yahweh will keep your going out and your coming in, from this time forth, and forever more.' }
      ]
    },
    PRO: {
      3: [
        { book_id: 'PRO', book_name: 'Proverbs', chapter: 3, verse: 1, text: 'My son, don’t forget my teaching; but let your heart keep my commandments;' },
        { book_id: 'PRO', book_name: 'Proverbs', chapter: 3, verse: 2, text: 'for they will add to you length of days, years of life, and peace.' },
        { book_id: 'PRO', book_name: 'Proverbs', chapter: 3, verse: 3, text: 'Don’t let kindness and truth forsake you. Bind them around your neck. Write them on the tablet of your heart.' },
        { book_id: 'PRO', book_name: 'Proverbs', chapter: 3, verse: 4, text: 'So you will find favor and good understanding in the sight of God and man.' },
        { book_id: 'PRO', book_name: 'Proverbs', chapter: 3, verse: 5, text: 'Trust in Yahweh with all your heart, and don’t lean on your own understanding.' },
        { book_id: 'PRO', book_name: 'Proverbs', chapter: 3, verse: 6, text: 'In all your ways acknowledge him, and he will make your paths straight.' },
        { book_id: 'PRO', book_name: 'Proverbs', chapter: 3, verse: 7, text: 'Don’t be wise in your own eyes. Fear Yahweh, and depart from evil.' },
        { book_id: 'PRO', book_name: 'Proverbs', chapter: 3, verse: 8, text: 'It will be health to your body, and nourishment to your bones.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'The same was in the beginning with God.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'All things were made through him. Without him was not anything made that has been made.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'In him was life, and the life was the light of men.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'The light shines in the darkness, and the darkness hasn’t overcome it.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'For God didn’t send his Son into the world to judge the world, but that the world should be saved through him.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'He who believes in him is not judged. He who doesn’t believe has been judged already, because he has not believed in the name of the one and only Son of God.' }
      ],
      14: [
        { book_id: 'JHN', book_name: 'John', chapter: 14, verse: 1, text: '“Don’t let your heart be troubled. Believe in God. Believe also in me.”' },
        { book_id: 'JHN', book_name: 'John', chapter: 14, verse: 2, text: '“In my Father’s house are many homes. If it weren’t so, I would have told you. I go to prepare a place for you.”' },
        { book_id: 'JHN', book_name: 'John', chapter: 14, verse: 6, text: 'Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father, except through me.”' },
        { book_id: 'JHN', book_name: 'John', chapter: 14, verse: 27, text: '“Peace I leave with you. My peace I give to you; not as the world gives, give I to you. Don’t let your heart be troubled, neither let it be fearful.”' }
      ]
    },
    ROM: {
      8: [
        { book_id: 'ROM', book_name: 'Romans', chapter: 8, verse: 1, text: 'There is now no condemnation to those who are in Christ Jesus, who don’t walk according to the flesh, but according to the Spirit.' },
        { book_id: 'ROM', book_name: 'Romans', chapter: 8, verse: 28, text: 'We know that all things work together for good for those who love God, to those who are called according to his purpose.' },
        { book_id: 'ROM', book_name: 'Romans', chapter: 8, verse: 31, text: 'What then shall we say to these things? If God is for us, who can be against us?' },
        { book_id: 'ROM', book_name: 'Romans', chapter: 8, verse: 38, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers,' },
        { book_id: 'ROM', book_name: 'Romans', chapter: 8, verse: 39, text: 'nor height, nor depth, nor any other created thing, will be able to separate us from the love of God, which is in Christ Jesus our Lord.' }
      ],
      12: [
        { book_id: 'ROM', book_name: 'Romans', chapter: 12, verse: 1, text: 'Therefore I urge you, brothers, by the mercies of God, to present your bodies a living sacrifice, holy, acceptable to God, which is your spiritual service.' },
        { book_id: 'ROM', book_name: 'Romans', chapter: 12, verse: 2, text: 'Don’t be conformed to this world, but be transformed by the renewing of your mind, so that you may prove what is the good, well-pleasing, and perfect will of God.' },
        { book_id: 'ROM', book_name: 'Romans', chapter: 12, verse: 9, text: 'Let love be without hypocrisy. Abhor that which is evil. Cling to that which is good.' },
        { book_id: 'ROM', book_name: 'Romans', chapter: 12, verse: 21, text: 'Don’t be overcome by evil, but overcome evil with good.' }
      ]
    }
  },
  kjv: {
    PSA: {
      1: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 1, text: 'Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 2, text: 'But his delight is in the law of the LORD; and in his law doth he meditate day and night.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 1, verse: 3, text: 'And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.' }
      ],
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.' }
      ],
      91: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 1, text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 91, verse: 2, text: 'I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' }
      ]
    }
  },
  // Yoruba - Bibeli Mimo
  yor: {
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Olúwa ni olùṣọ́ àgùntàn mi; èmi kì yóò ṣe aláìní.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Ó mú mi dùbúlẹ̀ nínú koríko tútù: ó mú mi lọ sípa omi dídákẹ́ jẹ́ẹ́.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Ó mú ọkàn mi sọjí: ó mú mi tọ ipa-ọ̀nà òdodo nítorí orúkọ rẹ̀.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Dájúdájú, bí mo tilẹ̀ ń rìn nínú àfonífojì òjìji ikú, èmi kì yóò bẹ̀rù ibi kankan: nítorí o wà pẹ̀lú mi; ọ̀gọ̀ rẹ àti ọ̀pá rẹ, wọ́n ń tù mí nínú.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'O tẹ́ tábìlì dídùn síwájú mi níṣojú àwọn ọ̀tá mi: o fi òróró yàn mí lórí; ago mi sì ń kún àkúnwọ́sílẹ̀.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Dájúdájú rere àti àánú yóò tẹ̀lé mi ní gbogbo ọjọ́ ayé mi: èmi yóò sì máa gbé nínú ilé Olúwa títí láé.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Ní ìbẹ̀rẹ̀ pẹ̀pẹ̀ ni Ọ̀rọ̀ wà, Ọ̀rọ̀ sì wà pẹ̀lú Ọlọ́run, Ọlọ́run sì ni Ọ̀rọ̀ náà.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Ọ̀rọ̀ náà sì di ara, ó sì ń gbé nínú wa, a sì rí ògo rẹ̀, ògo gẹ́gẹ́ bí ti Ọmọ kan ṣoṣo láti ọ̀dọ̀ Baba, ó kún fún oore-ọ̀fẹ́ àti òtítọ́.' }
      ]
    }
  },
  // Swahili - Biblia Takatifu
  swa: {
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'BWANA ndiye mchungaji wangu, sitapungukiwa na kitu.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Katika malisho ya majani mabichi hunilaza, kando ya maji ya utulivu huniongoza.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Hunihuisha nafsi yards.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Naam, nijapopita kati ya bonde la uvuli wa mauti, sitaogopa mabaya, maana Wewe upo nami.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Hapo mwanzo kulikuwako Neno, naye Neno alikuwako kwa Mungu, naye Neno alikuwa Mungu.' }
      ]
    }
  }
};

/**
 * Resolves a book-chapter reference from the offline database, or undefined if not preloaded.
 */
export function getOfflineVerses(translation: string, bookId: string, chapter: number): Verse[] | undefined {
  const normTrans = translation.toLowerCase();
  
  // Try selected translation first
  const match = OFFLINE_VERSES_DB[normTrans]?.[bookId]?.[chapter];
  if (match) return match;
  
  // Fallback to WEB English if translation is missing but English has it offline 
  const englishFallback = OFFLINE_VERSES_DB['web']?.[bookId]?.[chapter];
  if (englishFallback) return englishFallback;

  return undefined;
}
