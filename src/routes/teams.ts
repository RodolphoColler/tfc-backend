import { Router } from 'express';
import controller from '../controllers/teamsController';

const router = Router();

router.get('/:id', controller.getById);

router.get('/', controller.getAll);

export default router;
