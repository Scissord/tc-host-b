/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('ability').del();

  const groups = [
    {
      name: 'orders',
      actions: ['get', 'get_order', 'create', 'update', 'delete'],
      titles: ['Получить заказы', 'Получить заказ', 'Создать заказ', 'Изменить заказ', 'Удалить заказ']
    },
    {
      name: 'products',
      actions: ['get', 'create', 'update', 'delete'],
      titles: ['Получить товары', 'Создать товар', 'Изменить товар', 'Удалить товар']
    },
    {
      name: 'cities',
      actions: ['get', 'create', 'update', 'delete'],
      titles: ['Получить города', 'Создать город', 'Изменить город', 'Удалить город']
    },
    {
      name: 'webmasters',
      actions: ['get', 'get_free', 'create', 'update', 'delete'],
      titles: ['Получить список вебмастеров', 'Получить список свободных вебмастеров', 'Создать вебмастера', 'Изменить вебмастера', 'Удалить вебмастера']
    },
    {
      name: 'departments',
      actions: ['get', 'get_department', 'create', 'update', 'delete'],
      titles: ['Получить отделы', 'Получить отдел', 'Создать отдел', 'Изменить отдел', 'Удалить отдел']
    },
    {
      name: 'teams',
      actions: ['get', 'get_team', 'create', 'update', 'delete'],
      titles: ['Получить команды', 'Получить команду', 'Создать команду', 'Изменить команду', 'Удалить команду']
    },
    {
      name: 'operators',
      actions: ['get', 'get_free', 'create', 'update', 'delete'],
      titles: ['Получить всех операторов', 'Получить пользователей, у которых нет operator_id', 'Создать оператора', 'Изменить оператора', 'Удалить оператора']
    },
    {
      name: 'users',
      actions: ['get', 'create', 'update', 'delete'],
      titles: ['Получить пользователей', 'Создать пользователя', 'Изменить пользователя', 'Удалить пользователя']
    },
    {
      name: 'statuses',
      actions: ['get', 'create', 'update', 'delete'],
      titles: ['Получить статусы', 'Создать статус', 'Изменить статус', 'Удалить статус']
    },
    {
      name: 'sub_statuses',
      actions: ['get', 'create', 'update', 'delete'],
      titles: ['Получить подстатусы', 'Создать подстатус', 'Изменить подстатус', 'Удалить подстатус']
    },
    {
      name: 'order_columns',
      actions: ['get', 'create', 'update', 'delete'],
      titles: ['Получить заголовки заказов', 'Создать заголовок для таблицы заказов', 'Изменить заголовок для таблицы заказов', 'Удалить заголовок для таблицы заказов']
    },
    {
      name: 'statistics',
      actions: ['get', 'supervisor_statistic', 'webmaster_statistic', 'operator_statistic'],
      titles: ['Получить статистику', 'Получить статистику начальника отдела', 'Получить статистику вебмастера', 'Получить статистику оператора']
    },
    {
      name: 'roles',
      actions: ['get', 'create', 'update', 'delete'],
      titles: ['Получить роли', 'Создать роль', 'Изменить роль', 'Удалить роль']
    },
    {
      name: 'assigned_role',
      actions: ['get', 'create', 'delete'],
      titles: ['Получить список пользователей с ролями', 'Создать роль для пользователя', 'Удалить роль для пользователя']
    },
    {
      name: 'abilities',
      actions: ['get',],
      titles: ['Получить доступы']
    },
    {
      name: 'permissions',
      actions: ['get', 'create', 'delete'],
      titles: ['Получить список выданных доступов для пользователей и ролей', 'Выдать доступ пользователю или роли', 'Удалить доступ пользователю или роли']
    },
    {
      name: 'statistics',
      actions: ['user', 'webmaster', 'operator'],
      titles: ['Получить общую статистику', 'Получить статистику по вебмастерам', 'Получить статистику по операторам']
    }
    // { 
    //   name: 'admin', 
    //   actions: ['superadmin_page', 'department_head'], 
    //   titles: ['Страница, для редактирования всего', 'Руководитель отдела'], 
    //   extraFields: [{ entity_id: 1, entity_type: "department" }] 
    // },
  ];

  const abilities = groups.flatMap((group, groupIndex) =>
    group.actions.map((action, actionIndex) => ({
      id: groupIndex * 10 + actionIndex + 1,
      name: action.includes(group.name) ? action : `${action}_${group.name}`,
      title: group.titles[actionIndex],
      ...(group.extraFields?.[actionIndex] || {}),
    }))
  );

  await knex('ability').insert(abilities);
  await knex.raw("SELECT setval('ability_id_seq', (SELECT MAX(id) FROM ability))");
};
