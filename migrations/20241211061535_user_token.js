/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('user_token', (table) => {
      table.bigIncrements('id').primary();
      table.uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.string('refresh_token', 255).notNullable();
      table.timestamp('expires_at').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('user_token');
};
