import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const orderRepository = repository('order');

export const get = async () => {
  return await orderRepository.getAll();
};

export const getWhere = async (query) => {
  return await orderRepository.getWhere(query, 'id', 'desc');
};

export const getForSocket = async (condition) => {
  const result = await db('order as o')
    .select('o.*')
    .where(condition)
    .orderBy('o.id', 'desc')
    .paginate({
      perPage: 20,
      currentPage: 1,
      isLengthAware: true
    });

  return {
    orders: result.data,
    total: result.pagination.total,
  };
};

export const getWhereIn = async (field, values) => {
  return await db('order as o')
    .select('o.*')
    .whereIn(field, values)
    .orderBy('o.id', 'desc');
};

export const getFullDoubles = async (id, phone) => {
  return await db('order as o')
    .select('o.*', 'ss.name as status_name')
    .leftJoin('sub_status as ss', 'ss.id', 'o.sub_status_id')
    .where('o.phone', 'ILIKE', `%${phone}%`)
    .whereNot('o.id', id)
};

export const getDoubles = async (id, phone) => {
  return await db('order as o')
    .where('o.phone', 'ILIKE', `%${phone}%`)
    .whereNot('o.id', id)
    .pluck('o.id');
};

export const create = async (data) => {
  delete data.items;
  return await orderRepository.create(data);
};

export const createMany = async (data) => {
  return await orderRepository.createMany(data);
};

export const update = async (id, data) => {
  return await orderRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await orderRepository.delete(id);
};

export const hardDeleteAll = async () => {
  return await orderRepository.hardDeleteAll();
};

export const find = async (id) => {
  return await orderRepository.find(id);
};

export const updateWhereIn = async (ids, data) => {
  return await orderRepository.updateWhereIn(ids, data);
};

export const getOrdersChatsByStatuses = async (sub_statuses, limit, offset) => {
  try {
    const result = await db('order')
      .leftJoin('wh_chat', 'order.id', 'wh_chat.order_id')
      .leftJoin('wh_message', function () {
        this.on('wh_chat.order_id', '=', 'wh_message.order_id')
          .andOn(
            'wh_message.id',
            '=',
            db.raw('(SELECT MAX(id) FROM wh_message WHERE wh_message.order_id = wh_chat.order_id)')
          );
      })
      .leftJoin(
        db('wh_message')
          .select('order_id')
          .count('* as unread_count')
          .where('status', false)
          .groupBy('order_id')
          .as('unread_messages'),
        'order.id',
        'unread_messages.order_id'
      )
      .select(
        'order.id as order_id',
        'order.sub_status_id',
        'wh_message.type as message_type',
        'wh_message.type_message as message_type_message',
        'wh_message.timestamp as message_timestamp',
        'wh_message.message_data as message_data',
        'wh_message.status as message_status',
        'wh_message.sender_id as sender_id',
        'unread_messages.unread_count as unread_count'
      )
      .whereIn('order.sub_status_id', sub_statuses)
      .limit(limit)
      .offset(offset);

    return result;
  } catch (err) {
    console.error('Error fetching chats with statuses:', err);
    throw new Error('Failed to fetch chats for given statuses.');
  }
};

