import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('product_brand').select('*')
};

export const getBrandIdByName = async function (name) {
  const [brand] = await db("product_brand")
    .select("id")
    .where({ name })

  if (brand) {
    return brand.id;
  }

  const [newBrand] = await db("product_brand")
    .insert({ name })
    .returning("id");

  return newBrand.id;
};

export const create = async function (data) {
  const [product_category] = await db("product_category")
    .insert(data)
    .returning("id")

  data.id = product_category.id;
  return data;
};
