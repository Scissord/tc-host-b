import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const operatorRepository = repository('operator');

export const get = async () => {
  return await db('operator as o')
    .select('o.*', 'u.name as name')
    .leftJoin('user as u', 'u.id', 'o.user_id')
    .where('o.deleted_at', null)
    .orderBy('id', 'asc');
};

export const getFree = async () => {
  return await db('user as u')
    .select('u.id', 'u.name', 'o.team_id')
    .leftJoin('operator as o', 'o.user_id', 'u.id')
    .whereNull('o.id')
    .orWhereNull('o.team_id')
    .orWhereNotNull('o.deleted_at')
    .orderBy('id', 'asc');
};

export const getWhere = async (query) => {
  return await db('operator as o')
    .select('o.*', 'u.name as name')
    .leftJoin('user as u', 'u.id', 'o.user_id')
    .where(query)
    .andWhere('o.deleted_at', null)
    .orderBy('id', 'asc');
};

export const create = async (data) => {
  return await operatorRepository.create(data);
};

export const update = async (id, data) => {
  return await operatorRepository.update(id, data);
};

export const updateWhere = async (query, data) => {
  return await operatorRepository.updateWhere(query, data);
};

export const softDelete = async (id) => {
  return await operatorRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await operatorRepository.delete(id);
};

export const find = async (id) => {
  return await operatorRepository.find(id);
};

export const findWhere = async function (query) {
  return await operatorRepository.findWhere(query);
};

export const findWhereActive = async function (query) {
  return await operatorRepository.findWhereActive(query);
};
