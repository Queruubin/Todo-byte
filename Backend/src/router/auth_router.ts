import { Router } from 'express';
import { register } from '../handlers/auth_handler';


const router = Router();

router.post('/register', register as any);



export default router;
