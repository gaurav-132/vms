import { db } from '../../config/db.js';

export const portfolioRepository = {
    async findAll(type) {
        const query = db('portfolio_items');
        if (type) {
            query.where({ type });
        }
        return await query.orderBy('created_at', 'desc');
    },

    async findById(id) {
        return await db('portfolio_items').where({ id }).first();
    },

    async create(data) {
        const { title, description, type, features, icon_name } = data;
        const [newItem] = await db('portfolio_items')
            .insert({
                title,
                description,
                type,
                features: features || [],
                icon_name
            })
            .returning('*');
        return newItem;
    },

    async update(id, data) {
        const [updatedItem] = await db('portfolio_items')
            .where({ id })
            .update({
                ...data,
                features: data.features || []
            })
            .returning('*');
        return updatedItem;
    },

    async delete(id) {
        await db('portfolio_items').where({ id }).delete();
        return true;
    },
};
