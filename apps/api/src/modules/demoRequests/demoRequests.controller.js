import { db } from '../../config/db.js';

export const demoRequestsController = {
    // Public: Create a new demo request
    create: async (req, res) => {
        try {
            const {
                name,
                email,
                phone,
                company_name,
                interested_in,
                preferred_demo_date,
                message,
            } = req.body;

            const query = `
                INSERT INTO demo_requests (name, email, phone, company_name, interested_in, preferred_demo_date, message)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `;
            const params = [
                name,
                email,
                phone,
                company_name,
                interested_in || null,
                preferred_demo_date || null,
                message,
            ];

            const { rows } = await db.query(query, params);
            res.status(201).json(rows[0]);
        } catch (error) {
            console.error('DemoRequest create error:', error);
            res.status(500).json({ error: 'Failed to submit demo request' });
        }
    },

    // Admin: List all demo requests
    list: async (req, res) => {
        try {
            const query = `
                SELECT dr.*, pi.title as portfolio_item_title
                FROM demo_requests dr
                LEFT JOIN portfolio_items pi ON dr.interested_in = CAST(pi.id AS TEXT)
                ORDER BY dr.created_at DESC
            `;
            const { rows } = await db.query(query);
            
            // Map the rows to match the expected format if necessary
            const formattedRows = rows.map(row => ({
                ...row,
                portfolio_items: row.portfolio_item_title ? { title: row.portfolio_item_title } : null
            }));

            res.status(200).json(formattedRows);
        } catch (error) {
            console.error('DemoRequest list error:', error);
            res.status(200).json([]);
        }
    },

    // Admin: Update demo request status
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const query = `
                UPDATE demo_requests
                SET status = $1
                WHERE id = $2
                RETURNING *
            `;
            const { rows } = await db.query(query, [status, id]);
            res.status(200).json(rows[0]);
        } catch (error) {
            console.error('DemoRequest updateStatus error:', error);
            res.status(500).json({ error: 'Failed to update status' });
        }
    },
};
