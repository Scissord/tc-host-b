/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('team').del()
  await knex('team').insert([
    {
      id: 1,
      title: "Команда 1",
      department_id: 1,
      sub_status_ids: [0]
    },
  ]);

  await knex.raw("SELECT setval('team_id_seq', (SELECT MAX(id) FROM team))");
};
