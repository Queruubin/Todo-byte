import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerEstadisticas = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.query;

    if (!usuarioId) {
      return res.status(400).json({ error: "Se requiere usuarioId" });
    }

    // Cantidad de tareas completadas
    const completadas = await prisma.tarea.count({
      where: {
        usuarioId: usuarioId as string,
        completada: true,
      },
    });

    // Cantidad de tareas pendientes
    const pendientes = await prisma.tarea.count({
      where: {
        usuarioId: usuarioId as string,
        completada: false,
      },
    });

    // Tareas por prioridad
    const prioridades = await prisma.tarea.groupBy({
      by: ["prioridad"],
      _count: {
        prioridad: true,
      },
      where: {
        usuarioId: usuarioId as string,
      },
    });

    // Tareas vencidas
    const vencidas = await prisma.tarea.count({
      where: {
        usuarioId: usuarioId as string,
        completada: false,
        fechaLimite: {
          lt: new Date(),
        },
      },
    });

    res.json({
      completadas,
      pendientes,
      vencidas,
      prioridades,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener estadísticas",
    });
  }
};
