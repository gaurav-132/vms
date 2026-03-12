import fs from 'fs';
import path from 'path';
import { db } from '../config/db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, '../../../../supabase/migrations');

async function runMigrations() {
    console.log('--- Running Migrations ---');
    try {
        const folders = ['base', 'users', 'portfolio'];
        for (const folder of folders) {
            const folderPath = path.join(migrationsDir, folder);
            if (fs.existsSync(folderPath)) {
                const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.sql'));
                for (const file of files) {
                    console.log(`Executing ${folder}/${file}...`);
                    const sql = fs.readFileSync(path.join(folderPath, file), 'utf8');
                    await db.query(sql);
                }
            }
        }
        console.log('Migrations completed successfully.');
    } catch (error) {
        console.error('Migration error:', error.message);
    } finally {
        process.exit();
    }
}

runMigrations();
