import repository from './repository.js';

const orderColumnRepository = repository('order_column');

export const get = async () => {
  return await orderColumnRepository.getAll();
};

export const create = async (data) => {
  return await orderColumnRepository.create(data);
};

export const update = async (id, data) => {
  return await orderColumnRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await orderColumnRepository.delete(id);
};

export const find = async (id) => {
  return await orderColumnRepository.find(id);
};

