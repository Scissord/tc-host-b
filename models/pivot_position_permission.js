import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('pivot_position_permission').select('*')
};

export const getPermissions = async function (position_id) {
  const permissions = await db('pivot_position_permission as ppp')
    .select('pe.id as permission_id', 'pe.name as permission_name')
    .leftJoin('permission as pe', 'pe.id', 'ppp.permission_id')
    .where('position_id', position_id);
    
  return permissions
};

export const create = async function (data) {
  const [pivot_position_permission] = await db("pivot_position_permission")
    .insert(data)
    .returning("id")

  data.id = pivot_position_permission.id;
  return data;
};

export const update = async function (id, data) {
  const [pivot_position_permission] = await db("pivot_position_permission")
    .where('id', id)
    .update(data)
    .returning("*");

  return pivot_position_permission;
};

export const destroy = async function (id) {
  await db("pivot_position_permission")
    .del()
    .where("id", id)
};
