import repository from './repository.js';

const userRepository = repository('user');

export const get = async () => {
  return await userRepository.getAll();
};

export const create = async (data) => {
  return await userRepository.create(data);
};

export const update = async (id, data) => {
  return await userRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await userRepository.hardDelete(id);
};

export const find = async (id) => {
  return await userRepository.find(id);
};

export const findWhere = async function (query) {
  return await userRepository.findWhere(query);
};
