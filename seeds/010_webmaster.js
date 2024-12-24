/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('webmaster').del()
  await knex('webmaster').insert([
    {
      id: 1, 
      user_id: 4, 
    },
    {
      id: 2, 
      user_id: 5, 
    },
    {
      id: 3, 
      user_id: 6, 
    },
  ]);
};
