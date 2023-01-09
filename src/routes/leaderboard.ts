import { Router } from 'express';
import controller from '../controllers/leaderboardController';

const router = Router();

router.get('/home', controller.getHome);

router.get('/away', controller.getAway);

router.get('/', controller.getAll);

export default router;
