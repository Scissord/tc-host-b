import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('product_tag').select('*')
};

export const find = async function (data) {
  return await db('product_tag')
    .select('*')
    .where(data)
    .first()
};

export const create = async function (data) {
  const [product_tag] = await db("product_tag")
    .insert(data)
    .returning("id")

  data.id = product_tag.id;
  return data;
};
