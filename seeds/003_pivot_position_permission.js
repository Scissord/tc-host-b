/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('pivot_position_permission').del()
  await knex('pivot_position_permission').insert([
    {
      position_id: 1, 
      permission_id: 1,
    },
    {
      position_id: 2, 
      permission_id: 2,
    },
    {
      position_id: 3, 
      permission_id: 3,
    },
    {
      position_id: 4, 
      permission_id: 4,
    },
  ]);
};
