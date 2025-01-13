import repository from './repository.js';

const orderCancelReasonRepository = repository('order_cancel_reason');

export const get = async () => {
  return await orderCancelReasonRepository.getActive();
};

export const create = async (data) => {
  return await orderCancelReasonRepository.create(data);
};

export const update = async (id, data) => {
  return await orderCancelReasonRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await orderCancelReasonRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await orderCancelReasonRepository.hardDelete(id);
};

export const find = async (id) => {
  return await orderCancelReasonRepository.find(id);
};

export const findWhere = async function (query) {
  return await orderCancelReasonRepository.findWhere(query);
};
