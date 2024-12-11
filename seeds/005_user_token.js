/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('user_token').del()
  await knex('user_token').insert([
    {
      id: 1, 
      user_id: '3bbc7de3-724b-42c4-b70f-c378fcfff7d2', 
      refresh_token: '1',
      expires_at: new Date
    },
  ]);
};
