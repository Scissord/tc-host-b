/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    return knex.schema.alterTable('scheduled_tasks', (table) => {
        table.string('scheduled_time').alter().nullable()
        table.time('scheduled_time_timestamp').nullable()
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    return knex.schema.alterTable('scheduled_tasks', (table) => {
        table.dropColumn('scheduled_time_timestamp'); // Удаляем колонку
        table.timestamp('scheduled_time').alter(); // Возвращаем старый тип
    });
};