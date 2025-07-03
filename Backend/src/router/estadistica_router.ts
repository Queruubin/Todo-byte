import { Router } from "express";
import { obtenerEstadisticas } from "../handlers/estadistica_handler";

const estadisticasRouter = Router();

estadisticasRouter.get("/", obtenerEstadisticas as any);

export default estadisticasRouter;
