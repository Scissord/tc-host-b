import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('product_category').select('*')
};

export const getCategoryIdByName = async function (name) {
  const [category] = await db("product_category")
    .select("id")
    .where({ name })

  if (category) {
    return category.id;
  }

  const [newCategory] = await db("product_category")
    .insert({ name })
    .returning("id");

  return newCategory.id;
};

export const create = async function (data) {
  const [product_category] = await db("product_category")
    .insert(data)
    .returning("id")

  data.id = product_category.id;
  return data;
};
