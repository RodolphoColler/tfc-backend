import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from'chai-http';

import { app } from '../app';
import Teams from '../database/models/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test teams', () => {
  it('Route /teams should return all teams with code 200', async () => {
    const teamsMock = [
      {
        id: 1,
        teamName: 'Avaí/Kindermann'
      },
      {
        id: 2,
        teamName: 'Bahia'
      },
    ]

    sinon.stub(Teams, "findAll").resolves(teamsMock as Teams[]);

    const chaiHttpResponse: Response = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock);
    expect(chaiHttpResponse).to.have.status(200);
    (Teams.findAll as sinon.SinonStub).restore()
  });

  it('Route /teams/:id should return a team based on your id with status 200', async () => {
    const teamMock = {
      id: 1,
      teamName: 'Avaí/Kindermann'
    }

    sinon.stub(Teams, "findOne").resolves(teamMock as Teams);

    const chaiHttpResponse: Response = await chai
    .request(app)
    .get('/teams/1')
    
    expect(chaiHttpResponse.body).to.be.deep.equal(teamMock);
    expect(chaiHttpResponse).to.have.status(200);
  })
});
