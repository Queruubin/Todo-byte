import express from 'express';
import authRouter from './router/auth_router';
import categoriaRouter from './router/categoria_router';
import estadisticasRouter from './router/estadistica_router';

const app = express();
app.use(express.json());

// rutas
app.use('/auth', authRouter);

app.use("/categorias", categoriaRouter);

app.use('/estadisticas', estadisticasRouter);

export default app;
