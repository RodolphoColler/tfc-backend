import { Request, Response } from 'express';
import service from '../services/loginService';
import IRequestPayload from '../interfaces/requestInterface';

export default class Login {
  static async getUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const { error, code, result } = await service.getUser({ email, password });

    if (error) return res.status(code).json({ message: error });

    return res.status(200).json(result);
  }

  static async getUserRole(req: IRequestPayload, res: Response) {
    const { tokenPayload } = req;

    if (!tokenPayload) return res.status(400).json({ message: 'token not authorized' });

    const { code, result } = service.getUserRole(tokenPayload);

    return res.status(code).json(result);
  }
}
