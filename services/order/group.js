export const groupByDate = (orders) => {
  const grouped = orders.reduce((acc, order) => {
    const day = new Date(order.created_at).toLocaleDateString('ru-KZ');

    if (!acc[day]) {
      acc[day] = {
        day,
        total: 0, // Инициализация общего количества заказов
        statuses: {
          '0': { count: 0, percent: 0 },
          '1': { count: 0, percent: 0 },
          '2': { count: 0, percent: 0 },
          '3': { count: 0, percent: 0 },
          '4': { count: 0, percent: 0 },
          '5': { count: 0, percent: 0 },
          '6': { count: 0, percent: 0 },
        },
      };
    }

    // Увеличиваем общее количество заказов за день
    acc[day].total += 1;

    // Инициализируем статус, если его ещё нет
    if (!acc[day].statuses[order.status_id]) {
      acc[day].statuses[order.status_id] = {
        count: 0,
        percent: 0, // Процент будет рассчитан позже
      };
    }

    // Увеличиваем количество для данного статуса
    acc[day].statuses[order.status_id].count += 1;

    return acc;
  }, {});

  // Рассчитываем проценты и преобразуем структуру
  return Object.values(grouped).map(({ day, total, statuses }) => {
    const groupedStatuses = Object.entries(statuses).reduce((acc, [statusId, data]) => {
      acc[statusId] = {
        count: data.count,
        percent: ((data.count / total) * 100).toFixed(2),
      };
      return acc;
    }, {});

    return {
      label: day,
      total, // Включаем общее количество заказов
      statuses: groupedStatuses,
    };
  });
};

export const groupByRegion = (orders) => {
  const grouped = orders.reduce((acc, order) => {
    const region = order.region;

    if (!acc[region]) {
      acc[region] = {
        region,
        total: 0, // Инициализация общего количества заказов
        statuses: {
          '0': { count: 0, percent: 0 },
          '1': { count: 0, percent: 0 },
          '2': { count: 0, percent: 0 },
          '3': { count: 0, percent: 0 },
          '4': { count: 0, percent: 0 },
          '5': { count: 0, percent: 0 },
          '6': { count: 0, percent: 0 },
        },
      };
    }

    // Увеличиваем общее количество заказов для региона
    acc[region].total += 1;

    // Инициализируем статус, если его ещё нет
    if (!acc[region].statuses[order.status_id]) {
      acc[region].statuses[order.status_id] = {
        count: 0,
        percent: 0, // Процент будет рассчитан позже
      };
    }

    // Увеличиваем количество для данного статуса
    acc[region].statuses[order.status_id].count += 1;

    return acc;
  }, {});

  // Рассчитываем проценты и преобразуем структуру
  return Object.values(grouped).map(({ region, total, statuses }) => {
    const groupedStatuses = Object.entries(statuses).reduce((acc, [statusId, data]) => {
      acc[statusId] = {
        count: data.count,
        percent: ((data.count / total) * 100).toFixed(2),
      };
      return acc;
    }, {});

    return {
      label: region,
      total, // Включаем общее количество заказов
      statuses: groupedStatuses,
    };
  });
};

export const groupByCity = (orders) => {
  const grouped = orders.reduce((acc, order) => {
    const city = order.city_name;

    if (!acc[city]) {
      acc[city] = {
        city,
        total: 0, // Инициализация общего количества заказов
        statuses: {
          '0': { count: 0, percent: 0 },
          '1': { count: 0, percent: 0 },
          '2': { count: 0, percent: 0 },
          '3': { count: 0, percent: 0 },
          '4': { count: 0, percent: 0 },
          '5': { count: 0, percent: 0 },
          '6': { count: 0, percent: 0 },
        },
      };
    }

    // Увеличиваем общее количество заказов для города
    acc[city].total += 1;

    // Инициализируем статус, если его ещё нет
    if (!acc[city].statuses[order.status_id]) {
      acc[city].statuses[order.status_id] = {
        count: 0,
        percent: 0, // Процент будет рассчитан позже
      };
    }

    // Увеличиваем количество для данного статуса
    acc[city].statuses[order.status_id].count += 1;

    return acc;
  }, {});

  // Рассчитываем проценты и преобразуем структуру
  return Object.values(grouped).map(({ city, total, statuses }) => {
    const groupedStatuses = Object.entries(statuses).reduce((acc, [statusId, data]) => {
      acc[statusId] = {
        count: data.count,
        percent: ((data.count / total) * 100).toFixed(2),
      };
      return acc;
    }, {});

    return {
      label: city,
      total, // Включаем общее количество заказов
      statuses: groupedStatuses,
    };
  });
};

