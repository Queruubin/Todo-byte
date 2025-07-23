import { Router } from "express";
import {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea,
  obtenerHistorialTarea,
  getTareasByCategory,
} from "../handlers/tarea_handler";

const router = Router();

// Obtener una tarea específica por su categoría y usuario
router.get("/:id", getTareasByCategory as any);
// Crear una tarea
router.post("/", crearTarea as any);

// Obtener todas las tareas de un usuario
router.get("/tareas/:id", obtenerTareas);


// Actualizar una tarea por su ID
router.put("/:id", actualizarTarea as any);

// Eliminar una tarea por su ID
router.delete("/tarea/:id", eliminarTarea);

// ✅ Nueva ruta para obtener historial de una tarea
router.get("/tarea/:id/historial", obtenerHistorialTarea);

export default router;
