/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('status').del()
  await knex('status').insert([
    {
      id: 0,
      name: 'Обработка',
      color: '#fef9c3',
    },
    {
      id: 1,
      name: 'Принят',
      color: '#dcfce7',
    },
    {
      id: 2,
      name: 'Отправлен',
      color: '#f3e8ff',
    },
    {
      id: 3,
      name: 'Оплачен',
      color: '#4ade80',
    },
    {
      id: 4,
      name: 'Отменен',
      color: '#fee2e2',
    },
    {
      id: 5,
      name: 'Возврат',
      color: '#f87171',
    },
    {
      id: 6,
      name: 'Спам',
      color: '#fecaca',
    },
  ]);

  // 0 - processing - Обработка
  // 1 - accepted - Принят
  // 2 - shipped - Отправлено
  // 3 - paid - Оплачен
  // 4 - canceled - Отменен
  // 5 - return - Возврат
  // 6 - spam - Спам

  await knex.raw("SELECT setval('status_id_seq', (SELECT MAX(id) FROM status))");
};
