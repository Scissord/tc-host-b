/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema
    .createTable('log', (table) => {
      table.bigIncrements('id').primary();
      table.bigInteger('order_id').nullable();
      table.integer('operator_id').nullable();
      table.tinyint('old_sub_status_id').nullable();
      table.tinyint('new_sub_status_id').nullable();
      table.string('action', 500).nullable();
      table.json('old_metadata').nullable();
      table.json('new_metadata').nullable();
      table.string('ip', 500).nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export const down = function (knex) {
  return knex.schema.dropTable('log');
};
