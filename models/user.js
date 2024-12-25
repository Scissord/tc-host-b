import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const userRepository = repository('user');

export const get = async () => {
  return await userRepository.getActive();
};

export const create = async (data) => {
  return await userRepository.create(data);
};

export const update = async (id, data) => {
  return await userRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await userRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await userRepository.delete(id);
};

export const find = async (id) => {
  return await userRepository.find(id);
};

export const findWhere = async function (query) {
  return await userRepository.findWhere(query);
};

export const findWebmaster = async function (user_id) {
  return await db('user as u')
    .select('u.*', 'w.id as webmaster_id')
    .leftJoin('webmaster as w', 'w.user_id', 'u.id')
    .where('u.id', user_id)
    .first();
};

export const findOperator = async function (user_id) {
  return await db('user as u')
    .select('u.*', 'o.id as operator_id')
    .leftJoin('operator as o', 'o.user_id', 'u.id')
    .where('u.id', user_id)
    .first();
};
