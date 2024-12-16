import repository from './repository.js';

const productRepository = repository('product');

export const get = async () => {
  return await productRepository.getAll();
};

export const create = async (data) => {
  return await productRepository.create(data);
};

export const update = async (id, data) => {
  return await productRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await productRepository.hardDelete(id);
};

export const find = async (id) => {
  return await productRepository.find(id);
};

export const findByQuery = async function (query) {
  return await productRepository.findByQuery(query);
};
