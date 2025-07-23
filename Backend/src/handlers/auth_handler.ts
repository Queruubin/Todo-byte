import { CookieOptions, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthSchema, authSchema, loginSchema } from '../schemas/auth';
import { comparePassword, hashPassword } from '../utils/hashPassword';
import { generateJwt } from '../utils/generateJwt';

const prisma = new PrismaClient();

const options = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 24 * 60 * 60 * 1000
};

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

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);

    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, correo: email, contraseña: hashedPassword }
    });

    const payload = {
      id: nuevoUsuario.id,
      email: nuevoUsuario.correo,
      nombre: nuevoUsuario.nombre,
    }

    const token = generateJwt(payload);
    res.cookie('token', token, options as CookieOptions)

    const { contraseña, ...usuarioSinContraseña } = nuevoUsuario;


    return res.status(201).json({ 
      mensaje: 'Usuario registrado', 
      usuario: usuarioSinContraseña
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    console.log('Contraseña incorrecta');
    return res.status(400).json({ mensaje: result.error.errors[0].message });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { correo: email } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const isPasswordValid = await comparePassword(password, usuario.contraseña);
    if (!isPasswordValid) {
      
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const payload = {
      id: usuario.id,
      email: usuario.correo,
      nombre: usuario.nombre,
    }

    const token = generateJwt(payload);

    res.cookie('token', token, options as CookieOptions)

    const { contraseña, ...usuarioSinContraseña } = usuario;


    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: usuarioSinContraseña,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

export const logout = (_: Request, res: Response) => {
  res.clearCookie('token', options as CookieOptions);
  return res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
}

export const isLoggedIn = (req: Request, res: Response) => {
  console.log(req.body);
  
  if (!req.body) {
    return res.status(200).json({ mensaje: 'Not auth' });
  }
  return res.status(200).json({ mensaje: 'Is auth', usuario: req.user });
}
  