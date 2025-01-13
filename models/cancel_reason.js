import repository from './repository.js';

const cancelReasonRepository = repository('cancel_reason');

export const get = async () => {
  return await cancelReasonRepository.getActive();
};

export const create = async (data) => {
  return await cancelReasonRepository.create(data);
};

export const update = async (id, data) => {
  return await cancelReasonRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await cancelReasonRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await cancelReasonRepository.hardDelete(id);
};

export const find = async (id) => {
  return await cancelReasonRepository.find(id);
};

export const findWhere = async function (query) {
  return await cancelReasonRepository.findWhere(query);
};
