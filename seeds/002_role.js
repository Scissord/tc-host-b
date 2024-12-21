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
      entity_type: 'user'
    },
    {
      id: 2,
      name: 'admin',
      title: 'Админ',
      entity_type: 'user'
    },
    {
      id: 3,
      name: 'supervisor',
      title: 'Начальник отдела',
      entity_type: 'user'
    },
    {
      id: 4,
      name: 'webmaster_team_lead',
      title: 'Вебмастер тимлид',
      entity_type: 'webmaster'
    },
  ]);
};
