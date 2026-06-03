import { BookMetadata, Verse } from './types';

export interface OfflineBookCommentary {
  author: string;
  period: string;
  theme: string;
  summary: string;
  africanFocus: string;
  outlineParts: { range: [number, number]; label: string; details: string }[];
  keyVerses: { chapter: number; verse: number; ref: string; text: string }[];
}

export const BOOK_COMMENTARIES: { [bookId: string]: OfflineBookCommentary } = {
  GEN: {
    author: 'Moses',
    period: 'c. 1446 or 1290 BC',
    theme: 'Foundations, Beginnings & Covenants',
    summary: 'The book of beginnings, detailing Creation, the fall of humanity, the great flood, and the calling of the patriarchs Abraham, Isaac, Jacob, and Joseph.',
    africanFocus: 'Underscores the sacred value of family covenants, soil, ancestral blessings, and God’s sovereign hand over dry lands to bring life and rain.',
    outlineParts: [
      { range: [1, 11], label: 'Primeval History', details: 'Creation of the cosmos, Eden, humanity’s displacement, Noah’s ark, and the dispersal at Babel.' },
      { range: [12, 25], label: 'The Life of Abraham & Sarah', details: 'God’s call to leave Ur, the promise of offspring as numerous as the stars, and the covenant of faith.' },
      { range: [26, 36], label: 'Isaac, Jacob, and Esau', details: 'Generational sibling rivalries, Jacob’s midnight wrestle with God, and the birth of the twelve tribes.' },
      { range: [37, 50], label: 'The Providence of Joseph', details: 'Joseph sold into Egypt, rising to power, and famine relief saving both Egypt and his brothers.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 1, ref: 'Genesis 1:1', text: 'In the beginning, God created the heavens and the earth.' },
      { chapter: 1, verse: 27, ref: 'Genesis 1:27', text: 'God created man in his own image. In God’s image he created him; male and female he created them.' },
      { chapter: 12, verse: 2, ref: 'Genesis 12:2', text: 'I will make of you a great nation. I will bless you and make your name great. You will be a blessing.' },
      { chapter: 50, verse: 20, ref: 'Genesis 50:20', text: 'As for you, you meant evil against me, but God meant it for good to bring to pass that many people should be kept alive.' }
    ]
  },
  EXO: {
    author: 'Moses',
    period: 'c. 1440 BC',
    theme: 'Deliverance, Law & God’s Tabernacle Presence',
    summary: 'God hears the groaning of Israel under Egyptian bondage, calls Moses, displays power through plagues, parts the Red Sea, covenants at Mt. Sinai, and commands the holding of His sacred Dwelling.',
    africanFocus: 'A monumental text echoing the deep African longing for freedom from oppression, liberation, communal law, and the spiritual tabernacle dwelling.',
    outlineParts: [
      { range: [1, 18], label: 'Deliverance from Bondage', details: 'Pharaoh’s oppression, Moses in the bulrushes, the Burning Bush, the Plagues, and the crossing of the Red Sea.' },
      { range: [19, 24], label: 'Sinai Covenant & The Two Tablets', details: 'The Ten Commandments, societal laws, and the solemn establishment of God’s covenant with Israel.' },
      { range: [25, 40], label: 'The Tabernacle Instructions & Incident of the Golden Calf', details: 'Architectural specifications for the Ark of the Covenant, priestly garments, the tragic betrayal with the Calf, and God’s glory cloud filling the Tabernacle.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 14, ref: 'Exodus 3:14', text: 'God said to Moses, “I AM WHO I AM.” And he said, “You shall tell the children of Israel: ‘I AM has sent me to you.’”' },
      { chapter: 14, verse: 14, ref: 'Exodus 14:14', text: 'Yahweh will fight for you, and you will remain still.' },
      { chapter: 20, verse: 3, ref: 'Exodus 20:3', text: 'You shall have no other gods before me.' }
    ]
  },
  LEV: {
    author: 'Moses',
    period: 'c. 1440 BC',
    theme: 'Holiness, Ritual Offerings & Purity Laws',
    summary: 'A manual of holiness, sacrifices, clean and unclean things, and the high-priestly systems highlighting God’s absolute absolute purity.',
    africanFocus: 'Relates directly to communal cleanness, dietary separations, visual symbols, and the supreme gravity of structural societal order.',
    outlineParts: [
      { range: [1, 7], label: 'Sacrifices & Offerings', details: 'Burnt offerings, grain offerings, peace offerings, sin offerings, and guilt offerings.' },
      { range: [8, 10], label: 'Installation of Priesthood', details: 'Aaron and his sons consecrated, and the judgment of Nadab and Abihu.' },
      { range: [11, 16], label: 'Purity, Yom Kippur (Day of Atonement)', details: 'Distinguishing between clean and unclean foods and vessels, and the high purification ceremony.' },
      { range: [17, 27], label: 'Holiness Code & Festivities', details: 'Moral integrity, Sabbath laws, and the Jubilee release years.' }
    ],
    keyVerses: [
      { chapter: 19, verse: 2, ref: 'Leviticus 19:2', text: 'You shall be holy, for I, Yahweh your God, am holy.' },
      { chapter: 19, verse: 18, ref: 'Leviticus 19:18', text: 'You shall not take vengeance, nor bear any grudge... but you shall love your neighbor as yourself.' }
    ]
  },
  NUM: {
    author: 'Moses',
    period: 'c. 1400 BC',
    theme: 'Sojourn in the Wilderness & Commemoration',
    summary: 'Chronicles the traveling of Israel from Sinai to Jordan, census counting, spying out Canaan, wilderness wanderings due to unbelief, and the rising of a new generation.',
    africanFocus: 'Highlights the testing of national unity under harsh environments, tribal leadership councils, and God’s steady provision of water and manna in dry wilderness.',
    outlineParts: [
      { range: [1, 10], label: 'Camp Organization & Sinai Census', details: 'Military census of the 12 tribes, Levites consecrated, and the guiding fire column.' },
      { range: [11, 20], label: 'Murmuring, Doubt & Wandering Years', details: 'The 12 spies, the curse of the 40-year wandering, and water from the struck rock.' },
      { range: [21, 36], label: 'Conquest Preparations & Moab Campaign', details: 'The bronze serpent, Balaam’s talking donkey, and Joshua appointed as successor.' }
    ],
    keyVerses: [
      { chapter: 6, verse: 24, ref: 'Numbers 6:24-26', text: 'Yahweh bless you, and keep you. Yahweh make his face to shine on you... and give you peace.' },
      { chapter: 23, verse: 19, ref: 'Numbers 23:19', text: 'God is not a man, that he should lie, neither a son of man, that he should repent.' }
    ]
  },
  DEU: {
    author: 'Moses',
    period: 'c. 1406 BC',
    theme: 'Renewal of the Covenant & Remembrance',
    summary: 'A series of sermons delivered by Moses on the plains of Moab before his death, reviewing the law, reminding the people of faith, and promising blessings for obedience.',
    africanFocus: 'Illustrates the significance of parents telling ancestors’ testimonies, inheritance boundaries, and keeping oral and written laws intact for generational stability.',
    outlineParts: [
      { range: [1, 4], label: 'Historical Prologue', details: 'The journey from Horeb, defeat of giants, and exhortation to hear God’s word.' },
      { range: [5, 11], label: 'The Core Commandments', details: 'Recitation of the Decalogue, the Shema (“Hear, O Israel”), and the warning against pride.' },
      { range: [12, 26], label: 'Deuteronomic Civil & Cultic Laws', details: 'Specific statutes on worship locations, tithing, debt cancellation, and judicial fairness.' },
      { range: [27, 34], label: 'Blessings, Curses & Moses’ Farewell', details: 'Curses on Mt. Ebal, blessings on Mt. Gerizim, the Song of Moses, and his burial on Mt. Nebo.' }
    ],
    keyVerses: [
      { chapter: 6, verse: 4, ref: 'Deuteronomy 6:4-5', text: 'Hear, O Israel: Yahweh our God is one Yahweh. You shall love Yahweh your God with all your heart, with all your soul, and with all your might.' },
      { chapter: 30, verse: 19, ref: 'Deuteronomy 30:19', text: 'I have set before you life and death, the blessing and the curse. Therefore choose life, that you may live.' }
    ]
  },
  JOS: {
    author: 'Joshua (primarily)',
    period: 'c. 1375 BC',
    theme: 'Conquest, Inheritance & Faithfulness',
    summary: 'Joshua succeeds Moses, crosses Jordan on dry ground, captures Jericho, subdues AI, defeats kingdoms of Canaan, and divides the land of promise.',
    africanFocus: 'Evokes themes of collective territorial stewardship, courageous leadership transition, and faithful covenants to inherit regional blessings.',
    outlineParts: [
      { range: [1, 5], label: 'Entering Promised Canaan', details: 'Commissioning of Joshua, Rahab and the spies, Jordan parting, and the memorial stones.' },
      { range: [6, 12], label: 'The Campaigns of Battle', details: 'The fall of Jericho, Achan’s sin at Ai, the sun standing still over Gibeon.' },
      { range: [13, 21], label: 'Allotment of the Land', details: 'Distribution of domains to the tribal clans, cities of refuge, and Levitical territories.' },
      { range: [22, 24], label: 'Joshua’s Final Charge', details: 'A solemn call to serve Yahweh alone: “As for me and my house, we will serve Yahweh.”' }
    ],
    keyVerses: [
      { chapter: 1, verse: 9, ref: 'Joshua 1:9', text: 'Be strong and courageous. Don’t be afraid, neither be dismayed: for Yahweh your God is with you wherever you go.' },
      { chapter: 24, verse: 15, ref: 'Joshua 24:15', text: 'As for me and my house, we will serve Yahweh.' }
    ]
  },
  JDG: {
    author: 'Samuel (traditionally)',
    period: 'c. 1000 BC',
    theme: 'Sovereignty, Cycles of Rebellion & Deliverance',
    summary: 'After Joshua, Israel enters a cycle of idolatry, foreign oppression, crying to God, and God raising up military deliverers (Judges) like Gideon, Deborah, and Samson.',
    africanFocus: 'Reflects on the perils of decentralized governance, the necessity of selfless community watchmen, and the power of women in national liberation (Deborah).',
    outlineParts: [
      { range: [1, 3], label: 'Incomplete Conquest & Spiritual Declension', details: 'Failure to drive out nations, and the introduction of the judge cycle.' },
      { range: [4, 16], label: 'Major Judges Rise', details: 'Deborah and Barak, Gideon’s 300, Jephthah’s vow, and Samson’s tragic romance.' },
      { range: [17, 21], label: 'Anarchy & Tribal Civil War', details: 'Levite’s concubine tragedy, Micah’s idols, illustrating “In those days there was no king in Israel; everyone did what was right in his own eyes.”' }
    ],
    keyVerses: [
      { chapter: 2, verse: 18, ref: 'Judges 2:18', text: 'When Yahweh raised up judges for them, then Yahweh was with the judge, and saved them out of the hand of their enemies all the days of the judge.' },
      { chapter: 21, verse: 25, ref: 'Judges 21:25', text: 'In those days there was no king in Israel. Everyone did that which was right in his own eyes.' }
    ]
  },
  RUT: {
    author: 'Samuel (traditionally)',
    period: 'c. 1000 BC',
    theme: 'Kinsman Redeemer, Loyalty & Unexpected Inclusion',
    summary: 'A Moabite widow, Ruth, chooses family loyalty to Naomi: “Your people shall be my people, and your God my God.” She gleans in Boaz’s field, who redeems her, leading to David’s royal line.',
    africanFocus: 'Celebrates filial piety, widow care, honor systems, and God’s grace crossing ethnic barriers to crown a faithful immigrant woman in the royal ancestry of Christ.',
    outlineParts: [
      { range: [1, 1], label: 'Mourning in Moab', details: 'Famine drives Naomi’s family to Moab; deaths of Elimelech, Mahlon, and Chilion.' },
      { range: [2, 2], label: 'Gleaning in Bethlehem', details: 'Ruth meets Boaz in the barley fields of harvest protection.' },
      { range: [3, 3], label: 'Appeal at Threshing Floor', details: 'Naomi instructs Ruth to seek shelter and redemption from Boaz.' },
      { range: [4, 4], label: 'Boaz’s Redemption of Ruth', details: 'Legal assemblies, marriage blessing, and birth of Obed, the grandfather of David.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 16, ref: 'Ruth 1:16', text: 'Wherever you go, I will go, and wherever you lodge, I will lodge. Your people shall be my people, and your God my God.' }
    ]
  },
  '1SA': {
    author: 'Samuel, Nathan & Gad',
    period: 'c. 930 BC',
    theme: 'Kingship, Samuel’s Call & Saul’s Anointing',
    summary: 'Israel transitions from judges to kings. Samuel is called, Saul is anointed but falls to pride, and young shepherd David slays Goliath and is anointed in secret.',
    africanFocus: 'Explores political transitions, royal integrity, and how humble boys in rural pastures are chosen by God to lead kingdoms ahead of physical giants.',
    outlineParts: [
      { range: [1, 7], label: 'Ministry of Samuel', details: 'Hannah’s prayer, Samuel’s temple call, Ark captured by Philistines, and Ebenezer stone.' },
      { range: [8, 15], label: 'Rise and Fall of King Saul', details: 'Israel demands a king, Saul anointed, battle at Michmash, and Saul’s disobedience.' },
      { range: [16, 31], label: 'David’s Ascent & Exile', details: 'David anointed, David and Goliath, friendship with Jonathan, fleeing Saul’s spears.' }
    ],
    keyVerses: [
      { chapter: 15, verse: 22, ref: '1 Samuel 15:22', text: 'Behold, to obey is better than sacrifice, and to listen than the fat of rams.' },
      { chapter: 16, verse: 7, ref: '1 Samuel 16:7', text: 'Yahweh doesn’t see as man sees; for man looks at the outward appearance, but Yahweh looks at the heart.' }
    ]
  },
  '2SA': {
    author: 'Nathan & Gad',
    period: 'c. 930 BC',
    theme: 'Reign of David, Covenants & Consequences',
    summary: 'David reigns as king over Judah and reunited Israel, conquers Zion, establishes Jerusalem as capital, receives the Davidic Covenant, but faces deep internal sword issues after his fall with Bathsheba.',
    africanFocus: 'A profound study of leadership repentance, family unity, community building, and running into restoration path after personal failure.',
    outlineParts: [
      { range: [1, 10], label: 'Triumphs of David’s Unification', details: 'David mourns Saul, anointed king over all Israel, fetches Ark, covenant promise.' },
      { range: [11, 12], label: 'The Bathsheba and Uriah Fall', details: 'The transgression, Nathan’s parabled confrontation, and David’s deep repentance.' },
      { range: [13, 24], label: 'Household Turbulence & Restorations', details: 'Absalom’s rebellion, exile from Jerusalem, ultimate restoration, and temple threshing site purchase.' }
    ],
    keyVerses: [
      { chapter: 7, verse: 16, ref: '2 Samuel 7:16', text: 'Your house and your kingdom shall be made sure forever before you. Your throne shall be established forever.' },
      { chapter: 22, verse: 2, ref: '2 Samuel 22:2', text: 'Yahweh is my rock, my fortress, and my deliverer.' }
    ]
  },
  '1KI': {
    author: 'Jeremiah (traditionally)',
    period: 'c. 550 BC',
    theme: 'Solomon’s Wisdom, Temple & Divided Kingdom',
    summary: 'Solomon builds the great temple, but falls to foreign idolatry. The united kingdom splits in two (Israel north, Judah south). Elijah the Tishbite battles Baal worshipers on Mt. Carmel.',
    africanFocus: 'Warns against building massive physical monuments while compromising moral foundations; highlights Elijah as a bold champion of truth.',
    outlineParts: [
      { range: [1, 11], label: 'Solomon’s Golden Age', details: 'Inheritance, wisdom prayer, building and dedication of Temple, and Sheba Queen’s visit.' },
      { range: [12, 16], label: 'The Great Schism', details: 'Rehoboam’s harsh taxes, Jeroboam’s golden calves at Bethel, splitting north and south.' },
      { range: [17, 22], label: 'Elijah and Prophetic Fire', details: 'Drought, widow of Zarephath, mountain fire contest, and Naboth’s vineyard injustice.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 9, ref: '1 Kings 3:9', text: 'Give your servant therefore an understanding heart to judge your people, that I may discern between good and evil.' },
      { chapter: 18, verse: 21, ref: '1 Kings 18:21', text: 'How long will you halt between two opinions? If Yahweh is God, follow him; but if Baal, then follow him.' }
    ]
  },
  '2KI': {
    author: 'Jeremiah (traditionally)',
    period: 'c. 550 BC',
    theme: 'Elisha’s Miracles, Decay & Exile of Kingdoms',
    summary: 'The tandem of Elijah to Elisha. Sins of northern Kings lead to Assyrian conquest. Only Hezekiah and Josiah initiate notable pure revivals before Babylon destroys Jerusalem and takes Judah captive.',
    africanFocus: 'Validates that spiritual mentorship (double portion) is critical; shows how neglect of covenants leads to national fractures.',
    outlineParts: [
      { range: [1, 8], label: 'Miracles of Elisha', details: 'Chariot of fire ascension, healing of Naaman’s leprosy, and floating ax-head.' },
      { range: [9, 17], label: 'Decline of Israel & Assyrian Exile', details: 'Jehu’s coup, Athaliah overthrown, and Samaria falling to Sargon IIS.' },
      { range: [18, 25], label: 'Judah’s Autumn & Babylon Captivity', details: 'Hezekiah’s prayer, Josiah scrolls rediscovery, Nebuchadnezzar siege.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 9, ref: '2 Kings 2:9', text: 'Elisha said, “Please let a double portion of your spirit be on me.”' },
      { chapter: 22, verse: 2, ref: '2 Kings 22:2', text: 'Josiah did that which was right in the eyes of Yahweh, and walked in all the way of David his father.' }
    ]
  },
  '1CH': {
    author: 'Ezra (traditionally)',
    period: 'c. 400 BC',
    theme: 'Pedigrees, Priestly Devotion & David’s Preparations',
    summary: 'Focuses entirely on priestly records, Israel’s genetic foundations, Saul’s demise, and King David organizing temple musicians and building materials.',
    africanFocus: 'Connects directly to African respect for lineages, tribal registers, oral family history, as well as choral music and structural worship.',
    outlineParts: [
      { range: [1, 9], label: 'Genealogical Roots of All Israel', details: 'Families from Adam through Noah, David, and returnees from Babylon exile.' },
      { range: [10, 20], label: 'David Becomes Ruler', details: 'Saul’s death, capture of Zion, David’s mighty men, fetching of ark.' },
      { range: [21, 29], label: 'Temple Setup Organizers', details: 'Priesthood courses, Levites, musicians, David’s final offerings and legacy charge.' }
    ],
    keyVerses: [
      { chapter: 4, verse: 10, ref: '1 Chronicles 4:10', text: 'Jabez called on the God of Israel saying, “Oh that you would bless me indeed, and enlarge my border... and keep me from evil!”' },
      { chapter: 29, verse: 11, ref: '1 Chronicles 29:11', text: 'Yours, Yahweh, is the greatness, the power, the glory, the victory, and the majesty... Yours is the kingdom!' }
    ]
  },
  '2CH': {
    author: 'Ezra (traditionally)',
    period: 'c. 400 BC',
    theme: 'Temple Glories, Reforms & Judgments',
    summary: 'Reviews Solomon’s temple construction, but filters Judah’s history purely through priestly reforms and covenants, highlighting King Jehoshaphat, King Hezekiah, and King Josiah.',
    africanFocus: 'Emphasizes that when community rulers join to fast and pray together, supernatural protection, restoration, and prosperity follow.',
    outlineParts: [
      { range: [1, 9], label: 'Reign of Solomon', details: 'Gibeon prayer, Temple construction, dedication and prayer of Solomon.' },
      { range: [10, 20], label: 'Revolts and Prayers', details: 'Division of land, Shishak raid, Jehoshaphat’s choir-led battle victory.' },
      { range: [21, 36], label: 'Revival Crises & Ultimate Exile Decree', details: 'Hezekiah’s reform, Josiah renewal, Temple burned, Cyrus’ proclamation of return.' }
    ],
    keyVerses: [
      { chapter: 7, verse: 14, ref: '2 Chronicles 7:14', text: 'If my people, who are called by my name, shall humble themselves, and pray, and seek my face... then I will hear from heaven, and will forgive their sin, and will heal their land.' },
      { chapter: 20, verse: 20, ref: '2 Chronicles 20:20', text: 'Believe in Yahweh your God, so you shall be established; believe his prophets, so you shall prosper.' }
    ]
  },
  EZR: {
    author: 'Ezra',
    period: 'c. 440 BC',
    theme: 'Return from Exile, Reconstruction & Spiritual Reform',
    summary: 'Cyrus decreers return. Zerubbabel rebuilds the second temple amidst local opposition. Ezra the priest returns to rebuild community covenant standards.',
    africanFocus: 'Inspiring parallel to post-colonial rebuilding, returning from exile, reclaiming indigenous language devotion, and establishing cultural restoration.',
    outlineParts: [
      { range: [1, 6], label: 'Temple Rebuilding under Zerubbabel', details: 'Expatriates return, foundations laid, opposition, and final dedication.' },
      { range: [7, 10], label: 'Arrival of Ezra & National Healing', details: 'Cyrus letters, Ezra’s journey of law study, repentance for intermarriage compromise.' }
    ],
    keyVerses: [
      { chapter: 7, verse: 10, ref: 'Ezra 7:10', text: 'For Ezra had set his heart to seek the law of Yahweh, and to do it, and to teach in Israel statutes and ordinances.' }
    ]
  },
  NEH: {
    author: 'Nehemiah',
    period: 'c. 430 BC',
    theme: 'Restoring the Broken Walls & Civic Leadership',
    summary: 'Nehemiah, cupbearer to Artaxerxes, grieves Jerusalem’s ruins. Appointed governor, he organizes clans to rebuild the security walls in 52 days under constant threat, and institutes economic reforms.',
    africanFocus: 'The gold standard for grassroots community mobilization, resilient engineering, servant leadership, and social justice advocacy.',
    outlineParts: [
      { range: [1, 7], label: 'Rebuilding the Defensive Walls', details: 'Nehemiah’s prayer, gate-by-gate work allocations, sword and trowel protection.' },
      { range: [8, 10], label: 'Covenant Renewal Scrolls', details: 'Ezra reads scriptures aloud, feast of tabernacles celebrated, solemn corporate confession.' },
      { range: [11, 13], label: 'Civic Reforms', details: 'Sabbath law violations corrected, temple finances audited, and community re-consecration.' }
    ],
    keyVerses: [
      { chapter: 4, verse: 14, ref: 'Nehemiah 4:14', text: 'Don’t be afraid of them. Remember Yahweh, who is great and awesome, and fight for your brothers, your sons, your daughters, your wives, and your houses.' },
      { chapter: 8, verse: 10, ref: 'Nehemiah 8:10', text: 'Don’t be grieved; for the joy of Yahweh is your strength.' }
    ]
  },
  EST: {
    author: 'Mordecai (traditionally)',
    period: 'c. 460 BC',
    theme: 'Sovereign Providence, Courage & Festival of Purim',
    summary: 'Set in Susa palace. Orphan Esther becomes Queen, her cousin Mordecai refuses to bow to Haman. Risking death, Esther pleads for her Jewish nation, turning Haman’s gallows back onto himself.',
    africanFocus: 'Highlights that God acts behind the scenes (His name is never mentioned) using unexpected women of courage in corporate palaces "for such a time as this."',
    outlineParts: [
      { range: [1, 4], label: 'Esther Chosen amidst Plotting', details: 'Vashti deposed, beauty search, Mordecai uncovers palace coup, Haman’s genocide decree.' },
      { range: [5, 7], label: 'The Banquets of Wisdom', details: 'Esther’s bold approach, king’s insomnia, Haman honors Mordecai on horse, Haman unmasked.' },
      { range: [8, 10], label: 'Israel Redeemed & Purim Feast', details: 'Extermination decree neutralized, victory feast, Mordecai’s ascendancy.' }
    ],
    keyVerses: [
      { chapter: 4, verse: 14, ref: 'Esther 4:14', text: 'Who knows whether you haven’t come to the kingdom for such a time as this?' }
    ]
  },
  JOB: {
    author: 'Unknown (ancient patriarchal antiquity)',
    period: 'Unknown (deep antiquity)',
    theme: 'The Mystery of Suffering, Faith & God’s Counsel',
    summary: 'A righteous patriarch, Job, loses children, cattle, and health. He wrestles through dialogue with three friends who blame him, before God speaks out of the whirlwind to display His magnificent wisdom.',
    africanFocus: 'Speaks to the profound human riddle of underserved tragedy, challenging simplistic karmic narratives and celebrating unflinching integrity.',
    outlineParts: [
      { range: [1, 2], label: 'Prologue in Heavenly Realms', details: 'Job’s prosperity, Satan’s challenge, sudden losses, and Job’s silent grief.' },
      { range: [3, 31], label: 'Philosophical Debates with Friends', details: 'Three cycles of argument with Eliphaz, Bildad, and Zophar regarding cosmic justice.' },
      { range: [32, 37], label: 'Young Elihu’s Monologue', details: 'Elihu critiques both the older counselors and Job’s self-defense.' },
      { range: [38, 42], label: 'God in the Whirlwind & Job’s Restoration', details: 'Questions on leviathan, stars, oceans; Job’s repentance, twice-blessed healing.' }
    ],
    keyVerses: [
      { chapter: 19, verse: 25, ref: 'Job 19:25', text: 'As for me, I know that my Redeemer lives, and at last he will stand up on the earth.' },
      { chapter: 23, verse: 10, ref: 'Job 23:10', text: 'He knows the way that I take. When he has tried me, I shall come out like gold.' }
    ]
  },
  PSA: {
    author: 'David, Asaph, Sons of Korah, etc.',
    period: 'c. 1000 - 500 BC',
    theme: 'Corporate Praise, Lamentation, Prayers & Worship',
    summary: 'A compilation of 150 Hebrew hymnic prayers, reflecting the full spectrum of human emotion from bone-crushing despair to ecstatic thanksgiving.',
    africanFocus: 'Finds a deep home in African worship, echoing cultural praise songs, communal dancing, ancestral laments, and calling on the creator for rain, protection, and blessing.',
    outlineParts: [
      { range: [1, 41], label: 'Book I (Psalms of David)', details: 'Personal laments, trust, and structural security in Yahweh.' },
      { range: [42, 72], label: 'Book II (Korah and David)', details: 'Thirsting for God like a deer, and Davidic repentance cries.' },
      { range: [73, 89], label: 'Book III (Asaph Prophetics)', details: 'Corporate reflections on Israel’s history and sanctuary glory.' },
      { range: [90, 106], label: 'Book IV (Moses and Kingship)', details: 'God’s eternity, security under wings, and praising Yahweh.' },
      { range: [107, 150], label: 'Book V (Ascecents & Hallelujah Chorus)', details: 'Pilgrimage chants, Psalm 119’s word arrays, and Psalm 150’s percussion explosion.' }
    ],
    keyVerses: [
      { chapter: 23, verse: 1, ref: 'Psalms 23:1', text: 'Yahweh is my shepherd. I shall not lack.' },
      { chapter: 91, verse: 1, ref: 'Psalms 91:1', text: 'He who dwells in the secret place of the Most High will rest in the shadow of the Almighty.' },
      { chapter: 119, verse: 105, ref: 'Psalms 119:105', text: 'Your word is a lamp to my feet, and a light for my path.' },
      { chapter: 150, verse: 6, ref: 'Psalms 150:6', text: 'Let everything that has breath praise Yahweh! Praise Yahweh!' }
    ]
  },
  PRO: {
    author: 'King Solomon (primarily)',
    period: 'c. 950 BC',
    theme: 'Wisdom, Moral Character, Family & Righteousness',
    summary: 'A book of short, poetic guide statements contrasting the path of wisdom with the path of folly, treating hard work, family relationships, justice, and practical life choice.',
    africanFocus: 'Draws profound alignment with traditional African elder wisdom councils, verbal proverbs, and direct moral formation of youths before communities.',
    outlineParts: [
      { range: [1, 9], label: 'Praise of Wisdom to Youths', details: 'Sonnets on Wisdom vs. Folly, warnings against crime, and Wisdom’s eternal invite.' },
      { range: [10, 24], label: 'Proverbs of Solomon Proper', details: 'Strict two-line couplets contrasting lazy plans with diligent planting and wise lips.' },
      { range: [25, 29], label: 'Hezekiah’s Collection of Solomon’s Proverbs', details: 'General court wisdom paradigms, and civic administration rules.' },
      { range: [30, 31], label: 'Sayings of Agur, Lemuel & The Diligent Wife', details: 'Riddles of modesty, motherly advice to kings, and the famous acrostic of the noble builder-wife.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 5, ref: 'Proverbs 3:5-6', text: 'Trust in Yahweh with all your heart, and don’t lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight.' },
      { chapter: 4, verse: 23, ref: 'Proverbs 4:23', text: 'Keep your heart with all diligence, for out of it is the wellspring of life.' },
      { chapter: 9, verse: 10, ref: 'Proverbs 9:10', text: 'The fear of Yahweh is the beginning of wisdom. Knowledge of the Holy One is understanding.' }
    ]
  },
  ECC: {
    author: 'Solomon (traditionally)',
    period: 'c. 930 BC',
    theme: 'Futility, Time & The Sovereignty of God',
    summary: 'An honest philosophical exploration of life, declaring pursuits of wealth, status, and pleasure as "vapor/vanity" under the sun. Outlines time rhythms, concluding with keeping God’s law.',
    africanFocus: 'Reminds communities that material success alone is transient; encourages holding community life and fear of God in deep peace.',
    outlineParts: [
      { range: [1, 2], label: 'The Vapor of Earthly Labors', details: 'All is vanity, searching through wisdom, architecture, and luxury.' },
      { range: [3, 8], label: 'The Seasons of Time', details: 'A time for everything under heaven, and the mystery of injustice.' },
      { range: [9, 12], label: 'Youth, Aging, and The Conclusion', details: 'Remembering Creator before the silver cord snaps, concluding in reverence.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 1, ref: 'Ecclesiastes 3:1', text: 'For everything there is a season, and a time for every purpose under heaven.' },
      { chapter: 12, verse: 13, ref: 'Ecclesiastes 12:13', text: 'This is the end of the matter; all has been heard. Fear God, and keep his commandments; for this is the whole duty of man.' }
    ]
  },
  SNG: {
    author: 'Solomon',
    period: 'c. 950 BC',
    theme: 'Holy Love, Intimacy & Marriage Devotion',
    summary: 'An intense, beautiful collection of love songs between a bride and groom, celebrating the raw physical beauty and emotional intensity of marital covenant.',
    africanFocus: 'An open, natural, and poetic validation of human love, dance, natural landscape comparisons, and the sacred beauty of marriage covenants.',
    outlineParts: [
      { range: [1, 2], label: 'Mutual Affection Blossoms', details: 'Praise of touch, orchard walks, and the little foxes.' },
      { range: [3, 5], label: 'The Marriage and Intimacies', details: 'Night searches, wedding processions, and the beautiful garden metaphor.' },
      { range: [6, 8], label: 'Unquenchable Passion Covenant', details: 'Praising mutual beauty: “Love is as strong as death.”' }
    ],
    keyVerses: [
      { chapter: 8, verse: 7, ref: 'Song of Solomon 8:7', text: 'Many waters can’t quench love, neither can floods drown it.' }
    ]
  },
  ISA: {
    author: 'Isaiah (and disciples)',
    period: 'c. 740 - 680 BC',
    theme: 'Judgment, Redemption & The Coming Messiah',
    summary: 'A broad theological overview warning Judah of corruption, predicting Babylonian exile, but declaring glorious restoration, the Suffering Servant (Isaiah 53), and new creation.',
    africanFocus: 'Echoes the cry of justice for the oppressed, comforting suffering nations, and prophetic hope of global healing and multi-ethnic community.',
    outlineParts: [
      { range: [1, 12], label: 'Judgments on Judah & Royal Seed Prophecy', details: 'Cleanse your hands social justice demand, Isa 6 temple commission, a child is born.' },
      { range: [13, 27], label: 'Oracles to Nations', details: 'Judgment on surrounding foreign nations, regional powers (Babylon, Assyria, Tyre) and promise of a mountain banquet.' },
      { range: [28, 39], label: 'Historical Interlude (Hezekiah)', details: 'Crisis of Assyrian siege, Hezekiah’s sickness recovery, and Babylon envoy mistake.' },
      { range: [40, 55], label: 'Comfort and The Suffering Servant', details: '“Comfort, comfort my people”, the servant who bore our griefs (Isa 53).' },
      { range: [56, 66], label: 'The New Creation', details: '“Arise, shine!”, third-generation calling, new heavens and new earth vision.' }
    ],
    keyVerses: [
      { chapter: 9, verse: 6, ref: 'Isaiah 9:6', text: 'For to us a child is born, to us a son is given... and his name will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.' },
      { chapter: 40, verse: 31, ref: 'Isaiah 40:31', text: 'Those who wait for Yahweh will renew their strength. They will mount up with wings like eagles... they will run and not be weary.' },
      { chapter: 53, verse: 5, ref: 'Isaiah 53:5', text: 'He was wounded for our transgressions, he was bruised for our iniquities... and by his stripes we are healed.' }
    ]
  },
  JER: {
    author: 'Jeremiah',
    period: 'c. 627 - 580 BC',
    theme: 'Prophetic Watchman, Tears & The New Covenant',
    summary: 'Called the Weeping Prophet, Jeremiah warns Judah of imminent ruin. Imprisoned and thrown in cisterns, he witnesses Jerusalem’s fall but writes of the future New Covenant written on hearts.',
    africanFocus: 'Speaks deeply to communities in national collapse, advocating courage in stating uncomfortable truths to authorities, and holding inner spiritual hope.',
    outlineParts: [
      { range: [1, 25], label: 'Warnings of Judgment on Judah', details: 'Jeremiah’s almond branch call, broken clay jars, temple gate sermon.' },
      { range: [26, 29], label: 'Personal Conflict & Expatriate Encouragement', details: 'Yoke bar, Hananiah false battle, Jer 29 letter to build houses in exile.' },
      { range: [30, 33], label: 'The Book of Consolation & Heart Covenant', details: 'Prophecy of return, field purchase in Anathoth, New Covenant.' },
      { range: [34, 45], label: 'Fall of Jerusalem Records', details: 'Burning of scrolls, cistern imprisonment, siege, and escape into Egypt.' },
      { range: [46, 52], label: 'Oracles against Empire Powers', details: 'Judgment on Babylon, Egypt; appendix on the temple’s burn.' }
    ],
    keyVerses: [
      { chapter: 29, verse: 11, ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, says Yahweh, thoughts of peace, and not of evil, to give you hope and a future.' },
      { chapter: 31, verse: 33, ref: 'Jeremiah 31:33', text: 'I will put my law in their inward parts, and in their heart will I write it; and I will be their God, and they shall be my people.' }
    ]
  },
  LAM: {
    author: 'Jeremiah (traditionally)',
    period: 'c. 586 BC',
    theme: 'Grief, Ruin & Steadfast Mercy in Ruins',
    summary: 'Five alphabetical acrostic dirges over the ruins of destroyed Jerusalem, expressing gut-wrenching grief but centering on God’s loyal, morning-new mercies.',
    africanFocus: 'An incredible validation of mourning, collective weeping over shared tragedies, and the survival stamina that speaks of renewal among ashes.',
    outlineParts: [
      { range: [1, 2], label: 'Desolation of the Widow Daughter of Zion', details: 'Chains, starvation, and the broken gates of a princess.' },
      { range: [3, 3], label: 'The Mourning Prophet Finds Faith', details: 'Crying from deep pits, but declaring: “Great is your faithfulness.”' },
      { range: [4, 5], label: 'The Restoration Cry', details: 'Mourning the princes, and final prayer for national restoration.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 22, ref: 'Lamentations 3:22-23', text: 'It is of Yahweh’s loving kindnesses that we are not consumed, because his compassion doesn’t fail. They are new every morning; great is your faithfulness.' }
    ]
  },
  EZK: {
    author: 'Ezekiel',
    period: 'c. 593 - 571 BC',
    theme: 'Chariot Throne, Valley of Dry Bones & Reestablished Temple',
    summary: 'A captive priest in Babylon, Ezekiel sees strange visions of God’s mobile chariot throne. He acts out prophecies, sees the glory depart, declares the return of life to dry bones (Ezk 37), and maps out the future temple.',
    africanFocus: 'Ignites African artistic and dance expressions; its message of dry bones joining to live is a glorious anthem of hope and revival for struggling neighborhoods.',
    outlineParts: [
      { range: [1, 24], label: 'Departing Glory over Jerusalem', details: 'Visions of wheels, eyes, eating scroll, brick model sieges, depart of shekinah.' },
      { range: [25, 32], label: 'Judgment on Surrounding Nations', details: 'Tyre pride, Ammon, Philistine judgment, and Pharaoh compared to fallen cedar.' },
      { range: [33, 39], label: 'Good Shepherd & Dry Bones Resurrection', details: 'Responsibility of watchman, Ezk 34 true shepherd, Ezk 37 wind over bones.' },
      { range: [40, 48], label: 'The Temple of Living Streams', details: 'Exact measurements, return of Shekinah, river from altar healing oceans.' }
    ],
    keyVerses: [
      { chapter: 36, verse: 26, ref: 'Ezekiel 36:26', text: 'I will also give you a new heart, and I will put a new spirit within you. I will take away the stony heart out of your flesh, and I will give you a heart of flesh.' },
      { chapter: 37, verse: 4, ref: 'Ezekiel 37:4-5', text: 'He said to me, “Prophesy over these bones, and tell them, ‘You dry bones, hear Yahweh’s word!’... Behold, I will cause breath to enter into you, and you shall live.”' }
    ]
  },
  DAN: {
    author: 'Daniel',
    period: 'c. 530 BC',
    theme: 'Sovereignty over Kingdoms, Integrity & Apocalyptic Visions',
    summary: 'Young Daniel and his three friends maintain integrity in Babylon’s royal courts. Outlives empires, survives lions’ den, and receives massive beast-visions of the coming Son of Man.',
    africanFocus: 'Empowers church youth to withstand peer pressures, lead ethical lives in administrative systems, and stand bold against physical lions of threat.',
    outlineParts: [
      { range: [1, 6], label: 'Stories of Court Defiance', details: 'Diet choice, dream of statue, fiery furnace rescue, Nebuchadnezzar madness, writing on wall, lions’ den.' },
      { range: [7, 12], label: 'Apocalyptic Visions of Future Empires', details: 'Four beasts, Son of Man throne, 70 weeks timeline, final cosmic battle victory.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 44, ref: 'Daniel 2:44', text: 'The God of heaven will set up a kingdom which will never be destroyed... but it will stand forever.' },
      { chapter: 6, verse: 22, ref: 'Daniel 6:22', text: 'My God has sent his angel, and has shut the lions’ mouths, and they have not hurt me.' }
    ]
  },
  HOS: {
    author: 'Hosea',
    period: 'c. 715 BC',
    theme: 'Unfailing Covenant Love of God',
    summary: 'Instructed to marry unfaithful Gomer to mirror God’s love for wayward Israel. Hosea redeems her from the slave market, displaying infinite mercy.',
    africanFocus: 'An incredible commentary on reconciliation, restoring broken family links, and God’s deep longing to heal neighborhoods regardless of their past stray paths.',
    outlineParts: [
      { range: [1, 3], label: 'Tragic Marriage Prophecy', details: 'Naming children of judgment, divorce court, Gomer’s ransom and recovery.' },
      { range: [4, 14], label: 'Adultery Evicted from Israel', details: 'Cultic dry trees, Ephraim compared to cake unturned, and final mercy rain.' }
    ],
    keyVerses: [
      { chapter: 6, verse: 6, ref: 'Hosea 6:6', text: 'For I desire mercy, and not sacrifice; and the knowledge of God more than burnt offerings.' }
    ]
  },
  JOL: {
    author: 'Joel',
    period: 'c. 835 or 500 BC',
    theme: 'The Day of the Lord & Spirit Pour Out',
    summary: 'Prophesies a catastrophic plague of locusts as judgment, calling for physical tearing of hearts. Promises seasonal rain restoration and the ultimate pouring out of God’s Spirit.',
    africanFocus: 'The bedrock foundation of Pentecostal fire in Africa, connecting ecological restoration to spiritual revival for both old and young, male and female.',
    outlineParts: [
      { range: [1, 2], label: 'Locust Devastation & Emergency Fast', details: 'Stripped crops, warning trumpet blow, tearing hearts instead of clothes demand.' },
      { range: [3, 3], label: 'The Valley of Decision', details: 'Pour out of the Spirit, blood moon stars drop, judgments on nations.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 28, ref: 'Joel 2:28', text: 'It will happen afterward, that I will pour out my Spirit on all flesh; and your sons and your daughters will prophesy. Your old men will dream dreams, your young men will see visions.' }
    ]
  },
  AMO: {
    author: 'Amos',
    period: 'c. 760 BC',
    theme: 'Social Justice, diluting of Hypocritical Worship',
    summary: 'A simple shepherd from Tekoa, Amos condemns systemic greed, judicial corruption, and the exploitation of the poor in privileged Israel.',
    africanFocus: 'The paramount scriptural mandate for structural social justice, clean financial ethics, and community advocacy against corrupt land grabs.',
    outlineParts: [
      { range: [1, 2], label: 'Oracles over Damascus and Damascus Kingdoms', details: 'Surrounding nations judged, and Israel’s specific poor exploitation unmasked.' },
      { range: [3, 6], label: 'Cries of Oppressed Cities', details: 'The cow herd of Bashan luxury critique, temple song critique: “I hate your feasts.”' },
      { range: [7, 9], label: 'Visions of Locust and Swarm', details: 'Plumb line vision, basket of summer fruit, restoration of David’s tabernacle.' }
    ],
    keyVerses: [
      { chapter: 5, verse: 24, ref: 'Amos 5:24', text: 'But let justice roll down like waters, and righteousness like a mighty stream.' }
    ]
  },
  OBD: {
    author: 'Obadiah',
    period: 'c. 586 BC',
    theme: 'Judgment on Pride & Sibling Betrayals',
    summary: 'The shortest OT book, assessing judgment on Edom for standing passive and gloating while their brother Jacob/Judah was pilfered by Babylon.',
    africanFocus: 'Reminds that standing passive or gloating over neighbor tragedies breaks holy covenant; outlines communal defense and justice.',
    outlineParts: [
      { range: [1, 1], label: 'Arrogance in Rock Crevices', details: 'Edom’s height pride broken, family betrayal corrected, and mount Zion’s escape.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 17, ref: 'Obadiah 1:17', text: 'But on Mount Zion there will be escape, and it will be holy. The house of Jacob will possess their possessions.' }
    ]
  },
  JON: {
    author: 'Jonah (traditionally)',
    period: 'c. 760 BC',
    theme: 'God’s Mercy on Multi-Ethnic Enemies',
    summary: 'Fleeing God’s call to warn Nineveh, Jonah is swallowed by a great fish. Repents, preaches, Nineveh converts, and Jonah learns God’s mercy is global and cross-cultural.',
    africanFocus: 'Rebukes narrow structural tribalism; calls native leaders to express hope and redemptive message to all peoples without bias.',
    outlineParts: [
      { range: [1, 1], label: 'Flight in Ship to Tarshish', details: 'Storm, sailors cast lots, fish swallowing.' },
      { range: [2, 2], label: 'Prayer from the Belly of Fish', details: 'Jonah cries from the depths, promised thanksgiving.' },
      { range: [3, 4], label: 'Nineveh Repentance & Gourd Lesson', details: 'Conversion of city in sackcloth, gourd vine shade lesson, God’s mercy for communities.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 9, ref: 'Jonah 2:9', text: 'Salvation is of Yahweh.' },
      { chapter: 4, verse: 11, ref: 'Jonah 4:11', text: 'Should I not have regard for Nineveh, that great city, in which are more than one hundred twenty thousand persons?' }
    ]
  },
  MIC: {
    author: 'Micah',
    period: 'c. 735 - 700 BC',
    theme: 'True Worship vs. Exploitation & Bethlehem Ruler',
    summary: 'Attacks greedy landlords and corrupt priests. Prophesies the Messiah’s birthplace in Bethlehem and gives the definitive definition of true holy conduct.',
    africanFocus: 'Condemns exploitation of hard-working farmers and highlights humble origins as fertile grounds for God\'s leading rulers.',
    outlineParts: [
      { range: [1, 3], label: 'Ruin of Samaria & Oppressions', details: 'Injustice on farming sites, plotting evil on beds.' },
      { range: [4, 5], label: 'Future Glories & Bethlehem Promise', details: 'Swords into plowshares, a ruler from Bethlehem Ephrathah.' },
      { range: [6, 7], label: 'What Yahweh Requires', details: 'Covenant lawsuit, true justice and mercy walk.' }
    ],
    keyVerses: [
      { chapter: 5, verse: 2, ref: 'Micah 5:2', text: 'But you, Bethlehem Ephrathah, being small among the clans... out of you shall one come forth to me who is to be ruler in Israel.' },
      { chapter: 6, verse: 8, ref: 'Micah 6:8', text: 'He has shown you, O man, what is good. What does Yahweh require of you, but to act justly, to love mercy, and to walk humbly with your God?' }
    ]
  },
  NAM: {
    author: 'Nahum',
    period: 'c. 660 BC',
    theme: 'Fall of Oppressive Nineveh',
    summary: 'A fierce poetic declaration of the collapse of Nineveh, the violent empire that terrorized Western Asia, revealing that empires of cruelty will face divine justice.',
    africanFocus: 'Speaks to the inevitable collapsing of systems of absolute brutality and modern imperial exploitation.',
    outlineParts: [
      { range: [1, 3], label: 'Majesty of God & Siege of Nineveh', details: 'Oceans dry in anger, comforting faithful ones, battle axes, ruined fortress.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 7, ref: 'Nahum 1:7', text: 'Yahweh is good, a stronghold in the day of trouble; and he knows those who take refuge in him.' }
    ]
  },
  HAB: {
    author: 'Habakkuk',
    period: 'c. 605 BC',
    theme: 'Wrestling with Injustices & Living by Faith',
    summary: 'Instead of preaching, Habakkuk asks God tough questions: Why handle local corruption with worse Babylonian invaders? Concludes with quiet faith.',
    africanFocus: 'An incredible dialogue model for addressing deep political crises, corruption, and maintaining quiet joy inside empty fields of harvest.',
    outlineParts: [
      { range: [1, 1], label: 'First Question of Violence', details: 'Why look on iniquity, and Babylon raised as judgment.' },
      { range: [2, 2], label: 'Watchtower of Faith & Woes', details: 'Writing table, “The righteous shall live by faith”, woes on corrupt builders.' },
      { range: [3, 3], label: 'prayer song of Joy in Desolation', details: 'March through wilderness, joy even if fig trees don’t crop.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 4, ref: 'Habakkuk 2:4', text: 'Behold, his soul is puffed up. It is not upright in him; but the righteous will live by his faith.' },
      { chapter: 3, verse: 17, ref: 'Habakkuk 3:17-18', text: 'For though the fig tree doesn’t flourish, neither is there fruit in the vines... yet I will rejoice in Yahweh. I will be joyful in the God of my salvation.' }
    ]
  },
  ZEP: {
    author: 'Zephaniah',
    period: 'c. 630 BC',
    theme: 'Purifying Judgments & Song of Restoration',
    summary: 'Warns of global sweep judgments on idolatry, but ends with God singing joyfully over a purified, humble remnant.',
    africanFocus: 'A vital reminder that religious syncretism defeats community clarity; demonstrates that God sings loving melodies over humble people.',
    outlineParts: [
      { range: [1, 3], label: 'Day of Wrath & remant of Praise', details: 'Judah’s syncretists swept, but remnants rejoicing in Zion.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 17, ref: 'Zephaniah 3:17', text: 'Yahweh your God is among you, a mighty one who will save. He will rejoice over you with joy... he will sing over you with shouting.' }
    ]
  },
  HAG: {
    author: 'Haggai',
    period: 'c. 520 BC',
    theme: 'Priorities, Rebuilding the Temple & Glories',
    summary: 'Challenges expatriates who build paneled houses while leaving God’s house in ruins. Encourages that second temple glory will exceed Solomon’s.',
    africanFocus: 'Direct, clear encouragement for cooperative community building, setting spiritual structures ahead of individual hoarding.',
    outlineParts: [
      { range: [1, 2], label: 'Prioritizing Temple Wood', details: 'Drought linked to neglect, hands made strong, gold is mine decree.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 9, ref: 'Haggai 2:9', text: '“The latter glory of this house will be greater than the former,” says Yahweh of Armies; “and in this place I will give peace.”' }
    ]
  },
  ZEC: {
    author: 'Zechariah',
    period: 'c. 520 BC',
    theme: 'Night Visions, Priestly Consecration & Triumph of Messiah',
    summary: 'A book of strange apocalyptic visions (flying scrolls, colored horses) encouraging temple building, Joshua crowned, and prophecies of Messiah on donkey.',
    africanFocus: 'Relates directly to dreams, spiritual realities, cleansing from community garments of accusation, and victory "not by might but by Spirit."',
    outlineParts: [
      { range: [1, 8], label: 'Eight Vision of Night', details: 'Horses, measuring lines, Joshua’s dirty clothes swapped for crowns, golden lampstand.' },
      { range: [9, 14], label: 'Messiah’s Humble Entry & Reign', details: 'Ruler on donkey colt, pierced shepherd, living streams flowing from Jerusalem.' }
    ],
    keyVerses: [
      { chapter: 4, verse: 6, ref: 'Zechariah 4:6', text: 'He answered and spoke to me, saying, “This is Yahweh’s word to Zerubbabel, saying, ‘Not by might, nor by power, but by my Spirit,’ says Yahweh of Armies.”' },
      { chapter: 9, verse: 9, ref: 'Zechariah 9:9', text: 'Rejoice greatly, daughter of Zion!... Behold, your King comes to you! He is righteous, and having salvation; lowly, and riding on a donkey.' }
    ]
  },
  MAL: {
    author: 'Malachi',
    period: 'c. 430 BC',
    theme: 'Robbing God, Covenant Integrity & Sunrise of Righteousness',
    summary: 'Written as a series of disputes where priests and people question God’s love. Rebukes cheap sacrifices, broken marriages, and promises Elijah’s return.',
    africanFocus: 'Addresses proper tithe offerings, corporate honor, and looking forward to the dawn of righteousness with healing wings over community.',
    outlineParts: [
      { range: [1, 2], label: 'Disputes on Love and Lambs', details: 'Crippled sacrifices mocked, breaking covenant with wives.' },
      { range: [3, 4], label: 'Tithing Windows & Elijah’s Sunrise', details: 'Robbing God in tithes, overflow windows blessing, sun of righteousness rise.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 10, ref: 'Malachi 3:10', text: 'Bring the whole tithe into the storehouse, that there may be food in my house, and test me now in this... if I will not open you the windows of heaven, and pour you out a blessing, that there will not be room enough to receive it.' },
      { chapter: 4, verse: 2, ref: 'Malachi 4:2', text: 'But to you who fear my name shall the sun of righteousness arise with healing in its wings. You will go out, and leap like calves from the stall.' }
    ]
  },
  MAT: {
    author: 'Matthew',
    period: 'c. AD 60s',
    theme: 'Jesus as King-Messiah, Kingdom of Heaven & Discipleship',
    summary: 'The Gospel introducing Jesus’ genealogy and birth, His foundational Sermon on the Mount (Matthew 5-7), his commissioning of disciples, and ultimate rising.',
    africanFocus: 'Emphasizes that Jesus fulfills the law, institutes a kingdom of absolute familial love, and commissions simple rural workers to change world nations.',
    outlineParts: [
      { range: [1, 4], label: 'Kingdom Birth & Early Testing', details: 'Ancestral roots, Bethlehem star, flight to Egypt, escape, water baptism, and wilderness battle.' },
      { range: [5, 7], label: 'The Magna Carta: Sermon on Mount', details: 'The Beatitudes, salt and light, love of enemy, prayer pattern, and solid house foundation.' },
      { range: [8, 13], label: 'Ministry and Kingdom Parables', details: 'Leprosy cures, storm stilling, mustard seed and hidden treasure kingdoms.' },
      { range: [14, 20], label: 'Feeding Crowds & Transfiguration Mount', details: 'Five loaves feeding, Peter’s faith confessions, mountain transformation.' },
      { range: [21, 28], label: 'Suffering King Rising', details: 'Donkey entry, Olivet predictions, crucifixion, and the Great Commission.' }
    ],
    keyVerses: [
      { chapter: 5, verse: 3, ref: 'Matthew 5:3', text: 'Blessed are the poor in spirit, for theirs is the Kingdom of Heaven.' },
      { chapter: 28, verse: 19, ref: 'Matthew 28:19', text: 'Go therefore, and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.' }
    ]
  },
  MRK: {
    author: 'Mark (Peter’s interpreter)',
    period: 'c. AD 55s',
    theme: 'Jesus as the Suffering Servant & Fast Servant Works',
    summary: 'Incredibly fast-paced Gospel showing Jesus as the active servant-leader, moving "immediately" from sickness heals to battling demons, and modeling ultimate self-sacrifice.',
    africanFocus: 'Highlights active, hands-on, community-minded ministry, physical healing restoration, and bold spiritual authority over demonic fears.',
    outlineParts: [
      { range: [1, 8], label: 'The Active Messenger in Galilee', details: 'Mark baptisms, healing paralytics, calming seas, feeding 4000.' },
      { range: [9, 16], label: 'Sacrifice Journey to Jerusalem', details: 'Servant suffering announced, cross road, garden sweat, mock trial, open tomb.' }
    ],
    keyVerses: [
      { chapter: 10, verse: 45, ref: 'Mark 10:45', text: 'For the Son of Man also came not to be served, but to serve, and to give his life as a ransom for many.' }
    ]
  },
  LUK: {
    author: 'Luke the Physician',
    period: 'c. AD 60s',
    theme: 'Jesus the Compassionate Savior of All Outcasts',
    summary: 'An orderly history highlighting Jesus’ mercy to widows, poor, tax collectors, and Samaritans. Includes famous parables like Prodigal Son and Good Samaritan.',
    africanFocus: 'Speaks directly to clinical health healers, honoring marginalized women, welcoming social refugees, and restoring prodigal sons to tribal homes.',
    outlineParts: [
      { range: [1, 4], label: 'Pre-Histories & Wilderness Launch', details: 'Mary’s Magnificat song, temple shepherd visit, Nazareth synagogue statement of Isaiah 61.' },
      { range: [5, 9], label: 'Sickness Cure Miracles in Galilee', details: 'Centurion’s servant cured, widow’s son at Nain resurrection, storms silenced.' },
      { range: [10, 19], label: 'Travel Sermons & Lost parables', details: 'Good Samaritan, Martha/Mary, Lost Coin, Prodigal Son, Rich man cistern.' },
      { range: [20, 24], label: 'Jerusalem Victory, Emmaus Road', details: 'Cross trials, walk to Emmaus with burning hearts, ascension from Bethany.' }
    ],
    keyVerses: [
      { chapter: 4, verse: 18, ref: 'Luke 4:18', text: 'The Spirit of the Lord is on me, because he has anointed me to preach good news to the poor. He has sent me to heal the brokenhearted, to preach deliverance to the captives...' },
      { chapter: 19, verse: 10, ref: 'Luke 19:10', text: 'For the Son of Man came to seek and to save that which was lost.' }
    ]
  },
  JHN: {
    author: 'John the Apostle',
    period: 'c. AD 85s',
    theme: 'Jesus is God’s Word Made Flesh, Light & Life',
    summary: 'A theological Gospel presenting Jesus’ seven "I AM" claims and seven miraculous signs, demonstrating that belief in Him brings eternal life.',
    africanFocus: 'Profoundly connects with deep-seated African respect for divine life forces, light prevailing over dark sorceries, and true corporate unity in vines.',
    outlineParts: [
      { range: [1, 1], label: 'The Eternal Word Prologue', details: 'Word made flesh, John’s water witness, calling first fishers.' },
      { range: [2, 12], label: 'The Book of Seven Holy Signs', details: 'Cana water conversion, Nicodemus, Samaritan well water, feeding 5000, sight heal, Lazarus rise.' },
      { range: [13, 17], label: 'Upper Room Washing & Farewell Discourse', details: 'Feast washing, I am the Way, Holy Spirit helper promised, true vine garden.' },
      { range: [18, 21], label: 'Cross Triumphs, Sea Restoration', details: 'Pilate court, crucifying hill, Mary garden tomb visit, Peter’s barbecue shore commission.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 1, ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { chapter: 3, verse: 16, ref: 'John 3:16', text: 'For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.' },
      { chapter: 14, verse: 6, ref: 'John 14:6', text: 'Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father, except through me.”' },
      { chapter: 15, verse: 5, ref: 'John 15:5', text: 'I am the vine. You are the branches. He who remains in me, and I in him, the same bears much fruit, for apart from me you can do nothing.' }
    ]
  },
  ACT: {
    author: 'Luke the Physician',
    period: 'c. AD 62',
    theme: 'Pentecost Fire, Holy Spirit Guidance & Global Scope',
    summary: 'Chronicles the descent of the Spirit on Pentecost, the expansion of the early church from Jerusalem to Rome through Peter, Stephen, Philip, and Paul’s missionary journeys.',
    africanFocus: 'Extremely resonant with the dynamic growth of Spirit-filled communities in Africa, demonstrating miracles, street preaching, and cross-cultural barriers falling.',
    outlineParts: [
      { range: [1, 7], label: 'The Church Birth in Jerusalem', details: 'Spirit wind fire, Peter’s sermon, communal sharing, Stephen’s stone martyrdom.' },
      { range: [8, 12], label: 'Judea and Samaria Expansions', details: 'Philip in Samaria, Ethiopian Eunuch (first African convert) baptised, Saul’s Damascus conversion.' },
      { range: [13, 20], label: 'Paul’s Missionary Journeys', details: 'Athens marketplace talk, prison singing at midnight, Ephesian sorcery sweeps.' },
      { range: [21, 28], label: 'Paul’s Trials to Imperial Rome', details: 'Jerusalem arrest, sea storm shipwreck, preaching in chains in Caesar capital.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 8, ref: 'Acts 1:8', text: 'But you will receive power when the Holy Spirit has come upon you. You will be my witnesses... to the uttermost parts of the earth.' },
      { chapter: 8, verse: 37, ref: 'Acts 8:36-38', text: 'The Ethiopian eunuch said, “Behold, here is water. What limits me from being baptized?”... and Philip baptized him.' }
    ]
  },
  ROM: {
    author: 'Paul of Tarsus',
    period: 'c. AD 57',
    theme: 'Justification by Faith, Grace & Righteousness',
    summary: 'A theological masterpiece detailing that all have sinned, justification is purely by faith in Christ, God is faithful to Israel, and believers must live as living sacrifices.',
    africanFocus: 'Affirms that God is completely impartial, leveling all ethnic structures, welcoming both Jew and Gentile into family reconciliation.',
    outlineParts: [
      { range: [1, 4], label: 'Universal Need of Grace', details: 'Creation evidence, conscience law, all have fallen, justification defined.' },
      { range: [5, 8], label: 'Life of Freedom in Spirit', details: 'Peace with God, Adam comparison, body instruments of righteousness, Rom 8 no condemnation.' },
      { range: [9, 11], label: 'The Mystery of Olive Branches', details: 'Sovereignty, Israel’s stumbling, Gentile ingraft, global rescue plan.' },
      { range: [12, 16], label: 'The Consecrated Community Walk', details: 'Living sacrifices, diverse body gifts, civil submission, weak vs. strong grace rules.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 23, ref: 'Romans 3:23-24', text: 'For all have sinned, and fall short of the glory of God; being justified freely by his grace through the redemption that is in Christ Jesus.' },
      { chapter: 8, verse: 28, ref: 'Romans 8:28', text: 'We know that all things work together for good for those who love God, to those who are called according to his purpose.' },
      { chapter: 12, verse: 1, ref: 'Romans 12:1', text: 'Therefore I urge you, brothers, by the mercies of God, to present your bodies a living sacrifice, holy, acceptable to God, which is your spiritual service.' }
    ]
  },
  '1CO': {
    author: 'Paul of Tarsus',
    period: 'c. AD 55',
    theme: 'Unity over Divisions, Spiritual Gifts & Love',
    summary: 'Corrects fractional groups in Corinth. Handles church court issues, guidelines for gifts, the central supremacy of love, and the physical reality of the resurrection.',
    africanFocus: 'Addresses communal fractions, advocating for order in worship, respecting body margins, and anchoring hope in resurrection.',
    outlineParts: [
      { range: [1, 4], label: 'Conquering Cliques & Cross Wisdom', details: 'I follow Paul vs Cepas split, cross foolishness to wise.' },
      { range: [5, 11], label: 'Discipline in Church Families', details: 'Moral sweeps, lawsuits, marriage choices, freedom from idols foods.' },
      { range: [12, 14], label: 'Spiritual Gifts Directed by Love', details: 'Many members one body, the hymn to Love (1 Cor 13), speaking in tongues ordered.' },
      { range: [15, 16], label: 'Resurrection Defending', details: 'Firstfruits, mortal put on immortality, death sting swallowed.' }
    ],
    keyVerses: [
      { chapter: 13, verse: 4, ref: '1 Corinthians 13:4-7', text: 'Love is patient and is kind; love doesn’t envy... bears all things, believes all things, hopes all things, endures all things.' },
      { chapter: 15, verse: 58, ref: '1 Corinthians 15:58', text: 'Therefore, my beloved brothers, be steadfast, immovable, always abounding in the Lord’s work, because you know that your labor is not in vain.' }
    ]
  },
  '2CO': {
    author: 'Paul of Tarsus',
    period: 'c. AD 56',
    theme: 'Apostolic Affliction, Generous Givers & Ministry Power',
    summary: 'Defends Paul’s ministry. Outlines jars of clay holding heavenly treasures, joyful financial giving, and power perfected in physical weakness.',
    africanFocus: 'Encourages poor and marginalized churches in cheerful giving out of deep joy, and looks at suffering as fuel for deeper console ministry.',
    outlineParts: [
      { range: [1, 7], label: 'Jars of Clay', details: 'Consolation under pain, aroma of Christ, glory of New covenant, temporary tents.' },
      { range: [8, 9], label: 'Joyful Givers Seed Harvest', details: 'God loves a cheerful giver, sowing bountifully brings graceful crop.' },
      { range: [10, 13], label: 'Boasting in Infirmities', details: 'Super-apostles exposed, third heaven vision, thorn in the flesh grace.' }
    ],
    keyVerses: [
      { chapter: 9, verse: 7, ref: '2 Corinthians 9:7', text: 'Let each one give as he has determined in his heart... for God loves a cheerful giver.' },
      { chapter: 12, verse: 9, ref: '2 Corinthians 12:9', text: 'He has said to me, “My grace is sufficient for you, for my power is made perfect in weakness.”' }
    ]
  },
  GAL: {
    author: 'Paul of Tarsus',
    period: 'c. AD 48',
    theme: 'Freedom from Law Legalism & Fruit of Spirit',
    summary: 'A passionate defense of liberty in Christ over legalistic rules, declaring believers as adoptive children, and outlining walk in the Spirit.',
    africanFocus: 'Warns against religious structures that chain believers to legalisms; champions Spirit freedom manifested in social compassion.',
    outlineParts: [
      { range: [1, 2], label: 'One True Gospel defending', details: 'Paul’s calling authority, Peter confrontation at Antioch.' },
      { range: [3, 4], label: 'Adopted Sons vs Abraham Slave', details: 'Law as a schoolmaster, sonship adoption, Sarah/Hagar metaphor.' },
      { range: [5, 6], label: 'Walking in Free Spirit Fruits', details: 'Do not submit to yoke, fruits of Spirit list, burden bearing.' }
    ],
    keyVerses: [
      { chapter: 5, verse: 22, ref: 'Galatians 5:22-23', text: 'But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control. Against such things there is no law.' }
    ]
  },
  EPH: {
    author: 'Paul of Tarsus',
    period: 'c. AD 62',
    theme: 'Cosmic Church Unity & Full Armor of God',
    summary: 'Reveals God’s focus to unite heaven and earth in Christ. Details walk of unity, marital cords as Christ/Church pattern, and fighting in God’s armor.',
    africanFocus: 'An excellent grid for combatting fear of spiritual darkness, ancestors or witchcraft by using the ultimate shield of faith and belt of truth.',
    outlineParts: [
      { range: [1, 3], label: 'Glories in Heavenly Spheres', details: 'Predestinated grace, corner bedrock unity of Jew/Gentile, Ephesians prayer.' },
      { range: [4, 6], label: 'Communal Walk & Protective Sword Armor', details: 'Five-fold ministry gifts, new self put-off, husband/wife cords, spiritual war armor.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 8, ref: 'Ephesians 2:8', text: 'For by grace you have been saved through faith, and that not of yourselves; it is the gift of God.' },
      { chapter: 6, verse: 11, ref: 'Ephesians 6:11', text: 'Put on the whole armor of God, that you may be able to stand against the wiles of the devil.' }
    ]
  },
  PHP: {
    author: 'Paul of Tarsus',
    period: 'c. AD 62',
    theme: 'Joy in Prison, Christ Humility Descend & Contentment',
    summary: 'A letter of thank-you and joy written in chains. Traces Christ’s descent from equality with God to the cross, and calls for joyful contentment.',
    africanFocus: 'Models resilient contentment and joy among trying economic times, finding security in Christ who strengthens us.',
    outlineParts: [
      { range: [1, 2], label: 'To Live is Christ & Humility Hymn', details: 'Chains advance gospel, count others better, Christ descended mind.' },
      { range: [3, 4], label: 'Advancing Forward & Peace Rejoicing', details: 'Pressing toward mark, peace beyond minds, finding strength in Christ.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 5, ref: 'Philippians 2:5-7', text: 'Have this in your mind, which was also in Christ Jesus, who, existing in the form of God... emptied himself, taking the form of a servant...' },
      { chapter: 4, verse: 13, ref: 'Philippians 4:13', text: 'I can do all things through Christ, who strengthens me.' }
    ]
  },
  COL: {
    author: 'Paul of Tarsus',
    period: 'c. AD 62',
    theme: 'Preeminence of Cosmic Christ & Purity Walks',
    summary: 'Presents Christ as the sovereign image of invisible creator, firstborn of creation. Warns against empty philosophies and coordinates new household codes.',
    africanFocus: 'Asserts Christ reigns over all spiritual hierarchies, elemental forces, and ancestral thrones, rendering fear of signs fully obsolete.',
    outlineParts: [
      { range: [1, 2], label: 'The Supreme Christ Image', details: 'Firstborn of cosmos, reconciler on cross, warning against legal scrolls.' },
      { range: [3, 4], label: 'Raised Hearts with King', details: 'Put on compassion, coordinate families, final helper names.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 15, ref: 'Colossians 1:15-16', text: 'He is the image of the invisible God, the firstborn of all creation. For by him all things were created, in the heavens and on the earth...' }
    ]
  },
  '1TH': {
    author: 'Paul of Tarsus',
    period: 'c. AD 51',
    theme: 'Steadfast Faith & Return of the Lord',
    summary: 'Nurtures a young church under trials, praising their work of faith. Reassures them concerning deceased believers who will rise at the trumpet call.',
    africanFocus: 'Addresses proper bereavement comfort; demonstrates how ancestors in Christ will rise first, anchoring hope beyond graves.',
    outlineParts: [
      { range: [1, 3], label: 'Spreading Faith under Fires', details: 'Commended work, Thessalonian model, Paul’s motherly heart visits.' },
      { range: [4, 5], label: 'Purity walk & Trumpet Resurrection', details: 'Sanctification call, thieves in night, dead in Christ rise.' }
    ],
    keyVerses: [
      { chapter: 4, verse: 16, ref: '1 Thessalonians 4:16', text: 'For the Lord himself will descend from heaven with a shout, with the voice of the archangel, and with the trumpet of God. The dead in Christ will rise first.' }
    ]
  },
  '2TH': {
    author: 'Paul of Tarsus',
    period: 'c. AD 51',
    theme: 'Enduring Suffering, the Rebel Leader & Work Ethics',
    summary: 'Clears confusion regarding the Day of the Lord, warning against forged letters. Rebukes idle members: "If anyone will not work, let him not eat."',
    africanFocus: 'Promotes robust work ethics, discouraging religious escapisms that neglect daily agricultural and communal duties.',
    outlineParts: [
      { range: [1, 2], label: 'Standing Strong & Lawless ruler warning', details: 'Relief at return, son of perdition must occupy before sweep.' },
      { range: [3, 3], label: 'Industry in Community', details: 'Idle warning: “If anyone will not work, let him not eat.”' }
    ],
    keyVerses: [
      { chapter: 3, verse: 10, ref: '2 Thessalonians 3:10', text: 'For even when we were with you, we commanded you this: “If anyone will not work, let him not eat.”' }
    ]
  },
  '1TI': {
    author: 'Paul of Tarsus',
    period: 'c. AD 62-64',
    theme: 'Church Order, Leadership Integrity & Trustworthy Sayings',
    summary: 'A mentor letter to young Timothy in Ephesus, detailing structural qualifications for pastors/elders, deacons, widows, and warnings against money greed.',
    africanFocus: 'The vital standard guide for training upright Christian leaders, treating church finances with transparency, and keeping order.',
    outlineParts: [
      { range: [1, 2], label: 'Guarding Doctrine & Corporate Prayer', details: 'Faithful sayings, praying for kings, roles in worship gatherings.' },
      { range: [3, 4], label: 'Pastoral Qualifications & Apostasy warning', details: 'Bishop traits, deacon moral standards, training in holiness.' },
      { range: [5, 6], label: 'Community Care & Safe Money Habits', details: 'Honoring mothers/widows, love of money is root of all evil, good fight.' }
    ],
    keyVerses: [
      { chapter: 6, verse: 10, ref: '1 Timothy 6:10', text: 'For the love of money is a root of all kinds of evil. Some have been led astray from the faith in their greed...' }
    ]
  },
  '2TI': {
    author: 'Paul of Tarsus',
    period: 'c. AD 66-67',
    theme: 'Enduring Hardship, Scripture Integrity & Legacy',
    summary: 'Paul’s final written letter from a cold Roman jail before execution. Exhorts Timothy to stand strong, preach the Word, and hold onto God-breathed scripture.',
    africanFocus: 'Inspires leaders to endure hardship like good soldiers, pass the torch safely, and anchor truth in absolute, firm foundations.',
    outlineParts: [
      { range: [1, 2], label: 'The Unchained Word & Soldier Spirit', details: 'Timothy’s grandmother Lois legacy, soldier and athlete code, word unchained.' },
      { range: [3, 4], label: 'Dangerous Seasons & Preaching Charger', details: 'Sellers of empty words, scripture inspired, Davidic fight finished, crown of life.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 7, ref: '2 Timothy 1:7', text: 'For God didn’t give us a spirit of fear, but of power, love, and self-control.' },
      { chapter: 3, verse: 16, ref: '2 Timothy 3:16', text: 'Every Scripture is God-breathed and profitable for teaching, for reproof, for correction, and for instruction in righteousness.' }
    ]
  },
  TIT: {
    author: 'Paul of Tarsus',
    period: 'c. AD 62-64',
    theme: 'Sound Doctrine, Good Deeds & Crete Order',
    summary: 'Paul instructs Titus on the island of Crete to appoint upright elders and encourage multiple generations to excel in practical good works.',
    africanFocus: 'Demonstrates that christian conversions must manifest in pristine, visible good deeds that elevate community life.',
    outlineParts: [
      { range: [1, 3], label: 'Appointing Elders & Good Deeds Integrity', details: 'Creten characters corrected, aged teaching young, washing of rebirth.' }
    ],
    keyVerses: [
      { chapter: 3, verse: 5, ref: 'Titus 3:5', text: 'Not by works of righteousness which we did ourselves, but according to his mercy he saved us, through the washing of regeneration and renewing by the Holy Spirit.' }
    ]
  },
  PHM: {
    author: 'Paul of Tarsus',
    period: 'c. AD 62',
    theme: 'Slavery Restorations & Brotherly Reconciliation',
    summary: 'Paul appeals to Philemon to welcome back his runaway slate slave, Onesimus, no longer as a slave but as a beloved brother in faith.',
    africanFocus: 'A revolutionary scriptural engine dismantling social classes and slaveries, asserting absolute shared brotherhood at the Lord’s table.',
    outlineParts: [
      { range: [1, 1], label: 'Onesimus Reconciliation', details: 'Charges put on Paul’s bill account, slave welcomed back as equal brother.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 16, ref: 'Philemon 1:16', text: 'No longer as a servant, but more than a servant, a beloved brother.' }
    ]
  },
  HEB: {
    author: 'Unknown (associated with Paul)',
    period: 'c. AD 65s',
    theme: 'Preeminence of Jesus, High Priest & Cloud of Witnesses',
    summary: 'Demonstrates Jesus is superior to angels, Moses, and Levitical priests. Highlights His perfect sacrifice, and calls for endurance under fire (Heb 11 Faith Hall of Fame).',
    africanFocus: 'Provides an amazing theological replace for ancestral blood sacrifices, establishing Jesus’ blood as final, once-for-all covenant sanctuary protection.',
    outlineParts: [
      { range: [1, 4], label: 'Jesus Superior to Angels & Moses', details: 'Divine radiance, warning against drifting, rest landscape entry.' },
      { range: [5, 10], label: 'Melchizedek Priesthood & Perfect Sanctuary sacrifice', details: 'New covenant, high priests access, once-for-all pure temple blood.' },
      { range: [11, 13], label: 'The Hall of Faith & Cloud of Witnesses', details: 'Heb 11 heroes list, marathon of patience, final mountain assemblies.' }
    ],
    keyVerses: [
      { chapter: 11, verse: 1, ref: 'Hebrews 11:1', text: 'Now faith is assurance of things hoped for, a conviction of things not seen.' },
      { chapter: 12, verse: 1, ref: 'Hebrews 12:1-2', text: 'Therefore let’s also, seeing we are surrounded by so great a cloud of witnesses, lay aside every weight... looking to Jesus, the author and perfecter of faith.' }
    ]
  },
  JAS: {
    author: 'James (Jesus’ brother)',
    period: 'c. AD 45s',
    theme: 'Faith Manifested in Works, Tongue Curbing & Healing',
    summary: 'The Proverbs of NT. James challenges believers to prove their hidden faith through hands-on actions: controlling speech, caring for orphans, and sowing peace.',
    africanFocus: 'Resonates thoroughly with practical communal ethics: "Faith without works is dead." Challenges passive verbal assertions.',
    outlineParts: [
      { range: [1, 1], label: 'Taming Trials & Doing the Word', details: 'Joy in fires, asking wisdom without double minds, doers of law.' },
      { range: [2, 2], label: 'Faith without Good Deeds is Dead', details: 'No partial favoritism to rich, Abraham and Rahab’s active deeds.' },
      { range: [3, 5], label: 'Tongue Fire, Wealth Warnings & Elders Prayer', details: 'Rudder steering ships, tongue sparks, rich exploit workers warnings, elders oil healing prayer.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 22, ref: 'James 1:22', text: 'But be doers of the word, and not hearers only, deceiving yourselves.' },
      { chapter: 2, verse: 17, ref: 'James 2:17', text: 'Even so faith, if it has no works, is dead in itself.' }
    ]
  },
  '1PE': {
    author: 'Peter the Apostle',
    period: 'c. AD 63s',
    theme: 'Living Hope, Holy Priesthood & Suffering Integrity',
    summary: 'Encourages immigrant believers under severe trials, calling them a chosen generation and royal priesthood. Urges them to remain resilient in moral beauty.',
    africanFocus: 'Affirms that despite temporary physical displacements, we are a noble royal tribe in God’s heavenly community.',
    outlineParts: [
      { range: [1, 2], label: 'Incorruptible hope & Royal Priesthood', details: 'Gold purified by fire, cornerstone blocks, chosen nation traits.' },
      { range: [3, 5], label: 'Suffering for Righteousness & Elders flock', details: 'Wives/husbands codes, reason for hope, elders shepherd flock willingly.' }
    ],
    keyVerses: [
      { chapter: 2, verse: 9, ref: '1 Peter 2:9', text: 'But you are a chosen race, a royal priesthood, a holy nation, a people for God’s own possession...' }
    ]
  },
  '2PE': {
    author: 'Peter the Apostle',
    period: 'c. AD 65s',
    theme: 'Divine Nature, Scriptures origin & Second Coming',
    summary: 'Exhorts to grow in virtue, asserts the divine inspiration of prophets, warns against deceitful guides, and explains the patience of God’s return delay.',
    africanFocus: 'Calls communities to seek divine integrity, warning against self-seeking characters who commercialize the gospel.',
    outlineParts: [
      { range: [1, 1], label: 'Partakers of Divine Nature', details: 'Spiritual ladder of growth, eyeball witness of glory mount.' },
      { range: [2, 3], label: 'False Teachers warning & Patience of Return', details: 'Sodom escapes, daily mockers, 1000 years is a day patience.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 4, ref: '2 Peter 1:4', text: 'He has granted to us his precious and exceedingly great promises; that through these you may become partakers of the divine nature...' }
    ]
  },
  '1JN': {
    author: 'John the Apostle',
    period: 'c. AD 90',
    theme: 'Walking in Light, Fellowship & God is Love',
    summary: 'Provides assurance of eternal life, defining God as Light and Love. Calls believers to test spirits and love one another in deed and truth.',
    africanFocus: 'Highlights that active local love is the supreme evidence of genuine spiritual knowledge of God; expels fear of shadows.',
    outlineParts: [
      { range: [1, 2], label: 'Fellowship in the Light', details: 'Washing of blood, advocate with Father, new commandment to love.' },
      { range: [3, 4], label: 'The Children of God Loving', details: 'God is love, casts out fear, love in active deeds not just tongues.' },
      { range: [5, 5], label: 'Beating World Forces of Doubt', details: 'Three witnesses in heaven, boldness in prayer.' }
    ],
    keyVerses: [
      { chapter: 4, verse: 8, ref: '1 John 4:8', text: 'He who doesn’t love doesn’t know God, for God is love.' },
      { chapter: 4, verse: 18, ref: '1 John 4:18', text: 'There is no fear in love; but perfect love casts out fear...' }
    ]
  },
  '2JN': {
    author: 'John the Apostle',
    period: 'c. AD 90',
    theme: 'Truth, Command of Love & Watchfulness',
    summary: 'A short note to the "chosen lady" encouraging mutual love walking, and warning against welcoming teachers who deny Christ’s flesh.',
    africanFocus: 'Addresses proper local hospitality boundaries, prioritizing truth stability within church compounds.',
    outlineParts: [
      { range: [1, 1], label: 'Walking in Joint Commandments', details: 'Loving one another, anti-deceivers guard.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 6, ref: '2 John 1:6', text: 'This is love, that we should walk after his commandments.' }
    ]
  },
  '3JN': {
    author: 'John the Apostle',
    period: 'c. AD 90',
    theme: 'Hospitality to Brothers & Gaius Praise',
    summary: 'Praises Gaius for his hospital service to traveling missionaries, while rebuking Diotrephes for his self-seeking pride and refusal to welcome elders.',
    africanFocus: 'A direct study in community hospitality, honoring rural helpers, and warning against heavy-handed elders who seek self-glories.',
    outlineParts: [
      { range: [1, 1], label: 'Gaius vs Diotrephes', details: 'Supporting truth workers, keeping good reputation, health wishing.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 2, ref: '3 John 1:2', text: 'Beloved, I pray that you may prosper in all things and be in health, even as your soul prospers.' }
    ]
  },
  JUD: {
    author: 'Jude (Jesus’ brother)',
    period: 'c. AD 65s',
    theme: 'Contending for the Faith & Doxology of Preservation',
    summary: 'A brief, fiery call to contend earnestly for the faith against immoral infiltrators, ending in one of scripture’s most gorgeous preservation doxologies.',
    africanFocus: 'Calls communities to preserve foundational ethics undiluted, trusting in the God who is able to keep us from falling.',
    outlineParts: [
      { range: [1, 1], label: 'Contending for Faith foundations', details: 'False shepherds warnings, Enoch prophecies, magnificent keeping doxology.' }
    ],
    keyVerses: [
      { chapter: 1, verse: 24, ref: 'Jude 1:24', text: 'Now to him who is able to keep you from stumbling, and to present you faultless before the presence of his glory with exceeding joy...' }
    ]
  },
  REV: {
    author: 'John the Apostle',
    period: 'c. AD 95',
    theme: 'The Unveiling of Jesus, Triumphs & New Jerusalem',
    summary: 'Written from Patmos prison. Presents visual letters to seven churches, scrolls, seals, trumpets, vials, the destruction of Babylon, victory of Rider on White Horse, and the descent of New Jerusalem with tree of life.',
    africanFocus: 'Stirs African imagery and songs; guarantees that suffering is short, Jesus reigns, and all nations, tongues and tribes will worship in ultimate cosmic peace.',
    outlineParts: [
      { range: [1, 3], label: 'Letters to Seven Churches', details: 'Vision of glowing Jesus, letters correcting Ephesus, Smyrna, Thyatira, Laodicea.' },
      { range: [4, 7], label: 'Throne Room & Seven Seals', details: 'Twenty-four elders, emerald rainbow, lamb who was slain, 144,000 crowd.' },
      { range: [8, 11], label: 'Seven Trumpets & Two Witnesses', details: 'Censer fire, locust rise, bitter scrolls eaten, measuring temple, final trumpet blast.' },
      { range: [12, 19], label: 'Cosmic War & Fall of Babylon', details: 'Woman and dragon, beast from ocean, mark of beast warnings, harvest sickles, rider on white horse.' },
      { range: [20, 22], label: 'Reign, Final Verdict, New Jerusalem', details: 'White throne court, new heaven earth, crystal river, tree of life, “Come Lord Jesus!”' }
    ],
    keyVerses: [
      { chapter: 21, verse: 4, ref: 'Revelation 21:4', text: 'He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more.' },
      { chapter: 22, verse: 20, ref: 'Revelation 22:20', text: 'He who testifies of these things says, “Yes, I come quickly.” Amen! Yes, come, Lord Jesus!' }
    ]
  }
};

export function getOfflineCommentary(bookId: string): OfflineBookCommentary | undefined {
  return BOOK_COMMENTARIES[bookId];
}
