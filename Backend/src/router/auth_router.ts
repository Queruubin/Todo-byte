import { Router } from 'express';
import { isLoggedIn, login, logout, register } from '../handlers/auth_handler';


const router = Router();

router.put('/register', register as any);

router.post('/login', login as any);

router.post('/logout', logout as any);

router.get('/isAuthenticated', isLoggedIn as any);




export default router;
