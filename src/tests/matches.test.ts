import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from'chai-http';

import { app } from '../app';
import Matches from '../database/models/matches';

import { Response } from 'superagent';
import Teams from '../database/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test matches', () => {
  describe('Test get matches route', () => {
    afterEach(() => { (Matches.findAll as sinon.SinonStub).restore() });

    it('When everything goes well', async () => {
      const matchesMock = [
        {
          id:1,
          homeTeam:16,
          homeTeamGoals:1,
          awayTeam:8,
          awayTeamGoals:1,
          inProgress:false,
          teamHome:{
            teamName:"São Paulo"
          },
          teamAway:{
            teamName:"Grêmio"
          }
        },
        {
          id:41,
          homeTeam:16,
          homeTeamGoals:2,
          awayTeam:9,
          awayTeamGoals:0,
          inProgress:true,
          teamHome:{
            teamName:"São Paulo"
          },
          teamAway:{
            teamName:"Internacional"
          }
        }
      ]

    sinon.stub(Matches, "findAll").resolves(matchesMock as unknown as Matches[]);

      const { body, status }: Response = await chai
      .request(app)
      .get('/matches')

      expect(body).to.be.deep.equal(matchesMock);
      expect(status).to.be.equal(200);
    });

    it('When an error happens in database', async () => {

    sinon.stub(Matches, "findAll").throws(new Error('error'))

      const { body, status }: Response = await chai
      .request(app)
      .get('/matches')

      expect(body.message).to.be.equal('Something not good happens finding teams');
      expect(status).to.be.equal(500);
    });
  });

  describe('Test patch matches/id:finish route', () => {
    afterEach(() => { (Matches.update as sinon.SinonStub).restore() });

    it('When everything goes well', async () => {
    sinon.stub(Matches, "update").resolves();
  
      const { status }: Response = await chai
        .request(app)
        .patch('/matches/1/finish')
  
      expect(status).to.be.equal(200);
    })

    it('When database returns an error', async () => {
      sinon.stub(Matches, "update").throws(new Error('error'));
      
      const { status, body }: Response = await chai
      .request(app)
      .patch('/matches/1/finish')
      
      expect(body.message).to.be.equal('Something not happened well finishing your match');
      expect(status).to.be.equal(500);
    })
  })

  describe('Test post /matches route', async () => {

    it('When the teams are the same', async () => {
      const match = {
        homeTeam: 8, 
        awayTeam: 8, 
        homeTeamGoals: 1,
        awayTeamGoals: 2,
        inProgress: true
      }

      const { body: { token } }: Response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })

      const { body: { message }, status } : Response = await chai
        .request(app)
        .post('/matches')
        .set({ authorization: token })
        .send(match)

        expect(message).to.be.equal('It is not possible to create a match with two equal teams')
        expect(status).to.be.equal(401)
    });

    it('When the database does not contain teams with this id', async () => {
      const match = {
        homeTeam: 1, 
        awayTeam: 2, 
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      }

      const teamMock = [ 
        {
          team_name: 'Avaí/Kindermann',
        }
      ]

      const { body: { token } }: Response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      
      sinon.stub(Teams, "findAll").resolves(teamMock as unknown as Teams[])

      const { body: { message }, status } : Response = await chai
        .request(app)
        .post('/matches')
        .set({ authorization: token })
        .send(match)

        expect(message).to.be.equal('There is no team with such id!');
        expect(status).to.be.equal(404);
        (Teams.findAll as sinon.SinonStub).restore()
    })

    it('When everything goes well', async () => {
      const match = {
        homeTeam: 1, 
        awayTeam: 2, 
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
        }

      const matchMock = {
        id: 1,
        homeTeam: 1, 
        awayTeam: 2, 
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      }

      const teamMock = [ 
        {
          team_name: 'Avaí/Kindermann',
        },
        {
          team_name: 'Avaí/Kindermann',
        }
      ]

      const { body: { token } }: Response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      
      sinon.stub(Teams, "findAll").resolves(teamMock as unknown as Teams[])
      sinon.stub(Matches, "create").resolves(matchMock as unknown as Matches)

      const { body, status } : Response = await chai
        .request(app)
        .post('/matches')
        .set({ authorization: token })
        .send(match)
        
        expect(body).to.be.deep.equal(matchMock);
        expect(status).to.be.equal(201);
        (Teams.findAll as sinon.SinonStub).restore()
    })
  })
});

