/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('permission').del()
  await knex('permission').insert([
    {
      id: 1, 
      name: 'admin', 
    },
    {
      id: 2,
      name: 'supervisor'
    },
    {
      id: 3,
      name: 'webmaster'
    },
    {
      id: 4,
      name: 'operator'
    },
  ]);
};
