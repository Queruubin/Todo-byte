import express from 'express';
import authRouter from './router/auth_router';
import tareaRouter from './router/tarea_router';
import categoriaRouter from './router/categoria_router';

const app = express();


app.use(express.json());

// Rutas
app.use(authRouter);
app.use(tareaRouter);
app.use(categoriaRouter)

// Puerto y ejecución
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
