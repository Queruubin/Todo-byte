import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

  if (!titulo || !descripcion || !fechaLimite || !prioridad || !usuarioId) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  const partes = fechaLimite.split("/");
  if (partes.length !== 3) {
    return res
      .status(400)
      .json({ mensaje: "Formato de fecha inválido. Usa dd/mm/yyyy" });
  }

  const [dia, mes, año] = partes;
  const fechaConvertida = new Date(`${año}-${mes}-${dia}`);
  console.log("Fecha convertida:", fechaConvertida);

  if (isNaN(fechaConvertida.getTime())) {
    return res.status(400).json({ mensaje: "La fecha no es válida" });
  }

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
      },
    });

    return res.status(201).json({ mensaje: "Tarea creada", tarea: nuevaTarea });
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

// Actualizar una tarea
export const actualizarTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  let data = req.body;

  try {
  
    if (data.fechaLimite) {
      const [year, month, day] = data.fechaLimite.split("/");
      data.fechaLimite = new Date(`${year}-${month}-${day}`);
    }

    const tarea = await prisma.tarea.update({
      where: { id },
      data,
    });

    res.json(tarea);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
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
