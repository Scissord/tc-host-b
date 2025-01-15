/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('department').del()
  await knex('department').insert([
    {
      id: 1,
      title: "Отдел 1",
      sub_status_ids: [0]
    },
  ]);

  await knex.raw("SELECT setval('department_id_seq', (SELECT MAX(id) FROM department))");
};
