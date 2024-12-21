/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('role').del()
  await knex('role').insert([
    {
      id: 1,
      name: 'admin',
      title: 'Админ',
      entity_type: 'admin'
    },
    {
      id: 2,
      name: 'webmaster',
      title: 'Вебмастер',
      entity_type: 'webmaster'
    },
    {
      id: 3,
      name: 'webmaster_team_lead',
      title: 'Вебмастер тимлид',
      entity_type: 'webmaster'
    },
    {
      id: 4,
      name: 'operator',
      title: 'Оператор, отрабатывает заказы, меняет им статусы',
      entity_type: 'operator'
    },
    {
      id: 5,
      name: 'supervisor',
      title: 'Начальник отдела',
      entity_type: 'operator'
    },
  ]);
};
