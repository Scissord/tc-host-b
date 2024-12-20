import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const orderRepository = repository('order');

export const get = async () => {
  return await orderRepository.getAll();
};

export const create = async (data) => {
  return await orderRepository.create(data);
};

export const update = async (id, data) => {
  return await orderRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await orderRepository.delete(id);
};

export const find = async (id) => {
  return await orderRepository.find(id);
};

export const updateWhereIn = async (query, data) => {
  return await orderRepository.updateWhereIn(query, data);
};

export const getPaginated = async function (
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
    .select('o.*')
    .select(db.raw('COALESCE(json_agg(oi.*) FILTER (WHERE oi.id IS NOT NULL), \'[]\') as items'))
    .leftJoin('order_item as oi', 'oi.order_id', 'o.id')
    .modify((q) => {
      if(id) {
        const ids = id.replace(/,/g, ' ').split(' ').map(item => item.trim()).filter(item => item);
        if (ids.length > 1) {
          q.whereIn('o.id', ids);
        } else {
          q.where('o.id', id);
        }
      }
      if(fio) {
        q.where('o.fio', 'ilike', `%${fio}%`)
      }
      if(phone) {
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
      if(phone) {
        q.where('o.phone', 'ilike', `%${phone}%`)
      }
      if(region) {
        q.where('o.region', 'ilike', `%${region}%`)
      }
      if(city) {
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
      if(address) {
        q.where('o.address', 'ilike', `%${address}%`)
      }
      if(postal_code) {
        q.where('o.postal_code', 'ilike', `%${postal_code}%`)
      }
      if(comment) {
        q.where('o.comment', 'ilike', `%${comment}%`)
      }
      if(utm_term) {
        q.where('o.utm_term', 'ilike', `%${utm_term}%`)
      }
      if(webmaster) {
        q.whereRaw(
          `EXISTS (
            SELECT 1
            FROM webmaster w
            WHERE w.id = o.webmaster_id
            AND w.name ILIKE ?
          )`,
          [`%${webmaster}%`]
        );
      }
      if(operator) {
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
      if(order_sub_status) {
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
      if(additional1) {
        q.where('o.additional1', 'ilike', `%${additional1}%`)
      }
      if(additional2) {
        q.where('o.additional2', 'ilike', `%${additional2}%`)
      }
      if(additional3) {
        q.where('o.additional4', 'ilike', `%${additional4}%`)
      }
      if(additional5) {
        q.where('o.additional5', 'ilike', `%${additional5}%`)
      }
      if(additional6) {
        q.where('o.additional6', 'ilike', `%${additional6}%`)
      }
      if(additional7) {
        q.where('o.additional7', 'ilike', `%${additional7}%`)
      }
      if(additional8) {
        q.where('o.additional8', 'ilike', `%${additional8}%`)
      }
      if(additional9) {
        q.where('o.additional9', 'ilike', `%${additional9}%`)
      }
      if(additional10) {
        q.where('o.additional10', 'ilike', `%${additional10}%`)
      }
      if(created_at) {
        q.where('o.created_at', 'ilike', `%${created_at}%`)
      }
      if(updated_at) {
        q.where('o.updated_at', 'ilike', `%${updated_at}%`)
      }
    })
    .where('o.sub_status_id', sub_status)
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
