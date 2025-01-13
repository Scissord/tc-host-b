/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema
    .createTable('order', (table) => {
      table.bigIncrements('id').primary();
      table.string('fio', 255).nullable();
      table.string('phone', 255).nullable();
      table.string('region', 255).nullable();
      table.integer('city_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('city')
        .onDelete('CASCADE');

      table.string('address', 255).nullable();
      table.string('postal_code', 255).nullable();
      table.string('comment', 255).nullable();
      table.string('utm_term', 255).nullable();
      table.integer('webmaster_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('webmaster')
        .onDelete('CASCADE');

      table.integer('operator_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('operator')
        .onDelete('CASCADE');

      table.tinyint('status_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('status')
        .onDelete('CASCADE');

      table.tinyint('sub_status_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('sub_status')
        .onDelete('CASCADE');

      table.tinyint('gender_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('gender')
        .onDelete('CASCADE');

      table.tinyint('payment_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('payment')
        .onDelete('CASCADE');

      table.tinyint('delivery_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('delivery')
        .onDelete('CASCADE');

      table.string('additional1', 255).nullable();
      table.string('additional2', 255).nullable();
      table.string('additional3', 255).nullable();
      table.string('additional4', 255).nullable();
      table.string('additional5', 255).nullable();
      table.string('additional6', 255).nullable();
      table.string('additional7', 255).nullable();
      table.string('additional8', 255).nullable();
      table.string('additional9', 255).nullable();
      table.string('additional10', 255).nullable();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('approved_at').defaultTo(null);
      table.timestamp('cancelled_at').defaultTo(null);
      table.timestamp('shipped_at').defaultTo(null);
      table.timestamp('buyout_at').defaultTo(null);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('order');
};
