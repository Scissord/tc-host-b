/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  const rawColumns = [
    { name: "id", label: "ID" },
    { name: "operator", label: "Оператор" },
    { name: "products", label: "Товары" },
    { name: "webmaster", label: "Вебмастер" },
    { name: "additional1", label: 'Домен' },
    { name: "created_at", label: "Дата" },
    { name: "updated_at", label: "Последнее изменение" },
    { name: "approved_at", label: "Дата апрува" },
    { name: "shipped_at", label: "Дата отправки" },
    { name: "cancelled_at", label: "Дата отмены" },
    { name: "buyout_at", label: "Дата выкупа" },
    { name: "delivery_at", label: "Дата доставки" },
    { name: "comment", label: "Комментарий" },
    { name: "price", label: "Цена" },
    { name: "total_sum", label: "Итого" },
    { name: "logist_reacall_at", label: "Время перезвона" },
    { name: "quantity", label: "Количество" },
    { name: "fio", label: "ФИО" },
    { name: "phone", label: "Телефон" },
    { name: "region", label: "Регион" },
    { name: "city", label: "Город" },
    { name: "address", label: "Адрес" },
    { name: "postal_code", label: "Почтовый индекс" },
    { name: "age", label: "Возраст" },
    { name: "utm_term", label: "utm_term" },
    { name: "status", label: "Статус" },
    { name: "gender", label: "Пол" },
    { name: "payment_method", label: "Способ оплаты" },
    { name: "delivery_method", label: "Способ доставки" },
    { name: "order_cancel_reason", label: "Причина отмены" },
    { name: "additional2", label: "Затраченное время" },
    { name: "additional3", label: "Внешний вебмастер" },
    { name: "additional4", label: "Трек код" },
    { name: "additional5", label: "Дата возврата" },
    { name: "additional6", label: "Pixel" },
    { name: "additional7", label: "Причина возврата" },
    { name: "additional8", label: "Язык" },
    { name: "additional9", label: "HOLD" },
    { name: "additional10", label: "ID дизайнера" },
  ];

  const columns = rawColumns.map((column, index) => ({
    id: index + 1,
    index: index + 1,
    ...column,
  }));

  await knex("order_column").del();
  await knex("order_column").insert(columns);

  await knex.raw("SELECT setval('order_column_id_seq', (SELECT MAX(id) FROM order_column))");
};
