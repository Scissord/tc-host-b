/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('city').del()
  await knex('city').insert([
    {
      id: 1,
      name: 'AKSAI',
    },
    {
      id: 2,
      name: 'AKTAU',
    },
    {
      id: 3,
      name: 'AKTOBE',
    },
    {
      id: 4,
      name: 'ALMATA',
    },
    {
      id: 5,
      name: 'ASTANA-KURER',
    },
    {
      id: 6,
      name: 'ATYRAU',
    },
    {
      id: 7,
      name: 'KARAGANDA',
    },
    {
      id: 8,
      name: 'KOKSHETAU',
    },
    {
      id: 9,
      name: 'KOSTANAI',
    },
    {
      id: 10,
      name: 'KYLSARY',
    },
    {
      id: 11,
      name: 'KYZYLORDA',
    },
    {
      id: 12,
      name: 'PAVLODAR',
    },
    {
      id: 13,
      name: 'PETROPAVLOVSK',
    },
    {
      id: 14,
      name: 'Saryagash',
    },
    {
      id: 15,
      name: 'SEMEI',
    },
    {
      id: 16,
      name: 'SHIMKENT',
    },
    {
      id: 17,
      name: 'TALDYKORGAN',
    },
    {
      id: 18,
      name: 'TARAZ',
    },
    {
      id: 19,
      name: 'TEMIRTAU',
    },
    {
      id: 20,
      name: 'TURKESTAN',
    },
    {
      id: 21,
      name: 'URALSK',
    },
    {
      id: 22,
      name: 'UST-KAMENOGORSK',
    },
    {
      id: 23,
      name: 'ZHANAOZEN',
    },
    {
      id: 24,
      name: 'Zhetysai',
    },
    {
      id: 25,
      name: 'ZHEZKAZGAN',
    },
    {
      id: 26,
      name: 'EKIBASTUZ',
    },
    {
      id: 27,
      name: 'Balkhash',
    },
    {
      id: 28,
      name: 'Kentau',
    },
  ]);

  await knex.raw("SELECT setval('city_id_seq', (SELECT MAX(id) FROM city))");
};
