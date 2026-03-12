import { demoRequestsRepository } from './demoRequests.repository.js';

export const demoRequestsService = {
    async createDemoRequest(data) {
        return await demoRequestsRepository.create(data);
    },

    async getAllDemoRequests() {
        return await demoRequestsRepository.findAll();
    },

    async getDemoRequestById(id) {
        const request = await demoRequestsRepository.findById(id);
        if (!request) {
            throw new Error('Demo request not found');
        }
        return request;
    },

    async updateDemoRequest(id, data) {
        const existingRequest = await demoRequestsRepository.findById(id);
        if (!existingRequest) {
            throw new Error('Demo request not found');
        }
        return await demoRequestsRepository.update(id, data);
    },

    async updateDemoRequestStatus(id, status) {
        const existingRequest = await demoRequestsRepository.findById(id);
        if (!existingRequest) {
            throw new Error('Demo request not found');
        }
        return await demoRequestsRepository.update(id, { status });
    },

    async deleteDemoRequest(id) {
        const existingRequest = await demoRequestsRepository.findById(id);
        if (!existingRequest) {
            throw new Error('Demo request not found');
        }
        return await demoRequestsRepository.delete(id);
    },
};
