import knex from './knex.js';

const db = knex();

export const getAll = async function () {
  return await db('card_item')
    .select('*')
    .where('deleted_at', null)
    .orderBy('id', 'asc');
};

export const get = async function (limit, page) {
  const result = await db('card_item')
    .select('*')
    .where('deleted_at', null)
    .paginate({
      perPage: limit,
      currentPage: page,
      isLengthAware: true
    });

  return {
    card_items: result.data,
    lastPage: result.pagination.lastPage
  }
};

export const create = async function (data) {
  const [card_item] = await db("card_item")
    .insert(data)
    .returning("id");

  data.id = card_item.id;
  return data;
};

export const softDelete = async function (id) {
  return await db("card_item").update('deleted_at', new Date()).where('id', id)
};

export const update = async function (id, data) {
  await db("card_item")
    .update(data)
    .where("id", id);

  return data;
};

export const findWhere = async function (condition) {
  return await db("card_item")
    .select('*')
    .where(condition);
};

export const find = async function (id) {
  return await db("card_item")
    .select('*')
    .where("id", id)
    .first();
};
