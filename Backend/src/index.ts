import express from 'express';
import authRouter from './router/auth_router';
import tareaRouter from './router/tarea_router';
import categoriaRouter from './router/categoria_router';
import cors from 'cors';
const app = express();

app.use(cors())

app.use(express.json());


// Rutas
app.use('/auth', authRouter);
app.use(tareaRouter);
app.use(categoriaRouter)

// Puerto y ejecución
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
