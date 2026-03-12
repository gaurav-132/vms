import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';
import { env } from '../config/env.js';

async function seedAdmin() {
    console.log('--- Seeding Admin User ---');
    try {
        const adminEmail = 'admin@xyzsolutions.tech';
        const adminPass = 'admin123';
        
        // Check if user exists
        const { rows: existing } = await db.query('SELECT * FROM users WHERE email = $1', [adminEmail]);
        
        if (existing.length > 0) {
            console.log('Admin user already exists.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(adminPass, salt);

        const query = `
            INSERT INTO users (name, email, password_hash, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email;
        `;
        const { rows } = await db.query(query, ['System Admin', adminEmail, hash, 'admin']);

        console.log('Admin user created successfully:', rows[0]);
    } catch (error) {
        console.error('Seeding error:', error);
    } finally {
        process.exit();
    }
}

seedAdmin();
