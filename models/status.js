import repository from './repository.js';

const statusRepository = repository('status');

export const get = async () => {
  return await statusRepository.getActive();
};

export const create = async (data) => {
  return await statusRepository.create(data);
};

export const update = async (id, data) => {
  return await statusRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await statusRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await statusRepository.delete(id);
};

export const find = async (id) => {
  return await statusRepository.find(id);
};
