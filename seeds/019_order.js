/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// TEST
export const seed = async (knex) => {
  await knex('order').del();

  const webmasters = ["13", "10", "16", "7", "3", "17", "18", "5", "11", "15", "9", "19", "25", "21", "24", "22", "23", "20", "26", "8", "2", "12", "1", "6", "4", "14"];
  const operators = ["102618", "102666", "102672", "102648", "102654", "102663", "102622", "102810", "102651", "103144", "102645", "102615", "103033", "102619", "102664", "102692", "103169", "103333", "102696", "103390", "103143", "102628", "102695", "102699", "102684", "102676", "102612", "102650", "102637", "102901", "102669", "103355", "102673", "103146", "102665", "102639", "103238", "102670", "102683", "102647", "102614", "102655", "102671", "102675", "102653", "102636", "102608", "102632", "102667", "102646", "102610", "102657", "102649", "102624", "103389", "102617", "102634", "102626", "102621", "103014", "102631", "102678", "102629", "102652", "102674", "102703", "102662", "102620", "102656", "102704", "102625", "102758", "102677", "102642", "102691", "102611", "102607", "102638", "102708", "102643", "92000", "102720", "100809", "102659", "102630", "102641", "102658", "102633", "102627", "102635", "102616", "102759", "102640", "102644", "102668", "102623", "102718", "100814", "102613", "102842", "102609", "103116", "94593"];
  const cities = [1, 2, 3];
  const statuses = [0, 1, 2, 3, 4, 5, 6];
  const sub_statuses = {
    0: [52, 51, 49, 43, 42, 34, 33, 32, 30, 21, 14, 11, 10],
    1: [4, 1],
    2: [53, 46, 40, 38, 37, 35, 29, 28, 26, 25, 16, 15, 13, 3],
    3: [27, 6, 5],
    4: [44, 12],
    5: [48, 47, 7],
    6: [31, 9, 8],
  };
  const genders = [1, 2];
  const payments = [1, 2, 3];
  const deliveries = [1, 2, 3, 4];
  const cancelReasons = [1, 2, 3, 4, 5, 6, 7, 8];
  const regions = ['Ю.К.О', 'С.К.О', 'В.К.О', 'З.К.О'];

  const getRandomDateInRange = (start, end) => {
    const startDate = start.getTime();
    const endDate = end.getTime();
    return new Date(startDate + Math.random() * (endDate - startDate));
  };

  const now = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(now.getMonth() + 3);

  // Генерация заказов
  const orders = Array.from({ length: 1000 }, (_, i) => {
    const randomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const status = randomArrayItem(statuses);
    const sub_statusesForStatus = sub_statuses[status]; // Получаем допустимые подстатусы для текущего статуса
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
      gender_id: randomArrayItem(genders),
      payment_id: randomArrayItem(payments),
      delivery_id: randomArrayItem(deliveries),
      cancel_reason_id: randomArrayItem(cancelReasons),
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
      created_at: getRandomDateInRange(now, threeMonthsLater),
      updated_at: new Date(),
      approved_at: null,
      cancelled_at: null,
      shipped_at: null,
      buyout_at: null,
    };
  });

  // Вставляем данные в таблицу
  await knex('order').insert(orders);

  await knex.raw(`SELECT setval('order_id_seq', (SELECT MAX(id) FROM "order"))`);
};

// PROD
// export const seed = async (knex) => {
//   await knex.raw(`SELECT setval('order_id_seq', (SELECT MAX(id) FROM "order"))`);
// };
