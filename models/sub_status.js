import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const subStatusRepository = repository('sub_status');

export const get = async () => {
  const sub_statuses = await db('sub_status as ss')
    .leftJoin('order as o', 'ss.id', 'o.sub_status_id')
    .leftJoin('status as s', 's.id', 'ss.status_id')
    .select('ss.id', 'ss.name', 's.color')
    .where('ss.deleted_at', null)
    .count('o.id as orders_count')
    .groupBy('ss.id', 'ss.name', 's.color')
    .orderBy('ss.index', 'asc');

  return sub_statuses;
};

export const getAll = async () => {
  const sub_statuses = await db('sub_status as ss')
    .select('ss.id as id', 'ss.name as name', 'ss.status_id as status_id')
    .where('ss.deleted_at', null)
    .orderBy('ss.id', 'asc');

  return sub_statuses;
};

export const getForOperator = async (ids) => {
  const sub_statuses = await db('sub_status as ss')
    .leftJoin('order as o', 'ss.id', 'o.sub_status_id')
    .leftJoin('status as s', 's.id', 'ss.status_id')
    .select('ss.id', 'ss.name', 's.color')
    .where('ss.deleted_at', null)
    .whereIn('ss.id', ids)
    .count('o.id as orders_count')
    .groupBy('ss.id', 'ss.name', 's.color')
    .orderBy('ss.index', 'asc');

  return sub_statuses;
};

export const getWhere = async (query) => {
  return await subStatusRepository.getWhere(query);
};

export const create = async (data) => {
  return await subStatusRepository.create(data);
};

export const update = async (id, data) => {
  return await subStatusRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await subStatusRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await subStatusRepository.delete(id);
};

export const find = async (id) => {
  return await subStatusRepository.find(id);
};
