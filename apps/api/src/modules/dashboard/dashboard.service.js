import { dashboardRepository } from './dashboard.repository.js';

export const dashboardService = {
    async getDashboardStats() {
        const [totalUsers, demoStats, activePortfolio, recentRequests] = await Promise.all([
            dashboardRepository.getTotalUsers(),
            dashboardRepository.getDemoRequestsStats(),
            dashboardRepository.getPortfolioStats(),
            dashboardRepository.getRecentDemoRequests(5)
        ]);

        return {
            totalUsers,
            totalDemoRequests: demoStats.total,
            newDemoRequests: demoStats.newReqs,
            activePortfolioItems: activePortfolio,
            recentRequests
        };
    }
};
