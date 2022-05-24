import { Request, Response } from 'express';
import Service from '../services/leaderboardService';

export default async function getAll(_req: Request, res: Response) {
  const { code, result } = await Service.getAll();

  return res.status(code).json(result);
}

export async function getHome(_req: Request, res: Response) {
  const { code, result } = await Service.getHome();

  return res.status(code).json(result);
}

export async function getAway(_req: Request, res: Response) {
  const { code, result } = await Service.getAway();

  return res.status(code).json(result);
}
