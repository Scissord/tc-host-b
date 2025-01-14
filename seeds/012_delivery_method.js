/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('delivery_method').del()
  await knex('delivery_method').insert([
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

  await knex.raw("SELECT setval('delivery_method_id_seq', (SELECT MAX(id) FROM delivery_method))");
};
