import knex from './knex.js';

const db = knex();

export const get = async function (status) {
  return await db('column')
    .select('*')
    .where((q) => {
      if(status !== 100) {
        q.where('status', status);
      }
    })
    .orderBy('position', 'asc');
};

export const getForManager = async function (id, manager_id) {
  // const coreColumn = await db('column')
  //   .select('*')
  //   .where('id', id);

  const selfColumn = await db('column')
    .select('*')
    .where('manager_id', manager_id);

  return [...selfColumn];
};

export const getByManagerId = async function (manager_id) {
  return await db('column')
    .select('*')
    .where('manager_id', manager_id)
    .first();
};

export const create = async function (data) {
  const [column] = await db("column")
    .insert(data)
    .returning("id");

  data.id = column.id;
  return data;
};

export const findWhere = async function (condition) {
  return await db("column")
    .select('*')
    .where(condition);
};

export const find = async function (id) {
  return await db("column")
    .select('*')
    .where("id", id)
    .first();
}

export const update = async function (id, data) {
  await db("column")
    .update(data)
    .where("id", id);

  return data;
};

export const updateByManagerId = async function (manager_id, data) {
  await db("column")
    .update(data)
    .where("manager_id", manager_id);

  return data;
};

export const updateWhereIn = async function (ids, data) {
  await db("column")
    .update(data)
    .whereIn("id", ids);

  return data;
};

export const destroy = async function (manager_id) {
  await db("column")
    .del()
    .where("manager_id", manager_id)
};
