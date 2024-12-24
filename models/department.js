import repository from './repository.js';
import knex from './knex.js';

const db = knex();

const departmentRepository = repository('department');

export const get = async () => {
  return await departmentRepository.getActive();
};

export const getWhere = async (query) => {
  return await departmentRepository.getWhere(query);
};

export const create = async (data) => {
  return await departmentRepository.create(data);
};

export const update = async (id, data) => {
  return await departmentRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await departmentRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await departmentRepository.hardDelete(id);
};

export const find = async (id) => {
  return await departmentRepository.find(id);
};

export const findWhere = async function (query) {
  return await departmentRepository.findWhere(query);
};
