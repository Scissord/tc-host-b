import repository from './repository.js';

const permissionRepository = repository('permission');

export const get = async () => {
  return await permissionRepository.getAll();
};

export const getWhere = async (query) => {
  return await permissionRepository.getWhere(query);
};

export const create = async (data) => {
  return await permissionRepository.create(data);
};

export const update = async (id, data) => {
  return await permissionRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await permissionRepository.hardDelete(id);
};

export const find = async (id) => {
  return await permissionRepository.find(id);
};

export const findWhere = async function (query) {
  return await permissionRepository.findWhere(query);
};
