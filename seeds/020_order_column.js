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
    { name: "updated_at", label: "Посленее изменение" },
    { name: "approved_at", label: "Дата апрува" },
    { name: "shipped_at", label: "Дата отправки" },
    { name: "cancelled_at", label: "Дата отмены" },
    { name: "buyout_at", label: "Дата выкупа" },
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
    { name: "age", label: "Возвраст" },
    { name: "utm_term", label: "utm_term" },
    { name: "sub_status_id", label: "Статус" },
    { name: "gender", label: "Пол" },
    { name: "payment_method", label: "Способ оплаты" },
    { name: "delivery_method", label: "Способ доставки" },
    { name: "order_cancel_reason", label: "Причина отмены" },
    { name: "additional2", label: "additional2" },
    { name: "additional3", label: "additional3" },
    { name: "additional4", label: "additional4" },
    { name: "additional5", label: "additional5" },
    { name: "additional6", label: "additional6" },
    { name: "additional7", label: "additional7" },
    { name: "additional8", label: "additional8" },
    { name: "additional9", label: "additional9" },
    { name: "additional10", label: "additional10" },
    { name: "delivery_at", label: "Дата доставки" },
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
