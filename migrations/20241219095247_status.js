/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('status', (table) => {
      table.bigIncrements('id').primary();
      table.string('name', 255).notNullable();
      table.string('color', 255).nullable();

      table.timestamp('deleted_at').defaultTo(null);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('status');
};
