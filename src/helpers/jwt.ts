import fs from 'fs';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/userInterface';

const jwtConfig = { expiresIn: '30d' };

const jwtSecret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

export default function jwtToken(data: IUser) {
  return jwt.sign(data, jwtSecret, jwtConfig);
}

export function jwtDecode(token: string) {
  return jwt.verify(token, jwtSecret) as IUser;
}