export const getUserOrdersPaginated = async function (
  limit,
  page,
  sub_status,
  sort_by = 'o.id',
  order_by = 'desc',
  start = null,
  end = null,
  id,
  operators,
  products,
  webmasters,
  additional1,
  created_at,
  updated_at,
  approved_at,
  shipped_at,
  cancelled_at,
  buyout_at,
  delivery_at,
  comment,
  price,
  total_sum,
  logist_recall_at,
  quantity,
  fio,
  phone,
  region,
  cities,
  address,
  postal_code,
  age,
  urm_term,
  statuses,
  gender,
  payment_methods,
  delivery_methods,
  order_cancel_reasons,
  additional2,
  additional3,
  additional4,
  additional5,
  additional6,
  additional7,
  additional8,
  additional9,
  additional10,
  is_filtered
) {
  const result = await db('order as o')
    .select('o.*')
    .modify((q) => {
      if (id) {
        const ids = id.replace(/,/g, ' ').split(' ').map(item => item.trim()).filter(item => item);
        if (ids.length > 1) {
          q.whereIn('o.id', ids);
        } else {
          q.where('o.id', id);
        }
      };
      if (Array.isArray(operators) && operators.length > 0) {
        q.whereIn('o.operator_id', operators.map((o) => o.id));
      };
      if (Array.isArray(webmasters) && webmasters.length > 0) {
        q.whereIn('o.webmaster_id', webmasters.map((o) => o.id));
      };
      if (additional1) {
        q.where('o.additional1', 'ilike', `%${additional1}%`)
      };
      if (Array.isArray(products) && products.length > 0) {
        const ids = products.map(p => +p.id);
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.product_id = ANY (?)
          )`,
          [ids]
        );
      };
      if (created_at) {
        q.whereBetween('o.created_at', created_at);
      };
      if (updated_at) {
        q.whereBetween('o.updated_at', updated_at);
      };
      if (approved_at) {
        q.whereBetween('o.approved_at', approved_at);
      };
      if (shipped_at) {
        q.whereBetween('o.shipped_at', shipped_at);
      };
      if (cancelled_at) {
        q.whereBetween('o.cancelled_at', cancelled_at);
      };
      if (buyout_at) {
        q.whereBetween('o.buyout_at', buyout_at);
      };
      if (delivery_at) {
        q.whereBetween('o.delivery_at', delivery_at);
      };
      if (comment) {
        q.where('o.comment', 'ilike', `%${comment}%`)
      };
      if (price) {
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.price = ?
          )`,
          [price]
        );
      };
      if (total_sum) {
        q.where('o.total_sum', 'ilike', `%${total_sum}%`)
      };
      if (logist_recall_at) {
        q.where('o.logist_recall_at', '>=', logist_recall_at);
      };
      if (quantity) {
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.quantity = ?
          )`,
          [quantity]
        );
      };
      if (fio) {
        q.where('o.fio', 'ilike', `%${fio}%`)
      };
      if (phone) {
        q.where('o.phone', 'ilike', `%${phone}%`)
      };
      if (region) {
        q.where('o.region', 'ilike', `%${region}%`)
      };
      if (Array.isArray(cities) && cities.length > 0) {
        q.whereIn('o.city_id', cities.map((c) => c.id));
      };
      if (address) {
        q.where('o.address', 'ilike', `%${address}%`)
      };
      if (postal_code) {
        q.where('o.postal_code', 'ilike', `%${postal_code}%`)
      };
      if (age) {
        q.where('o.age', 'ilike', `%${age}%`)
      };
      if (age) {
        q.where('o.urm_term', 'ilike', `%${urm_term}%`)
      };
      if (Array.isArray(statuses) && statuses.length > 0) {
        q.whereIn('o.sub_status_id', statuses.map((s) => s.id));
      };
      if (gender) {
        q.where('o.gender', 'ilike', `%${gender}%`)
      };
      if (Array.isArray(payment_methods) && payment_methods.length > 0) {
        q.whereIn('o.payment_method_id', payment_methods.map((pm) => pm.id));
      };
      if (Array.isArray(delivery_methods) && delivery_methods.length > 0) {
        q.whereIn('o.delivery_method_id', delivery_methods.map((dm) => dm.id));
      };
      if (Array.isArray(order_cancel_reasons) && order_cancel_reasons.length > 0) {
        q.whereIn('o.order_cancel_reason_id', order_cancel_reasons.map((ocr) => ocr.id));
      };
      if (additional2) {
        q.where('o.additional2', 'ilike', `%${additional2}%`)
      };
      if (additional3) {
        q.where('o.additional3', 'ilike', `%${additional3}%`)
      };
      if (additional4) {
        q.where('o.additional4', 'ilike', `%${additional4}%`)
      };
      if (additional5) {
        q.where('o.additional5', 'ilike', `%${additional5}%`)
      };
      if (additional6) {
        q.where('o.additional6', 'ilike', `%${additional6}%`)
      };
      if (additional7) {
        q.where('o.additional7', 'ilike', `%${additional7}%`)
      };
      if (additional8) {
        q.where('o.additional8', 'ilike', `%${additional8}%`)
      };
      if (additional9) {
        q.where('o.additional9', 'ilike', `%${additional9}%`)
      };
      if (additional10) {
        q.where('o.additional10', 'ilike', `%${additional10}%`)
      };
      if (sub_status && is_filtered === 'false') {
        q.where('o.sub_status_id', sub_status);
      };
      if (start && end) {
        q.whereBetween('o.delivery_at', [start, end]);
      };
    })
    .orderBy(sort_by ?? 'o.id', order_by ?? 'desc')
    .paginate({
      perPage: limit,
      currentPage: page,
      isLengthAware: true
    });

  const { lastPage, currentPage, total } = result.pagination;

  const current = parseInt(currentPage, 10);
  const last = parseInt(lastPage, 10);
  const maxPagesToShow = 4;

  let pages = [];

  if (last <= maxPagesToShow) {
    pages = Array.from({ length: last }, (_, i) => i + 1);
  } else {
    if (current <= Math.ceil(maxPagesToShow / 2)) {
      pages = Array.from({ length: maxPagesToShow }, (_, i) => i + 1);
    } else if (current >= last - Math.floor(maxPagesToShow / 2)) {
      pages = Array.from({ length: maxPagesToShow }, (_, i) => last - (maxPagesToShow - 1) + i);
    } else {
      const startPage = current - Math.floor(maxPagesToShow / 2);
      pages = Array.from({ length: maxPagesToShow }, (_, i) => startPage + i);
    }
  }

  return {
    orders: result.data,
    lastPage,
    pages,
    total,
  };
};

export const getWebmasterOrdersPaginated = async function (
  limit,
  page,
  webmaster_id
) {
  const result = await db('order as o')
    .select('o.*')
    .where('o.webmaster_id', webmaster_id)
    .orderBy('o.id', 'desc')
    .paginate({
      perPage: limit,
      currentPage: page,
      isLengthAware: true
    });

  const { lastPage, currentPage } = result.pagination;

  const current = parseInt(currentPage, 10);
  const last = parseInt(lastPage, 10);
  const maxPagesToShow = 4;

  let pages = [];

  if (last <= maxPagesToShow) {
    pages = Array.from({ length: last }, (_, i) => i + 1);
  } else {
    if (current <= Math.ceil(maxPagesToShow / 2)) {
      pages = Array.from({ length: maxPagesToShow }, (_, i) => i + 1);
    } else if (current >= last - Math.floor(maxPagesToShow / 2)) {
      pages = Array.from({ length: maxPagesToShow }, (_, i) => last - (maxPagesToShow - 1) + i);
    } else {
      const startPage = current - Math.floor(maxPagesToShow / 2);
      pages = Array.from({ length: maxPagesToShow }, (_, i) => startPage + i);
    }
  }

  return {
    orders: result.data,
    lastPage,
    pages,
  };
};

export const getOperatorOrdersPaginated = async function (
  limit,
  page,
  sub_status,
  sort_by = 'o.id',
  order_by = 'desc',
  start = null,
  end = null,
  id,
  operators,
  products,
  created_at,
  updated_at,
  approved_at,
  shipped_at,
  cancelled_at,
  buyout_at,
  delivery_at,
  comment,
  price,
  total_sum,
  logist_recall_at,
  quantity,
  fio,
  phone,
  region,
  cities,
  address,
  postal_code,
  age,
  statuses,
  gender,
  payment_methods,
  delivery_methods,
  order_cancel_reasons,
  additional4,
  additional5,
  additional7,
  additional8,
  is_filtered
) {
  console.log(is_filtered);
  const result = await db('order as o')
    .select('o.*')
    .modify((q) => {
      if (id) {
        const ids = id.replace(/,/g, ' ').split(' ').map(item => item.trim()).filter(item => item);
        if (ids.length > 1) {
          q.whereIn('o.id', ids);
        } else {
          q.where('o.id', id);
        }
      };
      if (Array.isArray(operators) && operators.length > 0) {
        q.whereIn('o.operator_id', operators.map((o) => o.id));
      };
      if (Array.isArray(products) && products.length > 0) {
        const ids = products.map(p => +p.id);
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.product_id = ANY (?)
          )`,
          [ids]
        );
      };
      if (created_at) {
        q.whereBetween('o.created_at', created_at);
      };
      if (updated_at) {
        q.whereBetween('o.updated_at', updated_at);
      };
      if (approved_at) {
        q.whereBetween('o.approved_at', approved_at);
      };
      if (shipped_at) {
        q.whereBetween('o.shipped_at', shipped_at);
      };
      if (cancelled_at) {
        q.whereBetween('o.cancelled_at', cancelled_at);
      };
      if (buyout_at) {
        q.whereBetween('o.buyout_at', buyout_at);
      };
      if (delivery_at) {
        q.whereBetween('o.delivery_at', delivery_at);
      };
      if (comment) {
        q.where('o.comment', 'ilike', `%${comment}%`)
      };
      if (price) {
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.price = ?
          )`,
          [price]
        );
      };
      if (total_sum) {
        q.where('o.total_sum', 'ilike', `%${total_sum}%`)
      };
      if (logist_recall_at) {
        q.where('o.logist_recall_at', '>=', logist_recall_at);
      };
      if (quantity) {
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.quantity = ?
          )`,
          [quantity]
        );
      };
      if (fio) {
        q.where('o.fio', 'ilike', `%${fio}%`)
      };
      if (phone) {
        q.where('o.phone', 'ilike', `%${phone}%`)
      };
      if (region) {
        q.where('o.region', 'ilike', `%${region}%`)
      };
      if (Array.isArray(cities) && cities.length > 0) {
        q.whereIn('o.city_id', cities.map((c) => c.id));
      };
      if (address) {
        q.where('o.address', 'ilike', `%${address}%`)
      };
      if (postal_code) {
        q.where('o.postal_code', 'ilike', `%${postal_code}%`)
      };
      if (age) {
        q.where('o.age', 'ilike', `%${age}%`)
      };
      if (Array.isArray(statuses) && statuses.length > 0) {
        q.whereIn('o.sub_status_id', statuses.map((s) => s.id));
      };
      if (gender) {
        q.where('o.gender', 'ilike', `%${gender}%`)
      };
      if (Array.isArray(payment_methods) && payment_methods.length > 0) {
        q.whereIn('o.payment_method_id', payment_methods.map((pm) => pm.id));
      };
      if (Array.isArray(delivery_methods) && delivery_methods.length > 0) {
        q.whereIn('o.delivery_method_id', delivery_methods.map((dm) => dm.id));
      };
      if (Array.isArray(order_cancel_reasons) && order_cancel_reasons.length > 0) {
        q.whereIn('o.order_cancel_reason_id', order_cancel_reasons.map((ocr) => ocr.id));
      };
      if (additional4) {
        q.where('o.additional4', 'ilike', `%${additional4}%`)
      };
      if (additional5) {
        q.where('o.additional5', 'ilike', `%${additional5}%`)
      };
      if (additional7) {
        q.where('o.additional7', 'ilike', `%${additional7}%`)
      };
      if (additional8) {
        q.where('o.additional8', 'ilike', `%${additional8}%`)
      };
      if (sub_status && is_filtered === 'false') {
        console.log(is_filtered);
        q.where('o.sub_status_id', sub_status);
      };
      if (start && end) {
        q.whereBetween('o.delivery_at', [start, end]);
      };
    })
    .orderBy(sort_by ?? 'o.id', order_by ?? 'desc')
    .paginate({
      perPage: limit,
      currentPage: page,
      isLengthAware: true
    });

  const { lastPage, currentPage, total } = result.pagination;

  const current = parseInt(currentPage, 10);
  const last = parseInt(lastPage, 10);
  const maxPagesToShow = 4;

  let pages = [];

  if (last <= maxPagesToShow) {
    pages = Array.from({ length: last }, (_, i) => i + 1);
  } else {
    if (current <= Math.ceil(maxPagesToShow / 2)) {
      pages = Array.from({ length: maxPagesToShow }, (_, i) => i + 1);
    } else if (current >= last - Math.floor(maxPagesToShow / 2)) {
      pages = Array.from({ length: maxPagesToShow }, (_, i) => last - (maxPagesToShow - 1) + i);
    } else {
      const startPage = current - Math.floor(maxPagesToShow / 2);
      pages = Array.from({ length: maxPagesToShow }, (_, i) => startPage + i);
    }
  }

  return {
    orders: result.data,
    lastPage,
    pages,
    total,
  };
};

