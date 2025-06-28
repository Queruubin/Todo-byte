import { Router } from "express";
import {
  crearTarea,
  obtenerTareas,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
  obtenerHistorialTarea,
} from "../handlers/tarea_handler";

const router = Router();

// Crear una tarea
router.post("/tareas", crearTarea as any);

// Obtener todas las tareas de un usuario
router.get("/tareas/:id", obtenerTareas);

// Obtener una tarea específica por su ID
router.get("/tarea/:id", obtenerTareaPorId as any);

// Actualizar una tarea por su ID
router.put("/tarea/:id", actualizarTarea as any);

// Eliminar una tarea por su ID
router.delete("/tarea/:id", eliminarTarea);

// ✅ Nueva ruta para obtener historial de una tarea
router.get("/tarea/:id/historial", obtenerHistorialTarea);

export default router;
