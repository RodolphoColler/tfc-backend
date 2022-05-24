import Teams from '../database/models/teams';

export default class Team {
  static async getAll() {
    try {
      const teams = await Teams.findAll();

      return { code: 200, result: teams };
    } catch (error) {
      return { code: 500, error: 'Something not happened well finding the team' };
    }
  }

  static async getById({ id }: { id: string }) {
    try {
      const team = await Teams.findByPk(id);

      return { code: 200, result: team };
    } catch (error) {
      return { code: 500, error: 'Something not happened well finding the team' };
    }
  }
}
