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
  id,
  fio,
  items,
  phone,
  region,
  city,
  address,
  postal_code,
  comment,
  utm_term,
  webmaster,
  operator,
  order_sub_status,
  additional1,
  additional2,
  additional3,
  additional4,
  additional5,
  additional6,
  additional7,
  additional8,
  additional9,
  additional10,
  created_at,
  updated_at,
  sort_by = 'o.id',
  order_by = 'desc',
  start = null,
  end = null,
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
      }
      if (fio) {
        q.where('o.fio', 'ilike', `%${fio}%`)
      }
      if (phone) {
        q.where('o.phone', 'ilike', `%${phone}%`)
      }
      if (items) {
        q.whereRaw(
          `EXISTS (
            SELECT 1 
            FROM order_item oi
            JOIN product p ON p.id = oi.product_id
            WHERE oi.order_id = o.id
            AND p.name ILIKE ?
          )`,
          [`%${items}%`]
        );
      }
      if (phone) {
        q.where('o.phone', 'ilike', `%${phone}%`)
      }
      if (region) {
        q.where('o.region', 'ilike', `%${region}%`)
      }
      if (city) {
        q.whereRaw(
          `EXISTS (
            SELECT 1
            FROM city c
            WHERE c.id = o.city_id
            AND c.name ILIKE ?
          )`,
          [`%${city}%`]
        );
      }
      if (address) {
        q.where('o.address', 'ilike', `%${address}%`)
      }
      if (postal_code) {
        q.where('o.postal_code', 'ilike', `%${postal_code}%`)
      }
      if (comment) {
        q.where('o.comment', 'ilike', `%${comment}%`)
      }
      if (utm_term) {
        q.where('o.utm_term', 'ilike', `%${utm_term}%`)
      }
      if (webmaster) {
        q.whereRaw(
          `EXISTS (
            SELECT 1
            FROM webmaster w
            WHERE w.id = o.webmaster_id
          )`,
          [`%${webmaster}%`]
        );
      }
      if (operator) {
        q.whereRaw(
          `EXISTS (
            SELECT 1
            FROM operator op
            WHERE op.id = o.operator_id
            AND op.name ILIKE ?
          )`,
          [`%${operator}%`]
        );
      }
      if (order_sub_status && !id) {
        q.whereRaw(
          `EXISTS (
            SELECT 1
            FROM order_status os
            WHERE os.id = o.status_id
            AND os.name ILIKE ?
          )`,
          [`%${order_sub_status}%`]
        );
      }
      if (additional1) {
        q.where('o.additional1', 'ilike', `%${additional1}%`)
      }
      if (additional2) {
        q.where('o.additional2', 'ilike', `%${additional2}%`)
      }
      if (additional3) {
        q.where('o.additional4', 'ilike', `%${additional4}%`)
      }
      if (additional5) {
        q.where('o.additional5', 'ilike', `%${additional5}%`)
      }
      if (additional6) {
        q.where('o.additional6', 'ilike', `%${additional6}%`)
      }
      if (additional7) {
        q.where('o.additional7', 'ilike', `%${additional7}%`)
      }
      if (additional8) {
        q.where('o.additional8', 'ilike', `%${additional8}%`)
      }
      if (additional9) {
        q.where('o.additional9', 'ilike', `%${additional9}%`)
      }
      if (additional10) {
        q.where('o.additional10', 'ilike', `%${additional10}%`)
      }
      if (created_at) {
        q.where('o.created_at', 'ilike', `%${created_at}%`)
      }
      if (updated_at) {
        q.where('o.updated_at', 'ilike', `%${updated_at}%`)
      }
      if (sub_status && !id) {
        q.where('o.sub_status_id', sub_status);
      }
      if (start && end) {
        q.whereBetween('o.delivery_at', [start, end]);
      }
    })
    .orderBy(sort_by ?? 'o.id', order_by ?? 'desc')
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
  postal_index,
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
      if (Array.isArray(products) && products.length > 0) {
        const ids = products.map(p => +p.id)
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
        q.where('o.created_at', '>=', created_at);
      };
      if (updated_at) {
        q.where('o.updated_at', '>=', updated_at);
      };
      if (approved_at) {
        q.where('o.approved_at', '>=', approved_at);
      };
      if (shipped_at) {
        q.where('o.shipped_at', '>=', shipped_at);
      };
      if (cancelled_at) {
        q.where('o.cancelled_at', '>=', cancelled_at);
      };
      if (buyout_at) {
        q.where('o.buyout_at', '>=', buyout_at);
      };
      if (delivery_at) {
        q.where('o.delivery_at', '>=', delivery_at);
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
      if (postal_index) {
        q.where('o.postal_index', 'ilike', `%${postal_index}%`)
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
      if (sub_status && !id && !statuses) {
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

export const getOrdersStatisticForUser = async (start, end, webmaster_id = null, operator_id = null) => {
  const orders = await db('order as o')
    .select(
      'o.id',
      'o.status_id',
      'o.created_at',
      'o.city_id',
      'c.name as city_name',
      'o.region',
    )
    .leftJoin('city as c', 'c.id', 'o.city_id')
    .modify((q) => {
      if (webmaster_id) {
        q.where('o.webmaster_id', webmaster_id);
      };
      if (operator_id) {
        q.where('o.operator_id', operator_id);
      };
    })
    .andWhereBetween("o.created_at", [start, end])
    .orderBy('o.created_at', 'desc');

  return orders;
};

export const getOrderStatisticForWebmaster = async (start, end, webmaster_id) => {
  const rawStatistics = await db('status as s')
    .select(
      's.id as status_id',
      's.name as status_name',
      'w.id as webmaster_id',
      'u.name as webmaster_name',
      db.raw('COALESCE(SUM(CASE WHEN o.id IS NOT NULL THEN 1 ELSE 0 END), 0) as count')
    )
    .leftJoin('order as o', function () {
      this.on('o.status_id', '=', 's.id')
        .andOnBetween('o.created_at', [start, end]);
      if (webmaster_id) {
        this.andOn('o.webmaster_id', '=', db.raw('?', [webmaster_id]));
      }
    })
    .leftJoin('webmaster as w', 'o.webmaster_id', 'w.id')
    .leftJoin('user as u', 'w.user_id', 'u.id')
    .groupBy('s.id', 's.name', 'w.id', 'u.name')
    .orderBy('w.id', 'asc')
    .orderBy('s.id', 'asc');

  // Получаем список всех статусов
  const allStatuses = await db('status').select('id as status_id', 'name as status_name');

  const groupedStatistics = rawStatistics.reduce((acc, curr) => {
    const { webmaster_id, webmaster_name, status_id, status_name, count } = curr;

    if (!webmaster_id) {
      return acc;
    }

    if (!acc[webmaster_id]) {
      acc[webmaster_id] = {
        webmaster_name,
        statuses: []
      };
    }

    acc[webmaster_id].statuses.push({
      status_id,
      status_name,
      count: parseInt(count, 10)
    });

    return acc;
  }, {});

  // Добавляем статусы с count = 0, если их нет в результатах
  for (const webmasterId in groupedStatistics) {
    const webmasterData = groupedStatistics[webmasterId];
    const existingStatuses = webmasterData.statuses.map((status) => status.status_id);

    allStatuses.forEach((status) => {
      if (!existingStatuses.includes(status.status_id)) {
        webmasterData.statuses.push({
          status_id: status.status_id,
          status_name: status.status_name,
          count: 0
        });
      }
    });

    // Сортируем статусы для консистентности
    webmasterData.statuses.sort((a, b) => a.status_id - b.status_id);
  }

  return groupedStatistics;
};

export const getOrderStatisticForOperator = async (start, end, operator_id) => {
  const orders = await db('order as o')
    .select(
      'o.id',
      'o.status_id',
      'o.created_at',
      'o.operator_id'
    )
    .modify((q) => {
      if (operator_id) {
        q.where('o.operator_id', operator_id);
      };
    })
    .andWhereBetween("o.created_at", [start, end])
    .orderBy('o.created_at', 'desc');

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
