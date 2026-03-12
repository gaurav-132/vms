import { demoRequestsService } from './demoRequests.service.js';

export const demoRequestsController = {
    // Public: Create a new demo request
    create: async (req, res) => {
        try {
            const request = await demoRequestsService.createDemoRequest(req.body);
            res.status(201).json(request);
        } catch (error) {
            console.error('DemoRequest create error:', error);
            res.status(500).json({ error: 'Failed to submit demo request' });
        }
    },

    // Admin: List all demo requests
    list: async (req, res) => {
        try {
            const requests = await demoRequestsService.getAllDemoRequests();
            res.status(200).json(requests);
        } catch (error) {
            console.error('DemoRequest list error:', error);
            res.status(200).json([]);
        }
    },

    // Admin: Get single demo request
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const request = await demoRequestsService.getDemoRequestById(id);
            res.status(200).json(request);
        } catch (error) {
            console.error('DemoRequest getById error:', error);
            res.status(404).json({ error: error.message });
        }
    },

    // Admin: Update demo request
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const request = await demoRequestsService.updateDemoRequest(id, req.body);
            res.status(200).json(request);
        } catch (error) {
            console.error('DemoRequest update error:', error);
            res.status(500).json({ error: 'Failed to update demo request' });
        }
    },

    // Admin: Update demo request status
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const request = await demoRequestsService.updateDemoRequestStatus(id, status);
            res.status(200).json(request);
        } catch (error) {
            console.error('DemoRequest updateStatus error:', error);
            res.status(500).json({ error: 'Failed to update status' });
        }
    },

    // Admin: Delete demo request
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await demoRequestsService.deleteDemoRequest(id);
            res.status(204).send();
        } catch (error) {
            console.error('DemoRequest delete error:', error);
            res.status(500).json({ error: 'Failed to delete demo request' });
        }
    },
};
