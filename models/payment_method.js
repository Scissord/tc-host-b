import repository from './repository.js';

const paymentMethodRepository = repository('payment_method');

export const get = async () => {
  return await paymentMethodRepository.getActive();
};

export const getWhere = async (query) => {
  return await paymentMethodRepository.getWhere(query);
};

export const create = async (data) => {
  return await paymentMethodRepository.create(data);
};

export const update = async (id, data) => {
  return await paymentMethodRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await paymentMethodRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await paymentMethodRepository.hardDelete(id);
};

export const find = async (id) => {
  return await paymentMethodRepository.find(id);
};

export const findWhere = async function (query) {
  return await paymentMethodRepository.findWhere(query);
};
