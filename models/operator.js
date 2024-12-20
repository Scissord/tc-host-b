import repository from './repository.js';

const operatorRepository = repository('operator');

export const get = async () => {
  return await operatorRepository.getAll();
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
