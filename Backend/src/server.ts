import express from 'express';
import authRouter from './router/auth_router';

const app = express();
app.use(express.json());

// rutas
app.use('/auth', authRouter);

export default app;
