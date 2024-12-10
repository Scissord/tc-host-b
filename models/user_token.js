import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('user_token').select('*')
};

export const create = async function (data) {
  const [user_token] = await db("user_token")
    .insert(data)
    .returning("id")

  data.id = user_token.id;
  return data;
};

export const update = async function (user_id, data) {
  const [user_token] = await db("user_token")
    .where('user_id', user_id)
    .update(data)
    .returning("*");

  return user_token;
};

export const destroy = async function (user_id) {
  await db("user_token")
    .del()
    .where("user_id", user_id)
};
