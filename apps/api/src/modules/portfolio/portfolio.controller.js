import { db } from '../../config/db.js';

export const portfolioController = {
    // Public: Get all portfolio items, optionally filter by type
    list: async (req, res) => {
        try {
            const { type } = req.query;
            let query = 'SELECT * FROM portfolio_items';
            const params = [];

            if (type) {
                query += ' WHERE type = $1';
                params.push(type);
            }

            query += ' ORDER BY created_at DESC';

            const { rows } = await db.query(query, params);
            res.status(200).json(rows);
        } catch (error) {
            console.error('Portfolio list error:', error);
            // Return empty array instead of 500 to keep frontend running
            res.status(200).json([]);
        }
    },

    // Admin: Create new portfolio item
    create: async (req, res) => {
        try {
            const { title, description, type, features, icon_name } = req.body;
            const query = `
                INSERT INTO portfolio_items (title, description, type, features, icon_name)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const params = [title, description, type, features || [], icon_name];

            const { rows } = await db.query(query, params);
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error('Portfolio create error:', error);
            res.status(500).json({ error: 'Failed to create portfolio item' });
        }
    },

    // Admin: Delete portfolio item
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'DELETE FROM portfolio_items WHERE id = $1';
            await db.query(query, [id]);
            res.status(204).send();
        } catch (error) {
            console.error('Portfolio delete error:', error);
            res.status(500).json({ error: 'Failed to delete portfolio item' });
        }
    },
};
