/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('team').del()
  await knex('team').insert([
    {
      id: 1, 
      title: "Команда A",
      department_id: 1,
      sub_status_ids: [1, 2, 3]
    },
    {
      id: 2, 
      title: "Команда Б",
      department_id: 1,
      sub_status_ids: [4, 5, 6, 7]
    },
    {
      id: 3, 
      title: "Команда C",
      department_id: 2,
      sub_status_ids: [8, 9, 10]
    },
    {
      id: 4, 
      title: "Команда D",
      department_id: 2,
      sub_status_ids: [11, 12, 13, 14]
    },
    {
      id: 5, 
      title: "Команда E",
      department_id: 3,
      sub_status_ids: [15, 16, 17]
    },
    {
      id: 6, 
      title: "Команда F",
      department_id: 3,
      sub_status_ids: [18, 19, 20, 21]
    },
  ]);
};
