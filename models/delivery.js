import repository from './repository.js';

const deliveryRepository = repository('delivery');

export const get = async () => {
  return await deliveryRepository.getActive();
};

export const getWhere = async (query) => {
  return await deliveryRepository.getWhere(query);
};

export const create = async (data) => {
  return await deliveryRepository.create(data);
};

export const update = async (id, data) => {
  return await deliveryRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await deliveryRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await deliveryRepository.hardDelete(id);
};

export const find = async (id) => {
  return await deliveryRepository.find(id);
};

export const findWhere = async function (query) {
  return await deliveryRepository.findWhere(query);
};
