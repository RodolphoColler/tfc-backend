import { Router } from 'express';
import { validateToken } from '../middlewares';
import controller from '../controllers/matchesController';

const router = Router();

router.patch('/:id/finish', controller.finishMatch);

router.patch('/:id', controller.updateMatchGoals);

router.post('/', validateToken, controller.create);

router.get('/', controller.getAll);

export default router;
