import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Registra un evento en el historial de tareas
 */
export async function registrarEventoHistorial({
  tareaId,
  usuarioId,
  tipoEvento,
  campo,
  valorAnterior,
  valorNuevo,
}: {
  tareaId: string;
  usuarioId: string;
  tipoEvento: string;
  campo?: string;
  valorAnterior?: string | null;
  valorNuevo?: string | null;
}) {
  await prisma.historialTarea.create({
    data: {
      tareaId,
      usuarioId,
      tipoEvento,
      campo,
      valorAnterior,
      valorNuevo,
    },
  });
}

/**
 * Obtiene el historial de cambios de una tarea
 */
export async function obtenerHistorialPorTarea(tareaId: string) {
  return await prisma.historialTarea.findMany({
    where: {
      tareaId,
    },
    orderBy: {
      fecha: "desc",
    },
    include: {
      usuario: true,
    },
  });
}
