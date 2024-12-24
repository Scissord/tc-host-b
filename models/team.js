import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const teamRepository = repository('team');

export const get = async (department_id) => {
  return await db('team')
    .select('*')
    .where('department_id', department_id)
    .orderBy('id', 'asc')
    .where('deleted_at', null);
};

export const getWhere = async (query) => {
  return await teamRepository.getWhere(query);
};

export const create = async (data) => {
  return await teamRepository.create(data);
};

export const update = async (id, data) => {
  return await teamRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await teamRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await teamRepository.hardDelete(id);
};

export const find = async (id) => {
  return await teamRepository.find(id);
};

export const findWhere = async function (query) {
  return await teamRepository.findWhere(query);
};
