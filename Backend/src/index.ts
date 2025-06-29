import express from 'express';
import authRouter from './router/auth_router';
import tareaRouter from './router/tarea_router';
import categoriaRouter from './router/categoria_router';
import cors from 'cors';
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
];

// TODO: cambiar rutas de producción

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

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
