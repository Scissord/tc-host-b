import repository from './repository.js';

const orderStatusRepository = repository('order_status');

export const get = async () => {
  return await orderStatusRepository.getAll();
};

export const create = async (data) => {
  return await orderStatusRepository.create(data);
};

export const update = async (id, data) => {
  return await orderStatusRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await orderStatusRepository.delete(id);
};

export const find = async (id) => {
  return await orderStatusRepository.find(id);
};
