/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('sub_status').del()
  await knex('sub_status').insert([
    {
      id: 1, 
      status_id: 1,
      name: 'Подстатус 1',
    },
    {
      id: 2, 
      status_id: 1,
      name: 'Подстатус 2',
    },
    {
      id: 3, 
      status_id: 1,
      name: 'Подстатус 3',
    },
    {
      id: 4, 
      status_id: 2,
      name: 'Подстатус 4',
    },
    {
      id: 5, 
      status_id: 2,
      name: 'Подстатус 5', 
    },
    {
      id: 6, 
      status_id: 2,
      name: 'Подстатус 6', 
    },
    {
      id: 7, 
      status_id: 3,
      name: 'Подстатус 7', 
    },
    {
      id: 8, 
      status_id: 3,
      name: 'Подстатус 8', 
    },
    {
      id: 9, 
      status_id: 3,
      name: 'Подстатус 9',
    },
    {
      id: 10, 
      status_id: 4,
      name: 'Подстатус 10',
    },
    {
      id: 11, 
      status_id: 4,
      name: 'Подстатус 11',
    },
    {
      id: 12, 
      status_id: 4,
      name: 'Подстатус 12',
    },
    {
      id: 13, 
      status_id: 5,
      name: 'Подстатус 13',
    },
    {
      id: 14, 
      status_id: 5,
      name: 'Подстатус 14',
    },
    {
      id: 15, 
      status_id: 5,
      name: 'Подстатус 15',
    },
    {
      id: 16, 
      status_id: 6,
      name: 'Подстатус 16',
    },
    {
      id: 17, 
      status_id: 6,
      name: 'Подстатус 17',
    },
    {
      id: 18, 
      status_id: 6,
      name: 'Подстатус 18',
    },
    {
      id: 19, 
      status_id: 7,
      name: 'Подстатус 19',
    },
    {
      id: 20, 
      status_id: 7,
      name: 'Подстатус 20',
    },
    {
      id: 21, 
      status_id: 7,
      name: 'Подстатус 21',
    },
  ]);
};
