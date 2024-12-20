import repository from './repository.js';
import knex from './knex.js';

const db = knex();

const departmentRepository = repository('department');

export const get = async () => {
  return await departmentRepository.getAll();
};

export const getWhere = async (query) => {
  return await departmentRepository.getWhere(query);
};

export const create = async (data) => {
  return await departmentRepository.create(data);
};

export const update = async (id, data) => {
  return await departmentRepository.update(id, data);
};

export const hardDelete = async (id) => {
  return await departmentRepository.hardDelete(id);
};

export const find = async (id) => {
  return await departmentRepository.find(id);
};

export const findWhere = async function (query) {
  return await departmentRepository.findWhere(query);
};

export const getDepartmentHeadAbility = async function (department_id) {
  const ability = await db('ability as a')
    .select('a.id')
    .where('a.name', 'department_head')
    .andWhere('a.entity_id', department_id)
    .andWhere('a.entity_type', 'department')
    .first();

  if(ability) {
    return ability.id;
  } else {
    return null;
  };
};
