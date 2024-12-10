/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('product', (table) => {
      table.bigIncrements("id").primary();
      table.string("title", 100).notNullable();
      table.text("description").notNullable();
      // unsigned - не может быть отрицательной
      table.bigInteger("category_id").unsigned().references('id').inTable('product_category');
      // 10 - общее кол-во цифр, 2 - после запятой
      table.decimal('price', 10, 2).notNullable().defaultTo(0);
      table.decimal('discount_percentage', 10, 2).notNullable().defaultTo(0);
      table.decimal('rating', 10, 2).notNullable().defaultTo(0);
      table.integer('stock').notNullable().defaultTo(0);
      table.bigInteger("brand_id").unsigned().references('id').inTable('product_brand');
      table.string("sku", 50).notNullable();
      table.integer('weight').notNullable().defaultTo(0);
      table.decimal('width', 5, 2).notNullable().defaultTo(0);
      table.decimal('height', 5, 2).notNullable().defaultTo(0);
      table.decimal('depth', 5, 2).notNullable().defaultTo(0);
      table.string("warranty_information", 50).notNullable();
      table.string("shipping_information", 50).notNullable();
      table.string("availability_status", 50).notNullable();
      table.string("return_policy", 50).notNullable();
      table.integer('minimum_order_quantity').notNullable().defaultTo(0);
      table.string("barcode", 50).notNullable();
      table.string("qrCode", 100).notNullable();
      table.string("thumbnail", 200).notNullable();

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
  return knex.schema.dropTable('product');
};
