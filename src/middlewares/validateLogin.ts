import { Request, Response, NextFunction } from 'express';
import loginSchema from '../schemas/loginSchema';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  return next();
};
