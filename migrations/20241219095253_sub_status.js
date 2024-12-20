/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('sub_status', (table) => {
      table.bigIncrements('id').primary();
      table.tinyint('status_id')
        .unsigned()
        .references('id')
        .inTable('status')
        .onDelete('CASCADE');
        
      table.string('name', 255).notNullable();
      table.string('color', 255).nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('sub_status');
};
