/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
      .createTable('wh_chat', (table) => {
        table.bigInteger('order_id') 
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('order')
          .primary(); 
        table.string('customer_phone', 255).nullable();
        table.string('wh_phone', 255).nullable();
      });
  };
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('wh_chat');
};
