import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { registrarEventoHistorial, obtenerHistorialPorTarea } from "./historial_handler";
import { schemaTask } from "../schemas/task";

const prisma = new PrismaClient();

type CrearTareaBody = {
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  prioridad: string;
  id: string;
  categoriaId?: string;
  tareaPadreId?: string;
};

// Crear tarea
export const crearTarea = async (
  req: Request<unknown, unknown, CrearTareaBody>,
  res: Response
) => {
  const {
    titulo,
    descripcion,
    fechaLimite,
    prioridad,
    id,
    categoriaId,
    tareaPadreId,
  } = req.body;

  console.log("BODY RECIBIDO:", req.body);

  const usuarioId = id;


  const parseResult = schemaTask.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      mensaje: "Datos inválidos",
    });
  }

  const fechaActual = new Date(fechaLimite);

  const opcionesFecha: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  const fechaConvertida = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(fechaActual);

  console.log("Fecha convertida:", fechaConvertida);

  try {
    const nuevaTarea = await prisma.tarea.create({
      data: {
        titulo,
        descripcion,
        fechaLimite: fechaConvertida,
        prioridad,
        usuario: {
          connect: { id: usuarioId },
        },
        categoria: categoriaId
          ? {
              connect: { id: categoriaId },
            }
          : undefined,
        tareaPadre: tareaPadreId
          ? {
              connect: { id: tareaPadreId },
            }
          : undefined,
      },
    });

    // Registrar evento en historial
    await registrarEventoHistorial({
      tareaId: nuevaTarea.id,
      usuarioId,
      tipoEvento: "CREACION",
    });

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
      include: { etiquetas: true, categoria: true, subtareas: true },
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// Obtener una tarea por ID
export const obtenerTareaPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tarea = await prisma.tarea.findUnique({
      where: { id },
      include: { etiquetas: true, categoria: true, subtareas: true },
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
      include: { etiquetas: true, categoria: true, subtareas: true },
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas por categoría" });
  }
}

// Actualizar una tarea
export const actualizarTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const usuarioId = req.body.id; // ID del usuario que hace la modificación

  try {
    // Obtener la tarea actual para comparar
    const tareaActual = await prisma.tarea.findUnique({
      where: { id },
    });

    if (!tareaActual) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Parsear fecha si viene en el body
    if (data.fechaLimite) {
      const [year, month, day] = data.fechaLimite.split("/");
      data.fechaLimite = new Date(`${year}-${month}-${day}`);
    }

    // Detectar cambios campo por campo
    const tareaActualObj = tareaActual as any;
    const cambios = [];

    for (const key in data) {
      if (data[key] != null && data[key] != tareaActualObj[key]) {
        cambios.push({
          campo: key,
          valorAnterior:
            tareaActualObj[key] != null
              ? String(tareaActualObj[key])
              : null,
          valorNuevo: data[key] != null ? String(data[key]) : null,
        });
      }
    }

    // Registrar cambios en historial
    for (const cambio of cambios) {
      await registrarEventoHistorial({
        tareaId: id,
        usuarioId,
        tipoEvento: "EDICION",
        campo: cambio.campo,
        valorAnterior: cambio.valorAnterior,
        valorNuevo: cambio.valorNuevo,
      });
    }

    // Registrar finalización si aplica
    if (
      data.completada === true &&
      tareaActualObj.completada === false
    ) {
      await registrarEventoHistorial({
        tareaId: id,
        usuarioId,
        tipoEvento: "FINALIZACION",
      });
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
