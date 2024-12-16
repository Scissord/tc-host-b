import knex from './knex.js';

const db = knex();

const repository = (tableName) => {
  return {
    // get all records
    getAll: async () => {
      return await db(tableName).select('*');
    },

    // create record
    create: async (data) => {
      const [createdRecord] = await db(tableName)
        .insert(data)
        .returning('*');

      return createdRecord;
    },

    // update record data by id
    update: async (id, data) => {
      console.log(id, data);
      const [updatedRecord] = await db(tableName)
        .where('id', id)
        .update(data)
        .returning('*');

      return updatedRecord;
    },

    updateWhere: async (query, data) => {
      const [updatedRecord] = await db(tableName)
        .where(query)
        .update(data)
        .returning('*');

      return updatedRecord;
    },

    updateWhereIn: async (ids, data) => {
      const updatedRecords = await db(tableName)
        .whereIn('id', ids)
        .update(data)
        .returning('*');

      return updatedRecords;
    },

    // soft delete record by id
    softDelete: async (id) => {
      const [deletedRecord] = await db(tableName)
        .where('id', id)
        .update('deleted_at', new Date())
        .returning('*');

      return deletedRecord;
    },

    // hard delete record by id
    hardDelete: async (id) => {
      await db(tableName)
        .where('id', id)
        .del()

      return id;
    },

    // find record by id
    find: async(id) => {
      const record = await db(tableName)
        .select('*')
        .where('id', id)
        .first();

      return record;
    },

    // find by query
    findByQuery: async(query) => {
      const record = await db(tableName)
        .select('*')
        .where(query)
        .first();

      return record;
    }
  };
};

export default repository;
