import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const whIntegration = repository('wh_chat');


export const create = async (data) => {
  return await whIntegration.create(data);
};

export const findWhere = async function (query) {
  return await whIntegration.findWhere(query);
};
