import knex from './knex.js';

const db = knex();

export const get = async function () {
  return await db('card as ca')
    .select(
      'ca.*',
      'cl.name as client_name',
      's.name as source_name',
      'u.avatar as avatar'
    )
    .leftJoin('client as cl', 'cl.id', 'ca.client_id')
    .leftJoin('source as s', 's.id', 'ca.source_id')
    .leftJoin('user as u', 'u.id', 'ca.creator_id')
    .where('ca.deleted_at', null);
};

export const create = async function (data) {
  const [card] = await db("card")
    .insert(data)
    .returning("id");

  data.id = card.id;
  return data;
};

export const findWhere = async function (condition) {
  return await db("card")
    .select('*')
    .where(condition);
};

export const find = async function (id) {
  return await db("card as ca")
    .select(
      'ca.*',
      'ca.column_id as progress',
      'cl.name as client_name',
      's.name as source_name',
      'u.avatar as avatar',
      'u.name as creator_name',
      db.raw(`
        COALESCE(
          json_agg(
            json_build_object(
              'id', ci.product_id,
              'card_item_id', ci.id,
              'progress', ci.progress,
              'name', p.name
            ) ORDER BY ci.id desc
          ) FILTER (WHERE ci.id IS NOT NULL),
          '[]'
        ) as items
      `)
    )
    .leftJoin('client as cl', 'cl.id', 'ca.client_id')
    .leftJoin('source as s', 's.id', 'ca.source_id')
    .leftJoin('user as u', 'u.id', 'ca.creator_id')
    .leftJoin('card_item as ci', 'ci.card_id', 'ca.id')
    .leftJoin('product as p', 'p.id', 'ci.product_id')
    .where("ca.id", id)
    .groupBy('ca.id', 'ca.column_id', 'cl.name', 's.name', 'u.avatar', 'u.name')
    .first();
};

export const update = async function (id, data) {
  await db("card")
    .update(data)
    .where("id", id);

  return data;
};

export const updateWhereIn = async function (ids, data) {
  await db("card")
    .update(data)
    .whereIn("id", ids);

  return data;
};

export const softDelete = async function (id) {
  await db("card")
    .update('deleted_at', new Date())
    .where('id', id)

  return id
};