export const groupByProduct = (orders, items) => {
  const grouped = items.reduce((acc, item) => {
    const productId = item.product_id;
    const productName = item.product_name;

    // Находим заказ, соответствующий элементу
    const order = orders.find((order) => order.id === item.order_id);

    if (!order) return acc; // Пропускаем, если заказ не найден

    if (!acc[productId]) {
      acc[productId] = {
        product_id: productId,
        product_name: productName,
        total: 0, // Инициализация общего количества товаров
        statuses: {
          '0': { count: 0, percent: 0 },
          '1': { count: 0, percent: 0 },
          '2': { count: 0, percent: 0 },
          '3': { count: 0, percent: 0 },
          '4': { count: 0, percent: 0 },
          '5': { count: 0, percent: 0 },
          '6': { count: 0, percent: 0 },
        },
      };
    }

    // Увеличиваем общее количество товаров
    acc[productId].total += 1;

    // Инициализируем статус, если его ещё нет
    if (!acc[productId].statuses[order.status_id]) {
      acc[productId].statuses[order.status_id] = {
        count: 0,
        percent: 0, // Процент будет рассчитан позже
      };
    }

    // Увеличиваем количество для данного статуса
    acc[productId].statuses[order.status_id].count += 1;

    return acc;
  }, {});

  // Рассчитываем проценты и преобразуем структуру
  return Object.values(grouped).map(({ product_id, product_name, total, statuses }) => {
    const groupedStatuses = Object.entries(statuses).reduce((acc, [statusId, data]) => {
      acc[statusId] = {
        count: data.count,
        percent: ((data.count / total) * 100).toFixed(2),
      };
      return acc;
    }, {});

    return {
      label: product_name,
      product_id,
      total,
      statuses: groupedStatuses,
    };
  });
};

export const calculateStatistics = (data, by_date = false) => {
  if (!data || Object.keys(data).length === 0) {
    return { overall: {} };
  }

  let overall = {
    totalOrders: 0,
    acceptedOrders: 0,
    acceptedOrdersIds: [],
    cancelledOrders: 0,
    cancelledOrdersIds: [],
    shippedOrders: 0,
    shippedOrdersIds: [],
    refundedOrders: 0,
    refundedOrdersIds: [],
    holdOrders: 0,
    spamOrders: 0,
    buyoutOrders: 0,
    buyoutOrdersIds: [],
    avgTotalSum: 0,
  };
  let totalSumCount = 0;

  // Если данные по датам
  if (by_date) {
    const result = {};
    for (const [webmasterName, items] of Object.entries(data)) {
      result[webmasterName] = items.map((item) => {
        const calculatedItem = calculateStatisticsForItem(item);
        // Агрегируем общую статистику
        overall = aggregateOverall(overall, calculatedItem);
        if (calculatedItem.buyoutOrders > 0) {
          totalSumCount += calculatedItem.buyoutOrders;
        }
        return calculatedItem;
      });
    }

    overall.avgTotalSum = totalSumCount > 0 ? (overall.avgTotalSum / totalSumCount).toFixed(2) : 0;
    return { ...result, overall };
  }

  // Если общие данные
  const result = {};
  for (const [webmasterName, item] of Object.entries(data)) {
    const calculatedItem = calculateStatisticsForItem(item);
    result[webmasterName] = calculatedItem;

    // Агрегируем общую статистику
    overall = aggregateOverall(overall, calculatedItem);
    if (calculatedItem.buyoutOrders > 0) {
      totalSumCount += calculatedItem.buyoutOrders;
    }
  }

  overall.avgTotalSum = totalSumCount > 0 ? (overall.avgTotalSum / totalSumCount).toFixed(2) : 0;

  return { ...result, overall };
};

