import { Router } from 'express';
import getAll, { getAway, getHome } from '../controllers/leaderboardController';

const router = Router();

router.get('/home', getHome);

router.get('/away', getAway);

router.get('/', getAll);

export default router;
