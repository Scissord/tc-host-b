/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('operator').del()
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

  const operatorData = Object.keys(operators).map((id, index) => ({
    id: id,
    user_id: 30 + index,
    team_id: 1
  }));

  await knex('operator').insert([
    ...operatorData,
    {
      id: 103391,
      user_id: 133,
      team_id: 1,
    },
    {
      id: 103392,
      user_id: 134,
      team_id: 1,
    },
    {
      id: 103393,
      user_id: 135,
      team_id: 1,
    },
    {
      id: 103394,
      user_id: 136,
      team_id: 1,
    },
    {
      id: 103395,
      user_id: 137,
      team_id: 1,
    },
    {
      id: 103396,
      user_id: 138,
      team_id: 1,
    },
    {
      id: 103397,
      user_id: 139,
      team_id: 1,
    },
    {
      id: 103398,
      user_id: 140,
      team_id: 1,
    },
    {
      id: 103399,
      user_id: 141,
      team_id: 1,
    },
    {
      id: 103400,
      user_id: 142,
      team_id: 1,
    },
    {
      id: 103401,
      user_id: 143,
      team_id: 1,
    },
    {
      id: 103402,
      user_id: 144,
      team_id: 1,
    },
    {
      id: 103403,
      user_id: 145,
      team_id: 1,
    },
    {
      id: 103404,
      user_id: 146,
      team_id: 1,
    },
    {
      id: 103405,
      user_id: 147,
      team_id: 1,
    },
  ]);

  await knex.raw("SELECT setval('operator_id_seq', (SELECT MAX(id) FROM operator))");
};
