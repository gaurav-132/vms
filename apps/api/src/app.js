import cors from 'cors';
import express from 'express';

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.get('/v1/visitors', visitorModule.controller.list);
    // app.post('/v1/visitors', visitorModule.controller.register);

    // app.use(visitorModule.controller.errorHandler);

    return app;
}
