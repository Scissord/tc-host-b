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
      table.integer('ability_id')
      .unsigned()
      .references('id')
      .inTable('ability')
      .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('order_column');
};
