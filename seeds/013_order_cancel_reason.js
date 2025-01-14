/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('order_cancel_reason').del()
  await knex('order_cancel_reason').insert([
    {
      id: 1,
      name: 'Дорого',
    },
    {
      id: 2,
      name: 'Сухая отмена',
    },
    {
      id: 3,
      name: 'Срок доставки',
    },
    {
      id: 4,
      name: 'Отзывы',
    },
    {
      id: 5,
      name: 'Нет доверия',
    },
    {
      id: 6,
      name: 'Проблема с оплатой',
    },
    {
      id: 7,
      name: 'Уже купил аналог',
    },
    {
      id: 8,
      name: 'Другое',
    },
  ]);

  await knex.raw("SELECT setval('order_cancel_reason_id_seq', (SELECT MAX(id) FROM order_cancel_reason))");
};
