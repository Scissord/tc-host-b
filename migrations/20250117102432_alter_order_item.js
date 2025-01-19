/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.alterTable('order_item', (table) => {
    table.decimal('price', 10, 2).defaultTo(1650);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.alterTable('order_item', (table) => {
    table.dropColumn('price');
  });
};
