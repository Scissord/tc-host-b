import repository from './repository.js';

const abilityRepository = repository('ability');

export const get = async () => {
  return await abilityRepository.getAll();
};

export const getWhere = async (query) => {
  return await abilityRepository.getWhere(query);
};

export const create = async (data) => {
  return await abilityRepository.create(data);
};

export const update = async (id, data) => {
  return await abilityRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await abilityRepository.hardDelete(id);
};

export const find = async (id) => {
  return await abilityRepository.find(id);
};

export const findWhere = async function (query) {
  return await abilityRepository.findWhere(query);
};