export const getOrdersStatisticForUser = async (start, end, webmaster_id = null, by_date = false) => {
  try {
    const query = db('order as o')
      .select(
        db.raw(`
          ${by_date ? 'DATE(o.created_at) AS date,' : ''}
          COUNT(*) AS total_orders,
          SUM(
            CASE
              WHEN o.approved_at IS NOT NULL AND (o.cancelled_at IS NULL OR o.approved_at > o.cancelled_at)
              THEN 1 ELSE 0
            END
          ) AS accepted_orders,
          SUM(
            CASE
              WHEN o.cancelled_at IS NOT NULL AND (o.approved_at IS NULL OR o.cancelled_at > o.approved_at)
              THEN 1 ELSE 0
            END
          ) AS cancelled_orders,
          SUM(
            CASE
              WHEN o.shipped_at IS NOT NULL 
                AND (o.cancelled_at IS NULL OR o.shipped_at > o.cancelled_at)
                AND o.buyout_at IS NULL
              THEN 1 ELSE 0
            END
          ) AS shipped_orders,
          SUM(
            CASE
              WHEN o.buyout_at IS NOT NULL
              THEN 1 ELSE 0
            END
          ) AS buyout_orders,
          AVG(
            CASE
              WHEN o.buyout_at IS NOT NULL
              THEN CAST(o.total_sum AS NUMERIC)
              ELSE NULL
            END
          ) AS avg_total_sum
        `)
      )
      .modify((q) => {
        if (webmaster_id) {
          q.where('o.webmaster_id', webmaster_id);
        }
      })
      .andWhereBetween('o.created_at', [start, end]);

    // Группировка по дате, если включён by_date
    if (by_date) {
      query.groupByRaw('DATE(o.created_at)').orderByRaw('DATE(o.created_at)');
    }

    const results = await query;

    // Формируем вывод: по датам или в целом
    if (by_date) {
      return results.map((result) => ({
        date: result.date,
        totalOrders: parseInt(result.total_orders, 10),
        acceptedOrders: parseInt(result.accepted_orders, 10),
        cancelledOrders: parseInt(result.cancelled_orders, 10),
        shippedOrders: parseInt(result.shipped_orders, 10),
        buyoutOrders: parseInt(result.buyout_orders, 10),
        avgTotalSum: result.avg_total_sum ? parseFloat(result.avg_total_sum) : 0,
      }));
    } else {
      const [result] = results;
      return {
        totalOrders: parseInt(result.total_orders, 10),
        acceptedOrders: parseInt(result.accepted_orders, 10),
        cancelledOrders: parseInt(result.cancelled_orders, 10),
        shippedOrders: parseInt(result.shipped_orders, 10),
        buyoutOrders: parseInt(result.buyout_orders, 10),
        avgTotalSum: result.avg_total_sum ? parseFloat(result.avg_total_sum) : 0,
      };
    }
  } catch (err) {
    console.error('Ошибка при получении статистики заказов:', err.message);
    throw new Error('Не удалось получить статистику заказов');
  }
};

