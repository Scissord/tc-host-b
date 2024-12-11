/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('webmaster', (table) => {
      table.bigIncrements('id').primary();
      table.uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('webmaster');
};
