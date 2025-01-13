/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('city').del()
  await knex('city').insert([
    {
      id: 1,
      name: 'Астана',
    },
    {
      id: 2,
      name: 'Алмата',
    },
    {
      id: 3,
      name: 'Шымкент',
    },
  ]);

  await knex.raw("SELECT setval('city_id_seq', (SELECT MAX(id) FROM city))");
};
