import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const webmasterRepository = repository('webmaster');

export const get = async () => {
  return await db('webmaster as w')
    .select('w.*', 'u.name as name')
    .leftJoin('user as u', 'u.id', 'w.user_id')
    .orderBy('id', 'asc');
};

export const create = async (data) => {
  return await webmasterRepository.create(data);
};

export const update = async (id, data) => {
  return await webmasterRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await webmasterRepository.hardDelete(id);
};

export const find = async (id) => {
  return await webmasterRepository.find(id);
};

export const findWhere = async function (query) {
  return await webmasterRepository.findWhere(query);
};
