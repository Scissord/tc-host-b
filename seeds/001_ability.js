/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('ability').del();

  // const groups = [
  //   { 
  //     name: 'orders', 
  //     actions: ['get', 'get_order', 'create', 'update', 'delete'], 
  //     titles: ['Получить заказы', 'Получить заказ', 'Создать заказ', 'Изменить заказ', 'Удалить заказ'] 
  //   },
  //   { 
  //     name: 'departments', 
  //     actions: ['get', 'get_department', 'create', 'update', 'delete'], 
  //     titles: ['Получить отделы', 'Получить отдел', 'Создать отдел', 'Изменить отдел', 'Удалить отдел'] 
  //   },
  //   { 
  //     name: 'teams', 
  //     actions: ['get', 'get_team', 'create', 'update', 'delete'], 
  //     titles: ['Получить команды', 'Получить команду', 'Создать команду', 'Изменить команду', 'Удалить команду'] 
  //   },
  //   { 
  //     name: 'products', 
  //     actions: ['get', 'get_product', 'create', 'update', 'delete'], 
  //     titles: ['Получить товары', 'Получить товар', 'Создать товар', 'Изменить товар', 'Удалить товар'] 
  //   },
  //   { 
  //     name: 'users', 
  //     actions: ['get', 'get_user', 'create', 'update', 'delete'], 
  //     titles: ['Получить пользователей', 'Получить пользователя', 'Создать пользователя', 'Изменить пользователя', 'Удалить пользователя'] 
  //   },
  //   { 
  //     name: 'cities', 
  //     actions: ['get', 'create', 'update', 'delete'], 
  //     titles: ['Получить города', 'Создать город', 'Изменить город', 'Удалить город'] 
  //   },
  //   { 
  //     name: 'statuses', 
  //     actions: ['get', 'create', 'update', 'delete'], 
  //     titles: ['Получить статусы', 'Создать статус', 'Изменить статус', 'Удалить статус'] 
  //   },
  //   { 
  //     name: 'order_columns', 
  //     actions: ['get', 'create', 'update', 'delete'], 
  //     titles: ['Получить заголовки заказов', 'Создать заголовок для таблицы заказов', 'Изменить заголовок для таблицы заказов', 'Удалить заголовок для таблицы заказов'] 
  //   },
  //   { 
  //     name: 'statistics', 
  //     actions: ['get', 'supervisor_statistic', 'webmaster_statistic', 'operator_statistic'], 
  //     titles: ['Получить статистику', 'Получить статистику начальника отдела', 'Получить статистику вебмастера', 'Получить статистику оператора'] 
  //   },
  //   { 
  //     name: 'webmasters', 
  //     actions: ['get', 'get_webmaster'], 
  //     titles: ['Получить список вебмастеров', 'Получить заказы вебмастера'] 
  //   },
  //   { 
  //     name: 'admin', 
  //     actions: ['superadmin_page', 'department_head'], 
  //     titles: ['Страница, для редактирования всего', 'Руководитель отдела'], 
  //     extraFields: [{ entity_id: 1, entity_type: "department" }] 
  //   }
  // ];

  // const abilities = groups.flatMap((group, groupIndex) =>
  //   group.actions.map((action, actionIndex) => ({
  //     id: groupIndex * 10 + actionIndex + 1,
  //     name: action.includes(group.name) ? action : `${action}_${group.name}`,
  //     title: group.titles[actionIndex],
  //     ...(group.extraFields?.[actionIndex] || {}),
  //   }))
  // );

  // await knex('ability').insert(abilities);

  await knex('ability').insert([
    {
      id: 1,
      name: 'webmaster_get_orders',
      title: 'смотреть свои заказы',
    },
    {
      id: 2,
      name: 'webmaster_filter_team_statistic',
      title: 'смотреть статистику команды',
    },
    {
      id: 3,
      name: 'webmaster_statistic',
      title: 'смотреть свою статистику',
    },
  ]);
};
