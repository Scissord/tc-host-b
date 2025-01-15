import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const statusRepository = repository('status');

export const get = async () => {
  return await statusRepository.getActive();
};

// export const getWithSubStatuses = async () => {
//   return await db('status as s')
//     .select(
//       's.id as status_id',
//       's.name as status_name',
//       db.raw('JSON_AGG(ss) as sub_statuses')
//     )
//     .leftJoin('sub_status as ss', 'ss.status_id', 's.id')
//     .groupBy('s.id')
//     .orderBy('s.id', 'asc');
// };

export const create = async (data) => {
  return await statusRepository.create(data);
};

export const update = async (id, data) => {
  return await statusRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await statusRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await statusRepository.delete(id);
};

export const find = async (id) => {
  return await statusRepository.find(id);
};
