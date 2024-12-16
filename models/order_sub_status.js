import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const orderSubStatusRepository = repository('order_sub_status');

export const get = async () => {
  const sub_statuses = await db('order_sub_status as oss')
    .leftJoin('order as o', 'oss.id', 'o.sub_status_id') // Соединяем таблицы
    .select('oss.id', 'oss.name')
    .count('o.id as orders_count')
    .groupBy('oss.id', 'oss.name')
    .orderBy('oss.id', 'asc');

  return sub_statuses;
};

export const create = async (data) => {
  return await orderSubStatusRepository.create(data);
};

export const update = async (id, data) => {
  return await orderSubStatusRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await orderSubStatusRepository.delete(id);
};

export const find = async (id) => {
  return await orderSubStatusRepository.find(id);
};
