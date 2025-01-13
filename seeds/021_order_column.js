/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('order_column').del()
  await knex('order_column').insert([
    {
      id: 1,
      name: "id",
      label: "ID",
    },
    {
      id: 2,
      name: "fio",
      label: "ФИО",
    },
    {
      id: 3,
      name: "products",
      label: "Товары",
    },
    {
      id: 4,
      name: "phone",
      label: "Телефон",
    },
    {
      id: 5,
      name: "region",
      label: "Регион",
    },
    {
      id: 6,
      name: "city",
      label: "Город",
    },
    {
      id: 7,
      name: "address",
      label: "Адрес",
    },
    {
      id: 8,
      name: "postal_code",
      label: "Почтовый индекс",
    },
    {
      id: 9,
      name: "comment",
      label: "Комментарий",
    },
    {
      id: 10,
      name: "utm_term",
      label: "utm_term",
    },
    {
      id: 11,
      name: "webmaster",
      label: "Вебмастер",
    },
    {
      id: 12,
      name: "operator",
      label: "Оператор",
    },
    {
      id: 13,
      name: "order_sub_status",
      label: "Статус",
    },
    {
      id: 14,
      name: "gender",
      label: "Пол",
    },
    {
      id: 15,
      name: "payment",
      label: "Способ оплаты",
    },
    {
      id: 16,
      name: "delivery",
      label: "Способ доставки",
    },
    {
      id: 17,
      name: "cancel_reason",
      label: "Причина отмены",
    },
    {
      id: 17,
      name: "additional1",
      label: "additional1",
    },
    {
      id: 18,
      name: "additional2",
      label: "additional2",
    },
    {
      id: 19,
      name: "additional3",
      label: "additional3",
    },
    {
      id: 20,
      name: "additional4",
      label: "additional4",
    },
    {
      id: 21,
      name: "additional5",
      label: "additional5",
    },
    {
      id: 22,
      name: "additional6",
      label: "additional6",
    },
    {
      id: 23,
      name: "additional7",
      label: "additional7",
    },
    {
      id: 24,
      name: "additional8",
      label: "additional8",
    },
    {
      id: 25,
      name: "additional9",
      label: "additional9",
    },
    {
      id: 26,
      name: "additional10",
      label: "additional10",
    },
    {
      id: 27,
      name: "created_at",
      label: "Дата",
    },
    {
      id: 28,
      name: "updated_at",
      label: "Обновляли",
    },
  ]);

  await knex.raw("SELECT setval('order_column_id_seq', (SELECT MAX(id) FROM order_column))");
};
