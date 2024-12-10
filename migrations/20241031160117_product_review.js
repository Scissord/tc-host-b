/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('product_review', (table) => {
      table.bigIncrements("id").primary();
      table.bigInteger("product_id").unsigned().references('id').inTable('product').onDelete('CASCADE');
      table.integer("rating").notNullable().defaultTo(0);
      table.string("comment", 50).notNullable();
      table.string("reviewer_name", 50).notNullable();
      table.string("reviewer_email", 50).notNullable();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').defaultTo(null);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('product_review');
};
