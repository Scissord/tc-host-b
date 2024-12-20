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
      title: 'Админ со всеми правами'
    },
    {
      id: 2,
      name: 'admin',
      title: 'Админы с большинством прав'
    },
    {
      id: 3,
      name: 'supervisor',
      title: 'Начальник отдела, кастомные права'
    },
    {
      id: 4,
      name: 'webmaster',
      title: 'Медиа-баер/Арбитражник, работает со своими заказами'
    },
    {
      id: 5,
      name: 'operator',
      title: 'Оператор, отрабатывает заказы, меняет им статусы'
    },
  ]);
};
