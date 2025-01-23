import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const logRepository = repository('log');

export const get = async () => {
  return await logRepository.getActive();
};

export const getWhere = async (query) => {
  return await logRepository.getWhere(query);
};

export const create = async (data) => {
  return await logRepository.create(data);
};

export const createMany = async (data) => {
  return await logRepository.createMany(data);
};

export const update = async (id, data) => {
  return await logRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await logRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await logRepository.hardDelete(id);
};

export const find = async (id) => {
  return await logRepository.find(id);
};

export const findWhere = async function (query) {
  return await logRepository.findWhere(query);
};
