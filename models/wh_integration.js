import knex from './knex.js';
import repository from './repository.js';

const db = knex();
const whIntegration = repository('wh_integration');



export const create = async (data) => {
  return await whIntegration.create(data);
};


export const findWhere = async function (query) {
  return await whIntegration.findWhere(query);
};

// export const update = async (id, data) => {

//   };