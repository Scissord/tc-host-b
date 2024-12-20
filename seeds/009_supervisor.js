/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('supervisor').del()
  await knex('supervisor').insert([
    {
      id: 1, 
      name: 'Начальник 1',
      user_id: 4, 
    },
    {
      id: 2, 
      name: 'Начальник 2',
      user_id: 5, 
    },
    {
      id: 3, 
      name: 'Начальник 3',
      user_id: 6, 
    },
  ]);
};
