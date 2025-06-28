interface JwtPayload {
  id: string;
  email: string;
}

export function generateJwt(payload: JwtPayload): string {
  const jwt = require('jsonwebtoken');
  const secretKey = process.env.JWT_SECRET || 'default_secret_key';
  const token = jwt.sign(
    payload,
    secretKey,
    { expiresIn: '1h' }
  );
  return token;
}