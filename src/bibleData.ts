/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Verse } from './types';

export const OFFLINE_COLLECTION: { [key: string]: { [chapter: number]: Verse[] } } = {
  // World English Bible (WEB)
  'web': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Yahweh is my shepherd. I shall not lack.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'He makes me lie down in green pastures. He leads me beside still waters.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'He restores my soul. He guides me in the paths of righteousness for his name’s sake.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'You prepare a table before me in the presence of my enemies. You have anointed my head with oil. My cup runs over.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh’s house forever.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'The same was in the beginning with God.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'All things were made through him. Without him was not anything made that has been made.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'In him was life, and the life was the light of men.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'The light shines in the darkness, and the darkness hasn’t overcome it.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'There came a man sent from God, whose name was John.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'The same came as a witness, that he might testify about the light, that all might believe through him.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'He was not the light, but was sent to testify about the light.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'The true light that enlightens everyone was coming into the world.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'He was in the world, and the world was made through him, and the world didn’t recognize him.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'He came to his own, and those who were his own didn’t receive him.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'But as many as received him, to them he gave the right to become God’s children, to those who believe in his name:' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'who were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'John testified about him. He cried out, saying, “This was he of whom I said, ‘He who comes after me has surpassed me, for he was before me.’”' }
    ]
  },
  // King James Version (KJV)
  'kjv': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'The same was in the beginning with God.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'All things were made by him; and without him was not any thing made that was made.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'In him was life; and the life was the light of men.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'And the light shineth in darkness; and the darkness comprehended it not.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'There was a man sent from God, whose name was John.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'The same came for a witness, to bear witness of the light, that all men through him might believe.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'He was not that light, but was sent to bear witness of that light.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'That was the true Light, which lighteth every man that cometh into the world.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'He was in the world, and the world was made by him, and the world knew him not.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'He came unto his own, and his own received him not.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.' }
    ]
  },
  // Yoruba - Bibeli Mimọ (YOR)
  'yor': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Olúwa ni olùṣọ́ àgùntàn mi; èmi kì yóò ṣe aláìní.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Ó mú mi dùbúlẹ̀ nínú koríko tútù: ó mú mi lọ sípa omi dídákẹ́ jẹ́ẹ́.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Ó mú ọkàn mi sọjí: ó mú mi tọ ipa-ọ̀nà òdodo nítorí orúkọ rẹ̀.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Dájúdájú, bí mo tilẹ̀ ń rìn nínú àfonífojì òjìji ikú, èmi kì yóò bẹ̀rù ibi kankan: nítorí o wà pẹ̀lú mi; ọ̀gọ̀ rẹ àti ọ̀pá rẹ, wọ́n ń tù mí nínú.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'O tẹ́ tábìlì dídùn síwájú mi níṣojú àwọn ọ̀tá mi: o fi òróró yàn mí lórí; ago mi sì ń kún àkúnwọ́sílẹ̀.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Dájúdájú rere àti àánú yóò tẹ̀lé mi ní gbogbo ọjọ́ ayé mi: èmi yóò sì máa gbé nínú ilé Olúwa títí láé.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Ní ìbẹ̀rẹ̀ pẹ̀pẹ̀ ni Ọ̀rọ̀ wà, Ọ̀rọ̀ sì wà pẹ̀lú Ọlọ́run, Ọlọ́run sì ni Ọ̀rọ̀ náà.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Èyí ni ó wà pẹ̀lú Ọlọ́run ní ìbẹ̀rẹ̀.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Nípasẹ̀ rẹ̀ ni a dá ohun gbogbo; láìsí rẹ̀ kò sì sí ohun tí a dá nínú ohun tí a ti dá.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Nínú rẹ̀ ni ìyè wà; ìyè náà sì ni ìmọ́lẹ̀ aráyé.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Ìmọ́lẹ̀ náà sì ń tàn nínú òkùnkùn, òkùnkùn kò sì borí rẹ̀.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'Ọkùnrin kan wà ti a rán láti ọ̀dọ̀ Ọlọ́run wá, orúkọ rẹ̀ ń jẹ́ Jòhánù.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'Òhun kan náà ni ó wá fún ẹ̀rí, kí ó lè ṣe jẹ́rìí sí ìmọ́lẹ̀ náà, kí gbogbo ènìyàn lè gbàgbọ́ nípasẹ̀ rẹ̀.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'Òkùnrin náà kì í ṣe ìmọ́lẹ̀ náà, ṣùgbọ́n a rán an wá láti ṣe jẹ́rìí sí ìmọ́lẹ̀ náà.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'Èyí ni ìmọ́lẹ̀ tòótọ́ tí ó ń tàn fún gbogbo ènìyàn tí ó ń bọ̀ wá sáyé.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'Ó wà nínú ayé, a sì dá ayé nípasẹ̀ rẹ̀, ayé kò sì mọ̀ ọn.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'Ó wá sí ọ̀dọ̀ àwọn tirẹ̀, àwọn tirẹ̀ kò sì gbà á gẹ́gẹ́.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'Ṣùgbọ́n gbogbo àwọn tí ó gbà á, ó fún wọn ní ẹ̀tọ́ láti di ọmọ Ọlọ́run, àní àwọn tí ó gbà orúkọ rẹ̀ gbọ́.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'Àwọn ẹni tí a kò bí nípa ẹ̀jẹ̀, bẹ́ẹ̀ ni kì í ṣe nípa ìfẹ́ ara, nítorí fún ìfẹ́ ènìyàn, ṣùgbọ́n láti ọ̀dọ̀ Ọlọ́run wá.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Ọ̀rọ̀ náà sì di ara, ó sì ń gbé nínú wa, a sì rí ògo rẹ̀, ògo gẹ́gẹ́ bí ti Ọmọ kan ṣoṣo láti ọ̀dọ̀ Baba, ó kún fún oore-ọ̀fẹ́ àti òtítọ́.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'Jòhánù ṣe jẹ́rìí nípa rẹ̀, ó sì kígbe, wí pé, “Èyí ni ẹni tí mo sọ nípa rẹ̀ pé, ‘Ẹni tí ń bọ̀ lẹ́yìn mi pọ̀ jù mí lọ, nítorí ó wà ṣáájú mi.’”' }
    ]
  },
  // Igbo - Biblia Nso (IBO)
  'ibo': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Jehova bụ Onye-ọzụzụ-atụrụ m; Ọ dịghị ihe ga-akọ m.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Ọ na-eme ka m dinara ala n’ebe ịta nri dị mfe; Ọ na-edubanye m n’akụkụ mmiri dọrọ nwayọọ.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Ọ na-eweghachi mkpụrụ obi m; Ọ na-eduzi m n’okporo ụzọ ezi omume n’ihi aha ya.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Ee, ọ bụ ezie na m na-agabiga ndagwurugwu nke onyinyo ọnwụ, Agaghị m atụ egwu ihe ọjọọ ọ bụla; n’ihi na gị na m nọ; Mkpanaka gị na mkpanaka gị na-atụ m n’obi.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Ị na-akwadobere m table n’ihu ndị iro m; Ị tere m mmanụ n’isi; Iko m na-asọputa.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'N’ezie, ọma na ebere ga-eso m ụbọchị niile nke ndụ m; M ga-ebikwa n’ụlọ Jehova ruo mgbe ebighị ebi.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'N’isi mbido ka Okwu ahụ dị, Okwu ahụ na Chineke nwekwara mmekọrịta, Okwu ahụ bụkwa Chineke.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Nke a dị n’isi mbido n’ebe Chineke nọ.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'E si n’aka ya mee ihe niile; ọ dịghịkwa otu ihe e kere eke nke a na-emeghị n’aka ya.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Ndụ dị n’ime ya; ndụ ahụ bụkwa ìhè nke mmadụ.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Ìhè ahụ na-achakwa n’ọchịchịrị; ọchịchịrị ahụ enweghịkwa ike imeri ya.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'Otu onye pụtara, onye Chineke zitere, aha ya bụ Jọn.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'Onye a bịara dika onyeàmà, ka ọ gbaa àmà banyere ìhè ahụ, ka mmadụ niile wee kwere site n’aka ya.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'Ọ bụghị ya onwe ya bụ ìhè ahụ, kama ọ bịara ịgba àmà banyere ìhè ahụ.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'Ìhè ahụ gbagoro agbago bụ ìhè gbagoro agbago, nke na-enye mmadụ niile na-abịa n’ụwa ìhè.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'Ọ nọ n’ụwa, ọ bụ n’aka ya ka e weere ụwa, ụwa amaghịkwa ya.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'Ọ bịakwutere ndị nke ya, ndị nke ya anabataghịkwa ya.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'Ma ka ha ra bụ ndị nabatara ya, ọ nyere ha ikike ịghọ ụmụ Chineke, bú ndị kwere n’aha ya:' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'bú ndị a mụrụ, ọ bụghị site n’ọbara, ma-ọbụ site n’uche nke anụ ahụ, ma-ọbù site n’uche nke mmadụ, kama site na Chineke.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Okwu ahụ wee ghọọ mmadụ, biekwa n’etiti anyị, anyị wee hụ ebube ya, ebube dịka nke ọmụmụ banyere otu nwa tụpụrụ n’aka nna, nke jupụtara na amara na eziokwu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'Jọn gbara àmà banyere ya, tie mkpu sị, “Onye a bụ onye m kwuru banyere ya, sị, ‘Onye na-abịa n’azụ m agafewo m n’ihu, n’ihi na ọ dị tupu mụ onwe m adị.’”' }
    ]
  },
  // Hausa - Littafi Mai Tsarki (HAU)
  'hau': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Ubangiji ne makiyayina; Ba zan rasa kome ba.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Yana sa ni in kwanta a danyar ciyawa: Yana janye ni zuwa gefen ruwaye masu dadi.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Yana sabunta rayuwata: Yana bishe ni a tafarkun adalci saboda sunansa.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Ko da ina tafiya ta kwari mai duhun mutuwa, ba zan tsorci wani lahani ba: Domin kana tare da ni; sanda da gora suna taya murna.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Kuna shirya taron abinci a gaba na a gaban masu kiyayya da ni: Kun shafa mini mai a kaina, kokon ruwana yana ambaliya.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Tabbas alheri da madawwami jinƙai za su tafi tare da ni dukan kwanakin raina: Zan kuma zauna a gidan Ubangiji har abada.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Tun farko akwai Magana. Magana tana tare da Allah, Magana kuwa Allah ce.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Ita ce tun farko tare da Allah.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Dukan abu kuwa ta wurinta ya zama; Ba kuwa abin da ya zama sai ta wurinta.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'A cikinta rai yake, ran nan kuwa haske ne ga mutane.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Hasken yana haskakawa a cikin duhu, duhun kuwa bai rinjaye shi ba.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'Aka yi wani mutum aike daga wajen Allah, sunansa Yahaya.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'Ya zo domin shaida, ya shaida hasken nan, domin kowa ya gaskata ta wurinsa.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'Ba shi ne hasken ba, amma ya zo ne ya shaida hasken.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'Haske na gaskiya, wanda yake haskaka kowane mutum, yana zuwa cikin duniya.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'Yana cikin duniya, duniya kuwa ta wurinsa ta zama, amma duniya ba ta gane shi ba.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'Ya zo wurin wadanda ke nasa, amma nasa ba su karbe shi ba.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'Amma dug da wadanda suka karbe shi, ya ba su iko su zama yayan Allah, wato wadanda suka gaskata da sunansa;' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'wadanda ba a haife su ta wurin jini ba, ko ta wurin nufin jiki, ko ta wurin nufin mutum, amma ta wurin Allah.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Magana kuma ta zama mutum, ta zauna a cikinmu, muka shaida daukakarsa, daukaka irin ta tilon Da na Uba, cike da alheri da gaskiya.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'Yahaya ya shaida shi, ya kuwa yi kira ya ce, “Wannan shi ne wanda na yi maganarsa sa’ad da na ce, ‘Wanda yake zuwa bayana ya riga ni, domin yana can tun ba ni ba.’”' }
    ]
  },
  // Nigerian Pidgin (PCM)
  'pcm': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'The LORD na my shepherd, I no go lack anything.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Him dey make me lay down for green pasture: Him dey lead me go where cool water dey flow.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Him dey cure my soul: Him dey direct my leg for righteous road because of Him name.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Even though say I waka pass the valley of deep shadow of death, I no go fear any bad thing: Because you dey with me; your stick and walking stick dey give me comfort.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'You dey set table of food for my front sake of my enemies: You dey pour oil for my head, my cup dey pour over.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'For true, goodness and mercy go follow me dukan days of my life: And I go stay for the house of the LORD forever and ever.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'For the beginning, the Word dey, the Word dey with God, and the Word na God.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Him dey with God for the beginning.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Through him, God make everything; there is nothing wey exist wey him no make.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Inside him, life dey, and that life na light for human beings.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'The light dey shine for darkness, and darkness no fit extinguish am.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'One man dey wey God send, him name na John.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'Him come as witness to tell people about the light, so that through him, everybody go believe.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'Him self no be the light, him only come to tell people about the light.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'This na the true light wey dey shine for everybody wey dey come the world.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'Him dey for the world, the world make through him, but the world no know him.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'Him come meet him own people, but him own people no receive him.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'But to all those wey receive him, and believe for him name, him give power to become pikin of God!' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'Pikin wey no born through blood, or wish of body, or human plan, but from God.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'The Word transform to flesh and live inside us, we build our eyes see him glory, the glory of one and only pikin of the Father, full of grace and true things.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'John talk testify about him, cry out say, “This na the person I talk about say, ‘The one wey dey come after me big pass me, because him dey exist even before I born.’”' }
    ]
  },
  // Ewe - Biblia (EWE)
  'ewe': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'Yehowa nye nye kplɔla, naneke mehiãm o.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Enaa mlɔa gbe tútútúwo dzi, eye wòa kplɔm yia tɔ dídákẹ́wo to.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Eɖɔa nye luʋɔ ɖo, eye wòkplɔm tɔa ipa tútútúwo nu nítorí eƒe ŋkɔ la.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Ne metsɔ gbedodoƒe tsiɖiɖi ku tɔ vido ke hã, nyemavɔ̃ vɔ̃ aɖeke o, elabena wò èle kplim, wò kpɔti kple wò atam wofaa akɔ nam.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Èɖoa kplɔ̃ ɖe kɔ nam le nye ketɔwo ŋgɔ, èsiam ami ɖe ta,eye nye kplu yɔ gba go.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Ŋutifafa kple luʋɔnyo adze yɔm le nye agbemeŋkekewo katã me,eye manɔ Yehowa ƒe aƒe me títí láé.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Le gɔmedzedzea me la Nya la li, eye Nya la li kple Mawu, eye Nya la nye Mawu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Eya kee li kple Mawu le gɔmedzedzea me.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Woɖo nuwo katã dzi to eya me, eye nusiwo katã woɖo la, womeɖo aɖeke lá fúbú o.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Agbe la le eya me, eye agbe lae nye amegbetɔwo ƒe kekeli.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Kekeli la le dídím le dɔtsyɔa me, eye dɔtsyɔa mete ŋu kpe dzi o.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'Ŋutsu aɖe li si Mawu dɔ, eƒe ŋkɔe nye Yohanes.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'Eya vɛ gake be wòanye ɖasefo, alebe wòanye kekeli la ƒe ɖasefo, be amewo katã woaxɔ ase to eya me.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'Eya ŋutɔ menye kekeli la o, ke boŋ eva be wòanye kekeli la ƒe ɖasefo.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'Kekeli nyatɔ la, si dídía na amewo katã la, le vavam ɖe xexeame.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'Eya le xexeame, eye xexeame va to eya me, gake xexeame me mɛ o.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'Eva tɔ amesiwo nye eya tɔwo gbɔ, gake eya tɔwo mexɔ eya o.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'Ke amesiwo katã xɔ eya la, ena mɔmɔ na wo be woazu Mawu ƒe viwo, eya nye amesiwo xɔ eƒe ŋkɔ dzi se la:' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'Womexɔ eya dzi tso ʋu me o, alo tso ŋutilã vi me o, alo tso amegbetɔ kuku ƒe vi me o, ke boŋ tso Mawu ƒe mɛ.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Eye Nya la zu ŋutilã eye wònɔ mía dome, eye míekpɔ eƒe ŋutikɔkɔe, si nye fofo la ƒe tso vi ɖeka tenye la tɔ, si yɔ kple lɔlɔ̃ kple nyateƒe.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'Yohanes ɖe ɖase tso eya ŋu, eye wòklyã be: “Eyae nye amesi ŋu mesɔ nya le be, ‘Amesi gbɔna le yɔm la koɖo gbɔm, elabena elolo vɛm.’”' }
    ]
  },
  // Twi - Twere Kronkron (TWI)
  'twi': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'AWURADE ne me hwɛfoɔ, hwee renhia me.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Ɔma meda adidibea a ɛhɔ wira yɛ frɔmfrɔm, ɔgya me kɔ nsuo a ɛho dwoɔ ho.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Ɔdwodwo me kra, ɔde me fa akwantenenee so, ne din nti.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Sɛ mpo menam owuo sum kabii bɔn no mu a, merensuro bɔne biara, ɛfiri sɛ wo ne me na ɛwɔ hɔ, wo nan kple wo duba wofaa akɔ nam, eye wo nanpɔ we duba ma me akokoɔdufɔ.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Woto pon ma me, me tamfo anim, wosiri me ti ti nwinm; me kura kora dɔɔ so ma ɛretware.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Amaneɛ bɔne biara bɛbɔ me mpa, mmerɛ a mete ase yi, na mɛtena AWURADE afi mu mfeɛ we feebaa.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Mfitiaseɛ no, na Asɛm no wɔ hɔ, na Asɛm no ne Onyankopɔn na ɛwɔ hɔ, na Asɛm no ara ne Nyankopɔn.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Ɛno ara na mfitiaseɛ no na ɛne Onyankopɔn wɔ hɔ.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Nneɛma nyinaa nam ne so na ɛbaa hɔ, eye nea akyi no hwee amba hɔ koraa.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Nkwa wɔ ne mu, na nkwa no na ɛyɛ nnipa hann.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Hann no hyerɛm sum mu, na sum no antumi ankyere.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'Ɔbarima bi baa hɔ a Onyankopɔn na ɔsom no, ne din de Yohane.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'Ɔbaa hɔ sɛ ɔbɛdi adanseɛ afiri hann no ho, sɛnea ɛbɛyɛ na nnipa nyinaa agye adi na anyɛ ne nkaeɛ.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'Ɔno na na ɔnyɛ saa hann no o, mmom ɔbɛbaa sɛ ɔdi hann no ho adanseɛ.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'Hann pa no a ɛhyerɛm ma obiara a ɔba xexeame yi, na ɔretwa mu reba xexeame.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'Ɔwɔ xexeame, na xexeame baa hɔ nam ne yi, nanso xexeame amhunu no.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'Ɔbaa n’ankasa nkyɛn, na n’ankasa nnipa annye no annya mu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'Na dodoɔ a wogye no toeɛ no, ɔmaa wɔn tumi sɛ wɔnyɛ Onyankopɔn mma, kyerɛ sɛ wɔn a wogye ne din die.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'Wɔn a wɔmfaa mogya, kyerɛ sɛ ɛnyɛ ɔhonam mmom na wɔmfaa nnipa nti na wɔbɛkyɛɛ wɔn, na mmom Onyankopɔn ara na ɔkɔkyɛɛ wɔn.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Na Asɛm no bɛyɛɛ ɔhonam bɛtenaa yɛn mu; na yɛhunuu ne kyɛfa a ɛyɛ Agunguo pa ba a ɔfiri Agya nkyɛn ba, a ɔyɛ adom kple nokware mma.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'Yohane dii ne ho adanseɛ kyerɛ sɛ: “Oyi na meka ne ho asɛm sɛ, ‘Nea ɔdi m’akyi ba no dɔɔso sen me, firi sɛ na ɔwɔ hɔ ansa na meba.’”' }
    ]
  },
  // Swahili - Biblia Takatifu (SWA)
  'swa': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'BWANA ndiye mchungaji wangu, sitapungukiwa na kitu.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Katika malisho ya majani mabichi hunilaza, kando ya maji ya utulivu huniongoza.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Hunihuisha nafsi yangu; na kuniongoza katika njia za haki kwa ajili ya jina lake.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Naam, nijapopita kati ya bonde la uvuli wa mauti, sitaogopa mabaya; kwa maana Wewe upo pamoja nami, gongo lako na fimbo yako vyanifariji.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Waaandaa meza mbele yangu machoni pa adui zangu; umenipaka mafuta kichwani pangu, na kikombe changu kinafurika.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Hakika wema na fadhili zitanifuata siku zote za maisha yangu; nami nitakaa nyumbani mwa BWANA milele.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Hapo mwanzo kulikuwako Neno, naye Neno alikuwako kwa Mungu, naye Neno alikuwa Mungu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Huyo mwanzo alikuwako kwa Mungu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Vyote vilifanyika kwa huyo, wala pasipo yeye hakikufanyika cho chote kilichofanyika.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Ndani yake ndimo ulimokuwa uzima, nao ule uzima ulikuwa nuru ya watu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Nayo nuru yaangaza gizani, wala giza halikuishinda.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'Alitokea mtu, ametumwa kutoka kwa Mungu, jina lake Yohana.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'Huyo alikuja kwa ushuhuda, ili aishuhudie ile nuru, wote wapate kuamini kwa yeye.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'Huyo hakuwa ile nuru, bali alikuja ili aishuhudie ile nuru.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'Alikuwako Nuru halisi, amtiaye nuru kila mtu, akija katika ulimwengu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'Alikuwako ulimwenguni, hata ulimwengu ulifanyika kwa yeye, wala ulimwengu haukumtambua.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'Alikuja kwake, wala walio wake hawakumpokea.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'Bali wote waliompokea aliwapa uwezo wa kufanyika watoto wa Mungu, ndio wale waliaminio jina lake;' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'waliozaliwa si kwa damu, wala si kwa mapenzi ya mwili, wala si kwa mapenzi ya mtu, bali kwa Mungu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'Naye Neno alifanyika mwili, akakaa kwetu; nasi tukauona utukufu wake, utukufu kama wa Mwana pekee aliyetoka kwa Baba, amejaa neema na kweli.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'Yohana alimshuhudia, akapaza sauti yake akasema, “Huyu ndiye niliyemnena habari zake, Yeye ajaye nyuma yangu amekuwa mbele yangu, kwa maana alitangulia kuwa kabla yangu.”' }
    ]
  },
  // Zulu - IBhayibheli Elingcwele (ZUL)
  'zul': {
    // Psalms 23
    23: [
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 1, text: 'UJehova ungumalusi wami, angiyikuswela.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 2, text: 'Uyangilalisa emadlelweni aluhlaza; uyangiyisa ngasemanzini okuphumula.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 3, text: 'Ubuyisa umphefumulo wami; uyangihola ezindleleni-okulunga ngenxa yegama lakhe.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 4, text: 'Noma ngihamba esigodini sethunzi lokufa, angesabi bubi, ngokuba wena unami; intonga yakho nodondolo lwakho kuyangiduduza.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 5, text: 'Ulungisa itafula phambi kwami emehlweni ezitha zami; ugcoba ikhanda lami ngamafutha; indebe yami iyachichima.' },
      { book_id: 'PSA', book_name: 'Psalms', chapter: 23, verse: 6, text: 'Impela okulunga nomusa kuyangilandela ngezinsuku zonke zokuphila kwami; ngiyakuhlala endlini kaJehova kuze kube pakade.' }
    ],
    // John 1
    1: [
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 1, text: 'Ekuqaleni kwakukhona uLizwi, uLizwi wayekuye uNkulunkulu, uLizwi wayenguNkulunkulu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 2, text: 'Yena lowo wayekuye uNkulunkulu ekuqaleni.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 3, text: 'Izinto zonke zenziwa ngaye; ngaphandle kwakhe akwenziwanga lutho okwenzileyo kabusha.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 4, text: 'Kuye kwakukhona ukuphila, nokuphila kwakungukukhanya kwabantu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 5, text: 'Ukukhanya kukhanya ebumnyameni, kepha ubumnyama abukwamukelanga.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 6, text: 'Kwavela umuntu ethunywe nguNkulunkulu, ogama lakhe linguJohane.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 7, text: 'Yena lowo weza ngezwi lobufakazi ukuba afakaze ngokukhanya, ukuze bonke bakholwe ngaye.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 8, text: 'Yena sasingesikho lokho kukhanya, kodwa weza ukuba afakaze ngokukhanya tu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 9, text: 'Kwakukhona ukukhanya okuliqiniso okukhanyisela yilowo nalowo muntu ozayo emhlabeni.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 10, text: 'Wayekhona emhlabeni, nomhlaba wenziwa ngaye, kepha umhlaba awumazanga.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 11, text: 'Weza kokwakhe, kepha abakhe abawamukelanga.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 12, text: 'Kepha bonke abawamukelayo wabanika amandla okuba babe ngabantwana bakaNkulunkulu, bona abakholwa egameni lakhe;' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 13, text: 'abangazalwanga ngegazi, noma ngentando yenyama, noma ngentando yomuntu, kodwa bazalwa nguNkulunkulu.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 14, text: 'ULizwi waba yinyama, wakha phakathi kwethu; sabona inkazimulo yakhe, inkazimulo enjengeyoZelwe-oyedwa koYise, egcwele umusa neqiniso.' },
      { book_id: 'JHN', book_name: 'John', chapter: 1, verse: 15, text: 'UJohane wafakaza ngaye, namuhla wamemeza wathi: “Lona nguye engithe ngaye, ‘Lowo oza emva kwami ungaphambi kwami, ngokuba wayengaphambi kwami.’”' }
    ]
  }
};

