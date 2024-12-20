/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('admin').del()
  await knex('admin').insert([
    {
      id: 1, 
      user_id: 2, 
    },
    {
      id: 2, 
      user_id: 3, 
    },
  ]);
};
