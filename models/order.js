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
    .select(db.raw('COALESCE(json_agg(oi.*) FILTER (WHERE oi.id IS NOT NULL), \'[]\') as items'))
    .leftJoin('order_item as oi', 'oi.order_id', 'o.id')
    .where(condition)
    .groupBy('o.id')
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

export const findWithItems = async (id) => {
  return await db('order as o')
    .select('o.*')
    .select(db.raw('COALESCE(json_agg(oi.*) FILTER (WHERE oi.id IS NOT NULL), \'[]\') as items'))
    .leftJoin('order_item as oi', 'oi.order_id', 'o.id')
    .where('o.id', id)
    .groupBy('o.id')
    .orderBy('o.id', 'desc')
    .first();
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
) {
  const result = await db('order as o')
    .select(
      'o.id',
      db.raw('MAX(o.fio) as fio'),
      db.raw('MAX(o.phone) as phone'),
      db.raw('MAX(o.region) as region'),
      db.raw('MAX(o.city_id) as city_id'),
      db.raw('MAX(o.address) as address'),
      db.raw('MAX(o.postal_code) as postal_code'),
      db.raw('MAX(o.comment) as comment'),
      db.raw('MAX(o.age) as age'),
      db.raw('MAX(o.utm_term) as utm_term'),
      db.raw('MAX(o.webmaster_id) as webmaster_id'),
      db.raw('MAX(o.operator_id) as operator_id'),
      db.raw('MAX(o.status_id) as status_id'),
      db.raw('MAX(o.sub_status_id) as sub_status_id'),
      db.raw('MAX(o.gender_id) as gender_id'),
      db.raw('MAX(o.payment_method_id) as payment_method_id'),
      db.raw('MAX(o.delivery_method_id) as delivery_method_id'),
      db.raw('MAX(o.order_cancel_reason_id) as order_cancel_reason_id'),
      db.raw('MAX(o.total_sum) as total_sum'),
      db.raw('MAX(o.additional1) as additional1'),
      db.raw('MAX(o.additional2) as additional2'),
      db.raw('MAX(o.additional3) as additional3'),
      db.raw('MAX(o.additional4) as additional4'),
      db.raw('MAX(o.additional5) as additional5'),
      db.raw('MAX(o.additional6) as additional6'),
      db.raw('MAX(o.additional7) as additional7'),
      db.raw('MAX(o.additional8) as additional8'),
      db.raw('MAX(o.additional9) as additional9'),
      db.raw('MAX(o.additional10) as additional10'),
      db.raw('MAX(o.created_at) as created_at'),
      db.raw('MAX(o.updated_at) as updated_at'),
      db.raw('MAX(o.delivery_at) as delivery_at'),
      db.raw('MAX(o.logist_recall_at) as logist_recall_at'),
      db.raw('MAX(o.approved_at) as approved_at'),
      db.raw('MAX(o.cancelled_at) as cancelled_at'),
      db.raw('MAX(o.shipped_at) as shipped_at'),
      db.raw('MAX(o.buyout_at) as buyout_at'),
    )
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
    })
    .groupBy('o.id')
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

