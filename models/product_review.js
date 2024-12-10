import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('product_review').select('*')
};

export const create = async function (data) {
  const [product_review] = await db("product_review")
    .insert(data)
    .returning("id")

  data.id = product_review.id;
  return data;
};
