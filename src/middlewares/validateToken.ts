import { NextFunction, Response } from 'express';
import { jwtDecode } from '../helpers/jwt';
import IRequestPayload from '../interfaces/requestInterface';

export default async (req: IRequestPayload, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(400).json({ message: 'Your request must have a token' });

  try {
    req.tokenPayload = jwtDecode(authorization);

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Your token is invalid' });
  }
};
