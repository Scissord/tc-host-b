/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('assigned_role').del()
  await knex('assigned_role').insert([
    // пользователь 1 - superadmin 
    {
      id: 1,
      role_id: 1,
      entity_id: 1,
      entity_type: "user",
    },
    // пользователи 2, 3 - admin
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
    // пользователь 9 - руководитель отдела 
    {
      id: 5,
      role_id: 3,
      entity_id: 9,
      entity_type: "user",
    },
    // пользователь 6 - wemaster_team_lead 
    {
      id: 4,
      role_id: 4,
      entity_id: 6,
      entity_type: "user",
    },
  ]);

  await knex.raw("SELECT setval('assigned_role_id_seq', (SELECT MAX(id) FROM assigned_role))");
};
