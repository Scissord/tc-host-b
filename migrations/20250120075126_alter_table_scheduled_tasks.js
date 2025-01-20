/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    return knex.schema.alterTable('scheduled_tasks', (table) => {
        table.string('scheduled_time').alter(); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    return knex.schema.alterTable('scheduled_tasks', (table) => {
        table.timestamp('scheduled_time').alter(); 
    });
};
