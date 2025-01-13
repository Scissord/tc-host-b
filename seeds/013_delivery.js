/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('delivery').del()
  await knex('delivery').insert([
    {
      id: 1,
      name: 'Курьер',
    },
    {
      id: 2,
      name: 'Почта',
    },
    {
      id: 3,
      name: 'Экспресс',
    },
    {
      id: 4,
      name: 'ДВД',
    },
  ]);

  await knex.raw("SELECT setval('delivery_id_seq', (SELECT MAX(id) FROM delivery))");
};
