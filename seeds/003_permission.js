/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('permission').del()
  await knex('permission').insert([
    // superadmin / get_orders 
    {
      id: 1, 
      ability_id: 1,
      entity_id: 1,
      entity_type: "role",
    },
    // superadmin / get_products 
    {
      id: 2, 
      ability_id: 11,
      entity_id: 1,
      entity_type: "role",
    },
    // admin / get_orders 
    {
      id: 3, 
      ability_id: 1,
      entity_id: 2,
      entity_type: "role",
    },
    // supervisor / get_orders 
    {
      id: 4, 
      ability_id: 1,
      entity_id: 3,
      entity_type: "role",
    },
  ]);
};
