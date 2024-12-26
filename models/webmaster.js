import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const webmasterRepository = repository('webmaster');

export const get = async () => {
  return await db('webmaster as w')
    .select('w.*', 'u.name as name')
    .leftJoin('user as u', 'u.id', 'w.user_id')
    .where('w.deleted_at', null)
    .orderBy('id', 'asc');
};

export const getFree = async () => {
  return await db('user as u')
    .select('u.id', 'u.name')
    .leftJoin('webmaster as w', 'w.user_id', 'u.id')
    .whereNull('w.id')
    .orWhereNotNull('w.deleted_at')
    .orderBy('id', 'asc');
};

export const create = async (data) => {
  return await webmasterRepository.create(data);
};

export const update = async (id, data) => {
  return await webmasterRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await webmasterRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await webmasterRepository.delete(id);
};

export const find = async (id) => {
  return await webmasterRepository.find(id);
};

export const findWhere = async function (query) {
  return await webmasterRepository.findWhere(query);
};

export const findWhereActive = async function (query) {
  return await webmasterRepository.findWhereActive(query);
};
