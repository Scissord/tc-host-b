/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('assigned_role').del()
  await knex('assigned_role').insert([
    // superadmin
    {
      id: 13, 
      role_id: 2,
      entity_id: 1,
      entity_type: "user",
    },
    {
      id: 52, 
      role_id: 1,
      entity_id: 1,
      entity_type: "user",
    },
    // admin
    {
      id: 2, 
      role_id: 2,
      entity_id: 2,
      entity_type: "user",
    },
    {
      id: 3, 
      role_id: 2,
      entity_id: 3,
      entity_type: "user",
    },
    // supervisor
    {
      id: 4, 
      role_id: 3,
      entity_id: 4,
      entity_type: "user",
    },
    {
      id: 5, 
      role_id: 3,
      entity_id: 5,
      entity_type: "user",
    },
    {
      id: 6, 
      role_id: 3,
      entity_id: 6,
      entity_type: "user",
    },
    // webmaster
    {
      id: 7, 
      role_id: 4,
      entity_id: 7,
      entity_type: "user",
    },
    {
      id: 8, 
      role_id: 4,
      entity_id: 8,
      entity_type: "user",
    },
    {
      id: 9, 
      role_id: 4,
      entity_id: 9,
      entity_type: "user",
    },
    // operator
    {
      id: 10, 
      role_id: 5,
      entity_id: 10,
      entity_type: "user",
    },
    {
      id: 11, 
      role_id: 5,
      entity_id: 11,
      entity_type: "user",
    },
    {
      id: 12, 
      role_id: 5,
      entity_id: 12,
      entity_type: "user",
    },
  ]);
};