export const getOrderStatisticForWebmaster = async (start, end, webmaster_id = null, by_date = false) => {
  try {

    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0); // Устанавливаем начало дня

    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999); // Устанавливаем конец дня

    // Преобразуем даты в строковый формат ISO с учетом времени
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();

    const query = db('order as o')
      .select(
        db.raw(`
          ${by_date ? 'DATE(o.created_at) AS date,' : ''}
          o.webmaster_id AS webmaster_id,
          COUNT(*) AS total_orders,
          SUM(
            CASE
              WHEN o.approved_at IS NOT NULL AND (o.cancelled_at IS NULL OR o.approved_at > o.cancelled_at)
              THEN 1 ELSE 0
            END
          ) AS accepted_orders,
          SUM(
            CASE
              WHEN o.cancelled_at IS NOT NULL AND (o.approved_at IS NULL OR o.cancelled_at > o.approved_at)
              THEN 1 ELSE 0
            END
          ) AS cancelled_orders,
          SUM(
            CASE
              WHEN o.shipped_at IS NOT NULL 
                AND (o.cancelled_at IS NULL OR o.shipped_at > o.cancelled_at)
                AND o.buyout_at IS NULL
              THEN 1 ELSE 0
            END
          ) AS shipped_orders,
          SUM(
            CASE
              WHEN o.buyout_at IS NOT NULL
              THEN 1 ELSE 0
            END
          ) AS buyout_orders,
          AVG(
            CASE
              WHEN o.buyout_at IS NOT NULL AND o.total_sum IS NOT NULL AND o.total_sum != ''
              THEN CAST(o.total_sum AS NUMERIC)
              ELSE NULL
            END
          ) AS avg_total_sum,
          u.login AS webmaster_name
        `)
      )
      .leftJoin('webmaster as w', 'w.id', 'o.webmaster_id')
      .leftJoin('user as u', 'u.id', 'w.user_id')
      .modify((q) => {
        if (webmaster_id) {
          q.where('o.webmaster_id', webmaster_id);
        }
      })
      .andWhereBetween('o.created_at', [formattedStartDate, formattedEndDate]);

    if (by_date) {
      query.groupByRaw('DATE(o.created_at), o.webmaster_id, u.login').orderByRaw('DATE(o.created_at), o.webmaster_id');
    } else {
      query.groupByRaw('o.webmaster_id, u.login').orderByRaw('o.webmaster_id');
    }

    const results = await query;

    // Формируем вывод
    const statistics = {};
    results.forEach((result) => {
      const webmasterId = result.webmaster_id || 'Unknown';

      if (!statistics[webmasterId]) {
        statistics[webmasterId] = [];
      }

      const stats = {
        date: by_date ? result.date : undefined,
        totalOrders: parseInt(result.total_orders, 10),
        acceptedOrders: parseInt(result.accepted_orders, 10),
        cancelledOrders: parseInt(result.cancelled_orders, 10),
        shippedOrders: parseInt(result.shipped_orders, 10),
        buyoutOrders: parseInt(result.buyout_orders, 10),
        avgTotalSum: result.avg_total_sum ? parseFloat(result.avg_total_sum) : 0,
        webmasterName: result.webmaster_name || 'Unknown',
      };

      if (by_date) {
        statistics[webmasterId].push(stats);
      } else {
        statistics[webmasterId] = stats;
      }
    });

    return statistics;
  } catch (err) {
    console.error('Ошибка при получении статистики заказов:', err.message);
    throw new Error('Не удалось получить статистику заказов');
  }
};

