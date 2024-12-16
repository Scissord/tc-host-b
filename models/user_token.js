import repository from './repository.js';

const userTokenRepository = repository('user_token');

export const get = async () => {
  return await userTokenRepository.getAll();
};

export const create = async (data) => {
  return await userTokenRepository.create(data);
};

export const update = async (id, data) => {
  return await userTokenRepository.update(id, data);
};

export const updateWhere = async (query, data) => {
  return await userTokenRepository.updateWhere(query, data);
};

export const hardDelete = async (id) => {
  return await userTokenRepository.delete(id);
};
