/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('assigned_role', (table) => {
      table.bigIncrements('id').primary();
      table.integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('role')
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
  return knex.schema.dropTable('assigned_role');
};
