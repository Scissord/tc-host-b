import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const subStatusRepository = repository('sub_status');

export const get = async () => {
  const sub_statuses = await db('sub_status as ss')
    .leftJoin('order as o', 'ss.id', 'o.sub_status_id') // Соединяем таблицы
    .select('ss.id', 'ss.name')
    .count('o.id as orders_count')
    .groupBy('ss.id', 'ss.name')
    .orderBy('ss.id', 'asc');

  return sub_statuses;
};

export const create = async (data) => {
  return await subStatusRepository.create(data);
};

export const update = async (id, data) => {
  return await subStatusRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await subStatusRepository.delete(id);
};

export const find = async (id) => {
  return await subStatusRepository.find(id);
};
