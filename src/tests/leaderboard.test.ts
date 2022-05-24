import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from'chai-http';

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test leaderboard route', () => {
  const matchesMock = [
    {
      teamHome: { teamName: 'Avaí/Kindermann' },
      homeTeamGoals: 2,
      teamAway: { teamName: 'Bahia' },
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      teamHome: { teamName: 'Avaí/Kindermann' },
      homeTeamGoals: 1,
      teamAway: { teamName: 'Bahia' },
      awayTeamGoals: 2,
      inProgress: false,
    },
    {
      teamHome: { teamName: 'Avaí/Kindermann' } ,
      homeTeamGoals: 1,
      teamAway: { teamName: 'Bahia' },
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      teamHome: { teamName: 'Bahia' },
      homeTeamGoals: 1,
      teamAway: { teamName: 'Avaí/Kindermann' },
      awayTeamGoals: 2,
      inProgress: false,
    },
  ]

  const teamsMock = [
    {
      teamName: 'Avaí/Kindermann',
    },
    {
      teamName: 'Bahia',
    },
  ]

  before(() => {
    sinon.stub(Matches, "findAll").resolves(matchesMock as unknown as Matches[])
    sinon.stub(Teams, "findAll").resolves(teamsMock as Teams[])
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
    (Teams.findAll as sinon.SinonStub).restore();
  })


  it('test leaderboard route', async () => {
    const chaiHttpResponse: Response = await chai
    .request(app)
    .get('/leaderboard')
    
    const leaderboard = [
      {
        name: 'Avaí/Kindermann',
        totalPoints: 7,
        totalGames: 4,
        totalVictories: 2,
        totalDraws: 1,
        totalLosses: 1,
        goalsFavor: 6,
        goalsOwn: 5,
        goalsBalance: 1,
        efficiency: 58.33
      },
      {
        name: 'Bahia',
        totalPoints: 4,
        totalGames: 4,
        totalVictories: 1,
        totalDraws: 1,
        totalLosses: 2,
        goalsFavor: 5,
        goalsOwn: 6,
        goalsBalance: -1,
        efficiency: 33.33
      }
    ]

    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboard)
  })

  it('test leaderboard/home route', async () => {
    const chaiHttpResponse: Response = await chai
    .request(app)
    .get('/leaderboard/home')
    
    const leaderboard = [
      {
        name: 'Avaí/Kindermann',
        totalPoints: 4,
        totalGames: 3,
        totalVictories: 1,
        totalDraws: 1,
        totalLosses: 1,
        goalsFavor: 4,
        goalsOwn: 4,
        goalsBalance: 0,
        efficiency: 44.44
      },
      {
        name: 'Bahia',
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 1,
        goalsOwn: 2,
        goalsBalance: -1,
        efficiency: 0
      }
    ]

    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboard)
  })

  it('test leaderboard/away route', async () => {
    const chaiHttpResponse: Response = await chai
    .request(app)
    .get('/leaderboard/away')
    
    const leaderboard = [
      {
        name: 'Bahia',
        totalPoints: 4,
        totalGames: 3,
        totalVictories: 1,
        totalDraws: 1,
        totalLosses: 1,
        goalsFavor: 4,
        goalsOwn: 4,
        goalsBalance: 0,
        efficiency: 44.44
      },
      {
        name: 'Avaí/Kindermann',
        totalPoints: 3,
        totalGames: 1,
        totalVictories: 1,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 2,
        goalsOwn: 1,
        goalsBalance: 1,
        efficiency: 100
      },
    ]

    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboard)
  })
})