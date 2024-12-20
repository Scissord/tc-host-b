/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('ability').del()
  await knex('ability').insert([
    // orders 
    {
      id: 1, 
      name: 'get_orders',
      title: 'Получить заказы',
    },
    {
      id: 2, 
      name: 'get_order',
      title: 'Получить заказ',
    },
    {
      id: 3, 
      name: 'create_order',
      title: 'Создать заказ',
    },
    {
      id: 4, 
      name: 'update_order',
      title: 'Изменить заказ',
    },
    {
      id: 5, 
      name: 'delete_order', 
      title: 'Удалить заказ',
    },
    // departments
    {
      id: 6, 
      name: 'get_departments', 
      title: 'Получить отделы',
    },
    {
      id: 7, 
      name: 'get_department', 
      title: 'Получить отдел',
    },
    {
      id: 8, 
      name: 'create_department', 
      title: 'Создать отдел',
    },
    {
      id: 9, 
      name: 'update_department', 
      title: 'Изменить отдел',
    },
    {
      id: 10, 
      name: 'delete_department', 
      title: 'Удалить отдел',
    },
    // teams
    {
      id: 11, 
      name: 'get_teams', 
      title: 'Получить команды',
    },
    {
      id: 12, 
      name: 'get_team', 
      title: 'Получить команду',
    },
    {
      id: 13, 
      name: 'create_team', 
      title: 'Создать команду',
    },
    {
      id: 14, 
      name: 'update_team', 
      title: 'Изменить команду',
    },
    {
      id: 15, 
      name: 'delete_team', 
      title: 'Удалить команду',
    },
    // products
    {
      id: 16, 
      name: 'get_products', 
      title: 'Получить товары',
    },
    {
      id: 17, 
      name: 'get_product', 
      title: 'Получить товар',
    },
    {
      id: 18, 
      name: 'create_product', 
      title: 'Создать товар',
    },
    {
      id: 19, 
      name: 'update_product', 
      title: 'Изменить товар',
    },
    {
      id: 20, 
      name: 'delete_product', 
      title: 'Удалить товар',
    },
    // users
    {
      id: 21, 
      name: 'get_users', 
      title: 'Получить пользователей',
    },
    {
      id: 22, 
      name: 'get_user', 
      title: 'Получить пользователя',
    },
    {
      id: 23, 
      name: 'create_user', 
      title: 'Создать пользователя',
    },
    {
      id: 24, 
      name: 'update_user', 
      title: 'Изменить пользователя',
    },
    {
      id: 25, 
      name: 'delete_user', 
      title: 'Удалить пользователя',
    },
    // cities
    {
      id: 26, 
      name: 'get_cities', 
      title: 'Получить города',
    },
    {
      id: 27, 
      name: 'create_city', 
      title: 'Создать город',
    },
    {
      id: 28, 
      name: 'update_city', 
      title: 'Изменить город',
    },
    {
      id: 29, 
      name: 'delete_city', 
      title: 'Удалить город',
    },
    // statuses
    {
      id: 30, 
      name: 'get_statuses', 
      title: 'Получить статусы',
    },
    {
      id: 31, 
      name: 'create_status', 
      title: 'Создать статус',
    },
    {
      id: 32, 
      name: 'update_status', 
      title: 'Изменить статус',
    },
    {
      id: 33, 
      name: 'delete_status', 
      title: 'Удалить статус',
    },
    // order_columns 
    {
      id: 34, 
      name: 'get_order_columns', 
      title: 'Получить заголовки заказов',
    },
    {
      id: 35, 
      name: 'create_order_column', 
      title: 'Создать заголовок для таблицы заказов',
    },
    {
      id: 36, 
      name: 'update_order_column', 
      title: 'Изменить заголовок для таблицы заказов',
    },
    {
      id: 37, 
      name: 'delete_order_column', 
      title: 'Удалить заголовок для таблицы заказов',
    },
    // statistic 
    {
      id: 38, 
      name: 'get_statistics', 
      title: 'Получить статистику',
    },
    // webmasters
    {
      id: 39, 
      name: 'get_webmasters', 
      title: 'Получить список вебмастеров',
    },
    {
      id: 40, 
      name: 'get_webmaster', 
      title: 'Получить заказы вебмастера',
    },
    // admin
    {
      id: 41, 
      name: 'superadmin_page', 
      title: 'Страница, для редактирования всего',
    },
    {
      id: 42, 
      name: 'department_head', 
      title: 'Руководитель отдела',
      entity_id: 1,
      entity_type: "department",
    },
  ]);
};
