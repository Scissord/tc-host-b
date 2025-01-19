/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.alterTable('order', (table) => {
    table.integer('approved_by_id').nullable();
    table.string('approved_by_entity', 255).nullable();
    table.integer('cancelled_by_id').nullable();
    table.string('cancelled_by_entity', 255).nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.alterTable('order', (table) => {
    table.dropColumn('approved_by_id');
    table.dropColumn('approved_by_entity');
    table.dropColumn('cancelled_by_id');
    table.dropColumn('cancelled_by_entity');
  });
};
