import { Op } from 'sequelize';
import IMatch from '../interfaces/matchesInterface';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export default class Match {
  static async getAll({ inProgress }: { inProgress: string | undefined }) {
    try {
      const matches = await Matches.findAll({
        include: [
          { model: Teams, as: 'teamHome' },
          { model: Teams, as: 'teamAway' },
        ],
        where: inProgress ? { inProgress: JSON.parse(String(inProgress)) } : {},
      });

      return { code: 200, result: matches };
    } catch (error) {
      return { code: 500, error: 'Something not good happens finding teams' };
    }
  }

  static async create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IMatch) {
    try {
      if (homeTeam === awayTeam) {
        return { code: 401, error: 'It is not possible to create a match with two equal teams' };
      }
      const teamExist = await Teams.findAll({ where: {
        [Op.or]: [{ id: homeTeam }, { id: awayTeam }],
      } });

      if (teamExist.length < 2) return { code: 404, error: 'There is no team with such id!' };

      const match = await Matches.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

      return { code: 200, result: match };
    } catch (error) {
      return { code: 500, error: 'Something not happened well searching matches' };
    }
  }

  static async finishMatch({ id }: { id: string }) {
    try {
      await Matches.update({ inProgress: false }, { where: { id } });

      return { code: 200 };
    } catch (error) {
      return { code: 500, error: 'Something not happened well finishing your match' };
    }
  }

  static async updateMatchGoals({ homeTeamGoals, awayTeamGoals }: IMatch, id: string) {
    try {
      await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

      return { code: 200 };
    } catch (error) {
      return { code: 500, error: 'Something not happened well changing the score' };
    }
  }
}
