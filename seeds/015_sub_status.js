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
      color: '#fef9c3',
    },
    {
      id: 2, 
      status_id: 1,
      name: 'Подстатус 2',
      color: '#fef9c3', 
    },
    {
      id: 3, 
      status_id: 1,
      name: 'Подстатус 3',
      color: '#fef9c3', 
    },
    {
      id: 4, 
      status_id: 2,
      name: 'Подстатус 4',
      color: '#dcfce7', 
    },
    {
      id: 5, 
      status_id: 2,
      name: 'Подстатус 5', 
      color: '#dcfce7', 
    },
    {
      id: 6, 
      status_id: 2,
      name: 'Подстатус 6', 
      color: '#dcfce7', 
    },
    {
      id: 7, 
      status_id: 3,
      name: 'Подстатус 7', 
      color: '#fee2e2', 
    },
    {
      id: 8, 
      status_id: 3,
      name: 'Подстатус 8', 
      color: '#fee2e2', 
    },
    {
      id: 9, 
      status_id: 3,
      name: 'Подстатус 9',
      color: '#fee2e2', 
    },
    {
      id: 10, 
      status_id: 4,
      name: 'Подстатус 10',
      color: '#f3e8ff',
    },
    {
      id: 11, 
      status_id: 4,
      name: 'Подстатус 11',
      color: '#f3e8ff',
    },
    {
      id: 12, 
      status_id: 4,
      name: 'Подстатус 12',
      color: '#f3e8ff',
    },
    {
      id: 13, 
      status_id: 5,
      name: 'Подстатус 13',
      color: '#f87171',
    },
    {
      id: 14, 
      status_id: 5,
      name: 'Подстатус 14',
      color: '#f87171', 
    },
    {
      id: 15, 
      status_id: 5,
      name: 'Подстатус 15',
      color: '#f87171',
    },
    {
      id: 16, 
      status_id: 6,
      name: 'Подстатус 16',
      color: '#fecaca',
    },
    {
      id: 17, 
      status_id: 6,
      name: 'Подстатус 17',
      color: '#fecaca',
    },
    {
      id: 18, 
      status_id: 6,
      name: 'Подстатус 18',
      color: '#fecaca',
    },
    {
      id: 19, 
      status_id: 7,
      name: 'Подстатус 19',
      color: '#4ade80',
    },
    {
      id: 20, 
      status_id: 7,
      name: 'Подстатус 20',
      color: '#4ade80',
    },
    {
      id: 21, 
      status_id: 7,
      name: 'Подстатус 21',
      color: '#4ade80',
    },
  ]);
};
