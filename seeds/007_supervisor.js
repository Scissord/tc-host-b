/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('supervisor').del()
  await knex('supervisor').insert([
    {
      id: 1, 
      name: 'Начальник Такой-то',
      user_id: '4333b467-9c71-4f4d-975c-e5f71c288e32', 
    },
  ]);
};
