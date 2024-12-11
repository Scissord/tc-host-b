import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('position').select('*')
};

export const create = async function (data) {
  const [position] = await db("position")
    .insert(data)
    .returning("id")

  data.id = position.id;
  return data;
};

export const update = async function (id, data) {
  const [position] = await db("position")
    .where('id', id)
    .update(data)
    .returning("*");

  return position;
};

export const destroy = async function (id) {
  await db("position")
    .del()
    .where("id", id)
};

export const find = async function (id) {
  return await db("position")
    .select('*')
    .where("id", id)
    .first();
};
