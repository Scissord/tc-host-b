/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    return knex.schema.createTable('wh_message', (table) => {
        table.bigIncrements('id').primary(); 
        table.bigInteger('order_id') 
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('order')
            .onDelete('CASCADE');
        table.string('type', 50).notNullable();
        table.string('type_message', 50).notNullable(); 
        table.string('id_message', 255).notNullable(); 
        table.timestamp('timestamp').notNullable(); 
        table.jsonb('message_data'); 
        table.boolean('status')
        .notNullable; 
        table.bigInteger('sender_id')
        .nullable()
        .references('id')
        .inTable('operator')
        .onDelete('SET NULL')
        table.timestamps(true, true); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    return knex.schema.dropTable('wh_message');
};