// Вспомогательная функция для расчёта статистики
const calculateStatisticsForItem = (data) => {
  const { 
    totalOrders = 0, 
    acceptedOrders = 0, 
    acceptedOrdersIds = [],
    cancelledOrders = 0, 
    cancelledOrdersIds = [],
    shippedOrders = 0, 
    shippedOrdersIds = [],
    buyoutOrders = 0, 
    buyoutOrdersIds = [] 
  } = data;

  if (totalOrders === 0) {
    return {
      ...data,
      approvedPercentage: 0,
      cancelledPercentage: 0,
      shippedPercentage: 0,
      buyoutPercentage: 0,
      refundedOrders: 0,
      holdOrders: 0,
      spamOrders: 0,
    };
  }

  const approvedPercentage = ((acceptedOrders / totalOrders) * 100).toFixed(2); // % от totalOrders
  const cancelledPercentage = ((cancelledOrders / totalOrders) * 100).toFixed(2); // % от totalOrders
  const shippedPercentage = acceptedOrders > 0 ? ((shippedOrders / acceptedOrders) * 100).toFixed(2) : 0; // % от acceptedOrders
  const buyoutPercentage = acceptedOrders > 0 ? ((buyoutOrders / acceptedOrders) * 100).toFixed(2) : 0; // % от acceptedOrders

  return {
    ...data,
    approvedPercentage: parseFloat(approvedPercentage),
    cancelledPercentage: parseFloat(cancelledPercentage),
    shippedPercentage: parseFloat(shippedPercentage),
    buyoutPercentage: parseFloat(buyoutPercentage),
    acceptedOrdersIds: acceptedOrdersIds.filter((id) => id !== null), // Убираем null
    cancelledOrdersIds: cancelledOrdersIds.filter((id) => id !== null), // Убираем null
    shippedOrdersIds: shippedOrdersIds.filter((id) => id !== null), // Убираем null
    buyoutOrdersIds: buyoutOrdersIds.filter((id) => id !== null), // Убираем null
  };
};

// Вспомогательная функция для агрегации общей статистики
const aggregateOverall = (overall, item) => {
  overall.totalOrders += item.totalOrders || 0;
  overall.acceptedOrders += item.acceptedOrders || 0;
  overall.cancelledOrders += item.cancelledOrders || 0;
  overall.shippedOrders += item.shippedOrders || 0;
  overall.buyoutOrders += item.buyoutOrders || 0;
  overall.avgTotalSum += (item.avgTotalSum || 0) * (item.buyoutOrders || 0);

  // Агрегируем массивы id
  overall.acceptedOrdersIds = [...overall.acceptedOrdersIds, ...(item.acceptedOrdersIds || [])];
  overall.cancelledOrdersIds = [...overall.cancelledOrdersIds, ...(item.cancelledOrdersIds || [])];
  overall.shippedOrdersIds = [...overall.shippedOrdersIds, ...(item.shippedOrdersIds || [])];
  overall.buyoutOrdersIds = [...overall.buyoutOrdersIds, ...(item.buyoutOrdersIds || [])];

  return overall;
};



export const groupOperators = (orders, operators) => {
  const grouped = orders.reduce((acc, order) => {
    const operator = operators.find((op) => +op.id === +order.operator_id);

    if (!operator) return acc; // Если оператор не найден, пропускаем заказ

    if (!acc[operator.id]) {
      acc[operator.id] = {
        operator: {
          id: operator.id,
          name: operator.name,
        },
        total: 0, // Инициализация общего количества заказов
        statuses: {
          '0': { count: 0, percent: 0 },
          '1': { count: 0, percent: 0 },
          '2': { count: 0, percent: 0 },
          '3': { count: 0, percent: 0 },
          '4': { count: 0, percent: 0 },
          '5': { count: 0, percent: 0 },
          '6': { count: 0, percent: 0 },
        },
      };
    }

    // Увеличиваем общее количество заказов
    acc[operator.id].total += 1;

    // Увеличиваем количество для данного статуса
    if (!acc[operator.id].statuses[order.status_id]) {
      acc[operator.id].statuses[order.status_id] = { count: 0, percent: 0 };
    }

    acc[operator.id].statuses[order.status_id].count += 1;

    return acc;
  }, {});

  // Рассчитываем проценты
  return Object.values(grouped).map(({ operator, total, statuses }) => {
    const groupedStatuses = Object.entries(statuses).reduce((acc, [statusId, data]) => {
      acc[statusId] = {
        count: data.count,
        percent: ((data.count / total) * 100).toFixed(2),
      };
      return acc;
    }, {});

    return {
      label: operator.name,
      total,
      statuses: groupedStatuses,
    };
  });
};
