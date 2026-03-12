import cors from 'cors';
import express from 'express';
import { portfolioRoutes } from './modules/portfolio/portfolio.routes.js';
import { demoRequestsRoutes } from './modules/demoRequests/demoRequests.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes.js';

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // Register API Routes
    app.use('/api/portfolio', portfolioRoutes);
    app.use('/api/demo-requests', demoRequestsRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/dashboard', dashboardRoutes);

    return app;
}
