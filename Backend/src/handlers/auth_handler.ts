import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, correo, contraseña } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const yaExiste = await prisma.usuario.findUnique({ where: { correo } });

    if (yaExiste) {
      return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }

    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, correo, contraseña },
    });

    return res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
