import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const orderItem = repository('order_item');

export const get = async () => {
  return await orderItem.getAll();
};

export const getWhereIn = async (field, values) => {
  return await db('order_item as oi')
    .select('oi.*', 'p.name as product_name')
    .leftJoin('product as p', 'p.id', 'oi.product_id')
    .whereIn(field, values)
};

export const create = async (data) => {
  return await orderItem.create(data);
};

export const update = async (id, data) => {
  return await orderItem.update(id, data);
};

export const hardDelete = async (id) => {
  return await orderItem.delete(id);
};

export const hardDeleteByOrderId = async (id) => {
  return await db('order_item as oi')
    .del()
    .where('oi.order_id', id);
};

export const find = async (id) => {
  return await orderItem.find(id);
};

