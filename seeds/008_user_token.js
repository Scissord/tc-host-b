/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('user_token').del()
  await knex('user_token').insert([
    {
      id: 1, 
      user_id: 1, 
      refresh_token: '1',
      expires_at: new Date
    },
    {
      id: 2, 
      user_id: 2, 
      refresh_token: '2',
      expires_at: new Date
    },
    {
      id: 3, 
      user_id: 3, 
      refresh_token: '3',
      expires_at: new Date
    },
    {
      id: 4, 
      user_id: 4, 
      refresh_token: '4',
      expires_at: new Date
    },
    {
      id: 5, 
      user_id: 5, 
      refresh_token: '5',
      expires_at: new Date
    },
    {
      id: 6, 
      user_id: 6, 
      refresh_token: '6',
      expires_at: new Date
    },
    {
      id: 7, 
      user_id: 7, 
      refresh_token: '7',
      expires_at: new Date
    },
    {
      id: 8, 
      user_id: 8, 
      refresh_token: '8',
      expires_at: new Date
    },
    {
      id: 9, 
      user_id: 9, 
      refresh_token: '9',
      expires_at: new Date
    },
  ]);
};
