import { db } from '../../config/db.js';

export const demoRequestsRepository = {
    async create(data) {
        const {
            name,
            email,
            phone,
            company_name,
            interested_in,
            preferred_demo_date,
            message,
        } = data;

        // Validate interested_in is a UUID or null
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const safeInterestedIn = interested_in && uuidRegex.test(interested_in) ? interested_in : null;

        const [request] = await db('demo_requests')
            .insert({
                name,
                email,
                phone: phone || null,
                company_name: company_name || null,
                interested_in: safeInterestedIn,
                preferred_demo_date: preferred_demo_date || null,
                message,
            })
            .returning('*');
        return request;
    },

    async findAll() {
        const rows = await db('demo_requests as dr')
            .select('dr.*', 'pi.title as portfolio_item_title')
            .leftJoin('portfolio_items as pi', 'dr.interested_in', 'pi.id')
            .orderBy('dr.created_at', 'desc');

        return rows.map(row => ({
            ...row,
            portfolio_items: row.portfolio_item_title ? { title: row.portfolio_item_title } : null
        }));
    },

    async findById(id) {
        const row = await db('demo_requests as dr')
            .select('dr.*', 'pi.title as portfolio_item_title')
            .leftJoin('portfolio_items as pi', 'dr.interested_in', 'pi.id')
            .where('dr.id', id)
            .first();

        if (!row) return null;
        return {
            ...row,
            portfolio_items: row.portfolio_item_title ? { title: row.portfolio_item_title } : null
        };
    },

    async update(id, data) {
        const [updatedRequest] = await db('demo_requests')
            .where({ id })
            .update(data)
            .returning('*');
        return updatedRequest;
    },

    async delete(id) {
        await db('demo_requests').where({ id }).delete();
        return true;
    },
};
