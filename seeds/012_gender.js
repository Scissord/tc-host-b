/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('gender').del()
  await knex('gender').insert([
    {
      id: 1,
      name: 'Мужской',
    },
    {
      id: 2,
      name: 'Женский',
    },
  ]);

  await knex.raw("SELECT setval('gender_id_seq', (SELECT MAX(id) FROM gender))");
};
