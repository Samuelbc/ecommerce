import { Router } from 'express';
import { register, login } from '../controllers/auth';
import { getUser } from '../controllers/user';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getUser);

export { router as authRouter };
