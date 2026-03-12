import { authService } from './auth.service.js';

export const authController = {
    register: async (req, res) => {
        try {
            const user = await authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error('Auth register error:', error);
            res.status(400).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            console.error('Auth login error:', error);
            res.status(401).json({ error: error.message });
        }
    },

    setupAdmin: async (req, res) => {
        try {
            const users = await authService.getAllUsers();
            if (users.length > 0) {
                return res.status(400).json({ error: 'Setup already completed' });
            }
            const admin = await authService.register({
                name: 'System Admin',
                email: 'admin@xyzsolutions.tech',
                password: 'admin',
                role: 'admin'
            });
            res.status(201).json({ message: 'Admin created successfully', admin });
        } catch (error) {
            console.error('Auth setup error:', error);
            res.status(500).json({ error: 'Failed to complete setup' });
        }
    },

    me: async (req, res) => {
        try {
            const user = await authService.getUserById(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            console.error('Auth me error:', error);
            res.status(404).json({ error: error.message });
        }
    },

    listUsers: async (req, res) => {
        try {
            const users = await authService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Auth listUsers error:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await authService.updateUser(id, req.body);
            res.status(200).json(user);
        } catch (error) {
            console.error('Auth updateUser error:', error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await authService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            console.error('Auth deleteUser error:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
};
