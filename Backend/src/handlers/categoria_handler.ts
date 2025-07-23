import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CrearCategoriaBody = {
  nombre: string;
  id : string;
};

export const crearCategoria = async (req: Request<CrearCategoriaBody>, res: Response) => {
  const { nombre, id } = req.body;
  console.log('nombre',nombre)
  if (!nombre || !id) {
    return res.status(400).json({ mensaje: 'Nombre y id son obligatorios' });
  }

  try {
    const nuevaCategoria = await prisma.categoria.create({
      data: {
        nombre,
        usuario: { connect: { id } }
      }
    });
    console.log(nuevaCategoria);
    
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};


export const obtenerCategorias = async (req: Request, res: Response) => {
  const id = req.query.id?.toString();
  if (!id) {
    return res.status(400).json({ mensaje: 'El id del usuario es obligatorio' });
  }
  try {
    const categorias = await prisma.categoria.findMany({
      where: {
        usuarioId: id,
      },
      select: {
        id: true,
        nombre: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
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
