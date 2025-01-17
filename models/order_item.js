import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const orderItemRepository = repository('order_item');

export const get = async () => {
  return await orderItemRepository.getAll();
};
export const getWhereIn = async (field, values) => {
  return await db('order_item as oi')
    .select('oi.*', 'p.name as product_name', 'p.id as product_id')
    .leftJoin('product as p', 'p.id', 'oi.product_id')
    .leftJoin('order as o', 'o.id', 'oi.order_id')
    .whereIn(field, values)
    .orderBy('oi.id', 'asc');
};


export const create = async (data) => {
  return await orderItemRepository.create(data);
};

export const update = async (id, data) => {
  return await orderItemRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await orderItemRepository.hardDelete(id);
};

export const hardDeleteAll = async () => {
  return await orderItemRepository.hardDeleteAll();
};

export const hardDeleteByOrderId = async (id) => {
  return await db('order_item as oi')
    .del()
    .where('oi.order_id', id);
};

export const find = async (id) => {
  return await orderItemRepository.find(id);
};

