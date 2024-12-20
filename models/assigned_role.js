import repository from './repository.js';

const assignedRoleRepository = repository('assigned_role');

export const get = async () => {
  return await assignedRoleRepository.getAll();
};

export const getWhere = async (query) => {
  return await assignedRoleRepository.getWhere(query);
};

export const create = async (data) => {
  return await assignedRoleRepository.create(data);
};

export const update = async (id, data) => {
  return await assignedRoleRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await assignedRoleRepository.hardDelete(id);
};

export const find = async (id) => {
  return await assignedRoleRepository.find(id);
};

export const findWhere = async function (query) {
  return await assignedRoleRepository.findWhere(query);
};
