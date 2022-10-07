import { Request, Response } from 'express';
import Service from '../services/leaderboardService';

export default class Leaderboard {
  static async getAll(_req: Request, res: Response) {
    const { code, result } = await Service.getAll();
  
    return res.status(code).json(result);
  }

  static async getHome(_req: Request, res: Response) {
    const { code, result } = await Service.getHome();
  
    return res.status(code).json(result);
  }

  static async getAway(_req: Request, res: Response) {
    const { code, result } = await Service.getAway();
  
    return res.status(code).json(result);
  }
}