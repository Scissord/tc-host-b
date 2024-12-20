/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('permission', (table) => {
      table.bigIncrements('id').primary();
      table.integer('ability_id')
        .unsigned()
        .references('id')
        .inTable('ability')
        .onDelete('CASCADE');

      table.integer('entity_id').nullable();
      table.string('entity_type', 255).nullable();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('permission');
};
