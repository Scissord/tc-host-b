/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('superadmin').del()
  await knex('superadmin').insert([
    {
      id: 1, 
      user_id: 1, 
    },
  ]);
};
