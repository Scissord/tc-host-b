/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('operator').del()
  await knex('operator').insert([
    {
      id: 1, 
      user_id: 7, 
    },
    {
      id: 2, 
      user_id: 8, 
    },
    {
      id: 3, 
      user_id: 9, 
    },
  ]);
};
