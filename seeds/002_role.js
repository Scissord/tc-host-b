/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('role').del()
  await knex('role').insert([
    {
      id: 1,
      name: 'superadmin',
      title: 'Суперадмин',
    },
    {
      id: 2,
      name: 'admin',
      title: 'Админ',
    },
    {
      id: 3,
      name: 'supervisor',
      title: 'Начальник отдела',
    },
    {
      id: 4,
      name: 'webmaster_team_lead',
      title: 'Вебмастер тимлид',
    },
  ]);
};
