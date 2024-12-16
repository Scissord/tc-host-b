/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('order_column', (table) => {
      table.bigIncrements('id').primary();
      table.string('label', 255).notNullable();
      table.string('name', 255).notNullable();
      table.boolean('is_visible').defaultTo(true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('order_column');
};
