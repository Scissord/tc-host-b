import bcrypt from 'bcryptjs';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('user').del();

  const generateWebmasterData = async () => {
    const salt = await bcrypt.genSalt(10);

    const webmasters = {
      "13": "AbbasovAli1",
      "10": "AlzairPernebek3",
      "16": "BaidillaSabina1",
      "7": "BakbergenovAbylaikhan2",
      "3": "CherednichenkoAnastasiya1",
      "17": "KaliAzamat3",
      "18": "KassymovNurdaulet3",
      "5": "MahamatalievArtyq1",
      "11": "MakhamadiyorovAlisher1",
      "15": "MukhtarovaGulinur1",
      "9": "MusaevDaniyar2",
      "19": "SerikbayevBeknazar2",
      "25": "TTAbbasovAli1",
      "21": "TTBaidillaSabina1",
      "24": "TTBakbergenovAbylaikhan2",
      "22": "TTMahamatalievArtyq1",
      "23": "TTMakhamadiyorovAlisher1",
      "20": "TTMuhtarovaGulinur1",
      "26": "TTTolegenBekarys1",
      "8": "TaraburkinDanil2",
      "2": "TaubazarNurlyhan3",
      "12": "TolegenBekarys1",
      "1": "Vebmaster",
      "6": "YakubovArtem2",
      "4": "jun1",
      "14": "jun2"
    };

    const webmasterData = await Promise.all(
      Object.entries(webmasters).map(async ([id, login], index) => {
        const hashedPassword = await bcrypt.hash(login, salt); // Hash the login as the password
        return {
          id: 4 + index, // Use the key as the ID
          login: login, // Login from the value
          password: hashedPassword, // Hashed password
          name: login, // Name matches the login
        };
      })
    );

    return webmasterData;
  };

  const webmasters = await generateWebmasterData();

  const generateOperatorData = async () => {
    const salt = await bcrypt.genSalt(10);

    const operators = {
      "102618": "A.Abay_supervisor",
      "102666": "A.Adilet_VL",
      "102672": "A.Arailym_Alm",
      "102648": "A.Aybol_TM",
      "102654": "A.Dana_Supervisor",
      "102663": "A.Dildora_OKK",
      "102622": "A.Dilnoza_Tokyo",
      "102810": "A.Erzhan_Logistic",
      "102651": "A.Kamilla_TM",
      "103144": "A.Musa_Paris",
      "102645": "A.Nazerke_VL",
      "102615": "A.Sandugash_Logistic",
      "103033": "A.Yerassyl_Logistic",
      "102619": "A.Zarina_Tokyo",
      "102664": "A.Zhibek_VL",
      "102692": "AbuDinara_Logistic",
      "103169": "B.Beket_NY",
      "103333": "B.Berik_NY",
      "102696": "B.Gulsezim_Alm",
      "103390": "B.Indira_NY",
      "103143": "B.Nariman_Paris",
      "102628": "B.Nursat_Dubai",
      "102695": "B.Sabrina_Alm",
      "102699": "D.Abylai_Logistic",
      "102684": "D.Albert_Alm",
      "102676": "D.Saltanat_Alm",
      "102612": "E.Imangali_Logistic",
      "102650": "E.Sanzhar_TM",
      "102637": "I.Margulan_Paris",
      "102901": "K.Aidyn_Alm",
      "102669": "K.Arailym_Alm",
      "103355": "K.Behruz_Alm",
      "102673": "K.Gulnura_Alm",
      "103146": "K.Osken_Paris",
      "102665": "K.Uldana_Tokyo",
      "102639": "K.Ulymzhan_Paris",
      "103238": "L.Togzhan_Alm",
      "102670": "M.Aizhan_Alm",
      "102683": "M.Bagdana_TM",
      "102647": "M.Dias_VL",
      "102614": "M.Sabina_Logistic",
      "102655": "M.Saltanat_OKK",
      "102671": "M.Uldanay_Alm",
      "102675": "M.Zhaniya_Alm",
      "102653": "M.Zhasmin_Supervisor",
      "102636": "N.Altynai_Paris",
      "102608": "O.Dinmuhammed_Logistic",
      "102632": "O.Gulden_NY",
      "102667": "P.Gulnara_NY",
      "102646": "R.Baknur_VL",
      "102610": "S.Agaisha_Logistic",
      "102657": "S.Aziza_OKK",
      "102649": "S.Daniyar_TM",
      "102624": "S.Dinara_Tokyo",
      "103389": "S.Khairiddin_NY",
      "102617": "S.Madi_Supervisor",
      "102634": "S.Maryam_NY",
      "102626": "S.Meirambek_Dubai",
      "102621": "S.Moldir_Tokyo",
      "103014": "S.Nurbolsyn_NY",
      "102631": "S.Saken_NY",
      "102678": "S.Suiey_Alm",
      "102629": "S.Symbat_Dubai",
      "102652": "T.Aigerim_TM",
      "102674": "T.Aruzhan_Alm",
      "102703": "T.Ayaulim_Alm",
      "102662": "T.Banu_OKK",
      "102620": "T.Dariga_Tokyo",
      "102656": "U.Akbota_OKK",
      "102704": "Y.Abdisamat_Logistic",
      "102625": "Zh.Adilet_Dubai",
      "102758": "Zh.Alikhan_Paris",
      "102677": "Zh.Orynbek_Alm",
      "102642": "Zh.Zhanatbek_Paris",
      "102691": "ZhumanBaglan_Logistic",
      "102611": "A.Akzhan_Supervisor",
      "102607": "A.Doszhan_Logistic",
      "102638": "A.Kamilla_Paris",
      "102708": "B.Kanat_Alm",
      "102643": "D.Bekmyrza_VL",
      "92000": "DuisenbaiulyBekmyrza",
      "102720": "E.Bekbosyn_Logistic",
      "100809": "Erzhan.Bekbosyn_Logistic",
      "102659": "H.Alima_NY",
      "102630": "K.Akylbek_Tokyo",
      "102641": "K.Asel_Paris",
      "102658": "K.Feruza_NY",
      "102633": "K.Gulzhan_NY",
      "102627": "K.Kamilla_Dubai",
      "102635": "M.Dilshodbek_NY",
      "102616": "madisaduahas1",
      "102759": "N.Dosbol_Paris",
      "102640": "S.Aidana_Paris",
      "102644": "S.Dias_VL",
      "102668": "S.Kymbat_Supervisor",
      "102623": "S.Tolganay_Tokyo",
      "102718": "S.Zarina_TM",
      "100814": "Salimova.K_Supervisor",
      "102613": "Sh.Sabina_Logistic",
      "102842": "U.Dana_Paris",
      "102609": "Z.Almansur_Logistic",
      "103116": "Zh.Aysel_HR",
      "94593": "ZhandarbekAisel_supervisor"
    };

    const operatorData = await Promise.all(
      Object.entries(operators).map(async ([id, login], index) => {
        const hashedPassword = await bcrypt.hash(login, salt);
        return {
          id: 30 + index,
          login: login,
          password: hashedPassword,
          name: login,
        };
      })
    );

    return operatorData;
  };

  const operators = await generateOperatorData()

  const users = [
    {
      id: 1,
      login: 'superadmin',
      password: '$2a$10$nmSMifufoud7yWmBHWg.j.nVAmsrgrta.TRCUV.lRd8/qQoge/Jpa',
      name: 'Шынгысхан'
    },
    {
      id: 2,
      login: 'admin1',
      password: '$2a$10$4dOvf4vDTUyfgzSklNS6Qurtnfp.vzL0.tSSsC6mCq.3jiDqslwJm',
      name: 'Медет'
    },
    {
      id: 3,
      login: 'admin2',
      password: '$2a$10$2EnIIfRVe8jrTcjXtP7.suPkY0StD2yho/f9BRYvOfBBZlJBfoEWm',
      name: 'Абзал'
    },
    ...webmasters,
    ...operators,
    {
      id: 133,
      login: 'SrailovBekaris_Mars',
      password: '$2a$10$aGBU/U6Hry8tmNiC9jeiT.5GBhFK.zBTVUHSbEucSJudfpZ5weSvC',
      name: 'SrailovBekaris_Mars'
    },
    {
      id: 134,
      login: 'AbdikhalikovZhantore_Saturn',
      password: '$2a$10$3eg.0O2VAR/nNFNY5iyOkO7eIWA.o/Ndi1IiELHCaMPt/wEJm4MPe',
      name: 'AbdikhalikovZhantore_Saturn'
    },
    {
      id: 135,
      login: 'SaparbekAsel_Saturn',
      password: '$2a$10$nuDnIqks9SIBPG2G2HAo8.NK4YSAoFMhd7TNhT9E5J9VN.c7aHLcC',
      name: 'SaparbekAsel_Saturn'
    },
    {
      id: 136,
      login: 'TaskaraevDanyar_Mars',
      password: '$2a$10$uZ.P2FXzY1WR/6/YEnVaRePdmrM5RkfwxPR6WFe0qyJjSS9G.q0TG',
      name: 'TaskaraevDanyar_Mars'
    },
    {
      id: 137,
      login: 'ErimbetovaBalausa_Saturn',
      password: '$2a$10$qLjfiZ0Tp/PTEsacr0qDtO/P.8XpVdN.JqPPA.wHa5g5EQaVtjEpe',
      name: 'ErimbetovaBalausa_Saturn'
    },
    {
      id: 138,
      login: 'KalibekNurbatyr_Saturn',
      password: '$2a$10$Sj/BXuPFqL279Rzmfolf2uUkTztm3pHI0XV1nsK6o0AZuxHz1bWdS',
      name: 'KalibekNurbatyr_Saturn'
    },
    {
      id: 139,
      login: 'ErgashovAgabek_Mars',
      password: '$2a$10$1GL6xbg4ZZSndWgsswbIIesBFHk5572OaNkd.sKVd9ZN0LJsTD8KG',
      name: 'ErgashovAgabek_Mars'
    },
    {
      id: 140,
      login: 'MedeuAlikhan_Mars',
      password: '$2a$10$nORMQ/9FaguHs8bfn.HfeOcWMarOuvurhI9v0PeL7PS7pm/R0xFa6',
      name: 'MedeuAlikhan_Mars'
    },
    {
      id: 141,
      login: 'ZakirBeket_Saturn',
      password: '$2a$10$Pz7O9iHaAJPsdixOaQuV6ez8LkdNNBHWqHmQeoEZYLCHp4opwPAfm',
      name: 'ZakirBeket_Saturn'
    },
    {
      id: 142,
      login: 'TursyntashAyana_Saturn',
      password: '$2a$10$qsid0.oOHU1dOppehO0SP.YmNHNJKD3SBW0V9Wp7pV4NR2p66wU1y',
      name: 'TursyntashAyana_Saturn'
    },
    {
      id: 143,
      login: 'KungeiNurdaulet_Mars',
      password: '$2a$10$asxYQ5Cc/b5/DZxMPcTX9OTxjJ3B/nNMGQDPKb..9Uk8WKbHRq4li',
      name: 'KungeiNurdaulet_Mars'
    },
    {
      id: 144,
      login: 'BolegenErsultan_Mars',
      password: '$2a$10$sZMRGJ51QgKAOjEyY2g8bO71rXaO.2LQMFovJmk6QdXffE7xabeIm',
      name: 'BolegenErsultan_Mars'
    },
    {
      id: 145,
      login: 'MusaevaMadina_Mars',
      password: '$2a$10$z7sApaLNLPuf1PKyWfNqHeAPKpFD.bkTBSUl8SQPz9E7rwICvySR6',
      name: 'MusaevaMadina_Mars'
    },
    {
      id: 146,
      login: 'KasymNurzhigit_Mars',
      password: '$2a$10$WeTca9Fk004013wwYhRsVeQfMm6KRcKbWNCaLn2MbFAbxb2Idxjse',
      name: 'KasymNurzhigit_Mars'
    },
    {
      id: 147,
      login: 'LesKemenger_Mars',
      password: '$2a$10$q0OV9GrbFlMN82gh061nFO8BJ1uV7L6mGYmLtuU1qX6VtzjG35hl6',
      name: 'LesKemenger_Mars'
    },
  ];

  await Promise.all(
    users.map(user => knex('user').insert(user))
  );

  await knex.raw(`SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"))`);
};
