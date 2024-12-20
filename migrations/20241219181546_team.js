/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('team', (table) => {
      table.bigIncrements('id').primary();
      table.string('title', 255).notNullable();
      table.specificType('sub_status_ids', 'smallint[]').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('team');
};
