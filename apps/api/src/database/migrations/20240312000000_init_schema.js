/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    // 1. Users Table
    if (!(await knex.schema.hasTable('users'))) {
        await knex.schema.createTable('users', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.text('name').notNullable();
            table.text('email').notNullable().unique();
            table.text('password_hash').notNullable();
            table.text('role').notNullable().defaultTo('admin');
            table.timestamps(true, true);
        });
    }

    // 2. Portfolio Items Table
    if (!(await knex.schema.hasTable('portfolio_items'))) {
        await knex.schema.createTable('portfolio_items', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.text('title').notNullable();
            table.text('description').notNullable();
            table.text('type').notNullable(); // product or service
            table.jsonb('features').defaultTo('[]');
            table.text('icon_name');
            table.boolean('is_active').defaultTo(true);
            table.timestamps(true, true);
        });
    }

    // 3. Demo Requests Table
    if (!(await knex.schema.hasTable('demo_requests'))) {
        await knex.schema.createTable('demo_requests', (table) => {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.text('name').notNullable();
            table.text('email').notNullable();
            table.text('phone');
            table.text('company_name');
            table.uuid('interested_in').references('id').inTable('portfolio_items').onDelete('SET NULL');
            table.date('preferred_demo_date');
            table.text('message');
            table.text('status').defaultTo('New');
            table.timestamps(true, true);
        });
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTableIfExists('demo_requests');
    await knex.schema.dropTableIfExists('portfolio_items');
    await knex.schema.dropTableIfExists('users');
}
