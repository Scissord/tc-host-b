import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const permissionRepository = repository('permission');

export const get = async () => {
  return await permissionRepository.getAll();
};

export const getWhere = async (query) => {
  return await permissionRepository.getWhere(query);
};

export const create = async (data) => {
  return await permissionRepository.create(data);
};

export const update = async (id, data) => {
  return await permissionRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await permissionRepository.hardDelete(id);
};

export const find = async (id) => {
  return await permissionRepository.find(id);
};

export const findWhere = async function (query) {
  return await permissionRepository.findWhere(query);
};

export const deleteByAbilitiesAndType = async (abilityIds, entityType, entity_id) => {
  try {
    const deletedRows = await db('permission')
      .whereIn('ability_id', abilityIds)
      .andWhere('entity_type', entityType)
      .andWhere('entity_id', entity_id)
      .del();

    return deletedRows;
  } catch (err) {
    console.error('Error deleting records:', err.message);
    throw new Error('Failed to delete records.');
  }
};