export const getWebmasterOrdersPaginated = async function (
  limit,
  page,
  webmaster_id
) {
  const result = await db('order as o')
    .select(
      'o.id',
      db.raw('MAX(o.fio) as fio'),
      db.raw('MAX(o.phone) as phone'),
      db.raw('MAX(o.region) as region'),
      db.raw('MAX(o.city_id) as city_id'),
      db.raw('MAX(o.address) as address'),
      db.raw('MAX(o.postal_code) as postal_code'),
      db.raw('MAX(o.comment) as comment'),
      db.raw('MAX(o.age) as age'),
      db.raw('MAX(o.utm_term) as utm_term'),
      db.raw('MAX(o.webmaster_id) as webmaster_id'),
      db.raw('MAX(o.operator_id) as operator_id'),
      db.raw('MAX(o.status_id) as status_id'),
      db.raw('MAX(o.sub_status_id) as sub_status_id'),
      db.raw('MAX(o.gender_id) as gender_id'),
      db.raw('MAX(o.payment_method_id) as payment_method_id'),
      db.raw('MAX(o.delivery_method_id) as delivery_method_id'),
      db.raw('MAX(o.order_cancel_reason_id) as order_cancel_reason_id'),
      db.raw('MAX(o.total_sum) as total_sum'),
      db.raw('MAX(o.additional1) as additional1'),
      db.raw('MAX(o.additional2) as additional2'),
      db.raw('MAX(o.additional3) as additional3'),
      db.raw('MAX(o.additional4) as additional4'),
      db.raw('MAX(o.additional5) as additional5'),
      db.raw('MAX(o.additional6) as additional6'),
      db.raw('MAX(o.additional7) as additional7'),
      db.raw('MAX(o.additional8) as additional8'),
      db.raw('MAX(o.additional9) as additional9'),
      db.raw('MAX(o.additional10) as additional10'),
      db.raw('MAX(o.created_at) as created_at'),
      db.raw('MAX(o.updated_at) as updated_at'),
      db.raw('MAX(o.delivery_at) as delivery_at'),
      db.raw('MAX(o.logist_recall_at) as logist_recall_at'),
      db.raw('MAX(o.approved_at) as approved_at'),
      db.raw('MAX(o.cancelled_at) as cancelled_at'),
      db.raw('MAX(o.shipped_at) as shipped_at'),
      db.raw('MAX(o.buyout_at) as buyout_at'),
    )
    .where('o.webmaster_id', webmaster_id)
    .groupBy('o.id')
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
) {
  const result = await db('order as o')
    .select(
      'o.id',
      db.raw('MAX(o.fio) as fio'),
      db.raw('MAX(o.phone) as phone'),
      db.raw('MAX(o.region) as region'),
      db.raw('MAX(o.city_id) as city_id'),
      db.raw('MAX(o.address) as address'),
      db.raw('MAX(o.postal_code) as postal_code'),
      db.raw('MAX(o.comment) as comment'),
      db.raw('MAX(o.age) as age'),
      db.raw('MAX(o.utm_term) as utm_term'),
      db.raw('MAX(o.webmaster_id) as webmaster_id'),
      db.raw('MAX(o.operator_id) as operator_id'),
      db.raw('MAX(o.status_id) as status_id'),
      db.raw('MAX(o.sub_status_id) as sub_status_id'),
      db.raw('MAX(o.gender_id) as gender_id'),
      db.raw('MAX(o.payment_method_id) as payment_method_id'),
      db.raw('MAX(o.delivery_method_id) as delivery_method_id'),
      db.raw('MAX(o.order_cancel_reason_id) as order_cancel_reason_id'),
      db.raw('MAX(o.total_sum) as total_sum'),
      db.raw('MAX(o.additional1) as additional1'),
      db.raw('MAX(o.additional2) as additional2'),
      db.raw('MAX(o.additional3) as additional3'),
      db.raw('MAX(o.additional4) as additional4'),
      db.raw('MAX(o.additional5) as additional5'),
      db.raw('MAX(o.additional6) as additional6'),
      db.raw('MAX(o.additional7) as additional7'),
      db.raw('MAX(o.additional8) as additional8'),
      db.raw('MAX(o.additional9) as additional9'),
      db.raw('MAX(o.additional10) as additional10'),
      db.raw('MAX(o.created_at) as created_at'),
      db.raw('MAX(o.updated_at) as updated_at'),
      db.raw('MAX(o.delivery_at) as delivery_at'),
      db.raw('MAX(o.logist_recall_at) as logist_recall_at'),
      db.raw('MAX(o.approved_at) as approved_at'),
      db.raw('MAX(o.cancelled_at) as cancelled_at'),
      db.raw('MAX(o.shipped_at) as shipped_at'),
      db.raw('MAX(o.buyout_at) as buyout_at'),
    )
    .where('o.sub_status_id', sub_status)
    .groupBy('o.id', 'o.fio', 'o.phone')
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
  const orders = await db('order as o')
    .select(
      'o.id',
      'o.status_id',
      'o.created_at',
      'o.webmaster_id'
    )
    .modify((q) => {
      if (webmaster_id) {
        q.where('o.webmaster_id', webmaster_id);
      };
    })
    .andWhereBetween("o.created_at", [start, end])
    .orderBy('o.created_at', 'desc');

  return orders;
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