export const getOrderStatisticForOperator = async (start, end, operator_id = null, by_date = false) => {
  try {
    // Проверяем параметры
    if (!start || !end) {
      throw new Error('Параметры "start" и "end" обязательны.');
    }

    const startDate = new Date(start).toISOString().split('T')[0];
    const endDate = new Date(end).toISOString().split('T')[0];

    console.log('Start:', startDate);
    console.log('End:', endDate);
    console.log('Operator ID:', operator_id);
    console.log('by_date:', by_date);

    const query = db('order as o')
      .select(
        db.raw(`
          ${by_date ? 'DATE(o.created_at) AS date,' : ''} 
          o.operator_id AS operator_id,
          COUNT(*) AS total_orders,
          SUM(
            CASE
              WHEN o.approved_at IS NOT NULL AND (o.cancelled_at IS NULL OR o.approved_at > o.cancelled_at)
              THEN 1 ELSE 0
            END
          ) AS accepted_orders,
          SUM(
            CASE
              WHEN o.cancelled_at IS NOT NULL AND (o.approved_at IS NULL OR o.cancelled_at > o.approved_at)
              THEN 1 ELSE 0
            END
          ) AS cancelled_orders,
          SUM(
            CASE
              WHEN o.shipped_at IS NOT NULL 
                AND (o.cancelled_at IS NULL OR o.shipped_at > o.cancelled_at)
                AND o.buyout_at IS NULL
              THEN 1 ELSE 0
            END
          ) AS shipped_orders,
          SUM(
            CASE
              WHEN o.buyout_at IS NOT NULL
              THEN 1 ELSE 0
            END
          ) AS buyout_orders,
          AVG(
            CASE
              WHEN o.buyout_at IS NOT NULL AND o.total_sum IS NOT NULL AND o.total_sum != ''
              THEN CAST(o.total_sum AS NUMERIC)
              ELSE NULL
            END
          ) AS avg_total_sum,          
          u.login AS operator_name
        `)
      )
      .leftJoin('operator as op', 'op.id', 'o.operator_id')
      .leftJoin('user as u', 'u.id', 'op.user_id')
      .modify((q) => {
        if (operator_id) {
          q.where('o.operator_id', operator_id);
        }
      })
      .andWhereBetween('o.created_at', [startDate, endDate]);

    if (by_date) {
      query.groupByRaw('DATE(o.created_at), o.operator_id, u.login').orderByRaw('DATE(o.created_at), o.operator_id');
    } else {
      query.groupByRaw('o.operator_id, u.login').orderByRaw('o.operator_id');
    }

    console.log('Generated Query:', query.toString());

    const results = await query;

    if (results.length === 0) {
      return by_date
        ? [{
          date: null,
          operator_id: operator_id || 'Unknown',
          total_orders: 0,
          accepted_orders: 0,
          cancelled_orders: 0,
          shipped_orders: 0,
          buyout_orders: 0,
          avg_total_sum: 0,
          operator_name: 'Unknown',
        }]
        : {
          operator_id: operator_id || 'Unknown',
          total_orders: 0,
          accepted_orders: 0,
          cancelled_orders: 0,
          shipped_orders: 0,
          buyout_orders: 0,
          avg_total_sum: 0,
          operator_name: 'Unknown',
        };
    }

    return results;
  } catch (err) {
    console.error('Ошибка при получении статистики заказов:', err.message);
    throw new Error('Не удалось получить статистику заказов');
  }
};

