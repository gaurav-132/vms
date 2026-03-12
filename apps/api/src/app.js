import cors from 'cors';
import express from 'express';
import { portfolioRoutes } from './modules/portfolio/portfolio.routes.js';
import { demoRequestsRoutes } from './modules/demoRequests/demoRequests.routes.js';

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // Register API Routes
    app.use('/api/portfolio', portfolioRoutes);
    app.use('/api/demo-requests', demoRequestsRoutes);

    return app;
}
