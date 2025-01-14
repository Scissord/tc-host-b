/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('webmaster').del()
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

  const webmasterData = Object.keys(webmasters).map((id, index) => ({
    id: id,
    user_id: 4 + index,
  }));

  await knex('webmaster').insert(webmasterData);

  await knex.raw("SELECT setval('webmaster_id_seq', (SELECT MAX(id) FROM webmaster))");
};