export const getByFilters = async function (filters) {
  const {
    id,
    operators,
    products,
    webmasters,
    additional1,
    created_at,
    updated_at,
    approved_at,
    shipped_at,
    cancelled_at,
    buyout_at,
    delivery_at,
    comment,
    price,
    total_sum,
    logist_recall_at,
    quantity,
    fio,
    phone,
    region,
    cities,
    address,
    postal_code,
    age,
    urm_term,
    statuses,
    gender,
    payment_methods,
    delivery_methods,
    order_cancel_reasons,
    additional2,
    additional3,
    additional4,
    additional5,
    additional6,
    additional7,
    additional8,
    additional9,
    additional10,
  } = filters;

  const orders = await db('order as o')
    .select('o.*')
    .modify((q) => {
      if (id) {
        const ids = id.replace(/,/g, ' ').split(' ').map(item => item.trim()).filter(item => item);
        if (ids.length > 1) {
          q.whereIn('o.id', ids);
        } else {
          q.where('o.id', id);
        }
      };
      if (Array.isArray(operators) && operators.length > 0) {
        q.whereIn('o.operator_id', operators.map((o) => o.id));
      };
      if (Array.isArray(webmasters) && webmasters.length > 0) {
        q.whereIn('o.webmaster_id', webmasters.map((o) => o.id));
      };
      if (additional1) {
        q.where('o.additional1', 'ilike', `%${additional1}%`)
      };
      if (Array.isArray(products) && products.length > 0) {
        const ids = products.map(p => +p.id);
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.product_id = ANY (?)
          )`,
          [ids]
        );
      };
      if (created_at) {
        q.whereBetween('o.created_at', created_at);
      };
      if (updated_at) {
        q.whereBetween('o.updated_at', updated_at);
      };
      if (approved_at) {
        q.whereBetween('o.approved_at', approved_at);
      };
      if (shipped_at) {
        q.whereBetween('o.shipped_at', shipped_at);
      };
      if (cancelled_at) {
        q.whereBetween('o.cancelled_at', cancelled_at);
      };
      if (buyout_at) {
        q.whereBetween('o.buyout_at', buyout_at);
      };
      if (delivery_at) {
        q.whereBetween('o.delivery_at', delivery_at);
      };
      if (comment) {
        q.where('o.comment', 'ilike', `%${comment}%`)
      };
      if (price) {
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.price = ?
          )`,
          [price]
        );
      };
      if (total_sum) {
        q.where('o.total_sum', 'ilike', `%${total_sum}%`)
      };
      if (logist_recall_at) {
        q.where('o.logist_recall_at', '>=', logist_recall_at);
      };
      if (quantity) {
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.quantity = ?
          )`,
          [quantity]
        );
      };
      if (fio) {
        q.where('o.fio', 'ilike', `%${fio}%`)
      };
      if (phone) {
        q.where('o.phone', 'ilike', `%${phone}%`)
      };
      if (region) {
        q.where('o.region', 'ilike', `%${region}%`)
      };
      if (Array.isArray(cities) && cities.length > 0) {
        q.whereIn('o.city_id', cities.map((c) => c.id));
      };
      if (address) {
        q.where('o.address', 'ilike', `%${address}%`)
      };
      if (postal_code) {
        q.where('o.postal_code', 'ilike', `%${postal_code}%`)
      };
      if (age) {
        q.where('o.age', 'ilike', `%${age}%`)
      };
      if (age) {
        q.where('o.urm_term', 'ilike', `%${urm_term}%`)
      };
      if (Array.isArray(statuses) && statuses.length > 0) {
        q.whereIn('o.sub_status_id', statuses.map((s) => s.id));
      };
      if (gender) {
        q.where('o.gender', 'ilike', `%${gender}%`)
      };
      if (Array.isArray(payment_methods) && payment_methods.length > 0) {
        q.whereIn('o.payment_method_id', payment_methods.map((pm) => pm.id));
      };
      if (Array.isArray(delivery_methods) && delivery_methods.length > 0) {
        q.whereIn('o.delivery_method_id', delivery_methods.map((dm) => dm.id));
      };
      if (Array.isArray(order_cancel_reasons) && order_cancel_reasons.length > 0) {
        q.whereIn('o.order_cancel_reason_id', order_cancel_reasons.map((ocr) => ocr.id));
      };
      if (additional2) {
        q.where('o.additional2', 'ilike', `%${additional2}%`)
      };
      if (additional3) {
        q.where('o.additional3', 'ilike', `%${additional3}%`)
      };
      if (additional4) {
        q.where('o.additional4', 'ilike', `%${additional4}%`)
      };
      if (additional5) {
        q.where('o.additional5', 'ilike', `%${additional5}%`)
      };
      if (additional6) {
        q.where('o.additional6', 'ilike', `%${additional6}%`)
      };
      if (additional7) {
        q.where('o.additional7', 'ilike', `%${additional7}%`)
      };
      if (additional8) {
        q.where('o.additional8', 'ilike', `%${additional8}%`)
      };
      if (additional9) {
        q.where('o.additional9', 'ilike', `%${additional9}%`)
      };
      if (additional10) {
        q.where('o.additional10', 'ilike', `%${additional10}%`)
      };
    });

  return orders;
};

// for dialer
export const getOrderIdsInSubStatus = async (sub_status_id) => {
  const ids = await db('order as o')
    .where('o.sub_status_id', sub_status_id)
    .orderBy('o.created_at', 'desc')
    .pluck('o.id');

  return ids;
};

// xlsx
export const getUnloadingOrders = async function (
  id,
  operators,
  products,
  webmasters,
  additional1,
  created_at,
  updated_at,
  approved_at,
  shipped_at,
  cancelled_at,
  buyout_at,
  delivery_at,
  comment,
  price,
  total_sum,
  logist_recall_at,
  quantity,
  fio,
  phone,
  region,
  cities,
  address,
  postal_code,
  age,
  urm_term,
  statuses,
  gender,
  payment_methods,
  delivery_methods,
  order_cancel_reasons,
  additional2,
  additional3,
  additional4,
  additional5,
  additional6,
  additional7,
  additional8,
  additional9,
  additional10,
) {
  const orders = await db('order as o')
    .select('o.*')
    .modify((q) => {
      if (id) {
        const ids = id.replace(/,/g, ' ').split(' ').map(item => item.trim()).filter(item => item);
        if (ids.length > 1) {
          q.whereIn('o.id', ids);
        } else {
          q.where('o.id', id);
        }
      };
      if (Array.isArray(operators) && operators.length > 0) {
        q.whereIn('o.operator_id', operators.map((o) => o.id));
      };
      if (Array.isArray(webmasters) && webmasters.length > 0) {
        q.whereIn('o.webmaster_id', webmasters.map((o) => o.id));
      };
      if (additional1) {
        q.where('o.additional1', 'ilike', `%${additional1}%`)
      };
      if (Array.isArray(products) && products.length > 0) {
        const ids = products.map(p => +p.id);
        q.whereRaw(
          `EXISTS (
            SELECT 1
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.product_id = ANY (?)
          )`,
          [ids]
        );
      };
      if (created_at) {
        q.whereBetween('o.created_at', created_at);
      };
      if (updated_at) {
        q.whereBetween('o.updated_at', updated_at);
      };
      if (approved_at) {
        q.whereBetween('o.approved_at', approved_at);
      };
      if (shipped_at) {
        q.whereBetween('o.shipped_at', shipped_at);
      };
      if (cancelled_at) {
        q.whereBetween('o.cancelled_at', cancelled_at);
      };
      if (buyout_at) {
        q.whereBetween('o.buyout_at', buyout_at);
      };
      if (delivery_at) {
        q.whereBetween('o.delivery_at', delivery_at);
      };
      if (comment) {
        q.where('o.comment', 'ilike', `%${comment}%`)
      };
      if (price) {
        q.whereRaw(
          `EXISTS (
            SELECT 1
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.price = ?
          )`,
          [price]
        );
      };
      if (total_sum) {
        q.where('o.total_sum', 'ilike', `%${total_sum}%`)
      };
      if (logist_recall_at) {
        q.where('o.logist_recall_at', '>=', logist_recall_at);
      };
      if (quantity) {
        q.whereRaw(
          `EXISTS (
            SELECT 1
            FROM order_item oi
            WHERE oi.order_id = o.id
            AND oi.quantity = ?
          )`,
          [quantity]
        );
      };
      if (fio) {
        q.where('o.fio', 'ilike', `%${fio}%`)
      };
      if (phone) {
        q.where('o.phone', 'ilike', `%${phone}%`)
      };
      if (region) {
        q.where('o.region', 'ilike', `%${region}%`)
      };
      if (Array.isArray(cities) && cities.length > 0) {
        q.whereIn('o.city_id', cities.map((c) => c.id));
      };
      if (address) {
        q.where('o.address', 'ilike', `%${address}%`)
      };
      if (postal_code) {
        q.where('o.postal_code', 'ilike', `%${postal_code}%`)
      };
      if (age) {
        q.where('o.age', 'ilike', `%${age}%`)
      };
      if (age) {
        q.where('o.urm_term', 'ilike', `%${urm_term}%`)
      };
      if (Array.isArray(statuses) && statuses.length > 0) {
        q.whereIn('o.sub_status_id', statuses.map((s) => s.id));
      };
      if (gender) {
        q.where('o.gender', 'ilike', `%${gender}%`)
      };
      if (Array.isArray(payment_methods) && payment_methods.length > 0) {
        q.whereIn('o.payment_method_id', payment_methods.map((pm) => pm.id));
      };
      if (Array.isArray(delivery_methods) && delivery_methods.length > 0) {
        q.whereIn('o.delivery_method_id', delivery_methods.map((dm) => dm.id));
      };
      if (Array.isArray(order_cancel_reasons) && order_cancel_reasons.length > 0) {
        q.whereIn('o.order_cancel_reason_id', order_cancel_reasons.map((ocr) => ocr.id));
      };
      if (additional2) {
        q.where('o.additional2', 'ilike', `%${additional2}%`)
      };
      if (additional3) {
        q.where('o.additional3', 'ilike', `%${additional3}%`)
      };
      if (additional4) {
        q.where('o.additional4', 'ilike', `%${additional4}%`)
      };
      if (additional5) {
        q.where('o.additional5', 'ilike', `%${additional5}%`)
      };
      if (additional6) {
        q.where('o.additional6', 'ilike', `%${additional6}%`)
      };
      if (additional7) {
        q.where('o.additional7', 'ilike', `%${additional7}%`)
      };
      if (additional8) {
        q.where('o.additional8', 'ilike', `%${additional8}%`)
      };
      if (additional9) {
        q.where('o.additional9', 'ilike', `%${additional9}%`)
      };
      if (additional10) {
        q.where('o.additional10', 'ilike', `%${additional10}%`)
      };
    })
    .orderBy('o.id', 'desc')

  return orders;
};