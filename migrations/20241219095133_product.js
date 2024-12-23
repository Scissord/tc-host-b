/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('product', (table) => {
      table.bigIncrements('id').primary();
      table.string('name', 255).notNullable();
      table.decimal('price', 10, 2).notNullable();

      table.timestamp('deleted_at').defaultTo(null);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('product');
};
