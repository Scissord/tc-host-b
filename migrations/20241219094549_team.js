/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('team', (table) => {
      table.bigIncrements('id').primary();
      table.string('title', 255).notNullable();
      table.bigInteger('department_id')
        .unsigned()
        .references('id')
        .inTable('department')
        .onDelete('CASCADE');
      table.specificType('sub_status_ids', 'smallint[]').notNullable();
      table.timestamp('deleted_at').defaultTo(null);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('team');
};
