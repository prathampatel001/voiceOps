import express from 'express';
import { sendFormRequestEmail } from './mailFunctionController';

const router = express.Router();

router.post('/send-form-request-email',sendFormRequestEmail)


export default router;