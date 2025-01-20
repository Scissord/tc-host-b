/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('scheduled_tasks', (table) => {
    table.increments('id').primary(); 
    table.string('task_name').nullable(); 
    table.string('cron_schedule').nullable();
    table.time('send_time').nullable(); 
    table.timestamps(true, true); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('scheduled_tasks'); 
};
