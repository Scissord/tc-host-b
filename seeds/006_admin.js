/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('admin').del()
  await knex('admin').insert([
    {
      id: 1, 
      name: 'Супер Админ',
      user_id: '3bbc7de3-724b-42c4-b70f-c378fcfff7d2', 
    },
  ]);
};
