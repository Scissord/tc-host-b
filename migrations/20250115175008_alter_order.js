/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.alterTable('order', (table) => {
    table.string('fio', 5000).alter().nullable();
    table.string('phone', 5000).alter().nullable();
    table.string('region', 5000).alter().nullable();
    table.string('address', 5000).alter().nullable();
    table.string('postal_code', 5000).alter().nullable();
    table.string('comment', 5000).alter().nullable();
    table.string('age', 5000).alter().nullable();
    table.string('utm_term', 5000).alter().nullable();
    table.string('total_sum', 5000).alter().nullable();

    table.string('additional1', 5000).alter().nullable();
    table.string('additional2', 5000).alter().nullable();
    table.string('additional3', 5000).alter().nullable();
    table.string('additional4', 5000).alter().nullable();
    table.string('additional5', 5000).alter().nullable();
    table.string('additional6', 5000).alter().nullable();
    table.string('additional7', 5000).alter().nullable();
    table.string('additional8', 5000).alter().nullable();
    table.string('additional9', 5000).alter().nullable();
    table.string('additional10', 5000).alter().nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.alterTable('order', (table) => {
    table.string('fio', 255).alter().nullable();
    table.string('phone', 255).alter().nullable();
    table.string('region', 255).alter().nullable();
    table.string('address', 255).alter().nullable();
    table.string('postal_code', 255).alter().nullable();
    table.string('comment', 255).alter().nullable();
    table.integer('age').nullable();
    table.string('utm_term', 255).alter().nullable();
    table.integer('total_sum').defaultTo(0);

    table.string('additional1', 255).nullable();
    table.string('additional2', 255).nullable();
    table.string('additional3', 255).nullable();
    table.string('additional4', 255).nullable();
    table.string('additional5', 255).nullable();
    table.string('additional6', 255).nullable();
    table.string('additional7', 255).nullable();
    table.string('additional8', 255).nullable();
    table.string('additional9', 255).nullable();
    table.string('additional10', 255).nullable();
  });
};
