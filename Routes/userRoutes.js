import express from 'express';
import { LoginUser, SignUpUser } from '../Controllers/userControl.js';

const router = express.Router();

router.post('/signin', SignUpUser);
router.post('/sign', LoginUser);

export default router;