import repository from './repository.js';

const genderRepository = repository('gender');

export const get = async () => {
  return await genderRepository.getActive();
};

export const getWhere = async (query) => {
  return await genderRepository.getWhere(query);
};

export const create = async (data) => {
  return await genderRepository.create(data);
};

export const update = async (id, data) => {
  return await genderRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await genderRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await genderRepository.hardDelete(id);
};

export const find = async (id) => {
  return await genderRepository.find(id);
};

export const findWhere = async function (query) {
  return await genderRepository.findWhere(query);
};
