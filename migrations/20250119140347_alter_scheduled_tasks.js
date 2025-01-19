/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.alterTable('scheduled_tasks', (table) => {
        table.timestamp('scheduled_time').alter().nullable()
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function (knex) {
    return knex.schema.alterTable('scheduled_tasks', (table) => {
        table.timestamp('scheduled_time').alter().notNullable(); 
    });
  };
  
  