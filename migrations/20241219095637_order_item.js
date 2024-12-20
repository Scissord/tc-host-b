/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('order_item', (table) => {
      table.bigIncrements('id').primary();
      table.bigInteger('order_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('order')
        .onDelete('CASCADE');

      table.integer('product_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('product')
        .onDelete('CASCADE');
        
      table.integer('quantity').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('order_item');
};
