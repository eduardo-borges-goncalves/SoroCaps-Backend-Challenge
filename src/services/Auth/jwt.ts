import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const createToken = (id: number) => {
  return process.env.APP_SECRET && jwt.sign(
    { userId: id },
    process.env.APP_SECRET,
    { expiresIn: '1h' }
  );
}

export const verifyToken = (token: string) => {
  const decoded =
    process.env.APP_SECRET && jwt.verify(token, process.env.APP_SECRET);
  return decoded;
}
