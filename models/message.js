import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('message').select('*')
};

export const create = async function (data) {
  const [message] = await db("message")
    .insert(data)
    .returning("id")

  data.id = message.id;
  return data;
};

export const getChat = async function (customer_id) {
  return await db('message as m')
    .select('m.*', 'cu.avatar', 'u.name as manager_name')
    .select(db.raw('COALESCE(json_agg(a.*) FILTER (WHERE a.id IS NOT NULL), \'[]\') as attachments'))
    .leftJoin('attachment as a', 'a.message_id', 'm.id')
    .leftJoin('customer as cu', 'cu.id', 'm.customer_id')
    .leftJoin('user as u', 'u.id', 'm.user_id')
    .where('customer_id', customer_id)
    .groupBy('m.id', 'cu.avatar', 'u.name');
};

export const getLast = async function (customer_id) {
  return await db('message as m')
    .select('m.text')
    .where('m.customer_id', customer_id)
    .orderBy('m.id', 'desc')
    .first();
};

export const find = async function (message_id) {
  return await db('message as m')
    .select('m.*')
    .where('m.id', message_id)
    .first();
};

export const clear = async function (customer_id) {
  return await db('message')
    .where('customer_id', customer_id)
    .update('is_checked', true);
};

export const deleteManager = async function (user_id) {
  return await db('message')
    .update('user_id', null)
    .where('user_id', user_id)
};

export const getLengthInCurrentMonth = async function () {
  const count = await db('message')
    .count('*')
    .where('created_at', '>=', db.raw("date_trunc('month', CURRENT_DATE)"))
    .andWhere('created_at', '<', db.raw("date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'"));

  return count[0].count;
};
