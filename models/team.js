import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const teamRepository = repository('team');

export const get = async () => {
  return await teamRepository.getActive();
};

export const getByDepartment = async (department_id) => {
  return await db('team')
    .select('*')
    .where('department_id', department_id)
    .andWhere('deleted_at', null)
    .orderBy('id', 'asc');
};

export const getWhereActive = async (query) => {
  return await teamRepository.getWhereActive(query);
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
