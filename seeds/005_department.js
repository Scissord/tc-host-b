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
      sub_status_ids: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      id: 2, 
      title: "Отдел 2",
      sub_status_ids: [8, 9, 10, 11, 12, 13, 14]
    },
    {
      id: 3, 
      title: "Отдел 3",
      sub_status_ids: [15, 16, 17, 18, 19, 20, 21]
    },
  ]);
};
