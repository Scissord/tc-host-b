import repository from './repository.js';

const roleRepository = repository('role');

export const get = async () => {
  return await roleRepository.getActive();
};

export const create = async (data) => {
  return await roleRepository.create(data);
};

export const update = async (id, data) => {
  return await roleRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await roleRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await roleRepository.hardDelete(id);
};

export const find = async (id) => {
  return await roleRepository.find(id);
};

export const findWhere = async function (query) {
  return await roleRepository.findWhere(query);
};
