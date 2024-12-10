import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('product_image').select('*')
};

export const create = async function (data) {
  const [product_image] = await db("product_image")
    .insert(data)
    .returning("id")

  data.id = product_image.id;
  return data;
};
