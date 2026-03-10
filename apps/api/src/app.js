import cors from 'cors';
import express from 'express';
import { createHealthController } from './modules/health/health.controller.js';
import { createVisitorModule } from './modules/visitors/visitor.module.js';

export function createApp() {
    const app = express();
    const healthController = createHealthController();
    const visitorModule = createVisitorModule();

    app.use(cors());
    app.use(express.json());

    app.get('/v1/visitors', visitorModule.controller.list);
    app.post('/v1/visitors', visitorModule.controller.register);

    app.use(visitorModule.controller.errorHandler);

    return app;
}
