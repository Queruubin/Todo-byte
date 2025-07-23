import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        nombre: string;
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string || 'default_secret_key';

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token || req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado: Token no encontrado.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as 
    { id: string; email: string; nombre: string; iat: number; exp: number };

    req.user = {
      id: decoded.id,
      email: decoded.email,
      nombre: decoded.nombre
    };

    next();
  } catch (error) {
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Acceso denegado: Token expirado.', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ message: 'Acceso denegado: Token inválido.', code: 'TOKEN_INVALID' });
  }
}