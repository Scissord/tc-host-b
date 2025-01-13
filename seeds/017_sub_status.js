/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('sub_status').del()
  await knex('sub_status').insert([
    {
      id: 0,
      status_id: 0,
      name: 'Обработка',
    },
    {
      id: 21,
      status_id: 0,
      name: 'Обработка (новые)',
    },
    {
      id: 32,
      status_id: 0,
      name: 'Обработка (новые рус.яз)',
    },
    {
      id: 43,
      status_id: 0,
      name: 'Обработка (выделенный)',
    },
    {
      id: 51,
      status_id: 0,
      name: 'Обработка (WhatsApp)',
    },
    {
      id: 11,
      status_id: 0,
      name: 'Перезвон',
    },
    {
      id: 34,
      status_id: 0,
      name: 'Перезвон (рус.яз)',
    },
    {
      id: 10,
      status_id: 0,
      name: 'Недозвон',
    },
    {
      id: 33,
      status_id: 0,
      name: 'Недозвон (рус.яз)',
    },
    {
      id: 1,
      status_id: 1,
      name: 'Подтвержден КД',
    },
    {
      id: 53,
      status_id: 2,
      name: 'Пред.подтвержден КД',
    },
    {
      id: 15,
      status_id: 2,
      name: 'Готов к передаче КД',
    },
    {
      id: 3,
      status_id: 2,
      name: 'Отправлен КД',
    },
    {
      id: 35,
      status_id: 2,
      name: 'ДВД готов',
    },
    {
      id: 5,
      status_id: 3,
      name: 'Оплачен КД',
    },
    {
      id: 28,
      status_id: 2,
      name: 'НД KET KZ',
    },
    {
      id: 29,
      status_id: 2,
      name: 'Перенос/ОД KET KZ',
    },
    {
      id: 40,
      status_id: 2,
      name: 'Отказ KET KZ',
    },
    {
      id: 4,
      status_id: 1,
      name: 'Подтвержден ПД',
    },
    {
      id: 16,
      status_id: 2,
      name: 'Готов к передаче ПД',
    },
    {
      id: 13,
      status_id: 2,
      name: 'Отправлен ПД',
    },
    {
      id: 25,
      status_id: 2,
      name: 'Прибыл ПД',
    },
    {
      id: 46,
      status_id: 2,
      name: 'Отказ на доставке ПД',
    },
    {
      id: 26,
      status_id: 2,
      name: 'Заберет сегодня ПД',
    },
    {
      id: 6,
      status_id: 3,
      name: 'Оплачен ПД',
    },
    {
      id: 12,
      status_id: 4,
      name: 'Отменен',
    },
    {
      id: 44,
      status_id: 4,
      name: 'Отказ пред.оп',
    },
    {
      id: 7,
      status_id: 5,
      name: 'Возврат',
    },
    {
      id: 47,
      status_id: 5,
      name: 'Возврат КД (отгружен)',
    },
    {
      id: 48,
      status_id: 5,
      name: 'Возврат ПД (отгружен)',
    },
    {
      id: 8,
      status_id: 6,
      name: 'Дубль',
    },
    {
      id: 9,
      status_id: 6,
      name: 'Спам/ошибки',
    },
    {
      id: 14,
      status_id: 0,
      name: 'Не отвеченные (недозвон)',
    },
    {
      id: 27,
      status_id: 3,
      name: 'ОПЛ тс',
    },
    {
      id: 30,
      status_id: 0,
      name: 'HotCold',
    },
    {
      id: 31,
      status_id: 6,
      name: 'Cold(база)',
    },
    {
      id: 42,
      status_id: 0,
      name: 'Cold',
    },
    {
      id: 49,
      status_id: 0,
      name: 'Cold (возврат)',
    },
    {
      id: 37,
      status_id: 2,
      name: 'нет товара КД',
    },
    {
      id: 38,
      status_id: 2,
      name: 'нет товара ПД',
    },
    {
      id: 52,
      status_id: 0,
      name: 'Resale',
    },
  ]);

  await knex.raw("SELECT setval('sub_status_id_seq', (SELECT MAX(id) FROM sub_status))");
};
