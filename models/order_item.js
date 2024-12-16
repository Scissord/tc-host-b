import repository from './repository.js';

const orderItem = repository('order_item');

export const get = async () => {
  return await orderItem.getAll();
};

export const create = async (data) => {
  return await orderItem.create(data);
};

export const update = async (id, data) => {
  return await orderItem.update(id, data);
};

export const hardDelete = async (id) => {
  return await orderItem.delete(id);
};

export const find = async (id) => {
  return await orderItem.find(id);
};

