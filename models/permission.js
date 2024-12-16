import repository from './repository.js';

const permissionRepository = repository('permission');

export const get = async () => {
  return await permissionRepository.getAll();
};

export const create = async (data) => {
  return await permissionRepository.create(data);
};

export const update = async (id, data) => {
  return await permissionRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await permissionRepository.delete(id);
};

export const find = async (id) => {
  return await permissionRepository.find(id);
};

