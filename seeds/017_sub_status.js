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
      index: 1,
    },
    {
      id: 21,
      status_id: 0,
      name: 'Обработка (новые)',
      index: 2,
    },
    {
      id: 32,
      status_id: 0,
      name: 'Обработка (новые рус.яз)',
      index: 3,
    },
    {
      id: 43,
      status_id: 0,
      name: 'Обработка (выделенный)',
      index: 4,
    },
    {
      id: 51,
      status_id: 0,
      name: 'Обработка (WhatsApp)',
      index: 5,
    },
    {
      id: 11,
      status_id: 0,
      name: 'Перезвон',
      index: 6,
    },
    {
      id: 34,
      status_id: 0,
      name: 'Перезвон (рус.яз)',
      index: 7,
    },
    {
      id: 10,
      status_id: 0,
      name: 'Недозвон',
      index: 8,
    },
    {
      id: 33,
      status_id: 0,
      name: 'Недозвон (рус.яз)',
      index: 9,
    },
    {
      id: 1,
      status_id: 1,
      name: 'Подтвержден КД',
      index: 10,
    },
    {
      id: 53,
      status_id: 2,
      name: 'Пред.подтвержден КД',
      index: 11,
    },
    {
      id: 15,
      status_id: 2,
      name: 'Готов к передаче КД',
      index: 12,
    },
    {
      id: 3,
      status_id: 2,
      name: 'Отправлен КД',
      index: 13,
    },
    {
      id: 35,
      status_id: 2,
      name: 'ДВД готов',
      index: 14,
    },
    {
      id: 5,
      status_id: 3,
      name: 'Оплачен КД',
      index: 15,
    },
    {
      id: 28,
      status_id: 2,
      name: 'НД KET KZ',
      index: 16,
    },
    {
      id: 29,
      status_id: 2,
      name: 'Перенос/ОД KET KZ',
      index: 17,
    },
    {
      id: 40,
      status_id: 2,
      name: 'Отказ KET KZ',
      index: 18,
    },
    {
      id: 4,
      status_id: 1,
      name: 'Подтвержден ПД',
      index: 19,
    },
    {
      id: 16,
      status_id: 2,
      name: 'Готов к передаче ПД',
      index: 20,
    },
    {
      id: 13,
      status_id: 2,
      name: 'Отправлен ПД',
      index: 21,
    },
    {
      id: 25,
      status_id: 2,
      name: 'Прибыл ПД',
      index: 22,
    },
    {
      id: 46,
      status_id: 2,
      name: 'Отказ на доставке ПД',
      index: 23,
    },
    {
      id: 26,
      status_id: 2,
      name: 'Заберет сегодня ПД',
      index: 24,
    },
    {
      id: 6,
      status_id: 3,
      name: 'Оплачен ПД',
      index: 25,
    },
    {
      id: 12,
      status_id: 4,
      name: 'Отменен',
      index: 26,
    },
    {
      id: 44,
      status_id: 4,
      name: 'Отказ пред.оп',
      index: 27,
    },
    {
      id: 7,
      status_id: 5,
      name: 'Возврат',
      index: 28,
    },
    {
      id: 47,
      status_id: 5,
      name: 'Возврат КД (отгружен)',
      index: 29,
    },
    {
      id: 48,
      status_id: 5,
      name: 'Возврат ПД (отгружен)',
      index: 30,
    },
    {
      id: 8,
      status_id: 6,
      name: 'Дубль',
      index: 31,
    },
    {
      id: 9,
      status_id: 6,
      name: 'Спам/ошибки',
      index: 32,
    },
    {
      id: 14,
      status_id: 0,
      name: 'Не отвеченные (недозвон)',
      index: 33,
    },
    {
      id: 27,
      status_id: 3,
      name: 'ОПЛ тс',
      index: 34,
    },
    {
      id: 30,
      status_id: 0,
      name: 'HotCold',
      index: 35,
    },
    {
      id: 31,
      status_id: 6,
      name: 'Cold(база)',
      index: 36,
    },
    {
      id: 42,
      status_id: 0,
      name: 'Cold',
      index: 37,
    },
    {
      id: 49,
      status_id: 0,
      name: 'Cold (возврат)',
      index: 38,
    },
    {
      id: 37,
      status_id: 2,
      name: 'нет товара КД',
      index: 39,
    },
    {
      id: 38,
      status_id: 2,
      name: 'нет товара ПД',
      index: 40,
    },
    {
      id: 52,
      status_id: 0,
      name: 'Resale',
      index: 41,
    },
    {
      id: 54,
      status_id: 6,
      name: 'Дубль АПИ',
      index: 42,
    },
  ]);

  await knex.raw("SELECT setval('sub_status_id_seq', (SELECT MAX(id) FROM sub_status))");
};
