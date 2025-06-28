import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authSchema } from '../schemas/auth';
import { comparePassword, hashPassword } from '../utils/hashPassword';
import { generateJwt } from '../utils/generateJwt';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  
  const { nombre, email, password } = req.body;
  
  const result = authSchema.safeParse({ nombre, email, password });
  if (!result.success) {
    console.log(password, nombre, email);
    return res.status(400).json({ mensaje: 'Datos invalidos' });
  }

  try {
    const isUser = await prisma.usuario.findUnique({ where: { correo: email } });

    if (isUser) {
      return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }

    const hashedPassword = await hashPassword(password);

    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, correo: email, contraseña: hashedPassword }
    });

    const payload = {
      id: nuevoUsuario.id,
      email: nuevoUsuario.correo,
    }

    const token = generateJwt(payload);

    return res.status(201).json({ 
      mensaje: 'Usuario registrado', 
      usuario: nuevoUsuario,
      token: token

    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { correo, contraseña } = req.body;

  const result = authSchema.safeParse({ nombre: '', correo, contraseña });
  if (!result.success) {
    return res.status(400).json({ mensaje: result.error.errors[0].message });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const isPasswordValid = await comparePassword(contraseña, usuario.contraseña);
    if (!isPasswordValid) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const payload = {
      id: usuario.id,
      email: usuario.correo,
    }

    const token = generateJwt(payload);

    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
