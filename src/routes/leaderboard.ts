import { Router } from 'express';
import getAll, { getAway, getHome } from '../controllers/leaderboardController';
import controller from '../controllers/leaderboardController'

const router = Router();

router.get('/home', controller.getHome);

router.get('/away', controller.getAway);

router.get('/', controller.getAll);

export default router;
