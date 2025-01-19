/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
      .createTable('scheduled_tasks', (table) => {
        table.bigIncrements('id').primary();
        table.string('task_name').notNullable(); 
        table.timestamp('scheduled_time').nullable; 
      });
  };

  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function(knex) {
    return knex.schema.dropTable('scheduled_tasks');
  };
  