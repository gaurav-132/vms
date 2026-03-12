import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authRepository } from './auth.repository.js';
import { env } from '../../config/env.js';

export const authService = {
    async register(data) {
        const { name, email, password, role } = data;
        
        const existingUser = await authRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const password_hash = await bcrypt.hash(password, 10);
        
        return await authRepository.create({
            name,
            email,
            password_hash,
            role
        });
    },

    async login(email, password) {
        const user = await authRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            env.jwtSecret,
            { expiresIn: '24h' }
        );

        const { password_hash, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token
        };
    },

    async getAllUsers() {
        return await authRepository.findAll();
    },

    async getUserById(id) {
        const user = await authRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    async updateUser(id, data) {
        if (data.password) {
            data.password_hash = await bcrypt.hash(data.password, 10);
            delete data.password;
        }
        return await authRepository.update(id, data);
    },

    async deleteUser(id) {
        return await authRepository.delete(id);
    }
};
