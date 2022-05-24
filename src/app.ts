/* eslint-disable linebreak-style */
import express from 'express';
import { login, teams, matches, leaderboard } from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/login', login);
    this.app.use('/teams', teams);
    this.app.use('/matches', matches);
    this.app.use('/leaderboard', leaderboard);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Online on ${PORT}`));
  }
}

export { App };

export const { app } = new App();
