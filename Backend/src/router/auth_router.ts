import { Router } from 'express';
import { login, register } from '../handlers/auth_handler';


const router = Router();

router.put('/register', register as any);

router.post('/login', login as any);




export default router;
