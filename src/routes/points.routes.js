import { Router } from 'express';
import { getPoints, addPoints } from '../controllers/points.controller';

const router = Router();

router.get('/', getPoints);
router.post('/', addPoints);

export default router;
