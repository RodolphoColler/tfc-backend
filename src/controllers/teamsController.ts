import { Request, Response } from 'express';
import service from '../services/teamsService';

export default class Team {
  static async getAll(_req: Request, res: Response) {
    const { error, code, result } = await service.getAll();

    if (error) return res.status(code).json({ message: error });

    return res.status(200).json(result);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const { error, code, result } = await service.getById({ id });

    if (error) return res.status(code).json({ message: error });

    return res.status(200).json(result);
  }
}
