/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
      .createTable('wh_integration', (table) => {
        table.string('wh_phone', 255) 
          .primary(); 
        table.string('wh_instane_id', 255)
        table.string('wh_api_token')
        table.bigInteger('webmaster_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('webmaster')
        table.string('keitaro_company', 255)
        .nullable()
      });
};
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable('wh_integration');
};
