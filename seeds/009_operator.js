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
      team_id: 1,
    },
    {
      id: 2, 
      user_id: 8, 
      team_id: 1,
    },
  ]);
};
