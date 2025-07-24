import express from 'express';
import authRouter from './router/auth_router';
import tareaRouter from './router/tarea_router';
import categoriaRouter from './router/categoria_router';
import cors from 'cors';
import { checkJwt } from './middlewares/jwt.middleware';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();
export const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://friendly-rolypoly-5f8dc5.netlify.app',
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/auth', authRouter);
app.use(checkJwt as any);

// Rutas
app.use('/tasks', tareaRouter);
app.use(categoriaRouter)

// Puerto y ejecución
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
