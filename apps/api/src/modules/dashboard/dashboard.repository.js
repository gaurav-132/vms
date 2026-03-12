import { db } from '../../config/db.js';

export const dashboardRepository = {
    async getTotalUsers() {
        const result = await db('users').count('* as count').first();
        return parseInt(result.count, 10);
    },

    async getDemoRequestsStats() {
        const [totalRes, newRes] = await Promise.all([
            db('demo_requests').count('* as count').first(),
            db('demo_requests').count('* as count').where({ status: 'New' }).first()
        ]);

        return {
            total: parseInt(totalRes.count, 10),
            newReqs: parseInt(newRes.count, 10)
        };
    },

    async getPortfolioStats() {
        const result = await db('portfolio_items')
            .count('* as count')
            .where({ is_active: true })
            .first();
        return parseInt(result.count, 10);
    },

    async getRecentDemoRequests(limit = 5) {
        return await db('demo_requests')
            .select('id', 'name', 'company_name', 'created_at', 'status')
            .orderBy('created_at', 'desc')
            .limit(limit);
    }
};
