/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('superadmin').del()
  await knex('superadmin').insert([
    {
      id: 1, 
      name: 'Шымнгысхан',
      user_id: 1, 
    },
  ]);
};
