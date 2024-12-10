import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('role').select('*')
};

export const getForUser = async function (role_id) {
  return await db('role')
    .select('*')
    .where('id', role_id)
    .first();
};
