import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const pivotPositionPermissionRepository = repository('pivot_position_permission');

export const get = async () => {
  return await pivotPositionPermissionRepository.getAll();
};

export const create = async (data) => {
  return await pivotPositionPermissionRepository.create(data);
};

export const update = async (id, data) => {
  return await pivotPositionPermissionRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await pivotPositionPermissionRepository.delete(id);
};

export const find = async (id) => {
  return await pivotPositionPermissionRepository.find(id);
};

export const getPermissions = async function (position_id) {
  const permissions = await db('pivot_position_permission as ppp')
    .select('pe.id as permission_id', 'pe.name as permission_name')
    .leftJoin('permission as pe', 'pe.id', 'ppp.permission_id')
    .where('position_id', position_id);
    
  return permissions
};
