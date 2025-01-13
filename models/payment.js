import repository from './repository.js';

const paymentRepository = repository('payment');

export const get = async () => {
  return await paymentRepository.getActive();
};

export const getWhere = async (query) => {
  return await paymentRepository.getWhere(query);
};

export const create = async (data) => {
  return await paymentRepository.create(data);
};

export const update = async (id, data) => {
  return await paymentRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await paymentRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await paymentRepository.hardDelete(id);
};

export const find = async (id) => {
  return await paymentRepository.find(id);
};

export const findWhere = async function (query) {
  return await paymentRepository.findWhere(query);
};
