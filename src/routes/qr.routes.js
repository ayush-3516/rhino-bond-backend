import { Router } from 'express';
import { generateQR, scanQR } from '../controllers/qr.controller';

const router = Router();

router.post('/generate', generateQR);
router.post('/scan', scanQR);

export default router;
