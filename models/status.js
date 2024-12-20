import repository from './repository.js';

const statusRepository = repository('status');

export const get = async () => {
  return await statusRepository.getAll();
};

export const create = async (data) => {
  return await statusRepository.create(data);
};

export const update = async (id, data) => {
  return await statusRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await statusRepository.delete(id);
};

export const find = async (id) => {
  return await statusRepository.find(id);
};
