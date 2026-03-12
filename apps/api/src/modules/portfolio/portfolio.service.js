import { portfolioRepository } from './portfolio.repository.js';

export const portfolioService = {
    async getAllPortfolioItems(type) {
        return await portfolioRepository.findAll(type);
    },

    async getPortfolioItemById(id) {
        const item = await portfolioRepository.findById(id);
        if (!item) {
            throw new Error('Portfolio item not found');
        }
        return item;
    },

    async createPortfolioItem(data) {
        return await portfolioRepository.create(data);
    },

    async updatePortfolioItem(id, data) {
        const existingItem = await portfolioRepository.findById(id);
        if (!existingItem) {
            throw new Error('Portfolio item not found');
        }
        return await portfolioRepository.update(id, data);
    },

    async deletePortfolioItem(id) {
        const existingItem = await portfolioRepository.findById(id);
        if (!existingItem) {
            throw new Error('Portfolio item not found');
        }
        return await portfolioRepository.delete(id);
    },
};
