import repository from './repository.js';

const deliveryMethodRepository = repository('delivery_method');

export const get = async () => {
  return await deliveryMethodRepository.getActive();
};

export const getWhere = async (query) => {
  return await deliveryMethodRepository.getWhere(query);
};

export const create = async (data) => {
  return await deliveryMethodRepository.create(data);
};

export const update = async (id, data) => {
  return await deliveryMethodRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await deliveryMethodRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await deliveryMethodRepository.hardDelete(id);
};

export const find = async (id) => {
  return await deliveryMethodRepository.find(id);
};

export const findWhere = async function (query) {
  return await deliveryMethodRepository.findWhere(query);
};
