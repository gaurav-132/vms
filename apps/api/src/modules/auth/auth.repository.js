import { db } from '../../config/db.js';

export const authRepository = {
    async findByEmail(email) {
        return await db('users').where({ email }).first();
    },

    async findById(id) {
        return await db('users')
            .select('id', 'name', 'email', 'role', 'created_at')
            .where({ id })
            .first();
    },

    async create(data) {
        const { name, email, password_hash, role } = data;
        const [user] = await db('users')
            .insert({
                name,
                email,
                password_hash,
                role: role || 'admin'
            })
            .returning(['id', 'name', 'email', 'role', 'created_at']);
        return user;
    },

    async findAll() {
        return await db('users')
            .select('id', 'name', 'email', 'role', 'created_at')
            .orderBy('created_at', 'desc');
    },

    async update(id, data) {
        const [updatedUser] = await db('users')
            .where({ id })
            .update(data)
            .returning(['id', 'name', 'email', 'role', 'created_at']);
        return updatedUser;
    },

    async delete(id) {
        await db('users').where({ id }).delete();
        return true;
    }
};
