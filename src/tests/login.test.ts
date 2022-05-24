import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from'chai-http';

import { app } from '../app';
import Users from '../database/models/users';

import { Response } from 'superagent';
import { jwtDecode } from '../helpers/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test login', () => {
  describe('Test login middleware', () => {
    it('When email is invalid', async () => {
      const invalidUser = { email: 'invalid', password: 'password' };

      const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/login')
      .send(invalidUser)

      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
      expect(chaiHttpResponse).to.have.status(401);
    })

    it('When email is not found', async () => {
      const invalidUser = { password: 'password' };

      const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/login')
      .send(invalidUser)

      expect(chaiHttpResponse.body.message).to.be.equal('Email is required')
      expect(chaiHttpResponse).to.have.status(404);
    })

    it('When email is empty', async () => {
      const invalidUser = { email: '', password: 'password' };

      const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/login')
      .send(invalidUser)

      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
      expect(chaiHttpResponse).to.have.status(400);
    })

    it('When password is invalid', async () => {
      const invalidUser = { email: 'test', password: 'pass' };

      const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/login')
      .send(invalidUser)

      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
      expect(chaiHttpResponse).to.have.status(401);
    })

    it('When password is not found', async () => {
      const invalidUser = { email: 'test@gmail.com' };

      const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/login')
      .send(invalidUser)

      expect(chaiHttpResponse.body.message).to.be.equal('Password is required');
      expect(chaiHttpResponse).to.have.status(404);
    })

    it('When password is empty', async () => {
      const invalidUser = { email: 'test@gmail.com', password: '' };

      const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/login')
      .send(invalidUser)

      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
      expect(chaiHttpResponse).to.have.status(400);
    })
  })
  
  describe('Test login controller getUser', () => {
    const usersMock = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    }

    before(async () => {
      sinon.stub(Users, "findOne").resolves(usersMock as Users);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Route /login should return a token', async () => {
      const user = { email: 'admin@admin.com', password: 'secret_admin' }

      const chaiHttpResponse: Response = await chai
        .request(app)
        .post('/login')
        .send(user)

      expect(chaiHttpResponse.body).to.have.all.keys('token', 'user');
      expect(chaiHttpResponse.body.user).to.have.all.keys('id', 'role', 'email', 'username');
    });

    it('returned token is valid', async () => {
      const userAdmin = { email: 'admin@admin.com', password: 'secret_admin' }

      const { body: { user, token } }: Response = await chai
        .request(app)
        .post('/login')
        .send(userAdmin)

      const { id, username, email, role } = jwtDecode(token);

      expect(user.id).to.be.equal(id);
      expect(user.username).to.be.equal(username);
      expect(user.email).to.be.equal(email);
      expect(user.role).to.be.equal(role);
    });

    it('Password not match', async () => {
      const invalidUser = { email: 'admin@admin.com', password: 'password' };

      const chaiHttpResponse: Response = await chai
      .request(app)
      .post('/login')
      .send(invalidUser)

      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
      expect(chaiHttpResponse).to.have.status(400);
    })
  })

  describe('Test login controller getUserRole', () => {
    it('Should return the role from user', async () => {
      const user = { email: 'admin@admin.com', password: 'secret_admin' }

      const { body: { token } }: Response = await chai
        .request(app)
        .post('/login')
        .send(user)

      const { body }: Response = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: token })


        expect(body).to.be.equal('admin')
    });

    it('When token is not provide', async () => {
      const chaiHttpResponse: Response = await chai
        .request(app)
        .get('/login/validate')
        
        expect(chaiHttpResponse.body.message).to.be.equal('Your request must have a token')
        expect(chaiHttpResponse).to.have.status(400)
    });

    it('When token is invalid', async () => {
      const invalidToken = 'hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNl';

      const chaiHttpResponse: Response = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: invalidToken })
        
        expect(chaiHttpResponse.body.message).to.be.equal('Your token is invalid')
        expect(chaiHttpResponse).to.have.status(401)
    });
  })
});
