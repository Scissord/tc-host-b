import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('permission').select('*')
};

export const create = async function (data) {
  const [permission] = await db("permission")
    .insert(data)
    .returning("id")

  data.id = permission.id;
  return data;
};

export const update = async function (id, data) {
  const [permission] = await db("permission")
    .where('id', id)
    .update(data)
    .returning("*");

  return permission;
};

export const destroy = async function (id) {
  await db("permission")
    .del()
    .where("id", id)
};
