import repository from './repository.js';

const positionRepository = repository('position');

export const get = async () => {
  return await positionRepository.getAll();
};

export const create = async (data) => {
  return await positionRepository.create(data);
};

export const update = async (id, data) => {
  return await positionRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await positionRepository.delete(id);
};

export const find = async (id) => {
  return await positionRepository.find(id);
};

