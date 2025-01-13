/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('payment').del()
  await knex('payment').insert([
    {
      id: 1,
      name: 'Наличный расчет',
    },
    {
      id: 2,
      name: 'Kaspi (оплачено)',
    },
    {
      id: 3,
      name: 'Kaspi Red',
    },
  ]);

  await knex.raw("SELECT setval('payment_id_seq', (SELECT MAX(id) FROM payment))");
};
