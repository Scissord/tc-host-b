import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const operatorRepository = repository('operator');

export const get = async () => {
  return await db('operator as o')
    .select('o.*', 'u.name as name')
    .leftJoin('user as u', 'u.id', 'o.user_id')
    .orderBy('id', 'asc');
};

export const getFree = async () => {
  return await db('operator as o')
    .select('o.*', 'u.name as name')
    .leftJoin('user as u', 'u.id', 'o.user_id')
    .where('team_id', null)
    .orderBy('id', 'asc');
};

export const getWhere = async (query) => {
  return await db('operator as o')
    .select('o.*', 'u.name as name')
    .leftJoin('user as u', 'u.id', 'o.user_id')
    .where(query)
    .orderBy('id', 'asc');
};

export const create = async (data) => {
  return await operatorRepository.create(data);
};

export const update = async (id, data) => {
  return await operatorRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await operatorRepository.hardDelete(id);
};

export const find = async (id) => {
  return await operatorRepository.find(id);
};

export const findWhere = async function (query) {
  return await operatorRepository.findWhere(query);
};
