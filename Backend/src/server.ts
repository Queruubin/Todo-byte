import express from 'express';
import authRouter from './router/auth_router';
import categoriaRouter from './router/categoria_router';

const app = express();
app.use(express.json());

// rutas
app.use('/auth', authRouter);

app.use("/categorias", categoriaRouter);

export default app;
