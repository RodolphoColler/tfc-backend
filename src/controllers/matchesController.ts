/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';
import service from '../services/matchesService';

export default class Match {
  static async getAll(req: Request, res: Response) {
    const inProgress = req.query.inProgress as unknown as string | undefined;

    const { error, code, result } = await service.getAll({ inProgress });

    if (error) return res.status(code).json({ message: error });

    return res.status(200).json(result);
  }

  static async create(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const { error, code, result } = await service.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

    if (error) return res.status(code).json({ message: error });

    return res.status(201).json(result);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const { error, code } = await service.finishMatch({ id });

    if (error) return res.status(code).json({ message: error });

    return res.status(200).end();
  }

  static async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { error, code } = await service.updateMatchGoals({ homeTeamGoals, awayTeamGoals }, id);

    if (error) return res.status(code).json({ message: error });

    return res.status(200).end();
  }
}
