import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: 'postgres://postgres:postgres@localhost:5432/vms_db',
});

async function checkDb() {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to PostgreSQL');
        
        const res = await client.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'");
        console.log('Tables:', res.rows.map(r => r.tablename));
        
        client.release();
    } catch (err) {
        console.error('Database connection error:', err.message);
    } finally {
        await pool.end();
    }
}

checkDb();
