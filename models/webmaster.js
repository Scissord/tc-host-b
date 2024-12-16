import repository from './repository.js';

const webmasterRepository = repository('webmaster');

export const get = async () => {
  return await webmasterRepository.getAll();
};

export const create = async (data) => {
  return await webmasterRepository.create(data);
};

export const update = async (id, data) => {
  return await webmasterRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await webmasterRepository.hardDelete(id);
};

export const find = async (id) => {
  return await webmasterRepository.find(id);
};

export const findByQuery = async function (query) {
  return await webmasterRepository.findByQuery(query);
};
