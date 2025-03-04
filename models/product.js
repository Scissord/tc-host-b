import repository from './repository.js';

const productRepository = repository('product');

export const get = async () => {
  return await productRepository.getActive();
};

export const create = async (data) => {
  return await productRepository.create(data);
};

export const update = async (id, data) => {
  return await productRepository.update(id, data);
};

export const softDelete = async (id) => {
  return await productRepository.softDelete(id);
};

export const hardDelete = async (id) => {
  return await productRepository.hardDelete(id);
};

export const find = async (id) => {
  return await productRepository.find(id);
};

export const findWhere = async function (query) {
  return await productRepository.findWhere(query);
};
