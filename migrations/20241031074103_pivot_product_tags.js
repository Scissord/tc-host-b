/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('pivot_product_tags', (table) => {
      table.primary(['product_id', 'tag_id']);
      table.integer('product_id').unsigned().references('id').inTable('product').onDelete('CASCADE');
      table.integer('tag_id').unsigned().references('id').inTable('product_tag').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('pivot_product_tags');
};
