/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('pivot_position_permission', (table) => {
      table.integer('position_id')
        .unsigned()
        .references('id')
        .inTable('position')
        .onDelete('CASCADE');
      table.integer('permission_id')
        .unsigned()
        .references('id')
        .inTable('permission')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('pivot_position_permission');
};
