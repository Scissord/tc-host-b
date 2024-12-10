import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('attachment').select('*')
};

export const create = async function (data) {
  const [attachment] = await db("attachment")
    .insert(data)
    .returning("id")

  data.id = attachment.id;
  return data;
};

export const findByMessageId = async function (message_id) {
  return await db('attachment as a')
    .select('a.*')
    .where('a.message_id', message_id)
    .first();
};
