/* eslint-disable no-param-reassign */
import { IMatch, ILeaderboard, Filter } from '../interfaces/leaderboardInterface';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

async function getMatches() {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { inProgress: false },
  });
  return matches;
}

async function getLeaderboard() {
  const teams = await Teams.findAll({ attributes: { exclude: ['id'] } });

  const initialLeaderboard = teams.map(({ teamName }) => ({
    name: teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  }));
  return initialLeaderboard;
}

function simpleBoardUpdate(board: ILeaderboard) {
  board.totalGames += 1;
  board.goalsBalance = board.goalsFavor - board.goalsOwn;
  board.efficiency = Number(((board.totalPoints / (board.totalGames * 3)) * 100).toFixed(2));
}

function updateWinnerBoard(winner: ILeaderboard, winnerGoals: number, loserGoals: number) {
  winner.totalPoints += 3;
  winner.totalVictories += 1;
  winner.goalsFavor += winnerGoals;
  winner.goalsOwn += loserGoals;
}

function updateLoserBoard(loser: ILeaderboard, winnerGoals: number, loserGoals: number) {
  loser.totalLosses += 1;
  loser.goalsFavor += loserGoals;
  loser.goalsOwn += winnerGoals;
}

function updateDrawBoard(board: ILeaderboard, firstTeamGoals: number, secondTeamGoals: number) {
  board.totalPoints += 1;
  board.totalDraws += 1;
  board.goalsFavor += firstTeamGoals;
  board.goalsOwn += secondTeamGoals;
}

function separatorHome(leaderboard: ILeaderboard[], matchScore: IMatch) {
  const { homeTeamGoals, awayTeamGoals, homeTeam } = matchScore;
  const homeTeamBoard = leaderboard[leaderboard.findIndex(({ name }) => homeTeam === name)];

  if (homeTeamGoals > awayTeamGoals) updateWinnerBoard(homeTeamBoard, homeTeamGoals, awayTeamGoals);
  if (homeTeamGoals < awayTeamGoals) updateLoserBoard(homeTeamBoard, awayTeamGoals, homeTeamGoals);
  if (homeTeamGoals === awayTeamGoals) updateDrawBoard(homeTeamBoard, homeTeamGoals, awayTeamGoals);
  simpleBoardUpdate(homeTeamBoard);
}

function separatorAway(leaderboard: ILeaderboard[], matchScore: IMatch) {
  const { homeTeamGoals, awayTeamGoals, awayTeam } = matchScore;
  const awayTeamBoard = leaderboard[leaderboard.findIndex(({ name }) => awayTeam === name)];

  if (awayTeamGoals > homeTeamGoals) updateWinnerBoard(awayTeamBoard, awayTeamGoals, homeTeamGoals);
  if (awayTeamGoals < homeTeamGoals) updateLoserBoard(awayTeamBoard, homeTeamGoals, awayTeamGoals);
  if (awayTeamGoals === homeTeamGoals) updateDrawBoard(awayTeamBoard, homeTeamGoals, awayTeamGoals);
  simpleBoardUpdate(awayTeamBoard);
}

function sortLeaderboard(leaderboard: ILeaderboard[]) {
  return leaderboard.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalPoints === a.totalPoints) return b.goalsBalance - a.goalsBalance;
    if (b.goalsBalance === a.goalsBalance) return b.goalsFavor - a.goalsFavor;
    return b.goalsOwn - a.goalsOwn;
  });
}

const incrementLeaderboard = {
  home(leaderboard: ILeaderboard[], match: IMatch) { separatorHome(leaderboard, match); },
  away(leaderboard: ILeaderboard[], matches: IMatch) { separatorAway(leaderboard, matches); },
  all(leaderboard: ILeaderboard[], matches: IMatch) {
    separatorAway(leaderboard, matches);
    separatorHome(leaderboard, matches);
  },
};

async function separator(filter: Filter) {
  try {
    const matches = await getMatches();
    const leaderboard = await getLeaderboard();

    matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome, teamAway }) => {
      const matchScore = {
        homeTeamGoals,
        awayTeamGoals,
        homeTeam: teamHome?.teamName,
        awayTeam: teamAway?.teamName,
      };

      incrementLeaderboard[filter](leaderboard, matchScore);
    });
    const sortedLeaderboard = sortLeaderboard(leaderboard);

    return { code: 200, result: sortedLeaderboard };
  } catch (error) {
    return { code: 500, error: 'Something not happened well getting leaderboard' };
  }
}

export default class Leaderboard {
  static async getAll() {
    const filter = 'all';

    const { error, code, result } = await separator(filter);

    if (error) return { code, error };

    return { code, result };
  }

  static async getHome() {
    const filter = 'home';

    const { error, code, result } = await separator(filter);

    if (error) return { code, error };

    return { code, result };
  }

  static async getAway() {
    const filter = 'away';

    const { error, code, result } = await separator(filter);

    if (error) return { code, error };

    return { code, result };
  }
}
