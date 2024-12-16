/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex('order').del();

  const webmasters = [1, 2, 3, 4, 5];
  const operators = [1, 2, 3, 4, 5];
  const cities = [1, 2, 3];
  const order_statuses = [1, 2, 3, 4, 5, 6, 7];
  const order_sub_statuses = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9],
    4: [10, 11, 12],
    5: [13, 14, 15],
    6: [16, 17, 18],
    7: [19, 20, 21]
  };
  const regions = ['Ю.К.О', 'С.К.О', 'В.К.О', 'З.К.О'];

  // Генерация заказов
  const orders = Array.from({ length: 1000 }, (_, i) => {
    const randomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    const status = randomArrayItem(order_statuses);
    const sub_statusesForStatus = order_sub_statuses[status]; // Получаем допустимые подстатусы для текущего статуса
    const sub_status = randomArrayItem(sub_statusesForStatus); // Выбираем случайный подстатус из допустимых для выбранного статуса

    return {
      id: 10000 + i,
      fio: `User ${i + 1}`,
      phone: `770000000${String(i).padStart(2, '0')}`,
      region: randomArrayItem(regions),
      city_id: randomArrayItem(cities),
      address: `ул. Улица ${i + 1}, д. ${i + 1}, кв. ${i + 1}`,
      postal_code: '160000',
      comment: `Комментарий ${i + 1}`,
      utm_term: null,
      webmaster_id: randomArrayItem(webmasters),
      operator_id: randomArrayItem(operators),
      status_id: status,
      sub_status_id: sub_status,
      additional1: 'Доп. поле 1',
      additional2: null,
      additional3: 'Доп. поле 3',
      additional4: null,
      additional5: 'Доп. поле 5',
      additional6: null,
      additional7: 'Доп. поле 7',
      additional8: 'Доп. поле 8',
      additional9: null,
      additional10: 'Доп. поле 10',
      created_at: new Date(),
      updated_at: new Date(),
      approved_at: null,
      cancelled_at: null,
      shipped_at: null,
      buyout_at: null,
    };
  });

  // Вставляем данные в таблицу
  await knex('order').insert(orders);
};
