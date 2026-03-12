import bcrypt from 'bcryptjs';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
    const adminEmail = 'admin@xyz-solutions.com';
    
    // Check if admin already exists
    const existingAdmin = await knex('users').where({ email: adminEmail }).first();
    
    if (!existingAdmin) {
        const passwordHash = await bcrypt.hash('admin123', 10);
        await knex('users').insert({
            name: 'System Admin',
            email: adminEmail,
            password_hash: passwordHash,
            role: 'admin'
        });
        console.log(`✅ Native Seed: Created default admin: ${adminEmail}`);
    } else {
        console.log(`ℹ️ Native Seed: Admin ${adminEmail} already exists.`);
    }
}
