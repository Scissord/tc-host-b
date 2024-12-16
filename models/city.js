import repository from './repository.js';

const cityRepository = repository('city');

export const get = async () => {
  return await cityRepository.getAll();
};

export const create = async (data) => {
  return await cityRepository.create(data);
};

export const update = async (id, data) => {
  return await cityRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await cityRepository.hardDelete(id);
};

export const find = async (id) => {
  return await cityRepository.find(id);
};

export const findByQuery = async function (query) {
  return await cityRepository.findByQuery(query);
};
