import knex from './knex.js';
import repository from './repository.js';

const db = knex();

const assignedRoleRepository = repository('assigned_role');

export const get = async () => {
  return await assignedRoleRepository.getAll();
};

export const getWhere = async (query) => {
  return await assignedRoleRepository.getWhere(query);
};

export const getUsers = async (role_id) => {
  return await db('assigned_role as ar')
    .select('ar.*', 'u.name as name')
    .leftJoin('user as u', 'u.id', 'ar.entity_id')
    .where('ar.role_id', role_id)
    .andWhere('ar.entity_type', 'user');
};

export const create = async (data) => {
  return await assignedRoleRepository.create(data);
};

export const update = async (id, data) => {
  return await assignedRoleRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await assignedRoleRepository.hardDelete(id);
};

export const find = async (id) => {
  return await assignedRoleRepository.find(id);
};

export const findWhere = async function (query) {
  return await assignedRoleRepository.findWhere(query);
};
