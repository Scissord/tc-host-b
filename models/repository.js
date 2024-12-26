import knex from './knex.js';

const db = knex();

const repository = (tableName) => {
  return {
    // get all records
    getAll: async (order_by = 'id', sort_order = 'asc') => {
      return await db(tableName)
        .select('*')
        .orderBy(order_by, sort_order);
    },

    // get all records where deleted_at === null
    getActive: async (order_by = 'id', sort_order = 'asc') => {
      return await db(tableName)
        .select('*')
        .orderBy(order_by, sort_order)
        .where('deleted_at', null);
    },

    // get by query
    getWhere: async (query) => {
      return await db(tableName).select('*').where(query);
    },

    // get by query and deleted_at null
    getWhereActive: async (query) => {
      return await db(tableName)
        .select('*')
        .where(query)
        .andWhere('deleted_at', null);
    },

    getWhereIn: async (query) => {
      return await db(tableName).select('*').whereIn(query)
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
    // hard delete by array of ids
    hardDeleteByIds: async (ids) => {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error('Invalid input: ids must be a non-empty array.');
      }
    
      await db(tableName)
        .whereIn('id', ids)
        .del();
    
      return ids;
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
    findWhere: async(query) => {
      const record = await db(tableName)
        .select('*')
        .where(query)
        .first();

      return record;
    },

    // find by query with deleted_at = null
    findWhereActive: async(query) => {
      const record = await db(tableName)
        .select('*')
        .where(query)
        .where('deleted_at', null)
        .first();

      return record;
    }
  };
};

export default repository;
