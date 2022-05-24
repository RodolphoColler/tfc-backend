import { Router } from 'express';
import controller from '../controllers/loginController';
import { validateLogin, validateToken } from '../middlewares';

const router = Router();

router.get('/validate', validateToken, controller.getUserRole);

router.post('/', validateLogin, controller.getUser);

export default router;
