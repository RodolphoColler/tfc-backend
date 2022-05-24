export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface IMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
  homeTeam: string | undefined,
  awayTeam: string | undefined,
}

export type Filter = 'all' | 'home' | 'away';
