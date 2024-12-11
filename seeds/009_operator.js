/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('operator').del()
  await knex('operator').insert([
    {
      id: 1, 
      user_id: '9f65a948-8840-4e53-9344-acfab16ca740', 
    },
  ]);
};
