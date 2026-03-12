import { portfolioService } from './portfolio.service.js';

export const portfolioController = {
    // Public: Get all portfolio items, optionally filter by type
    list: async (req, res) => {
        try {
            const { type } = req.query;
            const items = await portfolioService.getAllPortfolioItems(type);
            res.status(200).json(items);
        } catch (error) {
            console.error('Portfolio list error:', error);
            res.status(200).json([]);
        }
    },

    // Public: Get single portfolio item
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await portfolioService.getPortfolioItemById(id);
            res.status(200).json(item);
        } catch (error) {
            console.error('Portfolio getById error:', error);
            res.status(404).json({ error: error.message });
        }
    },

    // Admin: Create new portfolio item
    create: async (req, res) => {
        try {
            const item = await portfolioService.createPortfolioItem(req.body);
            res.status(201).json(item);
        } catch (error) {
            console.error('Portfolio create error:', error);
            res.status(500).json({ error: 'Failed to create portfolio item' });
        }
    },

    // Admin: Update portfolio item
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await portfolioService.updatePortfolioItem(id, req.body);
            res.status(200).json(item);
        } catch (error) {
            console.error('Portfolio update error:', error);
            res.status(500).json({ error: 'Failed to update portfolio item' });
        }
    },

    // Admin: Delete portfolio item
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await portfolioService.deletePortfolioItem(id);
            res.status(204).send();
        } catch (error) {
            console.error('Portfolio delete error:', error);
            res.status(500).json({ error: 'Failed to delete portfolio item' });
        }
    },
};
