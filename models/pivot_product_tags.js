import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('pivot_product_tags').select('*')
};

export const create = async function (data) {
  return await db("pivot_product_tags")
    .insert(data)
};
