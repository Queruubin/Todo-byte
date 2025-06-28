import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CrearCategoriaBody = {
  nombre: string;
  usuarioId : string;
};

export const crearCategoria = async (req: Request<CrearCategoriaBody>, res: Response) => {
  const { nombre, usuarioId } = req.body;
  console.log('nombre',nombre)
  if (!nombre || !usuarioId) {
    return res.status(400).json({ mensaje: 'Nombre y usuarioId son obligatorios' });
  }

  try {
    const nuevaCategoria = await prisma.categoria.create({
      data: {
        nombre,
        usuario: { connect: { id: usuarioId } }
      }
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};


export const obtenerCategorias = async (_req: Request, res: Response) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

export const actualizarCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const categoria = await prisma.categoria.update({
      where: { id },
      data: { nombre },
    });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export const eliminarCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.categoria.delete({ where: { id } });

    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};
