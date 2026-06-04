import { Verse } from './types';

export const OFFLINE_VERSES_DB: { 
  [translation: string]: { 
    [bookId: string]: { 
      [chapter: number]: Verse[] 
    } 
  } 
} = {
  web: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning, God created the heavens and the earth.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'God said, “Let there be light,” and there was light.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'God saw the light, and saw that it was good. God divided the light from the darkness.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'God called the light “day”, and the darkness he called “night”. There was evening and there was morning, one day.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'God said, “Let there be an expanse in the middle of the waters, and let it divide the waters from the waters.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'God made the expanse, and divided the waters which were under the expanse from the waters which were above the expanse; and it was so.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'God called the expanse “sky”. There was evening and there was morning, a second day.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'God said, “Let the waters under the sky be gathered together to one place, and let the dry land appear”; and it was so.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'God called the dry land “earth”, and the gathering together of the waters he called “seas”. God saw that it was good.' }
      ]
    },
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
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning God created the heaven and the earth.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'And God said, Let there be light: and there was light.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'And God saw the light, that it was good: and God divided the light from the darkness.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.' }
      ]
    },
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
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'Ní ìbẹ̀rẹ̀ pẹ̀pẹ̀, Ọlọ́run dá àwọn ọ̀run àti ayé.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'Ayé sì wà ní rújúrújú àti lófò; òkùnkùn sì wà lórí ibú; Ẹ̀mí Ọlọ́run sì ń rábaba lórí omi.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'Ọlọ́run sì wí pé, “Kí ìmọ́lẹ̀ kí ó wà,” ìmọ́lẹ̀ sì wà.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'Ọlọ́run sì rí ìmọ́lẹ̀ náà pé ó dára, Ọlọ́run sì ya ìmọ́lẹ̀ náà kúrò lára òkùnkùn.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'Ọlọ́run sì pe ìmọ́lẹ̀ ní “Ọ̀sán”, òkùnkùn sì ni ó pe ní “Òru”. Alẹ́ sì lệ, àárọ̀ sì mọ́, ọjọ́ kìn-ín-ní.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'Ọlọ́run sì wí pé, “Kí ààyè kí ó wà ní agbede-méjì àwọn omi, kí ó sì ya àwọn omi kúrò lára àwọn omi.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'Ọlọ́run sì ṣe ààyè náà, ó sì ya àwọn omi tí ó wà lábẹ́ ààyè kúrò lára àwọn omi tí ó wà lórí ààyè: ó sì rí bẹ́ẹ̀.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'Ọlọ́run sì pe ààyè náà ní “Òfurufú”. Alẹ́ sì lệ, àárọ̀ sì mọ́, ọjọ́ kejì.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'Ọlọ́run sì wí pé, “Kí omi tí ó wà lábẹ́ ọ̀run gbájo sí ibì kan, kí ilẹ̀ gbígbẹ sì farahàn”: ó sì rí bẹ́ẹ̀.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'Ọlọ́run sì pe ilẹ̀ gbígbẹ ní “Ayé”, àti gbígbájọ omi ni ó pe ní “Òkun”: Ọlọ́run sì rí i pé ó dára.' }
      ]
    },
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
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Èyí ni ó wà pẹ̀lú Ọlọ́run ní ìbẹ̀rẹ̀.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Nípasẹ̀ rẹ̀ ni a dá ohun gbogbo; láìsí rẹ̀ kò sì sí ohun tí a dá nínú ohun tí a ti dá.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Nínú rẹ̀ ni ìyè wà; ìyè náà sì ni ìmọ́lẹ̀ aráyé.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Ìmọ́lẹ̀ náà sì ń tàn nínú òkùnkùn, òkùnkùn kò sì borí rẹ̀.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Ọ̀rọ̀ náà sì di ara, ó sì ń gbé nínú wa, a sì rí ògo rẹ̀, ògo gẹ́gẹ́ bí ti Ọmọ kan ṣoṣo láti ọ̀dọ̀ Baba, ó kún fún oore-ọ̀fẹ́ àti òtítọ́.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'Nítorí Ọlọ́run fẹ́ aráyé tó bẹ́ẹ̀ gẹ́ẹ́ tí ó fi Ọmọ lẹ́yìn rẹ̀ kan ṣoṣo fúnni, kí gẹ́gẹ́ bí ẹnikẹ́ni tí ó bá gbà á gbọ́ má baà sègbé, ṣùgbọ́n kí ó lè ní ìyè tí kò nípẹ̀kun.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'Nítorí Ọlọ́run kò rán Ọmọ rẹ̀ sí ayé láti dá ayé lẹ́bi; ṣùgbọ́n kí a le gba ayé là nípasẹ̀ rẹ̀.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Ẹni tí ó bá gbà á gbọ́, a kì yóò dá a lẹ́bi; ṣùgbọ́n ẹni tí kò bá gbà á gbọ́, a ti dá a lẹ́bi náà, nítorí kò gba orúkọ Ọmọ bíbí kan ṣoṣo ti Ọlọ́run gbọ́.' }
      ]
    }
  },
  // Swahili - Biblia Takatifu
  swa: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'Hapo mwanzo Mungu aliziumba mbingu na nchi.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'Nayo nchi ilikuwa ukiwa na tupu, na giza lilikuwa juu ya uso wa vilindi vya maji; Roho ya Mungu ikatulia juu ya uso wa maji.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'Mungu akasema, “Iwe nuru,” ikawa nuru.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'Mungu akaiona nuru, ya kuwa ni njema; Mungu akatenga nuru na giza.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'Mungu akaiita nuru “Mchana”, na giza akaliita “Usiku”. Ikawa jioni ikawa asubuhi, siku ya kwanza.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'Mungu akasema, “Na liwe anga katikati ya maji, likatenge maji na maji.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'Mungu akalifanya anga, akayatenga yale maji yaliyo chini ya anga na yale maji yaliyo juu ya anga: ikawa hivyo.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'Mungu akaliita lile anga “Mbingu”. Ikawa jioni ikawa asubuhi, siku ya pili.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'Mungu akasema, “Maji yaliyo chini ya mbingu na yakusanyike mahali pamoja, ili nchi kavu ionekane”; ikawa hivyo.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'Mungu akaiita ile nchi kavu “Nchi”, na makusanyiko ya maji akayaita “Bahari”: Mungu akaona ya kuwa ni vyema.' }
      ]
    },
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'BWANA ndiye mchungaji wangu, sitapungukiwa na kitu.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Katika malisho ya majani mabichi hunilaza, kando ya maji ya utulivu huniongoza.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Hunihuisha nafsi yangu; na kuniongoza katika njia za haki kwa ajili ya jina lake.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Naam, nijapopita kati ya bonde la uvuli wa mauti, sitaogopa mabaya; kwa maana Wewe upo pamoja nami, gongo lako na fimbo yako vyanifariji.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Waaandaa meza mbele nguvu yangu machoni pa adui zangu; umenipaka mafuta kichwani pangu, na kikombe changu kinafurika.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Hakika wema na fadhili zitanifuata siku zote za maisha yangu; nami nitakaa nyumbani mwa BWANA milele.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Hapo mwanzo kulikuwako Neno, naye Neno alikuwako kwa Mungu, naye Neno alikuwa Mungu.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Huyo mwanzo alikuwako kwa Mungu.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Vyote vilifanyika kwa huyo, wala pasipo yeye hakikufanyika cho chote kilichofanyika.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Ndani yake ndimo ulimokuwa uzima, nao ule uzima ulikuwa nuru ya watu.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Nayo nuru yaangaza gizani, wala giza halikuishinda.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Naye Neno alifanyika mwili, akakaa kwetu; nasi tukauona utukufu wake, utukufu kama wa Mwana pekee aliyetoka kwa Baba, amejaa neema na kweli.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'Kwa maana jinsi hii Mungu aliupenda ulimwengu, hata akamtoa Mwanawe pekee, ili kila mtu amwaminiye asipotee, bali awe na uzima wa milele.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'Maana Mungu hakumtuma Mwana ulimwenguni ili auhukumu ulimwengu, bali ulimwengu uokolewe kwake.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Amwaminiye yeye hahukumiwi; asiyeamini amekwisha kuhukumiwa; kwa sababu hakuliamini jina la Mwana pekee wa Mungu.' }
      ]
    }
  },
  // Igbo - Biblia Nso
  ibo: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'Ná m̀bídọ́, Chineke kèrè élígíwé na ụ̀wà.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'Ụ̀wà tọ tọgbọrọ chakoo, kpakpando ọ bụla adịghị, ọchịchịrị tọkwara n’elu bide. Mmụọ Chineke na-efegharịkwa n’elu mmiri.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'Chineke wee sị, “Ka ìhè dị,” ìhè wee dị.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'Chineke hụrụ ìhè ahụ, na ọ dị mma; Chineke wee kewaa ìhè ahụ na ọchịchịrị.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'Chineke kpọrọ ìhè ahụ “Ehihie”, kpọọ ọchịchịrị ahụ “Abali”. Anyasị wee gaa, ụtụtụ wee bie, mbụ ụbọchị.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'Chineke wee sị, “Ka mbara dị n’etiti mmiri, ka ọ kewaa mmiri na mmiri.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'Chineke wee mee mbara ahụ, wee kewaa mmiri nke dị n’okpuru mbara ahụ na mmiri nke dị n’elu mbara ahụ: ọ wee dị bẹ́ẹ̀.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'Chineke kpọrọ mbara ahu “Eluigwe”. Anyasị wee gaa, ụtụtụ wee bie, abụọ ụbọchị.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'Chineke wee sị, “Ka mmiri ndị dị n’okpuru eluigwe gbakọọ n’otu ebe, ka ala akọrọ pụta”; ọ wee dị bẹ́ẹ̀.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'Chineke kpọrọ ala akọrọ ahụ “Ụwa”, kpọọ nchịkọta mmiri ahụ “Oké osimiri”: Chineke wee hụ na ọ dị mma.' }
      ]
    },
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Jehova bụ Onye-ọzụzụ-atụrụ m; Ọ dịghị ihe ga-akọ m.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Ọ na-eme ka m dinara ala n’ebe ịta nri dị mfe; Ọ na-edubanye m n’akụkụ mmiri dọrọ nwayọọ.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Ọ na-eweghachi mkpụrụ obi m; Ọ na-eduzi m n’okporo ụzọ ezi omume n’ihi aha ya.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Ee, ọ bụ ezie na m na-agabiga ndagwurugwu nke onyinyo ọnwụ, Agaghị m atụ egwu ihe ọjọọ ọ bụla; n’ihi na gị na m nọ; Mkpanaka gị na mkpanaka gị na-atụ m n’obi.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Ị na-akwadobere m table n’ihu ndị iro m; Ị tere m mmanụ n’isi; Iko m na-asọputa.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'N’ezie, ọma na ebere ga-eso m ụbọchị niile nke ndụ m; M ga-ebikwa n’ụlọ Jehova ruo mgbe ebighị ebi.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'N’isi mbido ka Okwu ahụ dị, Okwu ahụ na Chineke nwekwara mmekọrịta, Okwu ahụ bụkwa Chineke.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Nke a dị n’isi mbido n’ebe Chineke nọ.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'E si n’aka ya mee ihe niile; ọ dịghịkwa otu ihe e kere eke nke a na-emeghị n’aka ya.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Ndụ dị n’ime ya; ndụ ahụ bụkwa ìhè nke mmadụ.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Ìhè ahụ na-achakwa n’ọchịchịrị; ọchịchịrị ahụ enweghịkwa ike imeri ya.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Okwu ahụ wee ghọọ mmadụ, biekwa n’etiti anyị, anyị wee hụ ebube ya, ebube dịka nke ọmụmụ banyere otu nwa tụpụrụ n’aka nna, nke jupụtara na amara na eziokwu.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'N’ihi na Chineke hụrụ ụwa n’anya nke ukwuu nke na o nyere otu ọ mụrụ n’onwe ya, ka onye ọ bụla kwere n’ime ya ghara ịla n’iyi, kama ka o nwee ndụ ebighị ebi.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'N’ihi na Chineke azitaghị Ọkpara ya n’ụwa ka ọ ga-ama ụwa ikpe, kama ọ bụ ka a zọpụta ụwa site n’aka ya.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Onye kwere na ya, a gaghị ama ya ikpe; ma onye na-ekweghị, a mabeghị ya ikpe ugbu a, n’ihi na ọ kweghị n’aha Ọkpara Chineke mụrụ naanị ya.' }
      ]
    }
  },
  // Hausa - Littafi Mai Tsarki
  hau: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'A farko Allah ya halicci sammai da duniya.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'Duniyar kuwa ba ta da siffa, kuma tana wayam; duhu yana bisa fuskar zurfafa, Ruhu na Allah yana shawagi bisa fuskar ruwaye.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'Allah ya ce, “Bari haske ya kasance,” haske kuwa ya kasance.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'Allah kuwa ya ga hasken, ya ga yana da kyau. Allah ya raba tsakanin haske da duhu.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'Allah ya kira hasken “Yini”, duhun kuma ya kira shi “Dare”. Aka yi marece, aka yi safe, yini na farko.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'Allah ya ce, “Bari sarari ya kasance a tsakiyar ruwaye, domin ya raba tsakanin ruwaye da ruwaye.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'Allah kuwa ya yi sararin, ya raba tsakanin ruwaye na ƙarƙashin sararin da na bisa sararin: ya kuwa zama haka.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'Allah ya kira sararin “Sama”. Aka yi marece, aka yi safe, yini na biyu.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'Allah ya ce, “Bari ruwaye na ƙarƙashin sama su taru a guri ɗaya, domin ƙasa shasshafa ta bayyana”; ya kuwa zama haka.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'Allah ya kira ƙasa shasshafa “Duniya”, tarun ruwayen kuma ya kira shi “Tekuna”: Allah kuwa ya ga ya yi kyau.' }
      ]
    },
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Ubangiji ne makiyayina; Ba zan rasa kome ba.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Yana sa ni in kwanta a danyar ciyawa: Yana bishe ni zuwa gefen ruwaye masu dadi.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Yana sabunta rayuwata: Yana bishe ni a tafarkun adalci saboda sunansa.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Ko da ina tafiya ta kwari mai duhun mutuwa, ba zan tsorci wani lahani ba: Domin kana tare da ni; sanda da gora kuna taya murna.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Kuna shirya taron abinci a gaba na a gaban masu kiyayya da ni: Kun shafa mini mai a kaina, kokon ruwana yana ambaliya.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Tabbas alheri da madawwami jinƙai za su tafi tare da ni dukan kwanakin raina: Zan kuma zauna a gidan Ubangiji har abada.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Tun farko akwai Magana. Magana tana tare da Allah, Magana kuwa Allah ce.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Ita ce tun farko tare da Allah.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Dukan abu kuwa ta wurinta ya zama; Ba kuwa abin da ya zama sai ta wurinta.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'A cikinta rai yake, ran nan kuwa haske ne ga mutane.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Hasken yana haskakawa a cikin duhu, duhun kuwa bai rinjaye shi ba.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Magana kuma ta zama mutum, ta zauna a cikinmu, muka shaida daukakarsa, daukaka irin ta tilon Da na Uba, cike da alheri da gaskiya.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'Gama Allah ya yi ƙaunar duniya har ya ba da kaɗai Mahaifinsa Ɗa, domin duk wanda ya gaskata da shi kada ya lalace, amma ya sami rai madawwami.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'Gama Allah bai aiko Ɗansa cikin duniya domin ya yi wa duniya gargaɗi ba, amma domin duniya ta sami ceto ta wurinsa.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Wanda ya gaskata da shi, ba za a yi masa gargaɗi ba; amma wanda bai gaskata ba, an riga an yi masa gargaɗi, domin bai gaskata da sunan kaɗai Mahaifinsa Ɗan Allah ba.' }
      ]
    }
  },
  // Nigerian Pidgin
  pcm: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'For beginning, God create the heaven and the earth.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'The earth no get shape and empty; darkness dey cover everything, and God Spirit dey fly over the water.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'God say, “Make light dey,” and light start to shine.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'God see say the light fine, and Him separate the light from darkness.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'God call the light “Day”, and the darkness Him call am “Night”. Evening come and morning come; first day.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'God say, “Make division dey middle of the water to separate them.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'So God make division and separate the water under from the water above, and e happen as Him talk.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'God call the division “Sky”. Evening come and morning come; second day.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'God say, “Make the water under the sky gather for one place, make dry land show”; and e happen so.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'God call the dry land “Earth”, and the water wey gather Him call am “Sea”: God see say e pure and fine.' }
      ]
    },
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'The LORD na my shepherd, I no go lack anything.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Him dey make me lay down for green pasture: Him dey lead me go where cool water dey flow.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Him dey cure my soul: Him dey direct my leg for righteous road because of Him name.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Even though say I waka pass the valley of deep shadow of death, I no go fear any bad thing: Because you dey with me; your stick and walking stick dey give me comfort.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'You dey set table of food for my front sake of my enemies: You dey pour oil for my head, my cup dey pour over.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'For true, goodness and mercy go follow me dukan days of my life: And I go stay for the house of the LORD forever and ever.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'For the beginning, the Word dey, the Word dey with God, and the Word na God.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Him dey with God for the beginning.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Through him, God make everything; there is nothing wey exist wey him no make.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Inside him, life dey, and that life na light for human beings.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'The light dey shine for darkness, and darkness no fit extinguish am.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'The Word transform to flesh and live inside us, we build our eyes see him glory, the glory of one and only pikin of the Father, full of grace and true things.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'Sake of say God love the world so much, Him give Him only one pikin, so that anybody wey believe inside am no go perish, but go get life wey no dey end.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'Gama God no send Him pikin put inside world say make Him judge the world, but make the world get salvation through Him.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Onyen wey believe inside am, God no go judge am; but anyone wey no believe, God don judge am already, because him no believe inside the only single pikin of God.' }
      ]
    }
  },
  // Zulu - IBhayibheli Elingcwele
  zul: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'Ekuqaleni uNkulunkulu wadala izulu nomhlaba.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'Kepha umhlaba wawuyihlane elingenalutho, nobumnyama babuphezu kotwa; uMoya kaNkulunkulu wehla phezu kwamanzi.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'UNkulunkulu wathi: “Makube khona ukukhanya”; kwaba khona ukukhanya.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'UNkulunkulu wabona ukukhanya ukuba kuhle; uNkulunkulu wakuhlukanisa ukukhanya nobumnyama.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'UNkulunkulu wakubiza ukukhanya ngokuthi “Imini”, nobumnyama wabubiza ngokuthi “Ubusuku”. Kwaba ngukuhlwa, kwaba ngukuphuma kokusa, usuku lokuqala.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'UNkulunkulu wathi: “Makube khona umkhathi phakathi kwamanzi ukuba uhlukanise amanzi namanzi.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'UNkulunkulu wawenza umkhathi, wahlukanisa amanzi laphansi komkhathi namanzi laphezu komkhathi; kwaba njalo.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'UNkulunkulu wakubiza umkhathi ngokuthi “Izulu”. Kwaba ngukuhlwa, kwaba ngukuphuma kokusa, usuku lwesibili.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'UNkulunkulu wathi: “Amanzi laphansi kwezulu mawabuthele ndawonye endaweni eyodwa, kubonakale umhlabathi owomileyo”; kwaba njalo.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'UNkulunkulu wakubiza umhlabathi owomileyo ngokuthi “Umhlaba”, naleyo ndawo yamanzi eyobuthelekayo wayibiza ngokuthi “Ulwandle”: UNkulunkulu wabona ukuba kuhle.' }
      ]
    },
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'UJehova ungumalusi wami, angiyikuswela.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Uyangilalisa emadlelweni aluhlaza; uyangiyisa ngasemanzini okuphumula.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Ubuyisa umphefumulo wami; uyangihola ezindleleni-okulunga ngenxa yegama lakhe.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Noma ngihamba esigodini sethunzi lokufa, angesabi bubi, ngokuba wena unami; intonga yakho nodondolo lwakho kuyangiduduza.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Ulungisa itafula phambi kwami emehlweni ezitha zami; ugcoba ikhanda lami ngamafutha; indebe yami iyachichima.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Impela okulunga nomusa kuyangilandela ngezinsuku zonke zokuphila kwami; ngiyakuhlala endlini kaJehova kuze kube pakade.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Ekuqaleni kwakukhona uLizwi, uLizwi wayekuye uNkulunkulu, uLizwi wayenguNkulunkulu.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Yena lowo wayekuye uNkulunkulu ekuqaleni.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Izinto zonke zenziwa ngaye; ngaphandle kwakhe akwenziwanga lutho okwenzileyo kabusha.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Kuye kwakukhona ukuphila, nokuphila kwakungukukhanya kwabantu.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Ukukhanya kukhanya ebumnyameni, kepha ubumnyama abukwamukelanga.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'ULizwi waba yinyama, wakha phakathi kwethu; sabona inkazimulo yakhe, inkazimulo enjengeyoZelwe-oyedwa koYise, egcwele umusa neqiniso.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'Ngokuba uNkulunkulu walithanda izwe kangaka, waze wanikela ngeNdodana yakhe ezelwe yodwa, ukuba yilowo nalowo okholelwa kuyo angabubuli, kodwa abe nokuphila okuphakade.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'Ngokuba uNkulunkulu akayithumelanga iNdodana ezweni ukuba ilihlole izwe, ukuba izwe lisindiswe ngayo.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Okholelwa kuyo akahloliwe; kepha ongakholelwa usehloliwe, ngokuba engakholwanga egameni leNdodana ezelwe yodwa kaNkulunkulu.' }
      ]
    }
  },
  // Twi - Twere Kronkron
  twi: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'Mfitiaseɛ no, Onyankopɔn bɔɔ ɔsoro ne asase.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'Na asase so yɛɛ mpan, na esum wɔ emu; eye Onyankopɔn Honhom da nsuo no ani.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'Na Onyankopɔn se: “Hann nnyina hɔ,” na hann baeɛ.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'Na Onyankopɔn hunu hann no sɛ ɛyɛ, na ɔtetee hann ne esum mu.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'Na Onyankopɔn frɛɛ hann no “Adiyuo”, na esum no ɔfrɛɛ no “Anadwo”. Nya ewia, na nya anɔpa: deɛ ɛdi kan.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'Na Onyankopɔn se: “Ɔsoro nnyina nsuo no agya, na ɛnte nsuo firi nsuo mu.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'Na Onyankopɔn yɛɛ saa kyɛfa no, na ɔtetee nsuo firi nsuo mu: eye ɛyɛ bɛ agya.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'Na Onyankopɔn frɛɛ saa kyɛfa no “Ɔsoro”. Nya ewia, na nya anɔpa: deɛ ɛdi mmienu.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'Na Onyankopɔn se: “Nsuo a ɛwɔ ɔsoro ase no mboaboa ano baako, na asase koro mpu”; eye ɛyɛ bɛ saa.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'Na Onyankopɔn frɛɛ asase koro no “Asase”, na nsuo mboaboa ano no ɔfrɛɛ no “Po”: Onyankopɔn hunuu sɛ ɛyɛ.' }
      ]
    },
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'AWURADE ne me hwɛfoɔ, hwee renhia me.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Ɔma meda adidibea a ɛhɔ wira yɛ frɔmfrɔm, ɔgya me kɔ nsuo a ɛho dwoɔ ho.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Ɔdwodwo me kra, ɔde me fa akwantenenee so, ne din nti.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Sɛ mpo menam owuo sum kabii bɔn no mu a, merensuro bɔne biara, ɛfiri sɛ wo ne me na ɛwɔ hɔ, wo nan kple wo duba wofaa akɔ nam, eye wo nanpɔ we duba ma me akokoɔdufɔ.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Woto pon ma me, me tamfo anim, wosiri me ti ti nwinm; me kura kora dɔɔ so ma ɛretware.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Amaneɛ bɔne biara bɛbɔ me mpa, mmerɛ a mete ase yi, na mɛtena AWURADE afi mu mfeɛ we feebaa.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Mfitiaseɛ no, na Asɛm no wɔ hɔ, na Asɛm no ne Onyankopɔn na ɛwɔ hɔ, na Asɛm no ara ne Nyankopɔn.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Ɛno ara na mfitiaseɛ no na ɛne Onyankopɔn wɔ hɔ.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Nneɛma nyinaa nam ne so na ɛbaa hɔ, eye nea akyi no hwee amba hɔ koraa.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Nkwa wɔ ne mu, na nkwa no na ɛyɛ nnipa hann.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Hann no hyerɛm sum mu, na sum no antumi ankyere.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Na Asɛm no bɛyɛɛ ɔhonam bɛtenaa yɛn mu; na yɛhunuu ne kyɛfa a ɛyɛ Agunguo pa ba a ɔfiri Agya nkyɛn ba, a ɔyɛ adom kple nokware mma.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'Na firi sɛ Onyankopɔn dɔɔ wiase yi dodo, de ne ba ko no toae mpo sɛ nea ɔbɛgye no adi no biara rensera, na mmom wanya daa nkwa.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'Ɛfiri sɛ Onyankopɔn ansoma ne ba wiase sɛ ɔbɛbu wiase fɔ, na mmom sɛnea ɛbɛyɛ na wiase bɛnya nkwa nam ne so.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Nea ɔgye no di no, wobu no bem; na nea onnye no nni no de, woabu no fɔ dedaw, ɛfiri sɛ onnye Onyankopɔn Ba ko no din nni.' }
      ]
    }
  },
  // Ewe - Biblia
  ewe: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'Le gɔmedzedzea me la Mawu dze anyigba kple dziƒo dzi.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'Ke anyigba la tsi tsu, eye dɔtsyɔa le afi; Mawu ƒe Gbɔgbɔ le vavam le tsiwo dzi.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'Eye Mawu gblɔ be: “Kekeli nɛva,” eye kekeli va.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'Eye Mawu kpɔ kekeli la be wònyo, eye Mawu dze kekeli kple dɔtsyɔa kura.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'Eye Mawu yɔ kekeli la be “Ŋkeke”, eye dɔtsyɔa wòyɔ be “Zã”. Nya zã, na nya ŋdi: gbãtɔ ŋkeke la.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'Eye Mawu gblɔ be: “Dziƒo nɛnye tsi kple tsi gbedodoƒe.”' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'Eye Mawu dze dziƒo kple tsi tútútú: eye wòva eme.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'Eye Mawu yɔ dziƒo be “Dziƒo”. Nya zã, na nya ŋdi: evelia ŋkeke la.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'Eye Mawu gblɔ be: “Tsiwo nɛva ɖeka ko, ale anyigba nɛva dídí”; eye wòva eme.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'Eye Mawu yɔ anyigba be “Anyigba”, eye tsiwo wòyɔ be “Po”: Mawu kpɔe be wònyo.' }
      ]
    },
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Yehowa nye nye kplɔla, naneke mehiãm o.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Enaa mlɔa gbe tútútúwo dzi, eye wòa kplɔm yia tɔ dídákẹ́wo to.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Eɖɔa nye luʋɔ ɖo, eye wòkplɔm tɔa ipa tútútúwo nu nítorí eƒe ŋkɔ la.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Ne metsɔ gbedodoƒe tsiɖiɖi ku tɔ vido ke hã, nyemavɔ̃ vɔ̃ aɖeke o, elabena wò èle kplim, wò kpɔti kple wò atam wofaa akɔ nam.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Èɖoa kplɔ̃ ɖe kɔ nam le nye ketɔwo ŋgɔ, èsiam ami ɖe ta,eye nye kplu yɔ gba go.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Ŋutifafa kple luʋɔnyo adze yɔm le nye agbemeŋkekewo katã me,eye manɔ Yehowa ƒe aƒe me títí láé.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Le gɔmedzedzea me la Nya la li, eye Nya la li kple Mawu, eye Nya la nye Mawu.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Eya kee li kple Mawu le gɔmedzedzea me.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Woɖo nuwo katã dzi to eya me, eye nusiwo katã woɖo la, womeɖo aɖeke lá fúbú o.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Agbe la le eya me, eye agbe lae nye amegbetɔwo ƒe kekeli.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Kekeli la le dídím le dɔtsyɔa me, eye dɔtsyɔa mete ŋu kpe dzi o.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Eye Nya la zu ŋutilã eye wònɔ mía dome, eye míekpɔ eƒe ŋutikɔkɔe, si nye fofo la ƒe tso vi ɖeka tenye la tɔ, si yɔ kple lɔlɔ̃ kple nyateƒe.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'Elabena Mawu lɔ̃ xexeame katã ale gbegbe be, wòtsɔ eƒe Tenuvi la na, be amesiame si xɔ eya dzi se la, wòagatsrɔ̃ o, ke boŋ wòakpɔ agbe mavɔ.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'Elabena Mawu medɔ eƒe Vi la ɖe xexeame be wòdrɔ̃ ʋɔnu xexeame o, ke boŋ be xexeame nakpɔ ɖeɖe to eya me.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Amesiame si xɔ eya dzi se la, womedrɔ̃a ʋɔnum o; ke amesi sexɔe o la, wodrɔ̃ ʋɔnum xoxo, elabena mexɔ Mawu ƒe Vi ɖeka tenye la ƒe ŋkɔ dzi se o.' }
      ]
    }
  },
  // Louis Segond (French)
  lsg: {
    GEN: {
      1: [
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 1, text: 'Au commencement, Dieu créa les cieux et la terre.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 2, text: 'La terre était informe et vide; il y avait des ténèbres à la surface de l’abîme, et l’esprit de Dieu se mouvait au-dessus des eaux.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 3, text: 'Dieu dit: « Que la lumière soit ! » Et la lumière fut.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 4, text: 'Dieu vit que la lumière était bonne; et Dieu sépara la lumière d’avec les ténèbres.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 5, text: 'Dieu appela la lumière « jour », et il appela les ténèbres « nuit ». Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 6, text: 'Dieu dit: « Qu’il y ait une étendue entre les eaux, et qu’elle sépare les eaux d’avec les eaux. »' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 7, text: 'Et Dieu fit l’étendue, et il sépara les eaux qui sont au-dessous de l’étendue d’avec les eaux qui sont au-dessus de l’étendue. Et cela fut ainsi.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 8, text: 'Dieu appela l’étendue « ciel ». Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 9, text: 'Dieu dit: « Que les eaux qui sont au-dessous du ciel se rassemblent en un seul lieu, et que le sec paraisse. » Et cela fut ainsi.' },
        { book_id: 'GEN', book_name: 'Genesis', chapter: 1, verse: 10, text: 'Dieu appela le sec « terre », et il appela le rassemblement des eaux « mers ». Dieu vit que cela était bon.' }
      ]
    },
    PSA: {
      23: [
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'L’Éternel est mon berger: je ne manquerai de rien.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Il restaure mon âme, Il me conduit dans les sentiers de la justice, A cause de son nom.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Quand je marche dans la vallée de l’ombre de la mort, Je ne crains aucun mal, car tu es avec moi: Ta houlette et ton bâton me rassurent.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Tu dresses devant moi une table, En face de mes adversaires; Tu oins d’huile ma tête, Et ma coupe déborde.' },
        { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Oui, le bonheur et la grâce m’accompagneront Tous les jours de ma vie, Et j’habiterai dans la maison de l’Éternel Jusqu’à la fin de mes jours.' }
      ]
    },
    JHN: {
      1: [
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Elle était au commencement avec Dieu.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Toutes choses ont été faites par elle, et rien de ce qui a été fait n’a été fait sans elle.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'En elle était la vie, et la vie était la lumière des hommes.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'La lumière luit dans les ténèbres, et les ténèbres ne l’ont point reçue.' },
        { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père.' }
      ],
      3: [
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 16, text: 'Car Dieu a tant aimé le monde qu’il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu’il ait la vie éternelle.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 17, text: 'Dieu, en effet, n’a pas envoyé son Fils dans le monde pour qu’il juge le monde, mais pour que le monde soit sauvé par lui.' },
        { book_id: 'JHN', book_name: 'John', chapter: 3, verse: 18, text: 'Celui qui croit en lui n’est point jugé; mais celui qui ne croit pas est déjà jugé, parce qu’il n’a pas cru au nom du Fils unique de Dieu.' }
      ]
    }
  }
};

/**
 * Resolves a book-chapter reference from the offline database, or undefined if not preloaded.
 */
export function getOfflineVerses(translation: string, bookId: string, chapter: number, isOffline = false): Verse[] | undefined {
  const normTrans = translation.toLowerCase();
  
  // Try selected translation first
  const match = OFFLINE_VERSES_DB[normTrans]?.[bookId]?.[chapter];
  if (match) return match;
  
  // Fallback to WEB English if translation is missing but English has it offline AND we are offline or requesting english
  const isEnglishOrVariant = normTrans === 'web' || normTrans === 'kjv' || normTrans === 'asv' || normTrans === 'bbe' || normTrans === 'ylt' || normTrans === 'darby' || normTrans === 'oeb-us';
  if (isOffline || isEnglishOrVariant) {
    const englishFallback = OFFLINE_VERSES_DB['web']?.[bookId]?.[chapter];
    if (englishFallback) return englishFallback;
  }

  return undefined;
}