// Genesis 1 Fallback (Unified WEB reference as it's large but great for starting)
export const GENESIS_1_FALLBACK: Verse[] = [
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
];

export const DAILY_WORDS_OF_ENCOURAGEMENT = [
  {
    reference: 'Psalms 23:1',
    text: 'Yahweh is my shepherd. I shall not lack.',
    author: 'David (Psalms)',
    gradient: 'from-amber-500/20 to-orange-500/20',
    colorCode: '#FFFBEB'
  },
  {
    reference: 'John 14:1',
    text: '“Don’t let your heart be troubled. Believe in God. Believe also in me.”',
    author: 'Jesus of Nazareth',
    gradient: 'from-blue-600/20 to-teal-500/20',
    colorCode: '#EFF6FF'
  },
  {
    reference: 'Romans 8:28',
    text: 'We know that all things work together for good for those who love God, to those who are called according to his purpose.',
    author: 'Paul of Tarsus',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    colorCode: '#FAF5FF'
  },
  {
    reference: 'Proverbs 3:5',
    text: 'Trust in Yahweh with all your heart, and don’t lean on your own understanding.',
    author: 'Solomon (Proverbs)',
    gradient: 'from-rose-500/20 to-amber-500/20',
    colorCode: '#FFF1F2'
  },
  {
    reference: 'Philippians 4:13',
    text: 'I can do all things through Christ, who strengthens me.',
    author: 'Paul of Tarsus',
    gradient: 'from-teal-500/20 to-emerald-500/20',
    colorCode: '#F0FDF4'
  }
];
