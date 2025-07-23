import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { registrarEventoHistorial, obtenerHistorialPorTarea } from "./historial_handler";
import { schemaTask } from "../schemas/task";
import { Task } from "../types";

const prisma = new PrismaClient();

// Crear tarea
export const crearTarea = async (
  req: Request<unknown, unknown, Task>,
  res: Response
) => {
  const {
    titulo,
    descripcion,
    fechaLimite,
    dificultad,
    prioridad,
    categoriaId,
  } = req.body;

  const usuarioId = req.user.id;


  const parseResult = schemaTask.safeParse(req.body);
  console.log(parseResult.error);
  
  if (!parseResult.success) {
    return res.status(400).json({
      mensaje: "Datos inválidos",
    });
  }


  try {
    const data: Task = {
      titulo,
      descripcion,
      fechaLimite,
      usuarioId,
      prioridad,
      categoriaId,
      dificultad,
      completada: false,
    };

    const nuevaTarea = await prisma.tarea.create({ data });

    // Registrar evento en historial
    /* await registrarEventoHistorial({
      tareaId: nuevaTarea.id,
      usuarioId,
      tipoEvento: "CREACION",
    }); */
    
    return res
      .status(201)
      .json({ mensaje: "Tarea creada", tarea: nuevaTarea });
  } catch (error: any) {
    console.error("ERROR:", error);
    return res.status(500).json({ mensaje: "Error al crear la tarea" });
  }
};

// Obtener todas las tareas de un usuario
export const obtenerTareas = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;
  try {
    const tareas = await prisma.tarea.findMany({
      where: { usuarioId },
      include: { categoria: true, subtareas: true },
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// Obtener una tarea por ID
export const getTareasByCategory = async (req: Request, res: Response) => {
  const id = req.params.id?.toString();
  if (!id) {
    return res.status(400).json({ error: "ID de tarea o usuario no proporcionado" });
  }
  id.toString()
  try {
    const tarea = await prisma.tarea.findMany({
      where: { categoriaId: id },
      include: { subtareas: true },
      orderBy: {
        completada: "asc", // Ordenar por estado de completado
      }
    });
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
};

export const obtenerTareasPorCategoria = async (req: Request, res: Response) => {
  const { categoriaId } = req.params;
  try {
    const tareas = await prisma.tarea.findMany({
      where: { categoriaId },
      include: { subtareas: true },
      orderBy: {
        completada: "asc", // Ordenar por estado de completado
      }
    });
    console.log(tareas);
    
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas por categoría" });
  }
}

// Actualizar una tarea
export const actualizarTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const usuarioId = req.user.id;

  try {
    // Obtener la tarea actual para comparar
    const tareaActual = await prisma.tarea.findUnique({
      where: { id },
    });

    if (!tareaActual) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const tareaActualizada = await prisma.tarea.update({
      where: { id },
      data,
    });

    res.json(tareaActualizada);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
export const eliminarTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.tarea.delete({ where: { id } });
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};

// Obtener historial de una tarea
export const obtenerHistorialTarea = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const historial = await obtenerHistorialPorTarea(id);
    res.json(historial);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ error: "Error al obtener historial" });
  }
};
