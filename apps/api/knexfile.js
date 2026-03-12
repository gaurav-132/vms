import { env } from './src/config/env.js';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
    development: {
        client: 'pg',
        connection: env.databaseUrl,
        migrations: {
            directory: './src/database/migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: {
            connectionString: env.databaseUrl,
            ssl: { rejectUnauthorized: false },
        },
        migrations: {
            directory: './src/database/migrations',
        },
    }
};
